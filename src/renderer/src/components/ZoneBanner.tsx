import { GiCompass, GiCrenelCrown, GiTrophy, GiScrollUnfurled, GiTreasureMap } from 'react-icons/gi'
import type { IconType } from 'react-icons'
import { useGameStore, ALL_STEPS, ACTS, ZONE_MAP, getZoneInfo } from '../store/gameStore'

const QUEST_ICON: Record<string, IconType> = {
  main:       GiCompass,
  ascendancy: GiCrenelCrown,
  trial:      GiTrophy,
  side:       GiScrollUnfurled,
}

export default function ZoneBanner() {
  const { currentZoneName, currentStepIndex, openLayoutModal } = useGameStore()
  const step = ALL_STEPS[currentStepIndex]
  const displayZone = currentZoneName || step?.zone || '—'
  const questName = step?.questName
  const questType = step?.questType
  const actId = step?.actId
  const act = actId ? ACTS.find(a => a.id === actId) : null
  const actLabel = act ? (actId && actId <= 4 ? `ACT ${actId}` : `IL ${actId - 4}`) : null

  const zoneEntry = currentZoneName ? ZONE_MAP.get(currentZoneName) : null
  const isHub = zoneEntry?.isHub === true

  const QuestIcon = (questType && QUEST_ICON[questType]) || GiScrollUnfurled

  // Pull level recommendation + layout count from Exile-UI mapping
  const zoneRef = displayZone !== '—' ? displayZone : null
  const zoneInfo = getZoneInfo(zoneRef)
  const levelLabel =
    zoneInfo.normalLevel !== undefined
      ? (zoneInfo.cruelLevel !== undefined && zoneInfo.cruelLevel !== zoneInfo.normalLevel
          ? `Lv ${zoneInfo.normalLevel}/${zoneInfo.cruelLevel}`
          : `Lv ${zoneInfo.normalLevel}`)
      : null

  const hasLayouts = zoneInfo.layouts.length > 0

  return (
    <div className="zone-banner drag-region">
      <div className="zone-banner-top">
        {isHub && <span className="hub-badge">TOWN</span>}
        {!isHub && actLabel && <span className="act-badge">{actLabel}</span>}
        <span className="zone-name">{displayZone}</span>
        {levelLabel && <span className="level-badge" title="Recommended level (normal/cruel)">{levelLabel}</span>}
        {hasLayouts && (
          <button
            className="zone-banner-map-btn no-drag"
            onClick={() => openLayoutModal(zoneInfo.layouts[0])}
            title={`View zone layouts (${zoneInfo.layouts.length}) — use ← → to cycle`}
            aria-label="View zone layouts"
          >
            <GiTreasureMap size={15} />
            <span className="zone-banner-map-count">{zoneInfo.layouts.length}</span>
          </button>
        )}
      </div>
      {questName && (
        <div className="quest-label">
          <QuestIcon className={`quest-icon quest-icon--${questType}`} size={16} />
          <span className="quest-name">{questName}</span>
        </div>
      )}
    </div>
  )
}
