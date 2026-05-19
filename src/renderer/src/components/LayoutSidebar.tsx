import { useEffect, useMemo } from 'react'
import {
  GiTreasureMap, GiCancel, GiPreviousButton, GiNextButton,
} from 'react-icons/gi'
import { useGameStore, getZoneInfo, ALL_STEPS } from '../store/gameStore'

/**
 * Layout sidebar — lives OUTSIDE the main overlay box, to the left.
 * - Persistent vertical tab strip on the left (always shows when zone has layouts)
 * - Click tab → window expands leftward, sidebar panel slides into the new space
 * - Click tab again or Esc → window collapses back
 * - Image, prev/next, thumbnails only show layouts for the CURRENT zone
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

  // Resolve the actual file to display. '__open__' sentinel = "use first layout".
  const displayFile = useMemo(() => {
    if (!isOpen) return null
    if (layoutSidebarFile && layoutSidebarFile !== '__open__' && layouts.includes(layoutSidebarFile)) {
      return layoutSidebarFile
    }
    return layouts[0] ?? null
  }, [isOpen, layoutSidebarFile, layouts])

  const currentIdx = displayFile ? layouts.indexOf(displayFile) : -1
  const total = layouts.length

  // Tell Electron main to grow/shrink the window
  useEffect(() => {
    window.api?.setSidebarOpen(isOpen)
  }, [isOpen])

  // Auto-close if zone changes to one with no layouts
  useEffect(() => {
    if (isOpen && !hasLayouts) closeLayoutSidebar()
  }, [isOpen, hasLayouts, closeLayoutSidebar])

  // If sidebar is open but zone changed and we have layouts, reset to first of new zone
  useEffect(() => {
    if (isOpen && hasLayouts && currentIdx === -1 && layouts.length > 0) {
      setLayoutSidebarFile(layouts[0])
    }
  }, [isOpen, hasLayouts, currentIdx, layouts, setLayoutSidebarFile])

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

  const goPrev = () => total > 1 && setLayoutSidebarFile(layouts[(currentIdx - 1 + total) % total])
  const goNext = () => total > 1 && setLayoutSidebarFile(layouts[(currentIdx + 1) % total])

  return (
    <div className={`layout-side ${isOpen ? 'layout-side--open' : ''}`}>
      {/* Persistent tab — always visible. Disabled if no layouts for current zone */}
      <button
        className={`layout-tab no-drag ${isOpen ? 'layout-tab--open' : ''} ${!hasLayouts ? 'layout-tab--disabled' : ''}`}
        onClick={hasLayouts ? toggleLayoutSidebar : undefined}
        disabled={!hasLayouts}
        title={
          !hasLayouts
            ? 'No Exile-UI layouts for this zone'
            : isOpen ? 'Close layouts' : `View zone layouts (${total})`
        }
        aria-label="Toggle zone layouts"
      >
        <GiTreasureMap size={16} />
        {hasLayouts && <span className="layout-tab-count">{total}</span>}
      </button>

      {/* Panel — only takes space when open (window expanded to fit) */}
      {isOpen && displayFile && (
        <div className="layout-panel">
          <div className="layout-panel-header">
            <span className="layout-panel-title">{zoneName}</span>
            {total > 1 && (
              <span className="layout-panel-counter">{currentIdx + 1} / {total}</span>
            )}
            <button
              className="layout-panel-close"
              onClick={closeLayoutSidebar}
              aria-label="Close"
              title="Close (Esc)"
            >
              <GiCancel size={14} />
            </button>
          </div>

          <div className="layout-panel-image-wrap">
            <img
              className="layout-panel-image"
              src={zoneInfo.layoutBaseUrl + encodeURIComponent(displayFile)}
              alt={displayFile}
            />
            {total > 1 && (
              <>
                <button
                  className="layout-panel-nav layout-panel-nav--prev"
                  onClick={goPrev}
                  aria-label="Previous layout"
                  title="Previous (←)"
                >
                  <GiPreviousButton size={16} />
                </button>
                <button
                  className="layout-panel-nav layout-panel-nav--next"
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
            <div className="layout-panel-strip">
              {layouts.map(file => (
                <button
                  key={file}
                  className={`layout-panel-thumb ${file === displayFile ? 'layout-panel-thumb--active' : ''}`}
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

          <div className="layout-panel-credit">via Lailloken/Exile-UI (MIT)</div>
        </div>
      )}
    </div>
  )
}
