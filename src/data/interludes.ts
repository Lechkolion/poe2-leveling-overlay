import type { GuideStep, ZoneEntry } from './types'

// POE2 Interludes 1, 2, and 3
// These replace the "Cruel/Merciless difficulty" from POE1
// All 3 must be completed to get the final +2 SP from the Hooded One (Kingsmarch)

// ═══════════════════════════════════════════════════════════════
// INTERLUDE 1 — Curse of Holten (Recruit the Ezomytes)
// ═══════════════════════════════════════════════════════════════

export const INTERLUDE1_ZONES: ZoneEntry[] = [
  { logName: 'Scorched Farmlands',    actId: 5 },
  { logName: 'Stones of Serle',       actId: 5 },
  { logName: 'The Blackwood',         actId: 5 },
  { logName: 'Holten',                actId: 5, isHub: true, hasWaypoint: true },
  { logName: 'Wolvenhold',            actId: 5 },  // optional side — Oswin +2 SP
  { logName: 'Holten Estate',         actId: 5 },
]

export const INTERLUDE1_STEPS: GuideStep[] = [
  {
    id: 'il1-01',
    zone: 'Scorched Farmlands',
    actId: 5,
    type: 'move',
    instruction: 'Interlude 1: Curse of Holten. Move through Scorched Farmlands → Stones of Serle.',
    questName: 'Recruit the Ezomytes',
    questType: 'main',
    isQuestStart: true,
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Stones of Serle entrance is northeast',
      exitHint: 'Stone circles visible on the hill',
      tips: ['Same region as Act 1 but corrupted — familiar layout but harder enemies']
    }
  },
  {
    id: 'il1-02',
    zone: 'The Blackwood',
    actId: 5,
    type: 'kill',
    instruction: 'Pass through Stones of Serle into The Blackwood. Navigate to the deepest part and kill Siora, Blade of the Mists.',
    questName: 'Recruit the Ezomytes',
    questType: 'main',
    miniMap: {
      layoutType: 'maze',
      objectiveHint: 'Siora is in the deepest part of the Blackwood',
      exitHint: 'Twisted black tree marks Siora\'s location',
      tips: ['Mist zone again — same mechanics as King in the Mists from Act 1', 'Keep DoT flask ready']
    }
  },
  {
    id: 'il1-03',
    zone: 'Holten',
    actId: 5,
    type: 'waypoint',
    instruction: 'Reach Holten town — activate Waypoint.',
    isQuestComplete: false
  },
  {
    id: 'il1-04',
    zone: 'Holten',
    actId: 5,
    type: 'talk',
    instruction: 'Talk to Isolde and Heldra. Continue main quest progression.',
    questName: 'Recruit the Ezomytes',
    questType: 'main'
  },
  {
    id: 'il1-05',
    zone: 'Wolvenhold',
    actId: 5,
    type: 'kill',
    instruction: 'Take side exit from Holten → enter Wolvenhold. MUST DO: Kill Oswin, the Dread Warden (+2 Passive Skill Points). Then portal back to Holten and continue to Holten Estate.',
    questName: 'Oswin, the Dread Warden',
    questType: 'side',
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points' },
    speedrunNote: 'MUST DO — +2 SP. Wolvenhold is a side area off Holten.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Oswin is in the warden\'s hall at the back',
      exitHint: 'After kill: return to Holten',
      tips: ['Warden boss — heavy armor, slow but hits hard', 'Keep distance and dodge the stagger attack']
    }
  },
  {
    id: 'il1-06',
    zone: 'Holten Estate',
    actId: 5,
    type: 'kill',
    instruction: 'Find the exit from Holten to Holten Estate. Kill Lady Elswyth and Thane Wulfric in the manor great hall (Interlude 1 finale — dual boss).',
    questName: 'Recruit the Ezomytes',
    questType: 'main',
    isQuestComplete: true,
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Boss fight in the manor\'s great hall',
      exitHint: 'Portal to Interlude 2 after kill',
      tips: ['Dual boss — fight them one at a time if possible', 'Elswyth: caster — interrupt spells', 'Wulfric: melee — dodge charges']
    }
  },
  {
    id: 'il1-07',
    zone: 'Holten Estate',
    actId: 5,
    type: 'portal',
    instruction: 'Interlude 1 Complete! Enter portal to Interlude 2.',
    questName: 'Recruit the Ezomytes',
    questType: 'main'
  }
]

// ═══════════════════════════════════════════════════════════════
// INTERLUDE 2 — The Stolen Barya (Recruit the Maraketh)
// ═══════════════════════════════════════════════════════════════

export const INTERLUDE2_ZONES: ZoneEntry[] = [
  { logName: 'The Khari Crossing',    actId: 6 },
  { logName: 'Pools of Khatal',       actId: 6 },
  { logName: 'Sel Khari Sanctuary',   actId: 6 },
  { logName: 'The Galai Gates',       actId: 6 },
  { logName: 'Qimah',                 actId: 6, isHub: true, hasWaypoint: true },
  { logName: 'Qimah Reservoir',       actId: 6 },
]

export const INTERLUDE2_STEPS: GuideStep[] = [
  {
    id: 'il2-01',
    zone: 'The Khari Crossing',
    actId: 6,
    type: 'kill',
    instruction: 'MUST DO: Kill Akthi and Anundr (boss duo in Khari Crossing) → +2 Passive Skill Points.',
    questName: 'Clearing the Way',
    questType: 'side',
    isQuestStart: true,
    isQuestComplete: true,
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points' },
    speedrunNote: 'MUST DO — +2 SP. These bosses are very early in Interlude 2.',
    miniMap: {
      layoutType: 'linear',
      objectiveHint: 'Akthi and Anundr are blocking the main crossing bridge',
      exitHint: 'After kill: crossing is clear',
      tips: ['Dual boss — they have combined attacks', 'Akthi: fire. Anundr: ice. Split them apart.']
    }
  },
  {
    id: 'il2-02',
    zone: 'The Khari Crossing',
    actId: 6,
    type: 'interact',
    instruction: 'MUST DO: Find the Molten One\'s Gift altar in Khari Crossing — usually near the CENTRAL crossing structure (lava-warmed stone altar with golden markings). Interact for +5% Maximum Life.',
    questName: "Molten One's Gift",
    questType: 'side',
    reward: { type: 'stat_bonus', description: '+5% Maximum Life (permanent)' },
    speedrunNote: 'DO IT — permanent Max Life. Altar is in the Khari Crossing area.',
    miniMap: {
      layoutType: 'linear',
      objectiveHint: 'Altar is near the central crossing structure',
      exitHint: 'Lava-warmed stone altar with golden markings',
      tips: ['Just interact — no fight required']
    }
  },
  {
    id: 'il2-03',
    zone: 'The Khari Crossing',
    actId: 6,
    type: 'move',
    instruction: 'Interlude 2: Stolen Barya. Navigate Khari Crossing → Pools of Khatal → Sel Khari Sanctuary.',
    questName: 'Recruit the Maraketh',
    questType: 'main',
    isQuestStart: true
  },
  {
    id: 'il2-04',
    zone: 'Sel Khari Sanctuary',
    actId: 6,
    type: 'kill',
    instruction: 'Kill Elzarah, the Cobra Lord in Sel Khari Sanctuary.',
    questName: 'Recruit the Maraketh',
    questType: 'main',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Elzarah is in the inner sanctum',
      exitHint: 'Cobra shrine marks the inner sanctum entrance',
      tips: ['Poison-heavy boss — chaos/poison resistance essential here']
    }
  },
  {
    id: 'il2-05',
    zone: 'The Galai Gates',
    actId: 6,
    type: 'kill',
    instruction: 'Find exit from Sel Khari Sanctuary → enter The Galai Gates. Kill Vornas, the Fell Flame blocking the gate.',
    questName: 'Recruit the Maraketh',
    questType: 'main',
    miniMap: {
      layoutType: 'linear',
      objectiveHint: 'Vornas blocks the main gate',
      exitHint: 'After kill: gates open',
      tips: ['Fire-type boss — fire resistance important', 'Wide flame AoE — walk through the gaps']
    }
  },
  {
    id: 'il2-06',
    zone: 'Qimah',
    actId: 6,
    type: 'waypoint',
    instruction: 'Reach Qimah — activate Waypoint.',
  },
  {
    id: 'il2-07',
    zone: 'Qimah',
    actId: 6,
    type: 'interact',
    instruction: 'MUST DO: Find the Seven Pillars in Qimah — circle of 7 stone pillars in the CENTER of the town area. Interact and choose your boon (permanent).',
    questName: 'Seven Pillars of Qimah',
    questType: 'side',
    reward: { type: 'stat_bonus', description: 'Choose 1 of 7 Boons: attributes, resistances, cooldown recovery, etc.' },
    speedrunNote: 'DO IT — permanent boon. Pillars are in the Qimah town area.',
    detail: 'The Seven Pillars offer various permanent bonuses. Common strong choices: +Attributes, +Resistance, or Cooldown Recovery Rate.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Seven stone pillars arranged in a circle in the center of Qimah',
      exitHint: 'Each pillar has a different glowing symbol',
      tips: ['Read each pillar description carefully', 'Can only choose once']
    }
  },
  {
    id: 'il2-08',
    zone: 'Qimah',
    actId: 6,
    type: 'talk',
    instruction: 'Talk to Azmadi, the Faridun Prince — continue Recruit the Maraketh quest.',
    questName: 'Recruit the Maraketh',
    questType: 'main'
  },
  {
    id: 'il2-09',
    zone: 'Qimah Reservoir',
    actId: 6,
    type: 'kill',
    instruction: 'Exit Qimah south/east to Qimah Reservoir. Clear the zone — kill final boss to complete Interlude 2.',
    questName: 'Recruit the Maraketh',
    questType: 'main',
    isQuestComplete: true,
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Boss in the reservoir itself — large water arena',
      exitHint: 'Portal to Interlude 3 after kill',
      tips: ['Water-adjacent boss — cold or lightning damage likely']
    }
  },
  {
    id: 'il2-10',
    zone: 'Qimah Reservoir',
    actId: 6,
    type: 'portal',
    instruction: 'Interlude 2 Complete! Enter portal to Interlude 3.',
    questName: 'Recruit the Maraketh',
    questType: 'main'
  }
]

// ═══════════════════════════════════════════════════════════════
// INTERLUDE 3 — Doryani's Contingency (Recruit the Vaal)
// ═══════════════════════════════════════════════════════════════

export const INTERLUDE3_ZONES: ZoneEntry[] = [
  { logName: 'Ashen Forest',          actId: 7 },
  { logName: 'Kriar Village',         actId: 7 },
  { logName: 'Kriar Peaks',           actId: 7 },
  { logName: 'Vaal Catacombs',        actId: 7 },
  { logName: 'Sanctified Archives',   actId: 7 },
  { logName: 'Vault of the Faded',    actId: 7 },
  { logName: 'The Ossuary',           actId: 7 },
  { logName: 'Sealed Caverns',        actId: 7 },
  { logName: 'Howling Caves',         actId: 7 },  // optional — Yeti +2 SP
  { logName: 'The Glade',             actId: 7, isHub: true, hasWaypoint: true },
]

export const INTERLUDE3_STEPS: GuideStep[] = [
  {
    id: 'il3-01',
    zone: 'Ashen Forest',
    actId: 7,
    type: 'move',
    instruction: 'Interlude 3: Doryani\'s Contingency. Navigate Ashen Forest → Kriar Village.',
    questName: "Recruit the Vaal",
    questType: 'main',
    isQuestStart: true,
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Kriar Village is northeast of the forest',
      exitHint: 'Vaal architecture visible above tree line',
      tips: ['Revisiting Vaal territory — harder version of Act 3 enemies']
    }
  },
  {
    id: 'il3-02',
    zone: 'Kriar Village',
    actId: 7,
    type: 'kill',
    instruction: 'MUST DO: Kill Lythara, the Wayward Spear in Kriar Village (+40 Maximum Spirit).',
    questName: 'Lythara, the Wayward Spear',
    questType: 'side',
    reward: { type: 'stat_bonus', description: '+40 Maximum Spirit (permanent)' },
    speedrunNote: 'DO IT — +40 Spirit is massive.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Lythara patrols the village center',
      exitHint: 'After kill: continue through village',
      tips: ['Spear-throwing ranged boss — keep mobile', 'Dodge the spinning spear AoE']
    }
  },
  {
    id: 'il3-03',
    zone: 'Kriar Peaks',
    actId: 7,
    type: 'interact',
    instruction: 'Continue from Kriar Village → enter Kriar Peaks. MUST DO: Find Elder Madox (near a stone altar) — choose a Unique Item reward.',
    questName: 'Elder Madox',
    questType: 'side',
    reward: { type: 'stat_bonus', description: 'Choose 1 Unique Item (various — pick one relevant to your build)' },
    speedrunNote: 'DO IT — free unique item. Elder Madox is a friendly NPC, just talk to him.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Elder Madox stands near a stone altar in the Kriar Peaks',
      exitHint: 'After choice: continue through Peaks',
      tips: ['Read each unique item option carefully', 'Choose the one that benefits your build most']
    }
  },
  {
    id: 'il3-04',
    zone: 'Vaal Catacombs',
    actId: 7,
    type: 'move',
    instruction: 'Navigate Vaal Catacombs → Sanctified Archives → continue main quest.',
    questName: 'Recruit the Vaal',
    questType: 'main',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Sanctified Archives is reached through the catacombs',
      exitHint: 'Follow the main catacombs path',
      tips: ['Undead Vaal enemies — cold damage is effective']
    }
  },
  {
    id: 'il3-05',
    zone: 'Sanctified Archives',
    actId: 7,
    type: 'kill',
    instruction: 'Kill Architect of Dominion in Sanctified Archives (main quest).',
    questName: 'Recruit the Vaal',
    questType: 'main',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Boss at the end of the main archive hall',
      exitHint: 'Large lectern in the central hall marks boss location',
      tips: []
    }
  },
  {
    id: 'il3-06',
    zone: 'Howling Caves',
    actId: 7,
    type: 'kill',
    instruction: 'Take side exit (off Sealed Caverns) → enter Howling Caves. MUST DO: Kill The Abominable Yeti in the deepest chamber (+2 Passive Skill Points). Return to main path.',
    questName: 'The Abominable Yeti',
    questType: 'side',
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points' },
    speedrunNote: 'MUST DO — +2 SP. Howling Caves is optional side area off Sealed Caverns.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Yeti is in the deepest chamber',
      exitHint: 'After kill: exit back to main path',
      tips: ['Cold zone — fire resistance more important here', 'Yeti: ice slam + blizzard AoE — stay near him, not at range']
    }
  },
  {
    id: 'il3-07',
    zone: 'Sealed Caverns',
    actId: 7,
    type: 'kill',
    instruction: 'Continue from Sanctified Archives → Sealed Caverns. Kill Stormgore the Guardian + Rakkar the Frozen Talon in the sealed chamber (Interlude 3 finale — two sequential bosses).',
    questName: 'Recruit the Vaal',
    questType: 'main',
    isQuestComplete: true,
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Final bosses in the sealed chamber at the back',
      exitHint: 'After kill: portal to Kingsmarch appears',
      tips: ['Two sequential bosses — manage flasks for both', 'Stormgore: lightning. Rakkar: cold.']
    }
  },
  {
    id: 'il3-08',
    zone: 'Sealed Caverns',
    actId: 7,
    type: 'portal',
    instruction: 'Interlude 3 Complete! Enter portal — returns to Kingsmarch for final reward.',
    questName: 'Recruit the Vaal',
    questType: 'main'
  },

  // ─── FINAL: HOODED ONE (Kingsmarch — post all 3 interludes) ─────────────
  {
    id: 'final-01',
    zone: 'Kingsmarch',
    actId: 7,
    type: 'talk',
    instruction: 'FINAL REWARD: Talk to the Hooded One in Kingsmarch → +2 Passive Skill Points (campaign-completion reward).',
    questName: 'The Hooded One',
    questType: 'main',
    isQuestComplete: true,
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points (all 3 interludes complete)' },
    speedrunNote: 'The LAST skill point reward! Talk to Hooded One immediately after returning.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Hooded One is in Kingsmarch near the main docks',
      exitHint: 'After this: Campaign DONE. Start Endgame (Maps).',
      tips: []
    }
  },
  {
    id: 'final-02',
    zone: 'Kingsmarch',
    actId: 7,
    type: 'note',
    instruction: '🏁 CAMPAIGN COMPLETE! Total earned: 26 Passive Skill Points + 4 Ascendancy Points. Enter Atlas / Maps to begin endgame.',
    questType: 'main',
    speedrunNote: 'Check the campaign rewards summary for anything you might have missed before diving into Maps.'
  }
]

// INTERLUDE PERMANENT REWARDS SUMMARY:
// IL1: ✦ Oswin, Dread Warden (Wolvenhold) → +2 Passive Skill Points
// IL2: ✦ Akthi + Anundr (Khari Crossing) → +2 Passive Skill Points
//      ✦ Molten One's Gift → +5% Maximum Life
//      ✦ Seven Pillars (Qimah) → 1 Boon choice
// IL3: ✦ Lythara (Kriar Village) → +40 Maximum Spirit
//      ✦ Elder Madox (Kriar Peaks) → 1 Unique Item
//      ✦ Abominable Yeti (Howling Caves) → +2 Passive Skill Points
//      ✦ Hooded One (Kingsmarch, post-all-IL) → +2 Passive Skill Points
