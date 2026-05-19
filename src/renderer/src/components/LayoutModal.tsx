import { useEffect } from 'react'
import { GiCancel, GiPreviousButton, GiNextButton } from 'react-icons/gi'
import { useGameStore, getZoneInfo } from '../store/gameStore'

export default function LayoutModal() {
  const { layoutModalFile, currentZoneName, openLayoutModal, closeLayoutModal } = useGameStore()

  const zoneInfo = getZoneInfo(currentZoneName)
  const layouts = zoneInfo.layouts
  const currentIdx = layoutModalFile ? layouts.indexOf(layoutModalFile) : -1
  const total = layouts.length

  // Keyboard nav: Esc closes, arrow keys cycle
  useEffect(() => {
    if (!layoutModalFile) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeLayoutModal(); return }
      if (total < 2) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const next = (currentIdx + 1) % total
        openLayoutModal(layouts[next])
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prev = (currentIdx - 1 + total) % total
        openLayoutModal(layouts[prev])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [layoutModalFile, currentIdx, total, layouts, openLayoutModal, closeLayoutModal])

  if (!layoutModalFile) return null

  const goPrev = () => {
    if (total < 2) return
    openLayoutModal(layouts[(currentIdx - 1 + total) % total])
  }
  const goNext = () => {
    if (total < 2) return
    openLayoutModal(layouts[(currentIdx + 1) % total])
  }

  return (
    <div className="layout-modal" onClick={closeLayoutModal}>
      <div className="layout-modal-inner" onClick={e => e.stopPropagation()}>
        <button
          className="layout-modal-close"
          onClick={closeLayoutModal}
          aria-label="Close"
          title="Close (Esc)"
        >
          <GiCancel size={18} />
        </button>

        {total > 1 && (
          <button
            className="layout-modal-nav layout-modal-nav--prev"
            onClick={goPrev}
            aria-label="Previous layout"
            title="Previous layout (←)"
          >
            <GiPreviousButton size={20} />
          </button>
        )}

        <img
          src={zoneInfo.layoutBaseUrl + encodeURIComponent(layoutModalFile)}
          alt={layoutModalFile}
        />

        {total > 1 && (
          <button
            className="layout-modal-nav layout-modal-nav--next"
            onClick={goNext}
            aria-label="Next layout"
            title="Next layout (→)"
          >
            <GiNextButton size={20} />
          </button>
        )}

        <div className="layout-modal-caption">
          <span>{layoutModalFile.replace(/\.jpg$/, '')}</span>
          {total > 1 && <span className="layout-modal-counter">{currentIdx + 1} / {total}</span>}
          <span className="layout-modal-credit">via Lailloken/Exile-UI (MIT)</span>
        </div>
      </div>
    </div>
  )
}
