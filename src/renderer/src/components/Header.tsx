import { GiSpellBook, GiCog, GiCancel, GiReturnArrow } from 'react-icons/gi'
import { useGameStore, getCurrentActName, ALL_STEPS } from '../store/gameStore'

export default function Header() {
  const {
    currentStepIndex, characterLevel, currentCharacter,
    toggleSettings, toggleQuestBrowser,
    showSettings, showQuestBrowser
  } = useGameStore()
  const actName = getCurrentActName(currentStepIndex)
  const total = ALL_STEPS.length
  const pct = total > 0 ? Math.round((currentStepIndex / total) * 100) : 0

  return (
    <div className="header drag-region">
      <div className="header-left">
        {currentCharacter
          ? <span className="header-title" title={`Profile: ${currentCharacter}`}>{currentCharacter}</span>
          : <span className="header-title">POE2</span>}
        {characterLevel > 0 && <span className="header-level">Lv{characterLevel}</span>}
        <span className="header-act">{actName || 'Campaign Guide'}</span>
      </div>
      <div className="header-controls no-drag">
        <button
          className={`icon-btn ${showQuestBrowser ? 'icon-btn--active' : ''}`}
          onClick={toggleQuestBrowser}
          title="Quest Browser"
          aria-label="Quest Browser"
        >
          <GiSpellBook size={17} />
        </button>
        <button
          className={`icon-btn ${showSettings ? 'icon-btn--active' : ''}`}
          onClick={toggleSettings}
          title="Settings"
          aria-label="Settings"
        >
          {showSettings ? <GiReturnArrow size={17} /> : <GiCog size={17} />}
        </button>
        <button
          className="icon-btn icon-btn--close"
          onClick={() => window.close()}
          title="Close overlay"
          aria-label="Close"
        >
          <GiCancel size={17} />
        </button>
      </div>
      <div className="progress-bar-wrap">
        <div className="progress-bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
