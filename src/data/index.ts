import type { GuideStep, ZoneEntry, ActData } from './types'
import { ACT1_STEPS, ACT1_ZONES } from './act1'
import { ACT2_STEPS, ACT2_ZONES } from './act2'
import { ACT3_STEPS, ACT3_ZONES } from './act3'
import { ACT4_STEPS, ACT4_ZONES } from './act4'
import {
  INTERLUDE1_STEPS, INTERLUDE1_ZONES,
  INTERLUDE2_STEPS, INTERLUDE2_ZONES,
  INTERLUDE3_STEPS, INTERLUDE3_ZONES
} from './interludes'
import { LOGNAME_TO_AREAID } from './areaIds'
import { EXILE_AREAS_2, parseLevelRange } from './exileLayouts'

export const ACTS: ActData[] = [
  { id: 1, name: 'Act 1 — The Corrupted Lands', startZone: 'The Riverbank' },
  { id: 2, name: 'Act 2 — The Desert Expanse', startZone: 'Vastiri Outskirts' },
  { id: 3, name: 'Act 3 — The Jungle Depths', startZone: 'Sandswept Marsh' },
  { id: 4, name: 'Act 4 — The Northern Isles', startZone: 'Kingsmarch' },
  { id: 5, name: 'Interlude 1 — Curse of Holten', startZone: 'Scorched Farmlands' },
  { id: 6, name: 'Interlude 2 — The Stolen Barya', startZone: 'The Khari Crossing' },
  { id: 7, name: 'Interlude 3 — Doryani\'s Contingency', startZone: 'Ashen Forest' },
]

// Flat ordered list of ALL campaign steps
export const ALL_STEPS: GuideStep[] = [
  ...ACT1_STEPS,
  ...ACT2_STEPS,
  ...ACT3_STEPS,
  ...ACT4_STEPS,
  ...INTERLUDE1_STEPS,
  ...INTERLUDE2_STEPS,
  ...INTERLUDE3_STEPS,
]

// Map from log zone name → first step index in ALL_STEPS
export const ZONE_STEP_MAP: Map<string, number> = new Map()

ALL_STEPS.forEach((step, index) => {
  if (!ZONE_STEP_MAP.has(step.zone)) {
    ZONE_STEP_MAP.set(step.zone, index)
  }
})

// All zone entries for reference
export const ALL_ZONES: ZoneEntry[] = [
  ...ACT1_ZONES,
  ...ACT2_ZONES,
  ...ACT3_ZONES,
  ...ACT4_ZONES,
  ...INTERLUDE1_ZONES,
  ...INTERLUDE2_ZONES,
  ...INTERLUDE3_ZONES,
]

// Map from log name → zone entry
export const ZONE_MAP: Map<string, ZoneEntry> = new Map(
  ALL_ZONES.map(z => [z.logName, z])
)

// All steps that award skill points or ascendancy (for upcoming reward alerts)
export const REWARD_STEPS = ALL_STEPS.filter(s => s.reward && (
  s.reward.type === 'skill_point' || s.reward.type === 'ascendancy_point'
))

// Zone info — Exile-UI level recommendations (used by ZoneBanner).
export interface ZoneInfo {
  areaId?: string
  normalLevel?: number
  cruelLevel?: number
}

export function getZoneInfo(logName: string | null | undefined): ZoneInfo {
  if (!logName) return {}
  const areaId = LOGNAME_TO_AREAID.get(logName)
  if (!areaId) return {}
  const exile = EXILE_AREAS_2[areaId]
  const { normal, cruel } = parseLevelRange(exile?.levelRange)
  return {
    areaId,
    normalLevel: normal,
    cruelLevel: cruel,
  }
}

// Campaign summary stats — computed from data, not hardcoded
export const CAMPAIGN_TOTALS = {
  skillPoints: REWARD_STEPS
    .filter(s => s.reward?.type === 'skill_point')
    .reduce((acc, s) => acc + (s.reward?.amount ?? 0), 0),
  ascendancyPoints: REWARD_STEPS
    .filter(s => s.reward?.type === 'ascendancy_point')
    .reduce((acc, s) => acc + (s.reward?.amount ?? 0), 0),
  acts: ACTS.length
}
