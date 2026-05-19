import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  // Overlay mouse passthrough control
  setIgnoreMouse: (ignore: boolean) => ipcRenderer.send('set-ignore-mouse', ignore),

  // Window sizing
  resizeWindow: (height: number) => ipcRenderer.send('resize-window', height),

  // Log file
  setLogPath: (path: string) => ipcRenderer.send('set-log-path', path),
  getLogPath: (): Promise<string | null> => ipcRenderer.invoke('get-log-path'),

  // Event listeners (game → renderer)
  onZoneChange: (cb: (zone: string) => void) => {
    const handler = (_: Electron.IpcRendererEvent, zone: string) => cb(zone)
    ipcRenderer.on('zone-change', handler)
    return () => ipcRenderer.removeListener('zone-change', handler)
  },
  onLogFound: (cb: (path: string) => void) => {
    const handler = (_: Electron.IpcRendererEvent, path: string) => cb(path)
    ipcRenderer.on('log-found', handler)
    return () => ipcRenderer.removeListener('log-found', handler)
  },
  onLogError: (cb: (msg: string) => void) => {
    const handler = (_: Electron.IpcRendererEvent, msg: string) => cb(msg)
    ipcRenderer.on('log-error', handler)
    return () => ipcRenderer.removeListener('log-error', handler)
  },

  // Guide navigation (hotkeys → renderer)
  onStepAdvance: (cb: (delta: number) => void) => {
    const handler = (_: Electron.IpcRendererEvent, delta: number) => cb(delta)
    ipcRenderer.on('step-advance', handler)
    return () => ipcRenderer.removeListener('step-advance', handler)
  },
  onToggleCompact: (cb: (compact: boolean) => void) => {
    const handler = (_: Electron.IpcRendererEvent, compact: boolean) => cb(compact)
    ipcRenderer.on('toggle-compact', handler)
    return () => ipcRenderer.removeListener('toggle-compact', handler)
  },
  onOcrMatch: (cb: (stepIndex: number) => void) => {
    const handler = (_: Electron.IpcRendererEvent, stepIndex: number) => cb(stepIndex)
    ipcRenderer.on('ocr-match', handler)
    return () => ipcRenderer.removeListener('ocr-match', handler)
  },
  onLevelChange: (cb: (level: number) => void) => {
    const handler = (_: Electron.IpcRendererEvent, level: number) => cb(level)
    ipcRenderer.on('level-change', handler)
    return () => ipcRenderer.removeListener('level-change', handler)
  },
  setQuickKey: (key: string): Promise<boolean> => ipcRenderer.invoke('set-quick-key', key)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (e) {
    console.error(e)
  }
} else {
  // @ts-ignore
  window.electron = electronAPI
  // @ts-ignore
  window.api = api
}
