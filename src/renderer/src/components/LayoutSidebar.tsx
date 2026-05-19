import { useEffect, useMemo } from 'react'
import {
  GiTreasureMap, GiCancel, GiPreviousButton, GiNextButton,
} from 'react-icons/gi'
import { useGameStore, getZoneInfo, ALL_STEPS } from '../store/gameStore'

/**
 * Slide-in sidebar showing zone layout images from Exile-UI.
 * - Tab button on the left edge (always visible if current zone has layouts)
 * - Click tab → slide in panel showing current layout + cycle controls + thumb strip
 * - Replaces the old bottom gallery + center modal
 */
export default function LayoutSidebar() {
  const {
    currentZoneName, currentStepIndex,
    layoutSidebarFile, toggleLayoutSidebar, closeLayoutSidebar, setLayoutSidebarFile,
  } = useGameStore()

  const step = ALL_STEPS[currentStepIndex]
  const zoneName = currentZoneName || step?.zone || null
  const zoneInfo = getZoneInfo(zoneName)
  const layouts = zoneInfo.layouts
  const hasLayouts = layouts.length > 0
  const isOpen = layoutSidebarFile !== null

  // Resolve the actual file to display. '__open__' is a sentinel meaning "use first layout".
  const displayFile = useMemo(() => {
    if (!isOpen) return null
    if (layoutSidebarFile && layoutSidebarFile !== '__open__' && layouts.includes(layoutSidebarFile)) {
      return layoutSidebarFile
    }
    return layouts[0] ?? null
  }, [isOpen, layoutSidebarFile, layouts])

  const currentIdx = displayFile ? layouts.indexOf(displayFile) : -1
  const total = layouts.length

  // Auto-close if zone changes to one with no layouts
  useEffect(() => {
    if (isOpen && !hasLayouts) closeLayoutSidebar()
  }, [isOpen, hasLayouts, closeLayoutSidebar])

  // Keyboard nav when open
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeLayoutSidebar(); return }
      if (total < 2 || currentIdx < 0) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setLayoutSidebarFile(layouts[(currentIdx + 1) % total])
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setLayoutSidebarFile(layouts[(currentIdx - 1 + total) % total])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, currentIdx, total, layouts, closeLayoutSidebar, setLayoutSidebarFile])

  if (!hasLayouts) return null

  const goPrev = () => total > 1 && setLayoutSidebarFile(layouts[(currentIdx - 1 + total) % total])
  const goNext = () => total > 1 && setLayoutSidebarFile(layouts[(currentIdx + 1) % total])

  return (
    <>
      {/* Tab button — always visible on left edge */}
      <button
        className={`layout-tab no-drag ${isOpen ? 'layout-tab--open' : ''}`}
        onClick={toggleLayoutSidebar}
        title={isOpen ? 'Close layouts' : `View zone layouts (${total})`}
        aria-label="Toggle zone layouts"
      >
        <GiTreasureMap size={16} />
        <span className="layout-tab-count">{total}</span>
      </button>

      {/* Slide-in sidebar */}
      <div className={`layout-sidebar ${isOpen ? 'layout-sidebar--open' : ''}`}>
        {isOpen && displayFile && (
          <>
            <div className="layout-sidebar-header">
              <span className="layout-sidebar-title">{zoneName}</span>
              {total > 1 && (
                <span className="layout-sidebar-counter">{currentIdx + 1} / {total}</span>
              )}
              <button
                className="layout-sidebar-close"
                onClick={closeLayoutSidebar}
                aria-label="Close"
                title="Close (Esc)"
              >
                <GiCancel size={14} />
              </button>
            </div>

            <div className="layout-sidebar-image-wrap">
              <img
                className="layout-sidebar-image"
                src={zoneInfo.layoutBaseUrl + encodeURIComponent(displayFile)}
                alt={displayFile}
              />
              {total > 1 && (
                <>
                  <button
                    className="layout-sidebar-nav layout-sidebar-nav--prev"
                    onClick={goPrev}
                    aria-label="Previous layout"
                    title="Previous (←)"
                  >
                    <GiPreviousButton size={16} />
                  </button>
                  <button
                    className="layout-sidebar-nav layout-sidebar-nav--next"
                    onClick={goNext}
                    aria-label="Next layout"
                    title="Next (→)"
                  >
                    <GiNextButton size={16} />
                  </button>
                </>
              )}
            </div>

            {total > 1 && (
              <div className="layout-sidebar-strip">
                {layouts.map(file => (
                  <button
                    key={file}
                    className={`layout-sidebar-thumb ${file === displayFile ? 'layout-sidebar-thumb--active' : ''}`}
                    onClick={() => setLayoutSidebarFile(file)}
                    title={file.replace(/\.jpg$/, '')}
                  >
                    <img
                      src={zoneInfo.layoutBaseUrl + encodeURIComponent(file)}
                      alt={file}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget.parentElement as HTMLElement | null)?.style.setProperty('display', 'none')
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="layout-sidebar-credit">via Lailloken/Exile-UI (MIT)</div>
          </>
        )}
      </div>
    </>
  )
}
