import { nativeImage, screen, app } from 'electron'
import { createWorker, Worker } from 'tesseract.js'
import { execSync } from 'child_process'
import { unlinkSync, existsSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
import { ALL_STEPS } from '../data/index'

// Default quest tracker region (% of screen).
// POE2 shows quest objectives on the right side, roughly middle height.
const REGION = { left: 0.62, top: 0.20, width: 0.36, height: 0.30 }

export class QuestOCR {
  private worker: Worker | null = null
  private interval: NodeJS.Timeout | null = null
  private onMatch: ((stepIndex: number) => void) | null = null
  private running = false

  async init(): Promise<void> {
    try {
      const langPath = join(app.getPath('userData'), 'tessdata')
      const nmBase = join(__dirname, '../../node_modules')
      this.worker = await createWorker('eng', 1, {
        workerPath: join(nmBase, 'tesseract.js/dist/worker.min.js'),
        corePath:   join(nmBase, 'tesseract.js-core/tesseract-core-simd-lstm.wasm.js'),
        langPath,
        logger: () => {},
      })
    } catch {
      // OCR unavailable in this environment — app works without it
      this.worker = null
    }
  }

  start(onMatch: (stepIndex: number) => void): void {
    if (this.running) return
    this.running = true
    this.onMatch = onMatch
    this.interval = setInterval(() => { this.scan().catch(() => {}) }, 3000)
  }

  stop(): void {
    this.running = false
    if (this.interval) { clearInterval(this.interval); this.interval = null }
  }

  async destroy(): Promise<void> {
    this.stop()
    await this.worker?.terminate()
    this.worker = null
  }

  private async scan(): Promise<void> {
    if (!this.worker || !this.onMatch) return
    const text = await this.captureRegion()
    if (!text) return
    const stepIndex = matchOcrText(text)
    if (stepIndex !== null) this.onMatch(stepIndex)
  }

  private async captureRegion(): Promise<string | null> {
    const display = screen.getPrimaryDisplay()
    const { width, height } = display.size

    const rx = Math.round(REGION.left  * width)
    const ry = Math.round(REGION.top   * height)
    const rw = Math.round(REGION.width * width)
    const rh = Math.round(REGION.height * height)

    const tmp = join(tmpdir(), `poe2ocr-${Date.now()}.png`)
    try {
      // Use Windows Forms to capture exactly the quest tracker region
      execSync(
        `powershell -NoProfile -Command "` +
        `Add-Type -Assembly System.Windows.Forms,System.Drawing;` +
        `$b=New-Object Drawing.Bitmap(${rw},${rh});` +
        `$g=[Drawing.Graphics]::FromImage($b);` +
        `$g.CopyFromScreen(${rx},${ry},0,0,$b.Size);` +
        `$g.Dispose();` +
        `$b.Save([string]'${tmp.replace(/\\/g, '\\\\')}');` +
        `$b.Dispose()"`,
        { timeout: 4000, stdio: 'pipe' }
      )
    } catch { return null }

    if (!existsSync(tmp)) return null

    try {
      const img = nativeImage.createFromPath(tmp)
      if (img.isEmpty()) return null
      const { data: { text } } = await this.worker!.recognize(img.toPNG())
      return text
    } finally {
      try { unlinkSync(tmp) } catch {}
    }
  }
}

// Match OCR text against guide steps. Returns the best matching step index or null.
export function matchOcrText(raw: string): number | null {
  const text = raw.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')

  let bestIndex = -1
  let bestScore = 0

  ALL_STEPS.forEach((step, index) => {
    // Try matching quest name first (most reliable — unique per quest)
    if (step.questName) {
      const words = step.questName.toLowerCase().split(/\s+/).filter(w => w.length > 3)
      if (words.length > 0) {
        const hits = words.filter(w => text.includes(w)).length
        const score = hits / words.length
        if (score >= 0.6 && score > bestScore) {
          bestScore = score
          bestIndex = index
        }
      }
    }

    // Also try instruction keywords (catches objective text)
    const instrWords = step.instruction.toLowerCase().split(/\s+/).filter(w => w.length > 4)
    if (instrWords.length >= 2) {
      const hits = instrWords.filter(w => text.includes(w)).length
      const score = hits / instrWords.length
      if (score >= 0.55 && score > bestScore) {
        bestScore = score
        bestIndex = index
      }
    }
  })

  return bestIndex >= 0 ? bestIndex : null
}
