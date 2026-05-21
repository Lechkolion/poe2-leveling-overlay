import { useState } from 'react'
import {
  GiCompass, GiScrollUnfurled, GiCrenelCrown, GiTrophy,
  GiCheckMark, GiNextButton,
} from 'react-icons/gi'
import type { IconType } from 'react-icons'
import { useGameStore, ALL_STEPS, ACTS } from '../store/gameStore'
import type { GuideStep } from '@data/types'

interface QuestEntry {
  questName: string
  questType: string | undefined
  actId: number
  firstStepIndex: number
  primaryZone: string         // first step's zone — used for grouping
  zones: string[]             // unique zones spanned, in order encountered
  steps: Array<{ step: GuideStep; index: number }>
}

function buildQuestList(): QuestEntry[] {
  const map = new Map<string, QuestEntry>()
  ALL_STEPS.forEach((step, i) => {
    if (!step.questName) return
    let entry = map.get(step.questName)
    if (!entry) {
      entry = {
        questName: step.questName,
        questType: step.questType,
        actId: step.actId,
        firstStepIndex: i,
        primaryZone: step.zone,
        zones: [],
        steps: [],
      }
      map.set(step.questName, entry)
    }
    if (!entry.zones.includes(step.zone)) entry.zones.push(step.zone)
    entry.steps.push({ step, index: i })
  })
  return [...map.values()]
}

const ALL_QUESTS = buildQuestList()

const QUEST_ICON: Record<string, IconType> = {
  main:       GiCompass,
  side:       GiScrollUnfurled,
  ascendancy: GiCrenelCrown,
  trial:      GiTrophy,
}

interface ZoneGroup {
  zone: string
  quests: QuestEntry[]
}

/** Group quests by primary zone, preserving the order zones appear in the act. */
function groupByZoneInAct(quests: QuestEntry[]): ZoneGroup[] {
  const groups: ZoneGroup[] = []
  const seen = new Map<string, ZoneGroup>()
  for (const q of quests) {
    let g = seen.get(q.primaryZone)
    if (!g) {
      g = { zone: q.primaryZone, quests: [] }
      seen.set(q.primaryZone, g)
      groups.push(g)
    }
    g.quests.push(q)
  }
  return groups
}

export default function QuestBrowser() {
  const { currentStepIndex, completedStepIds, goToStep, toggleQuestBrowser } = useGameStore()
  const currentQuestName = ALL_STEPS[currentStepIndex]?.questName
  const currentZone = ALL_STEPS[currentStepIndex]?.zone

  // Collapsed state — both zone and act headers are click-to-toggle
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const toggleZone = (act: number, zone: string) => {
    const k = `${act}::${zone}`
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k); else next.add(k)
      return next
    })
  }
  const toggleAct = (act: number) => {
    const k = `act::${act}`
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k); else next.add(k)
      return next
    })
  }
  const isCollapsed = (act: number, zone: string) => collapsed.has(`${act}::${zone}`)
  const isActCollapsed = (act: number) => collapsed.has(`act::${act}`)

  const questsByAct = new Map<number, QuestEntry[]>()
  ALL_QUESTS.forEach(q => {
    if (!questsByAct.has(q.actId)) questsByAct.set(q.actId, [])
    questsByAct.get(q.actId)!.push(q)
  })

  const handleQuestClick = (entry: QuestEntry) => {
    goToStep(entry.firstStepIndex)
    toggleQuestBrowser()
  }

  return (
    <div className="quest-browser">
      {ACTS.map(act => {
        const quests = questsByAct.get(act.id)
        if (!quests?.length) return null
        const actLabel = act.id <= 4 ? `ACT ${act.id}` : `INTERLUDE ${act.id - 4}`
        const zoneGroups = groupByZoneInAct(quests)

        const actCollapsed = isActCollapsed(act.id)
        return (
          <div key={act.id}>
            <button
              className={`quest-browser-act ${actCollapsed ? 'quest-browser-act--collapsed' : ''}`}
              onClick={() => toggleAct(act.id)}
              title={actCollapsed ? `Expand ${actLabel}` : `Collapse ${actLabel}`}
            >
              <span className="quest-browser-act-chevron">{actCollapsed ? '▸' : '▾'}</span>
              <span className="quest-browser-act-label">{actLabel}</span>
              <div className="quest-browser-act-rule" />
              <span className="quest-browser-act-count">{quests.length}</span>
            </button>

            {!actCollapsed && zoneGroups.map(group => {
              const collapsedHere = isCollapsed(act.id, group.zone)
              const isHereNow = group.zone === currentZone
              return (
                <div key={group.zone} className="qb-zone-block">
                  <button
                    className={`qb-zone-header ${isHereNow ? 'qb-zone-header--here' : ''}`}
                    onClick={() => toggleZone(act.id, group.zone)}
                    title={collapsedHere ? 'Expand zone' : 'Collapse zone'}
                  >
                    <span className="qb-zone-chevron">{collapsedHere ? '▸' : '▾'}</span>
                    <span className="qb-zone-name">{group.zone}</span>
                    {isHereNow && <span className="qb-zone-here-badge">HERE</span>}
                    <span className="qb-zone-count">{group.quests.length}</span>
                  </button>

                  {!collapsedHere && group.quests.map(entry => {
                    const isCurrentQuest = entry.questName === currentQuestName
                    const doneCount = entry.steps.filter(({ step }) => completedStepIds.has(step.id)).length
                    const allDone = doneCount === entry.steps.length
                    const QuestEntryIcon = QUEST_ICON[entry.questType ?? 'side'] ?? GiScrollUnfurled
                    const extraZones = entry.zones.slice(1)

                    return (
                      <div
                        key={entry.questName}
                        className={[
                          'quest-browser-item',
                          'quest-browser-item--zoned',
                          isCurrentQuest ? 'quest-browser-item--current' : '',
                          allDone ? 'quest-browser-item--done' : '',
                        ].filter(Boolean).join(' ')}
                        onClick={() => handleQuestClick(entry)}
                      >
                        <QuestEntryIcon
                          className={`quest-browser-icon quest-browser-icon--${entry.questType ?? 'side'}`}
                          size={14}
                        />
                        <div className="quest-browser-content">
                          <div className="quest-browser-name">{entry.questName}</div>
                          {extraZones.length > 0 && (
                            <div className="qb-quest-zones" title={`Also visits: ${extraZones.join(', ')}`}>
                              → {extraZones.join(' · ')}
                            </div>
                          )}
                        </div>
                        <span className="qb-quest-progress">
                          {doneCount > 0 && !allDone && `${doneCount}/${entry.steps.length}`}
                          {allDone && <GiCheckMark className="qb-done-check" size={13} />}
                          {!allDone && doneCount === 0 && <GiNextButton className="qb-arrow" size={11} />}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
