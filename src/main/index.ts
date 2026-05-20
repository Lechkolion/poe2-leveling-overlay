import { app, BrowserWindow, globalShortcut, ipcMain, screen, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import LogWatcher from './logWatcher'
import { QuestOCR } from './questOCR'

let mainWindow: BrowserWindow | null = null
let logWatcher: LogWatcher | null = null
let questOCR: QuestOCR | null = null
let quickKeyAccelerator: string | null = null

// Window starts compact (tab + overlay). When sidebar opens, window grows
// leftward by SIDEBAR_W (right edge stays fixed). User can also manually
// widen the window by dragging — the overlay content flex-grows to fill.
const TAB_W = 26
const OVERLAY_W = 300
const SIDEBAR_W = 400

function createOverlayWindow(): void {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize

  const windowWidth = TAB_W + OVERLAY_W  // start compact
  const windowHeight = 750

  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: screenWidth - windowWidth - 10,
    y: Math.floor((screenHeight - windowHeight) / 2),
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: true,
    movable: true,
    hasShadow: false,
    roundedCorners: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  // Highest always-on-top level on Windows
  mainWindow.setAlwaysOnTop(true, 'screen-saver')

  // Start with click-through enabled (game receives all mouse events)
  mainWindow.setIgnoreMouseEvents(true, { forward: true })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function registerGlobalShortcuts(): void {
  // Toggle overlay visibility
  globalShortcut.register('Ctrl+Shift+H', () => {
    if (!mainWindow) return
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })

  // Manually advance to next step
  globalShortcut.register('Ctrl+Shift+N', () => {
    mainWindow?.webContents.send('step-advance', 1)
  })

  // Go back one step
  globalShortcut.register('Ctrl+Shift+B', () => {
    mainWindow?.webContents.send('step-advance', -1)
  })

}

function setupIPC(): void {
  // Renderer requests click-through toggle (when hovering over overlay vs transparent)
  ipcMain.on('set-ignore-mouse', (_, ignore: boolean) => {
    mainWindow?.setIgnoreMouseEvents(ignore, { forward: true })
  })

  // Renderer requests opening an external URL in the system browser
  ipcMain.on('open-external', (_, url: string) => {
    if (typeof url !== 'string') return
    if (!url.startsWith('http://') && !url.startsWith('https://')) return
    shell.openExternal(url)
  })

  // Renderer reports content height change
  ipcMain.on('resize-window', (_, height: number) => {
    if (mainWindow) {
      const [w] = mainWindow.getSize()
      mainWindow.setSize(w, Math.min(Math.max(height, 120), 900))
    }
  })

  // Sidebar open/close: grow/shrink the window leftward by exactly SIDEBAR_W
  // (preserves user's manual width adjustments + right edge stays pinned).
  ipcMain.on('set-sidebar-open', (_, open: boolean) => {
    if (!mainWindow) return
    const bounds = mainWindow.getBounds()
    const dx = open ? SIDEBAR_W : -SIDEBAR_W
    mainWindow.setBounds(
      { x: bounds.x - dx, y: bounds.y, width: bounds.width + dx, height: bounds.height },
      false,  // animate: false → instant, no flicker
    )
  })

  // Renderer requests log path change
  ipcMain.on('set-log-path', async (_, customPath: string) => {
    logWatcher?.stop()
    logWatcher = new LogWatcher()
    setupLogWatcherEvents()
    await logWatcher.start(customPath)
  })

  // Renderer requests current log path
  ipcMain.handle('get-log-path', () => logWatcher?.getLogPath() ?? null)

  // Renderer registers a single-key global shortcut for step advance
  ipcMain.handle('set-quick-key', (_, key: string) => {
    if (quickKeyAccelerator) {
      try { globalShortcut.unregister(quickKeyAccelerator) } catch {}
      quickKeyAccelerator = null
    }
    if (!key) return true
    try {
      const ok = globalShortcut.register(key, () => {
        mainWindow?.webContents.send('step-advance', 1)
      })
      if (ok) { quickKeyAccelerator = key; return true }
      return false
    } catch {
      return false
    }
  })
}

function setupLogWatcherEvents(): void {
  if (!logWatcher) return

  logWatcher.on('zone-change', (zoneName: string) => {
    mainWindow?.webContents.send('zone-change', zoneName)
  })

  logWatcher.on('level-change', (level: number) => {
    mainWindow?.webContents.send('level-change', level)
  })

  logWatcher.on('log-found', (path: string) => {
    mainWindow?.webContents.send('log-found', path)
  })

  logWatcher.on('error', (msg: string) => {
    mainWindow?.webContents.send('log-error', msg)
  })
}

app.whenReady().then(async () => {
  createOverlayWindow()
  registerGlobalShortcuts()
  setupIPC()

  logWatcher = new LogWatcher()
  setupLogWatcherEvents()
  await logWatcher.start()

  // OCR disabled: tesseract.js browser worker incompatible with Node.js worker threads
  // questOCR = new QuestOCR()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createOverlayWindow()
  })
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
  logWatcher?.stop()
  // questOCR?.destroy()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
