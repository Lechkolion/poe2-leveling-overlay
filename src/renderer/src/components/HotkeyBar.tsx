import { GiPlayerPrevious, GiPreviousButton, GiCheckMark, GiNextButton, GiPlayerNext } from 'react-icons/gi'
import { useGameStore } from '../store/gameStore'

export default function HotkeyBar() {
  const { advanceStep, markCurrentDone, navigateToQuest } = useGameStore()
  return (
    <div className="hotkey-bar">
      <button className="hotkey-btn" onClick={() => navigateToQuest(-1)} title="Previous quest (Ctrl+Shift+[)">
        <GiPlayerPrevious size={14} />
        <span className="hotkey-label">Quest</span>
      </button>
      <button className="hotkey-btn" onClick={() => advanceStep(-1)} title="Previous step (Ctrl+Shift+B)">
        <GiPreviousButton size={14} />
        <span className="hotkey-label">Prev</span>
      </button>
      <button className="hotkey-btn hotkey-btn--done" onClick={markCurrentDone} title="Mark done / Next step">
        <GiCheckMark size={14} />
        <span className="hotkey-label">Done</span>
      </button>
      <button className="hotkey-btn" onClick={() => advanceStep(1)} title="Next step (Ctrl+Shift+N)">
        <span className="hotkey-label">Next</span>
        <GiNextButton size={14} />
      </button>
      <button className="hotkey-btn" onClick={() => navigateToQuest(1)} title="Next quest (Ctrl+Shift+])">
        <span className="hotkey-label">Quest</span>
        <GiPlayerNext size={14} />
      </button>
    </div>
  )
}
