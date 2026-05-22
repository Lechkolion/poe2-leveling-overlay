import { create } from 'zustand'
import { ALL_STEPS, ZONE_STEP_MAP, ZONE_MAP, ACTS } from '@data/index'
import type { GuideStep } from '@data/types'

// Build quest order map: questName → first step index
const QUEST_FIRST_STEP = new Map<string, number>()
const QUEST_ORDER: string[] = []
ALL_STEPS.forEach((step, i) => {
  const key = step.questName
  if (key && !QUEST_FIRST_STEP.has(key)) {
    QUEST_FIRST_STEP.set(key, i)
    QUEST_ORDER.push(key)
  }
})

interface GameState {
  currentStepIndex: number
  completedStepIds: Set<string>
  currentZoneName: string | null
  currentCharacter: string | null
  characterLevel: number
  quickAdvanceKey: string
  logPath: string | null
  logError: string | null
  showSettings: boolean
  showMiniMap: boolean
  showQuestBrowser: boolean
}

interface GameActions {
  onZoneChange: (zoneName: string) => void
  onCharacterChange: (name: string) => void
  setCharacterLevel: (level: number) => void
  setQuickAdvanceKey: (key: string) => void
  advanceStep: (delta: number) => void
  jumpToStep: (stepIndex: number) => void
  goToStep: (stepIndex: number) => void
  navigateToQuest: (delta: number) => void
  markCurrentDone: () => void
  markStep: (stepId: string) => void
  unmarkStep: (stepId: string) => void
  setLogPath: (path: string) => void
  setLogError: (msg: string | null) => void
  toggleSettings: () => void
  toggleMiniMap: () => void
  toggleQuestBrowser: () => void
  resetProgress: () => void
}

type GameStore = GameState & GameActions

const CONTEXT_AFTER = 5
const STORAGE_PREFIX = 'poe2-guide-v2:'
const LEGACY_KEY = 'poe2-guide-v1'
const ACTIVE_CHAR_KEY = 'poe2-active-character'
const DEFAULT_PROFILE = '__default__'

function profileKey(charName: string | null): string {
  return STORAGE_PREFIX + (charName || DEFAULT_PROFILE)
}

interface ProfileData {
  currentStepIndex: number
  completedStepIds: Set<string>
}

function loadProgress(charName: string | null): ProfileData {
  try {
    let saved = localStorage.getItem(profileKey(charName))
    // Migrate legacy v1 progress to default profile on first run
    if (!saved && !charName) {
      const legacy = localStorage.getItem(LEGACY_KEY)
      if (legacy) {
        saved = legacy
        localStorage.setItem(profileKey(null), legacy)
        localStorage.removeItem(LEGACY_KEY)
      }
    }
    if (!saved) return { currentStepIndex: 0, completedStepIds: new Set() }
    const { stepIndex, completedIds } = JSON.parse(saved)
    return {
      currentStepIndex: typeof stepIndex === 'number' ? stepIndex : 0,
      completedStepIds: new Set(Array.isArray(completedIds) ? completedIds : []),
    }
  } catch {
    return { currentStepIndex: 0, completedStepIds: new Set() }
  }
}

function saveProgress(charName: string | null, stepIndex: number, completedIds: Set<string>): void {
  try {
    localStorage.setItem(profileKey(charName), JSON.stringify({
      stepIndex,
      completedIds: [...completedIds],
    }))
  } catch {}
}

const initialChar = localStorage.getItem(ACTIVE_CHAR_KEY)
const saved = loadProgress(initialChar)

export const useGameStore = create<GameStore>((set, get) => ({
  currentStepIndex: saved.currentStepIndex,
  completedStepIds: saved.completedStepIds,
  currentZoneName: null,
  currentCharacter: initialChar,
  characterLevel: 0,
  quickAdvanceKey: localStorage.getItem('poe2-quick-key') ?? '',
  logPath: null,
  logError: null,
  showSettings: false,
  showMiniMap: true,
  showQuestBrowser: false,

  onZoneChange: (zoneName: string) => {
    set({ currentZoneName: zoneName })
    const zoneFirstStep = ZONE_STEP_MAP.get(zoneName)
    if (zoneFirstStep === undefined) return

    const { completedStepIds, currentStepIndex } = get()

    // Find first incomplete step in zone whose prerequisites are all complete
    let targetIdx = zoneFirstStep
    while (targetIdx < ALL_STEPS.length && ALL_STEPS[targetIdx].zone === zoneName) {
      const s = ALL_STEPS[targetIdx]
      const prereqsMet = !s.prerequisiteStepIds ||
        s.prerequisiteStepIds.every(id => completedStepIds.has(id))
      if (!completedStepIds.has(s.id) && prereqsMet) break
      targetIdx++
    }

    // Only advance forward, never regress on revisiting zones
    if (targetIdx > currentStepIndex && ALL_STEPS[targetIdx]?.zone === zoneName) {
      set({ currentStepIndex: targetIdx })
      saveProgress(get().currentCharacter, targetIdx, completedStepIds)
    } else if (zoneFirstStep > currentStepIndex) {
      set({ currentStepIndex: zoneFirstStep })
      saveProgress(get().currentCharacter, zoneFirstStep, completedStepIds)
    }
  },

  advanceStep: (delta: number) => {
    const { currentStepIndex, completedStepIds } = get()
    const next = Math.max(0, Math.min(ALL_STEPS.length - 1, currentStepIndex + delta))
    set({ currentStepIndex: next })
    saveProgress(get().currentCharacter, next, completedStepIds)
  },

  jumpToStep: (stepIndex: number) => {
    const { currentStepIndex, completedStepIds } = get()
    const clamped = Math.max(0, Math.min(ALL_STEPS.length - 1, stepIndex))
    // Only jump forward — used by OCR and auto-advance to avoid regression
    if (clamped > currentStepIndex) {
      set({ currentStepIndex: clamped })
      saveProgress(get().currentCharacter, clamped, completedStepIds)
    }
  },

  goToStep: (stepIndex: number) => {
    const { completedStepIds } = get()
    const clamped = Math.max(0, Math.min(ALL_STEPS.length - 1, stepIndex))
    set({ currentStepIndex: clamped })
    saveProgress(get().currentCharacter, clamped, completedStepIds)
  },

  markCurrentDone: () => {
    const { currentStepIndex, completedStepIds } = get()
    const step = ALL_STEPS[currentStepIndex]
    if (!step) return
    const updated = new Set(completedStepIds)
    updated.add(step.id)
    const next = Math.min(ALL_STEPS.length - 1, currentStepIndex + 1)
    set({ completedStepIds: updated, currentStepIndex: next })
    saveProgress(get().currentCharacter, next, updated)
  },

  markStep: (stepId: string) => {
    const { completedStepIds, currentStepIndex } = get()
    const updated = new Set(completedStepIds)
    updated.add(stepId)
    const stepIndex = ALL_STEPS.findIndex(s => s.id === stepId)
    const next = stepIndex === currentStepIndex
      ? Math.min(ALL_STEPS.length - 1, currentStepIndex + 1)
      : currentStepIndex
    set({ completedStepIds: updated, currentStepIndex: next })
    saveProgress(get().currentCharacter, next, updated)
  },

  unmarkStep: (stepId: string) => {
    const { completedStepIds, currentStepIndex } = get()
    if (!completedStepIds.has(stepId)) return
    const updated = new Set(completedStepIds)
    updated.delete(stepId)
    // If un-marking a step behind current position, move back to it
    const stepIndex = ALL_STEPS.findIndex(s => s.id === stepId)
    const newIdx = stepIndex < currentStepIndex ? stepIndex : currentStepIndex
    set({ completedStepIds: updated, currentStepIndex: newIdx })
    saveProgress(get().currentCharacter, newIdx, updated)
  },

  navigateToQuest: (delta: number) => {
    const { currentStepIndex, completedStepIds } = get()
    const currentQuestName = ALL_STEPS[currentStepIndex]?.questName
    const currentPos = currentQuestName ? QUEST_ORDER.indexOf(currentQuestName) : -1
    const targetPos = Math.max(0, Math.min(QUEST_ORDER.length - 1, currentPos + delta))
    const targetIdx = QUEST_FIRST_STEP.get(QUEST_ORDER[targetPos]) ?? currentStepIndex
    set({ currentStepIndex: targetIdx })
    saveProgress(get().currentCharacter, targetIdx, completedStepIds)
  },

  onCharacterChange: (name: string) => {
    const { currentCharacter } = get()
    if (currentCharacter === name) return  // same character, no-op
    // Persist active character + load that character's profile
    localStorage.setItem(ACTIVE_CHAR_KEY, name)
    const profile = loadProgress(name)
    set({
      currentCharacter: name,
      currentStepIndex: profile.currentStepIndex,
      completedStepIds: profile.completedStepIds,
      // Reset transient session state — character switch is a clean slate
      characterLevel: 0,
      currentZoneName: null,
    })
  },

  setCharacterLevel: (level: number) => set({ characterLevel: level }),
  setQuickAdvanceKey: (key: string) => {
    localStorage.setItem('poe2-quick-key', key)
    set({ quickAdvanceKey: key })
  },
  setLogPath: (path: string) => set({ logPath: path, logError: null }),
  setLogError: (msg: string | null) => set({ logError: msg }),
  toggleSettings: () => set(state => ({ showSettings: !state.showSettings, showQuestBrowser: false })),
  toggleMiniMap: () => set(state => ({ showMiniMap: !state.showMiniMap })),
  toggleQuestBrowser: () => set(state => ({ showQuestBrowser: !state.showQuestBrowser, showSettings: false })),

  resetProgress: () => {
    // Reset only the active character's profile (per-character now)
    localStorage.removeItem(profileKey(get().currentCharacter))
    set({ currentStepIndex: 0, completedStepIds: new Set(), currentZoneName: null, showQuestBrowser: false })
  },
}))

export function getVisibleSteps(currentIdx: number, completedIds: Set<string>) {
  const currentQuestName = ALL_STEPS[currentIdx]?.questName

  // Find the bounds of the current quest
  let questStart = currentIdx
  let questEnd = currentIdx
  if (currentQuestName) {
    while (questStart > 0 && ALL_STEPS[questStart - 1]?.questName === currentQuestName) questStart--
    while (questEnd < ALL_STEPS.length - 1 && ALL_STEPS[questEnd + 1]?.questName === currentQuestName) questEnd++
  }

  const start = questStart
  const end = Math.min(ALL_STEPS.length, questEnd + CONTEXT_AFTER + 1)

  return ALL_STEPS.slice(start, end).map((step, i) => ({
    step,
    absoluteIndex: start + i,
    isCurrent: start + i === currentIdx,
    isCompleted: completedIds.has(step.id),
  }))
}

export function getNextReward(currentIdx: number) {
  for (let i = currentIdx + 1; i < Math.min(ALL_STEPS.length, currentIdx + 25); i++) {
    const s = ALL_STEPS[i]
    if (s.reward && (s.reward.type === 'skill_point' || s.reward.type === 'ascendancy_point')) {
      return { step: s, stepsAway: i - currentIdx }
    }
  }
  return null
}

export function getCurrentActName(currentIdx: number) {
  const step = ALL_STEPS[currentIdx]
  if (!step) return ''
  const act = ACTS.find(a => a.id === step.actId)
  return act?.name ?? ''
}

export { ALL_STEPS, ACTS, ZONE_STEP_MAP, ZONE_MAP }
export { QUEST_ORDER, QUEST_FIRST_STEP }
export { getZoneInfo } from '@data/index'
export type { ZoneInfo } from '@data/index'
