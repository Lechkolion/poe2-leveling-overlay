import { GiCompass, GiScrollUnfurled, GiCrenelCrown, GiTrophy, GiCheckMark, GiNextButton } from 'react-icons/gi'
import type { IconType } from 'react-icons'
import { useGameStore, ALL_STEPS, ACTS } from '../store/gameStore'
import type { GuideStep } from '@data/types'

interface QuestEntry {
  questName: string
  questType: string | undefined
  actId: number
  firstStepIndex: number
  steps: Array<{ step: GuideStep; index: number }>
}

function buildQuestList(): QuestEntry[] {
  const map = new Map<string, QuestEntry>()
  ALL_STEPS.forEach((step, i) => {
    if (!step.questName) return
    if (!map.has(step.questName)) {
      map.set(step.questName, {
        questName: step.questName,
        questType: step.questType,
        actId: step.actId,
        firstStepIndex: i,
        steps: [],
      })
    }
    map.get(step.questName)!.steps.push({ step, index: i })
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

export default function QuestBrowser() {
  const { currentStepIndex, completedStepIds, goToStep, toggleQuestBrowser } = useGameStore()
  const currentQuestName = ALL_STEPS[currentStepIndex]?.questName

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
        return (
          <div key={act.id}>
            <div className="quest-browser-act">
              <span className="quest-browser-act-label">{actLabel}</span>
              <div className="quest-browser-act-rule" />
            </div>
            {quests.map(entry => {
              const isCurrentQuest = entry.questName === currentQuestName
              const doneCount = entry.steps.filter(({ step }) => completedStepIds.has(step.id)).length
              const allDone = doneCount === entry.steps.length
              const QuestEntryIcon = QUEST_ICON[entry.questType ?? 'side'] ?? GiScrollUnfurled

              return (
                <div
                  key={entry.questName}
                  className={[
                    'quest-browser-item',
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
}
