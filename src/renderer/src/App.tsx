import { useEffect, useRef } from 'react'
import { useGameStore } from './store/gameStore'
import Header from './components/Header'
import ZoneBanner from './components/ZoneBanner'
import QuestSteps from './components/QuestSteps'
import QuestBrowser from './components/QuestBrowser'
import RewardAlert from './components/RewardAlert'
import MiniMapHint from './components/MiniMapHint'
import Settings from './components/Settings'
import HotkeyBar from './components/HotkeyBar'
import LayoutModal from './components/LayoutModal'
import LayoutSidebar from './components/LayoutSidebar'

export default function App() {
  const {
    showSettings, showQuestBrowser, quickAdvanceKey,
    onZoneChange, advanceStep, jumpToStep, navigateToQuest, setLogPath, setLogError, setCharacterLevel
  } = useGameStore()

  const containerRef = useRef<HTMLDivElement>(null)

  // Click-through: per-pixel hit test on every mousemove so native drag/resize
  // isn't interrupted by a mouseleave firing while the cursor is outside the div
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const overContent = el !== null && el !== document.body && el !== document.documentElement
      window.api?.setIgnoreMouse(!overContent)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    // Set up IPC listeners
    const unsubZone = window.api?.onZoneChange(onZoneChange)
    const unsubStep = window.api?.onStepAdvance(advanceStep)
    const unsubLogFound = window.api?.onLogFound(setLogPath)
    const unsubLogError = window.api?.onLogError((msg) => setLogError(msg))
    const unsubOcr = window.api?.onOcrMatch(jumpToStep)
    const unsubLevel = window.api?.onLevelChange(setCharacterLevel)

    // Init: get current log path
    window.api?.getLogPath().then(path => {
      if (path) setLogPath(path)
    })

    // Re-register saved quick-advance key on startup
    if (quickAdvanceKey) {
      window.api?.setQuickKey(quickAdvanceKey)
    }

    return () => {
      unsubZone?.()
      unsubStep?.()
      unsubLogFound?.()
      unsubLogError?.()
      unsubOcr?.()
      unsubLevel?.()
    }
  }, [onZoneChange, advanceStep, jumpToStep, setLogPath, setLogError, setCharacterLevel, quickAdvanceKey])

  // Keyboard shortcuts (also handled globally, but useful in dev)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'N') advanceStep(1)
      if (e.ctrlKey && e.shiftKey && e.key === 'B') advanceStep(-1)
      if (e.ctrlKey && e.shiftKey && e.key === ']') navigateToQuest(1)
      if (e.ctrlKey && e.shiftKey && e.key === '[') navigateToQuest(-1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [advanceStep, navigateToQuest])

  return (
    <div className="app-frame">
      <LayoutSidebar />
      <div
        ref={containerRef}
        className="overlay"
      >
        <Header />
        <ZoneBanner />
        <div className="overlay-content">
          {showSettings ? (
            <Settings />
          ) : showQuestBrowser ? (
            <QuestBrowser />
          ) : (
            <>
              <QuestSteps />
              <RewardAlert />
              <MiniMapHint />
            </>
          )}
        </div>
        <HotkeyBar />
      </div>
      <LayoutModal />
    </div>
  )
}
