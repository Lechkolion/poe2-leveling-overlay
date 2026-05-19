import {
  GiPathDistance, GiAncientRuins, GiPathTile, GiCobweb, GiSpiralShell, GiTombstone,
  GiExpand, GiContract, GiBullseye, GiExitDoor, GiAncientColumns,
} from 'react-icons/gi'
import type { IconType } from 'react-icons'
import { useGameStore, ALL_STEPS, ZONE_STEP_MAP, getZoneInfo } from '../store/gameStore'

const LAYOUT_ICON: Record<string, IconType> = {
  linear:    GiPathDistance,
  open:      GiAncientRuins,
  branching: GiPathTile,
  maze:      GiCobweb,
  spiral:    GiSpiralShell,
  dungeon:   GiTombstone,
}

const LAYOUT_LABEL: Record<string, string> = {
  linear:    'Linear',
  open:      'Open',
  branching: 'Branching',
  maze:      'Maze',
  spiral:    'Spiral',
  dungeon:   'Dungeon',
}

export default function MiniMapHint() {
  const { currentStepIndex, currentZoneName, showMiniMap, toggleMiniMap, openLayoutModal } = useGameStore()
  const step = ALL_STEPS[currentStepIndex]
  const zoneName = currentZoneName || step?.zone

  // Show the zone's minimap for the entire time you're in that zone
  // (look up the first step in the zone that has miniMap data)
  let hint = step?.miniMap
  if (!hint && zoneName) {
    const zoneStart = ZONE_STEP_MAP.get(zoneName)
    if (zoneStart !== undefined) {
      for (let i = zoneStart; i < ALL_STEPS.length && ALL_STEPS[i].zone === zoneName; i++) {
        if (ALL_STEPS[i].miniMap) { hint = ALL_STEPS[i].miniMap; break }
      }
    }
  }

  // Exile-UI layouts for this zone (from Lailloken/Exile-UI, MIT)
  const zoneInfo = getZoneInfo(zoneName)
  const hasLayouts = zoneInfo.layouts.length > 0

  if (!hint && !hasLayouts) return null

  const layoutType = hint?.layoutType ?? 'open'
  const LayoutIcon = LAYOUT_ICON[layoutType] ?? GiTombstone
  const label = hint ? (LAYOUT_LABEL[layoutType] ?? layoutType) : 'Layouts'

  return (
    <div className="minimap-section">
      <button className="minimap-toggle" onClick={toggleMiniMap}>
        <LayoutIcon className="minimap-layout-icon" size={14} />
        <span className="minimap-title">ZONE LAYOUT</span>
        <span className="minimap-layout-type">{label}</span>
        {showMiniMap
          ? <GiContract className="minimap-chevron" size={12} />
          : <GiExpand className="minimap-chevron" size={12} />}
      </button>

      {showMiniMap && (
        <div className="minimap-body">
          {hint?.objectiveHint && (
            <div className="minimap-row">
              <GiBullseye className="minimap-row-icon" size={12} />
              <span className="minimap-label">Objective</span>
              <span className="minimap-value">{hint.objectiveHint}</span>
            </div>
          )}
          {hint?.exitHint && (
            <div className="minimap-row">
              <GiExitDoor className="minimap-row-icon" size={12} />
              <span className="minimap-label">Exit</span>
              <span className="minimap-value">{hint.exitHint}</span>
            </div>
          )}
          {hint?.tips && hint.tips.length > 0 && (
            <div className="minimap-tips">
              {hint.tips.map((tip, i) => (
                <div key={i} className="minimap-tip">
                  <span className="minimap-tip-bullet">›</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          )}

          {hasLayouts && (
            <div className="layout-gallery">
              <div className="layout-gallery-header">
                <GiAncientColumns size={11} />
                <span>POSSIBLE LAYOUTS</span>
                <span className="layout-gallery-count">({zoneInfo.layouts.length})</span>
                <span className="layout-gallery-credit">via Exile-UI</span>
              </div>
              <div className="layout-gallery-strip">
                {zoneInfo.layouts.map((file) => (
                  <button
                    key={file}
                    className="layout-thumb"
                    onClick={() => openLayoutModal(file)}
                    title={`Click to enlarge — variant: ${file.replace(/\.jpg$/, '')}`}
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
            </div>
          )}
        </div>
      )}

    </div>
  )
}
