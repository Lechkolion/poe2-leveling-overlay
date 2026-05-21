import React from 'react'
import {
  GiWalkingBoot, GiCrossedSwords, GiClick, GiTalk, GiOpenChest,
  GiObelisk, GiTrophy, GiMagicPortal, GiInfo,
  GiSparkles, GiCrown, GiCrystalShine, GiBackForth, GiCheckMark,
} from 'react-icons/gi'
import type { IconType } from 'react-icons'
import { useGameStore, getVisibleSteps, ZONE_MAP } from '../store/gameStore'
import { BOSS_NAMES, NPC_NAMES } from '@data/highlights'
import type { GuideStep } from '@data/types'

// ── Proper-noun highlighter ──────────────────────────────────────────────────
// Matches multi-word Title Case sequences (e.g. "Count Geonor", "Trial of the Sekhemas")
// and single Title Case words 5+ chars long (e.g. "Balbala", "Nessa")
const NOUN_RE = /([A-Z][a-zA-Z']+(?:(?:\s+(?:of(?:\s+the)?|the|a|an)\s+|\s+)[A-Z][a-zA-Z']+)+|[A-Z][a-z]{4,}[a-zA-Z']*)/g

const SKIP = new Set([
  'After','Activate','All','Area','Ascend','Back','Before','Boss','Bring',
  'Check','Clear','Collect','Complete','Continue','Critical','Defeat',
  'Descend','Down','Enter','Exit','Find','First','Floor','Floors',
  'Follow','From','Gem','Grab','Head','Here','Hunt','Important',
  'Into','Kill','Last','Left','Look','Make','Move','Navigate',
  'Nearby','Next','Note','Now','Open','Optional','Passive','Pick',
  'Place','Portal','Proceed','Quest','Return','Right','Skill','Socket',
  'Support','Take','Talk','Then','There','Tier','Town','Up',
  'Waypoint','When','With','Your',
])

// Classify a proper noun → CSS class. Priority: boss > zone > npc > generic.
function classifyNoun(word: string): string {
  if (BOSS_NAMES.has(word)) return 'noun-boss'
  if (ZONE_MAP.has(word)) return 'noun-zone'
  if (NPC_NAMES.has(word)) return 'noun-npc'
  return 'noun-hl'
}

function hl(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let last = 0
  NOUN_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = NOUN_RE.exec(text)) !== null) {
    let word = m[1]
    let offset = 0
    // Strip leading skip words from multi-word matches
    const words = word.split(/\s+/)
    let trimCount = 0
    while (words.length - trimCount > 1 && SKIP.has(words[trimCount])) {
      offset += words[trimCount].length + 1
      trimCount++
    }
    word = words.slice(trimCount).join(' ')
    if (!word || SKIP.has(word)) continue
    const start = m.index + offset
    if (start > last) parts.push(text.slice(last, start))
    const cls = classifyNoun(word)
    parts.push(<span key={start} className={cls}>{word}</span>)
    last = start + word.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length > 1 ? <>{parts}</> : text
}

const STEP_TYPE_ICON: Record<string, IconType> = {
  move:     GiWalkingBoot,
  kill:     GiCrossedSwords,
  interact: GiClick,
  talk:     GiTalk,
  pickup:   GiOpenChest,
  waypoint: GiObelisk,
  trial:    GiTrophy,
  portal:   GiMagicPortal,
  note:     GiInfo,
}

const REWARD_ICON: Record<string, IconType> = {
  skill_point:      GiSparkles,
  ascendancy_point: GiCrown,
  stat_bonus:       GiCrystalShine,
  respec_point:     GiBackForth,
}

const ICON_BG_TYPES = new Set(['kill', 'trial', 'waypoint', 'interact'])


interface VisibleStep {
  step: GuideStep
  absoluteIndex: number
  isCurrent: boolean
  isCompleted: boolean
  orderLabel: string   // "1", "2", "OPT", etc. — sequential within zone
}

interface ZoneGroup {
  zone: string
  steps: VisibleStep[]
  requiredTotal: number
  requiredDone: number
}

/** Group consecutive steps by zone. Numbering is sequential within each
 *  zone (across all quests there) — so the user sees the actual order to
 *  do things, not per-quest counters. */
function groupByZone(rawSteps: Array<Omit<VisibleStep, 'orderLabel'>>): ZoneGroup[] {
  const groups: ZoneGroup[] = []
  let current: ZoneGroup | null = null
  let counter = 0

  for (const item of rawSteps) {
    const key = item.step.zone
    if (!current || current.zone !== key) {
      current = { zone: key, steps: [], requiredTotal: 0, requiredDone: 0 }
      groups.push(current)
      counter = 0
    }
    const isOpt = item.step.optional === true
    const orderLabel = isOpt ? 'OPT' : String(++counter)
    if (!isOpt) {
      current.requiredTotal++
      if (item.isCompleted) current.requiredDone++
    }
    current.steps.push({ ...item, orderLabel })
  }
  return groups
}

function StepItem({
  step,
  isCurrent,
  isCompleted,
  absoluteIndex,
  orderLabel,
  questTag,
  questType,
}: {
  step: GuideStep
  isCurrent: boolean
  isCompleted: boolean
  absoluteIndex: number
  orderLabel: string
  questTag?: string
  questType?: string
}) {
  const { markCurrentDone, goToStep, unmarkStep } = useGameStore()

  const TypeIcon = STEP_TYPE_ICON[step.type] ?? GiInfo
  const iconClasses = [
    'step-icon',
    !isCompleted && ICON_BG_TYPES.has(step.type) ? `step-icon--${step.type}` : '',
  ].filter(Boolean).join(' ')

  const isOpt = orderLabel === 'OPT'
  const classes = [
    'step',
    isCurrent   ? 'step--current'  : '',
    isCompleted ? 'step--done'     : '',
    !isCurrent && !isCompleted ? 'step--upcoming' : '',
    step.optional ? 'step--optional' : '',
  ].filter(Boolean).join(' ')

  const orderClasses = [
    'step-order',
    isOpt ? 'step-order--opt' : '',
    isCompleted ? 'step-order--done' : '',
    isCurrent ? 'step-order--current' : '',
  ].filter(Boolean).join(' ')

  const handleClick = () => {
    if (isCompleted) unmarkStep(step.id)
    else if (isCurrent) markCurrentDone()
    else goToStep(absoluteIndex)
  }

  return (
    <div className={classes} onClick={handleClick}>
      <span className={orderClasses} aria-label={isOpt ? 'optional' : `step ${orderLabel}`}>
        {orderLabel}
      </span>
      <div className={iconClasses}>
        {isCompleted ? (
          <GiCheckMark className="step-check" size={15} />
        ) : (
          <TypeIcon className={`step-type step-type--${step.type}`} size={17} />
        )}
      </div>
      <div className="step-body">
        {questTag && (
          <div className={`step-quest-tag step-quest-tag--${questType ?? 'side'}`}>{questTag}</div>
        )}
        <div className="step-instruction">{hl(step.instruction)}</div>
        {isCurrent && step.detail && (
          <div className="step-detail">{hl(step.detail)}</div>
        )}
        {isCurrent && step.speedrunNote && (
          <div className="step-speedrun">⚡ {hl(step.speedrunNote)}</div>
        )}
        {isCurrent && step.miniMap && (
          <div className="step-minimap">
            {step.miniMap.objectiveHint && (
              <div className="step-minimap-hint step-minimap-objective">
                <span className="step-minimap-label">Find</span>
                <span className="step-minimap-text">{hl(step.miniMap.objectiveHint)}</span>
              </div>
            )}
            {step.miniMap.exitHint && (
              <div className="step-minimap-hint step-minimap-exit">
                <span className="step-minimap-label">Exit</span>
                <span className="step-minimap-text">{hl(step.miniMap.exitHint)}</span>
              </div>
            )}
            {step.miniMap.tips?.map((tip, i) => (
              <div key={i} className="step-minimap-tip">· {hl(tip)}</div>
            ))}
          </div>
        )}
        {step.reward && (() => {
          const RewardIcon = REWARD_ICON[step.reward.type] ?? GiCrystalShine
          return (
            <div className={`step-reward step-reward--${step.reward.type}`}>
              <RewardIcon size={15} />
              <span>{step.reward.description}</span>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

export default function QuestSteps() {
  const { currentStepIndex, completedStepIds, goToStep } = useGameStore()
  const visible = getVisibleSteps(currentStepIndex, completedStepIds)

  if (visible.length === 0) return null

  const groups = groupByZone(visible)

  return (
    <div className="steps-container">
      {groups.map((group, gi) => (
        <div key={gi} className="zone-step-group">
          <div
            className="zone-step-header"
            onClick={() => goToStep(group.steps[0].absoluteIndex)}
            title={`Jump to first step in ${group.zone}`}
          >
            <span className="zone-step-name">{group.zone}</span>
            {group.requiredTotal > 0 && (
              <span className="zone-step-progress">
                {group.requiredDone}/{group.requiredTotal}
              </span>
            )}
          </div>
          {group.steps.map(({ step, isCurrent, isCompleted, absoluteIndex, orderLabel }) => (
            <StepItem
              key={step.id}
              step={step}
              isCurrent={isCurrent}
              isCompleted={isCompleted}
              absoluteIndex={absoluteIndex}
              orderLabel={orderLabel}
              questTag={step.questName}
              questType={step.questType}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

