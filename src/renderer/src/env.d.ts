/// <reference types="vite/client" />

interface Window {
  api: {
    setIgnoreMouse: (ignore: boolean) => void
    openExternal: (url: string) => void
    resizeWindow: (height: number) => void
    setLogPath: (path: string) => void
    getLogPath: () => Promise<string | null>
    onZoneChange: (cb: (zone: string) => void) => (() => void)
    onLogFound: (cb: (path: string) => void) => (() => void)
    onLogError: (cb: (msg: string) => void) => (() => void)
    onStepAdvance: (cb: (delta: number) => void) => (() => void)
    onToggleCompact: (cb: (compact: boolean) => void) => (() => void)
    onOcrMatch: (cb: (stepIndex: number) => void) => (() => void)
    onLevelChange: (cb: (level: number) => void) => (() => void)
    setQuickKey: (key: string) => Promise<boolean>
  }
  electron: {
    ipcRenderer: Electron.IpcRenderer
  }
}
