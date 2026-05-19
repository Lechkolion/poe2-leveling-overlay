import { useState, useCallback, useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { CAMPAIGN_TOTALS } from '@data/index'

function keyEventToAccelerator(e: KeyboardEvent): string | null {
  if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return null

  const mods: string[] = []
  if (e.ctrlKey) mods.push('Ctrl')
  if (e.shiftKey) mods.push('Shift')
  if (e.altKey) mods.push('Alt')

  let key: string
  if (e.code.startsWith('Numpad')) {
    const n = e.code.replace('Numpad', '')
    const numMap: Record<string, string> = {
      'Add': 'numadd', 'Subtract': 'numsub',
      'Multiply': 'nummult', 'Divide': 'numdiv', 'Decimal': 'numdec'
    }
    key = numMap[n] ?? (/^\d$/.test(n) ? `num${n}` : e.key)
  } else {
    const keyMap: Record<string, string> = {
      ' ': 'Space', 'ArrowUp': 'Up', 'ArrowDown': 'Down',
      'ArrowLeft': 'Left', 'ArrowRight': 'Right',
      'Enter': 'Return', 'Escape': 'Escape', 'Backspace': 'Backspace',
      'Delete': 'Delete', 'Tab': 'Tab', 'Home': 'Home', 'End': 'End',
      'PageUp': 'PageUp', 'PageDown': 'PageDown', 'Insert': 'Insert',
    }
    key = keyMap[e.key] ?? (e.key.length === 1 ? e.key.toUpperCase() : e.key)
  }

  return mods.length > 0 ? `${mods.join('+')}+${key}` : key
}

export default function Settings() {
  const { logPath, logError, quickAdvanceKey, setLogPath, setQuickAdvanceKey, resetProgress } = useGameStore()
  const [customPath, setCustomPath] = useState(logPath ?? '')
  const [confirmReset, setConfirmReset] = useState(false)
  const [capturing, setCapturing] = useState(false)
  const [keyStatus, setKeyStatus] = useState<'idle' | 'ok' | 'fail'>('idle')
  const captureRef = useRef<HTMLButtonElement>(null)

  const handleSetPath = useCallback(() => {
    if (customPath.trim()) {
      window.api?.setLogPath(customPath.trim())
      setLogPath(customPath.trim())
    }
  }, [customPath, setLogPath])

  const handleReset = useCallback(() => {
    if (confirmReset) {
      resetProgress()
      setConfirmReset(false)
    } else {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 3000)
    }
  }, [confirmReset, resetProgress])

  const handleClearKey = useCallback(async () => {
    await window.api?.setQuickKey('')
    setQuickAdvanceKey('')
    setKeyStatus('idle')
  }, [setQuickAdvanceKey])

  useEffect(() => {
    if (!capturing) return
    const handler = async (e: KeyboardEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.key === 'Escape') { setCapturing(false); return }
      const accel = keyEventToAccelerator(e)
      if (!accel) return
      setCapturing(false)
      const ok = await window.api?.setQuickKey(accel)
      if (ok) {
        setQuickAdvanceKey(accel)
        setKeyStatus('ok')
      } else {
        setKeyStatus('fail')
      }
    }
    window.addEventListener('keydown', handler, true)
    return () => window.removeEventListener('keydown', handler, true)
  }, [capturing, setQuickAdvanceKey])

  return (
    <div className="settings">
      <div className="settings-section">
        <div className="settings-title">Client.txt Log Path</div>
        <div className="settings-desc">
          Auto-detected: {logPath ? (
            <span className="settings-path">{logPath}</span>
          ) : (
            <span className="settings-error">Not found</span>
          )}
        </div>
        {logError && <div className="settings-error">⚠ {logError}</div>}
        <input
          className="settings-input"
          type="text"
          value={customPath}
          onChange={e => setCustomPath(e.target.value)}
          placeholder="C:\Daum Games\Path of Exile 2\logs\Client.txt"
          spellCheck={false}
        />
        <button className="settings-btn" onClick={handleSetPath}>Set Custom Path</button>
        <div className="settings-hint">
          Kakao default: <code>C:\Daum Games\Path of Exile2\logs\KakaoClient.txt</code>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-title">Quick Step Key</div>
        <div className="settings-desc">
          Single key to advance one step — for in-game use without a 3-key chord.
        </div>
        <div className="quick-key-row">
          <div className={`quick-key-display ${capturing ? 'capturing' : ''} ${!quickAdvanceKey && !capturing ? 'empty' : ''}`}>
            {capturing ? 'Press any key...' : (quickAdvanceKey || 'Not set')}
          </div>
          <button
            ref={captureRef}
            className={`settings-btn quick-key-btn ${capturing ? 'capturing' : ''}`}
            onClick={() => { setCapturing(true); setKeyStatus('idle') }}
          >
            {capturing ? 'Cancel (Esc)' : 'Set Key'}
          </button>
          {quickAdvanceKey && (
            <button className="settings-btn quick-key-clear" onClick={handleClearKey}>✕</button>
          )}
        </div>
        {keyStatus === 'ok' && <div className="settings-hint settings-ok">✓ Key registered — works globally while game is focused</div>}
        {keyStatus === 'fail' && <div className="settings-error">Key already in use by system or another app. Try a different key.</div>}
        <div className="settings-hint">Suggestion: F2, F3, ` (backtick), or a Numpad key</div>
      </div>

      <div className="settings-section">
        <div className="settings-title">Campaign Progress</div>
        <div className="settings-desc">
          Total skill points: {CAMPAIGN_TOTALS.skillPoints}<br />
          Total ascendancy points: {CAMPAIGN_TOTALS.ascendancyPoints}<br />
          Total acts tracked: {CAMPAIGN_TOTALS.acts}
        </div>
        <button
          className={`settings-btn settings-btn--danger ${confirmReset ? 'confirm' : ''}`}
          onClick={handleReset}
        >
          {confirmReset ? 'Click again to confirm reset' : 'Reset All Progress'}
        </button>
      </div>

      <div className="settings-section">
        <div className="settings-title">Hotkeys</div>
        <div className="settings-hotkeys">
          <div><kbd>Ctrl+Shift+H</kbd> Toggle hide/show overlay</div>
          <div><kbd>Ctrl+Shift+N</kbd> Next step</div>
          <div><kbd>Ctrl+Shift+B</kbd> Previous step</div>
          {quickAdvanceKey && <div><kbd>{quickAdvanceKey}</kbd> Next step (quick key)</div>}
          <div><kbd>Click step</kbd> Jump to step</div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-title">Credits</div>
        <div className="settings-hint">
          Icons by <a href="https://game-icons.net" target="_blank" rel="noreferrer">game-icons.net</a> (CC BY 3.0).
        </div>
        <div className="settings-hint">
          Zone layouts + level data via <a href="https://github.com/Lailloken/Exile-UI" target="_blank" rel="noreferrer">Lailloken/Exile-UI</a> (MIT).
        </div>
      </div>
    </div>
  )
}
