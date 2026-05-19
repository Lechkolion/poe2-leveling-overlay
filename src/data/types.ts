export type StepType =
  | 'move'       // Navigate to area/location
  | 'kill'       // Kill enemy/boss
  | 'interact'   // Use object/lever/door
  | 'talk'       // Talk to NPC
  | 'pickup'     // Pick up item/quest object
  | 'waypoint'   // Activate waypoint
  | 'trial'      // Enter/complete trial
  | 'portal'     // Use portal / go to next area
  | 'note'       // Informational note

export type RewardType = 'skill_point' | 'ascendancy_point' | 'stat_bonus' | 'respec_point'

export interface Reward {
  type: RewardType
  amount?: number
  description: string
}

export interface MiniMapHint {
  layoutType: 'linear' | 'open' | 'branching' | 'maze' | 'spiral' | 'dungeon'
  objectiveHint: string        // "Boss is always in the NE quadrant"
  exitHint: string             // "Exit: follow the river north"
  tips?: string[]              // Quick tips for speedrunning this zone
}

export interface GuideStep {
  id: string
  zone: string                 // Exact zone name as in [SCENE] Set Source [...]
  actId: number
  type: StepType
  instruction: string          // What to do
  detail?: string              // Extra context (optional, shown expanded)
  reward?: Reward              // If this step grants a reward
  questName?: string           // Quest this step belongs to
  questType?: 'main' | 'side' | 'ascendancy' | 'trial'
  isQuestStart?: boolean
  isQuestComplete?: boolean
  prerequisiteStepIds?: string[] // Steps that must be done before this
  miniMap?: MiniMapHint         // Zone layout hint (shown when entering zone)
  speedrunNote?: string         // Speedrun-specific note
  optional?: boolean            // True = can skip if going for pure speed
}

export interface ZoneEntry {
  logName: string              // Exact string from [SCENE] Set Source [...]
  actId: number
  isHub?: boolean              // Town/hub zone
  hasWaypoint?: boolean
  firstStepIndex?: number      // Index into flat steps array
}

export interface ActData {
  id: number
  name: string
  startZone: string
}
