import { EventEmitter } from 'events'
import { watch } from 'chokidar'
import { createReadStream, existsSync } from 'fs'
import { stat } from 'fs/promises'
import { createInterface } from 'readline'
import { exec } from 'child_process'
import { promisify } from 'util'
import { translateZoneName } from '../data/koZoneMap'
import { resolveAreaId } from '../data/areaIds'

const execAsync = promisify(exec)

// POE2 primary: "Generating level N area "areaId"" — language-agnostic stable IDs
const GENERATING_LEVEL_PATTERN = /Generating level \d+ area "([^"]+)"/
// POE2 fallback: "[SCENE] Set Source [ZoneName]" — display name (may be localized)
const ZONE_ENTER_PATTERN = /\[SCENE\] Set Source \[(.+?)\]/
// Filter out act title screens
const ACT_TITLE_PATTERN = /^Act \d+$/
// Character level up — captures both name + level
const LEVEL_UP_PATTERN = /:\s+(\S+)\s+is now level (\d+)/
// Character entering a zone — fires on every area change
const CHAR_JOIN_PATTERN = /:\s+(\S+)\s+has joined the area/
// Login: character name appears here on first session login
const CHAR_LOGIN_PATTERN = /Connecting to instance server.*for character\s+(\S+)/i

// areaId mappings live in src/data/areaIds.ts (shared with renderer).

// Ordered list of paths to check (Kakao first as user has Kakao client)
const DEFAULT_LOG_PATHS = [
  'C:\\Daum Games\\Path of Exile2\\logs\\KakaoClient.txt',
  'C:\\Daum Games\\Path of Exile2\\logs\\Client.txt',
  'C:\\Daum Games\\Path of Exile 2\\logs\\KakaoClient.txt',
  'C:\\Daum Games\\Path of Exile 2\\logs\\Client.txt',
  `${process.env.USERPROFILE}\\Documents\\My Games\\Path of Exile 2\\logs\\Client.txt`,
  'C:\\Program Files (x86)\\Grinding Gear Games\\Path of Exile 2\\logs\\Client.txt',
  'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Path of Exile 2\\logs\\Client.txt',
  'C:\\Program Files\\Epic Games\\PathOfExile2\\logs\\Client.txt',
]

const KAKAO_REGISTRY_KEY = 'HKCU\\Software\\DaumGames\\POE2'

class LogWatcher extends EventEmitter {
  private logPath: string | null = null
  private fileWatcher: ReturnType<typeof watch> | null = null
  private lastSize: number = 0
  private pollInterval: NodeJS.Timeout | null = null
  private lastEmittedZone: string | null = null
  private reading = false

  async start(customPath?: string): Promise<void> {
    const path = customPath || await this.findLogFile()
    if (!path) {
      this.emit('error', 'Client.txt not found. Set path in Settings.')
      return
    }
    this.logPath = path
    this.emit('log-found', path)

    try {
      const fileStat = await stat(path)
      this.lastSize = fileStat.size
      await this.detectCurrentZone(path, fileStat.size)
    } catch {
      this.lastSize = 0
    }

    this.fileWatcher = watch(path, { persistent: true, usePolling: false })
    this.fileWatcher.on('change', () => this.readNewLines())

    this.pollInterval = setInterval(() => this.readNewLines(), 1000)
  }

  private async findLogFile(): Promise<string | null> {
    const kakaoPath = await this.getKakaoInstallPath()
    if (kakaoPath) {
      for (const logName of ['KakaoClient.txt', 'Client.txt']) {
        const logPath = `${kakaoPath}\\logs\\${logName}`
        if (existsSync(logPath)) return logPath
      }
    }
    for (const path of DEFAULT_LOG_PATHS) {
      if (existsSync(path)) return path
    }
    return null
  }

  private async getKakaoInstallPath(): Promise<string | null> {
    try {
      const { stdout } = await execAsync(
        `reg query "${KAKAO_REGISTRY_KEY}" /v InstallPath 2>nul`
      )
      const match = stdout.match(/InstallPath\s+REG_SZ\s+(.+)/)
      return match ? match[1].trim() : null
    } catch {
      return null
    }
  }

  // Process a single log line: detect zone, level-up, and character name.
  private processLine(line: string): {
    zone: string | null
    level: number | null
    character: string | null
  } {
    let zone: string | null = null
    let level: number | null = null
    let character: string | null = null

    // Primary: Generating level — stable areaId, language-agnostic
    const genMatch = line.match(GENERATING_LEVEL_PATTERN)
    if (genMatch) {
      zone = resolveAreaId(genMatch[1])
    }

    // Fallback: [SCENE] Set Source — display name (may need KO translation)
    if (!zone) {
      const sceneMatch = line.match(ZONE_ENTER_PATTERN)
      if (sceneMatch) {
        const raw = sceneMatch[1]
        if (!ACT_TITLE_PATTERN.test(raw) && raw !== '(unknown)' && raw !== '(null)') {
          zone = translateZoneName(raw)
        }
      }
    }

    // Character level-up — captures name + new level
    const lvlMatch = line.match(LEVEL_UP_PATTERN)
    if (lvlMatch) {
      character = lvlMatch[1]
      level = parseInt(lvlMatch[2], 10)
    }

    // Character has joined the area — fires on every zone enter, most frequent signal
    if (!character) {
      const joinMatch = line.match(CHAR_JOIN_PATTERN)
      if (joinMatch) character = joinMatch[1]
    }

    // Login event — character name appears once per session
    if (!character) {
      const loginMatch = line.match(CHAR_LOGIN_PATTERN)
      if (loginMatch) character = loginMatch[1]
    }

    return { zone, level, character }
  }

  private emitZone(zone: string): void {
    if (zone === this.lastEmittedZone) return
    this.lastEmittedZone = zone
    this.emit('zone-change', zone)
  }

  private lastEmittedChar: string | null = null
  private emitCharacter(name: string): void {
    if (name === this.lastEmittedChar) return
    this.lastEmittedChar = name
    this.emit('character-change', name)
  }

  // Scan last 100 KB to detect which zone the player is currently in on startup.
  private async detectCurrentZone(logPath: string, fileSize: number): Promise<void> {
    const SCAN_BYTES = 102400
    const start = Math.max(0, fileSize - SCAN_BYTES)
    return new Promise((resolve) => {
      try {
        const stream = createReadStream(logPath, { start, end: fileSize - 1, encoding: 'utf8' })
        const rl = createInterface({ input: stream })
        let lastZone: string | null = null
        let lastLevel: number | null = null
        let lastChar: string | null = null
        rl.on('line', (line) => {
          const { zone, level, character } = this.processLine(line)
          if (zone) lastZone = zone
          if (level) lastLevel = level
          if (character) lastChar = character
        })
        rl.on('close', () => {
          if (lastChar) this.emitCharacter(lastChar)
          if (lastZone) this.emitZone(lastZone)
          if (lastLevel !== null) this.emit('level-change', lastLevel)
          resolve()
        })
        rl.on('error', () => resolve())
      } catch {
        resolve()
      }
    })
  }

  private async readNewLines(): Promise<void> {
    if (!this.logPath || this.reading) return
    this.reading = true
    try {
      const fileStat = await stat(this.logPath)
      const newSize = fileStat.size
      if (newSize < this.lastSize) this.lastSize = 0
      if (newSize <= this.lastSize) return

      const stream = createReadStream(this.logPath, {
        start: this.lastSize,
        end: newSize - 1,
        encoding: 'utf8'
      })

      const rl = createInterface({ input: stream })

      rl.on('line', (line) => {
        const { zone, level, character } = this.processLine(line)
        if (character) this.emitCharacter(character)
        if (zone) this.emitZone(zone)
        if (level !== null) this.emit('level-change', level)
      })

      rl.on('close', () => {
        this.lastSize = newSize
        this.reading = false
      })

      rl.on('error', () => {
        this.reading = false
      })
    } catch {
      this.reading = false
    }
  }

  getLogPath(): string | null {
    return this.logPath
  }

  stop(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval)
      this.pollInterval = null
    }
    this.fileWatcher?.close()
    this.fileWatcher = null
  }
}

export default LogWatcher
