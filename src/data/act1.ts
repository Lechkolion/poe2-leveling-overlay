import type { GuideStep, ZoneEntry } from './types'

// POE2 Act 1 — The Corrupted Lands
// Hub: Clearfell Encampment (NPCs: Renly, Una, Finn)
// Act Boss: Count Geonor (Ogham Manor Floor 3)
// Zone log names verified from [SCENE] Set Source [...] format

export const ACT1_ZONES: ZoneEntry[] = [
  { logName: 'The Riverbank',              actId: 1 },
  { logName: 'Clearfell',                  actId: 1 },
  { logName: 'Clearfell Encampment',       actId: 1, isHub: true, hasWaypoint: true },
  { logName: 'The Mud Burrow',             actId: 1 },
  { logName: 'The Grelwood',               actId: 1 },
  { logName: 'The Red Vale',               actId: 1, hasWaypoint: true },
  { logName: 'The Grim Tangle',            actId: 1, hasWaypoint: true },
  { logName: 'Cemetery of the Eternals',   actId: 1 },
  { logName: 'Tomb of the Consort',        actId: 1 },
  { logName: 'The Mausoleum of the Praetor', actId: 1 },
  { logName: 'The Hunting Grounds',        actId: 1 },
  { logName: 'Freythorn',                  actId: 1 },
  { logName: 'Ogham Farmlands',            actId: 1 },
  { logName: 'Ogham Village',              actId: 1, isHub: true, hasWaypoint: true },
  { logName: 'The Manor Ramparts',         actId: 1 },
  { logName: 'Ogham Manor',                actId: 1, hasWaypoint: true },
]

export const ACT1_STEPS: GuideStep[] = [

  // ─── THE RIVERBANK ──────────────────────────────────────────────────────
  {
    id: 'a1-01',
    zone: 'The Riverbank',
    actId: 1,
    type: 'move',
    instruction: 'Survive the execution and escape. Head forward through the Riverbank.',
    questName: 'Mercy for the Miller',
    questType: 'main',
    isQuestStart: true,
    miniMap: {
      layoutType: 'linear',
      objectiveHint: 'Single path — no branching at all',
      exitHint: 'Follow the river bank northward to reach Clearfell',
      tips: ['Kill enemies in your path only', 'Renly is just ahead — talk to him']
    }
  },
  {
    id: 'a1-02',
    zone: 'The Riverbank',
    actId: 1,
    type: 'kill',
    instruction: 'Defeat the Bloated Miller (miniboss blocking path).',
    questName: 'Mercy for the Miller',
    questType: 'main',
    detail: 'Slow, AoE slam. Walk away from the slam animation.',
    speedrunNote: 'Required — cannot skip. Takes 10-20 seconds.'
  },
  {
    id: 'a1-03',
    zone: 'The Riverbank',
    actId: 1,
    type: 'talk',
    instruction: 'Speak to Renly after the Bloated Miller dies.',
    questName: 'Mercy for the Miller',
    questType: 'main',
    isQuestComplete: true,
    reward: { type: 'stat_bonus', description: 'Uncut Skill Gem (use to level a skill)' }
  },

  // ─── CLEARFELL ──────────────────────────────────────────────────────────
  {
    id: 'a1-04',
    zone: 'Clearfell',
    actId: 1,
    type: 'move',
    instruction: 'Head north through Clearfell to the Encampment. Kill Beira of the Rotten Pack (wolf boss, south/west) for +10% Cold Resist on the way.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Encampment is in the north half — wooden walls with firelight',
      exitHint: 'Look for the lit camp fence to the north',
      tips: ['Beira roams the south/west — hunt her before heading north', 'Skip other combat']
    }
  },
  {
    id: 'a1-05',
    zone: 'Clearfell',
    actId: 1,
    type: 'kill',
    instruction: 'MUST DO: Kill Beira of the Rotten Pack in Clearfell. Drops Head of the Winter Wolf → consume for +10% Cold Resistance (PERMANENT, repeatable on Cruel for +20% total).',
    questType: 'side',
    optional: false,
    detail: 'Wolf pack boss. Roams Clearfell — follow wolf packs / check the south/western half. Drops "Head of the Winter Wolf" — CONSUME from inventory for the permanent +10% Cold Res buff. Repeatable on Cruel Act 1 for +20% total.',
    reward: { type: 'stat_bonus', description: 'Head of the Winter Wolf → +10% Cold Resistance per consume. Normal + Cruel = +20% total' },
    speedrunNote: 'DO IT — permanent resistance. Don\'t forget to CONSUME the Head of the Winter Wolf from inventory. Hit again in Cruel for double.'
  },

  // ─── CLEARFELL ENCAMPMENT ────────────────────────────────────────────────
  {
    id: 'a1-06',
    zone: 'Clearfell Encampment',
    actId: 1,
    type: 'waypoint',
    instruction: 'Activate the Waypoint.',
  },
  {
    id: 'a1-07',
    zone: 'Clearfell Encampment',
    actId: 1,
    type: 'talk',
    instruction: 'Talk to Renly — accept "Secrets in the Dark". Talk to Finn and Una for additional quests.',
    questName: 'Secrets in the Dark',
    questType: 'main',
    isQuestStart: true,
    detail: 'Renly sends you to gather 3 Runes of Power. Finn may have gem-related quests. Una has inventory/trade.'
  },
  {
    id: 'a1-08',
    zone: 'Clearfell Encampment',
    actId: 1,
    type: 'portal',
    instruction: 'Exit Clearfell Encampment east into The Grelwood.'
  },

  // ─── THE MUD BURROW (optional side zone off Clearfell) ───────────────────
  {
    id: 'a1-09',
    zone: 'The Mud Burrow',
    actId: 1,
    type: 'move',
    instruction: 'SKIP: Mud Burrow (side zone off Clearfell) — Treacherous Ground quest grants only an Uncut Support Gem. Not worth the detour.',
    questName: 'Treacherous Ground',
    questType: 'side',
    optional: true,
    speedrunNote: 'Skip — gem reward only, not a skill point'
  },

  // ─── THE GRELWOOD ────────────────────────────────────────────────────────
  {
    id: 'a1-10',
    zone: 'The Grelwood',
    actId: 1,
    type: 'talk',
    instruction: 'Find exits to Grim Tangle AND Red Vale — grab both waypoints (enter zone, activate, portal back). Then speak to Una at Tree of Souls.',
    questName: 'Secrets in the Dark',
    questType: 'main',
    detail: 'Efficiency tip: Enter Grim Tangle exit, grab its waypoint, portal to town, come back to Grelwood. Do the same for Red Vale exit. Then find the Tree of Souls and speak to Una — she sends you to collect 3 Runes of Power.',
    miniMap: {
      layoutType: 'branching',
      objectiveHint: 'Tree of Souls is in the northeast. Exits to Grim Tangle and Red Vale also in Grelwood.',
      exitHint: 'After speaking to Una: use Red Vale waypoint to get there instantly',
      tips: [
        'Grab Grim Tangle waypoint first (enter, tp out, come back)',
        'Grab Red Vale waypoint (enter, tp out, come back)',
        'Then find Tree of Souls and talk to Una',
        'Brambleghast optional — skip (gem reward only)',
        'Witch Hut Cauldron: optional encounter gives free flask (grab if you pass it)'
      ]
    }
  },

  // ─── THE RED VALE ────────────────────────────────────────────────────────
  {
    id: 'a1-12',
    zone: 'The Red Vale',
    actId: 1,
    type: 'interact',
    instruction: 'Find and activate all 3 Obelisks of Rust — fight enemy waves at each, collect Rune of Power (1/3 and 2/3).',
    questName: 'Secrets in the Dark',
    questType: 'main',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Obelisks 1 and 2 are in the lower-east area. Follow the zone path northeast.',
      exitHint: 'After 3rd obelisk: Rust King spawns in the northwest',
      tips: ['Each obelisk: interact → fight waves → collect rune', 'Rust King spawns only at the 3rd obelisk']
    }
  },
  {
    id: 'a1-13',
    zone: 'The Red Vale',
    actId: 1,
    type: 'kill',
    instruction: 'Activate 3rd Obelisk → The Rust King spawns → kill him → collect Rune of Power (3/3).',
    questName: 'Secrets in the Dark',
    questType: 'main',
    detail: 'The Rust King is a rusted armored construct. Dodge his AoE slam. Pick up the final Rune of Power from his corpse.'
  },
  {
    id: 'a1-13b',
    zone: 'Clearfell Encampment',
    actId: 1,
    type: 'talk',
    instruction: 'Return to Clearfell Encampment — give 3 Runes to Renly. He forges them into Runed Spikes.',
    questName: 'Secrets in the Dark',
    questType: 'main',
    speedrunNote: 'Use portal or waypoint. Quick talk with Renly — takes 15 seconds.'
  },
  {
    id: 'a1-13c',
    zone: 'The Grelwood',
    actId: 1,
    type: 'interact',
    instruction: 'Return to Tree of Souls in Grelwood — place all 3 Runed Spikes on the Rune Seals. Completes Secrets in the Dark.',
    questName: 'Secrets in the Dark',
    questType: 'main',
    isQuestComplete: true,
    detail: 'The Hooded One drops down after the spikes are placed. Speak with Una — The Mysterious Shade progresses.',
    speedrunNote: 'Quick interact × 3 on the seals, then talk to Una. No fight here.'
  },

  // ─── THE GRIM TANGLE ────────────────────────────────────────────────────
  {
    id: 'a1-14',
    zone: 'The Grim Tangle',
    actId: 1,
    type: 'move',
    instruction: 'Navigate The Grim Tangle toward Cemetery of the Eternals (The Mysterious Shade continues).',
    questName: 'The Mysterious Shade',
    questType: 'main',
    detail: 'The Ervig/Rotten Druid optional boss is here — skip (gem reward only).',
    miniMap: {
      layoutType: 'maze',
      objectiveHint: 'Cemetery entrance is in the northeast corner',
      exitHint: 'Look for stone archways with grave carvings',
      tips: ['Most maze-like zone in Act 1', 'Follow northeast consistently', 'Avoid large packs']
    }
  },

  // ─── CEMETERY OF THE ETERNALS ────────────────────────────────────────────
  {
    id: 'a1-16',
    zone: 'Cemetery of the Eternals',
    actId: 1,
    type: 'move',
    instruction: 'Enter Cemetery of the Eternals — proceed to Tomb of the Consort.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Tomb entrance is in the center-north',
      exitHint: 'Large ornate mausoleum building in the center',
      tips: ['Undead heavy — move around packs', 'Lachlann boss fight is here LATER — skip for now']
    }
  },

  // ─── TOMB OF THE CONSORT ─────────────────────────────────────────────────
  {
    id: 'a1-17',
    zone: 'Tomb of the Consort',
    actId: 1,
    type: 'kill',
    instruction: 'Kill Asinia, Praetor Consort (required main quest boss).',
    questName: 'Sorrow Among Stones',
    questType: 'main',
    isQuestStart: true,
    detail: 'Asinia is a spectral/undead boss. Watch for her teleport attacks and spirit orbs.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Boss is at the end of the tomb (deepest room)',
      exitHint: 'Linear dungeon — follow the crypt passages',
      tips: ['After kill: go to Mausoleum of the Praetor next']
    }
  },

  // ─── MAUSOLEUM OF THE PRAETOR ────────────────────────────────────────────
  {
    id: 'a1-17b',
    zone: 'Cemetery of the Eternals',
    actId: 1,
    type: 'move',
    instruction: 'Exit Tomb back to Cemetery → find Mausoleum of the Praetor (the other large building).',
    questName: 'Sorrow Among Stones',
    questType: 'main',
    detail: 'Both Tomb and Mausoleum entrances are in the Cemetery, usually on opposite sides. Look for the second ornate stone structure.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Mausoleum of the Praetor is the second large building in the Cemetery',
      exitHint: 'Stone archway with ornate carvings — opposite side from Tomb',
      tips: ['If you used the Tomb checkpoint to teleport, you\'re back at Cemetery entrance — re-scan']
    }
  },
  {
    id: 'a1-18',
    zone: 'The Mausoleum of the Praetor',
    actId: 1,
    type: 'kill',
    instruction: 'Kill Draven, the Eternal Praetor (required main quest boss). Obtain Count Lachlann\'s Ring.',
    questName: 'Sorrow Among Stones',
    questType: 'main',
    detail: 'Draven is a heavily armored specter. After he dies, pick up Count Lachlann\'s Ring from the room.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Boss at the end of the mausoleum',
      exitHint: 'After kill: use checkpoint to teleport back to Cemetery entrance — faster than walking back',
      tips: ['Phase 2: shield breaks at 50% — burst him down', 'Pick up the ring before leaving', 'Use checkpoint after kill to return to Cemetery entrance quickly']
    }
  },
  {
    id: 'a1-19',
    zone: 'The Mausoleum of the Praetor',
    actId: 1,
    type: 'pickup',
    instruction: 'Pick up Count Lachlann\'s Ring from the altar in the boss room.',
    questName: 'Sorrow Among Stones',
    questType: 'main',
    reward: { type: 'stat_bonus', description: 'Uncut Support Gem (quest reward on turn-in)' }
  },
  {
    id: 'a1-19b',
    zone: 'The Mausoleum of the Praetor',
    actId: 1,
    type: 'portal',
    instruction: 'Use the Mausoleum checkpoint to teleport back to Cemetery entrance (faster than walking).',
    questName: 'Sorrow Among Stones',
    questType: 'main',
    speedrunNote: 'Saves 30+ seconds vs walking back through the dungeon.'
  },
  {
    id: 'a1-20',
    zone: 'Cemetery of the Eternals',
    actId: 1,
    type: 'kill',
    instruction: 'Return to Cemetery — kill Lachlann of Endless Lament (spawns after ring is obtained).',
    questName: 'Sorrow Among Stones',
    questType: 'main',
    isQuestComplete: true,
    detail: 'Lachlann spawns in the Cemetery after you have his ring. Fight him — he has corruption-based attacks.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Lachlann spawns in the center of the Cemetery',
      exitHint: 'After kill: portal back to Encampment, turn in quest',
      tips: ['Bring flasks — tough fight mid-Act 1']
    }
  },
  {
    id: 'a1-20b',
    zone: 'Cemetery of the Eternals',
    actId: 1,
    type: 'portal',
    instruction: 'Portal back to Clearfell Encampment (or use Cemetery checkpoint + waypoint).',
    questName: 'Sorrow Among Stones',
    questType: 'main'
  },
  {
    id: 'a1-21',
    zone: 'Clearfell Encampment',
    actId: 1,
    type: 'talk',
    instruction: 'Return to Encampment — turn in Sorrow Among Stones to Renly.',
    questName: 'Sorrow Among Stones',
    questType: 'main',
    isQuestComplete: true,
    speedrunNote: 'Use waypoint — portal back, turn in, pick up new quest'
  },

  // ─── NAVIGATE TO HUNTING GROUNDS ────────────────────────────────────────
  {
    id: 'a1-21b',
    zone: 'The Grim Tangle',
    actId: 1,
    type: 'move',
    instruction: 'Use Grim Tangle waypoint — navigate east through Cemetery of the Eternals to find the exit northeast into The Hunting Grounds.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Hunting Grounds exit is northeast of Cemetery',
      exitHint: 'Path leads north/northeast out of the graveyard into the Hunting Grounds',
      tips: ['Waypoint to Grim Tangle, walk east through Cemetery, exit northeast']
    }
  },

  // ─── THE HUNTING GROUNDS ────────────────────────────────────────────────
  {
    id: 'a1-22',
    zone: 'The Hunting Grounds',
    actId: 1,
    type: 'kill',
    instruction: 'MANDATORY SKILL POINTS: Kill The Crowbell (+2 Passive Skill Points).',
    questType: 'side',
    detail: 'The Crowbell roams the Hunting Grounds. Large bird creature — watch for dive bomb attack.',
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points (Book of Specialisation)' },
    speedrunNote: 'MUST DO — +2 passive points. Do NOT skip.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Crowbell patrols the northern half',
      exitHint: 'After kill: continue east to Freythorn',
      tips: ['Loud screech = incoming dive bomb — dodge sideways', 'He dies fast — burst damage works well']
    }
  },

  // ─── FREYTHORN ──────────────────────────────────────────────────────────
  {
    id: 'a1-25',
    zone: 'Freythorn',
    actId: 1,
    type: 'kill',
    instruction: 'MUST DO: Ominous Altars — complete 3 Ritual Altars, then return to the 4th (was sealed by black clouds) — King in the Mists spawns there. Drops Gembloom Skull → consume for +30 Spirit.',
    questName: 'Ominous Altars',
    questType: 'side',
    detail: 'Activate the 3 main Ritual Altars (each spawns enemy waves). The 4th altar (large circular area at the far end) unseals after the 3 are done — King in the Mists appears there. Drops Gembloom Skull (consume = +30 Max Spirit) + Uncut Spirit Gem (lvl 4).',
    reward: { type: 'stat_bonus', description: 'Gembloom Skull → +30 Maximum Spirit (NORMAL only; known issue on Cruel Act 1) + Uncut Spirit Gem lvl 4' },
    speedrunNote: 'DO IT — +30 Spirit. Cruel re-run is known-buggy and may not award again.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Find all 4 ritual altars — King spawns only after the 4th ritual',
      exitHint: 'After kill: exit east to Ogham Farmlands',
      tips: ['Mist deals DoT — fight near the altar edges', 'King spawns immediately after 4th ritual — be ready']
    }
  },
  {
    id: 'a1-26',
    zone: 'Freythorn',
    actId: 1,
    type: 'move',
    instruction: 'Find exit to Ogham Farmlands — eastern/southeastern edge of Freythorn where mist gives way to open fields.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Exit is on the eastern/southeastern edge',
      exitHint: 'Where the mist clears to cultivated fields and farmhouses',
      tips: []
    }
  },

  // ─── OGHAM FARMLANDS ────────────────────────────────────────────────────
  {
    id: 'a1-27',
    zone: 'Ogham Farmlands',
    actId: 1,
    type: 'pickup',
    instruction: 'MANDATORY SKILL POINTS: Find Una\'s Lute quest item in Ogham Farmlands.',
    questName: 'The Lost Lute',
    questType: 'side',
    isQuestStart: true,
    detail: 'Look for a glowing lute on the ground in the farmlands area. Turn in to Una at Clearfell Encampment for +2 SP.',
    speedrunNote: 'MUST DO — +2 passive points on turn-in. The lute is a small glowing item.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Lute is usually near abandoned farmhouses in center-south',
      exitHint: 'After finding lute: continue to Ogham Village',
      tips: ['Check near hay bales and ruined structures', 'Glowing golden shimmer on ground']
    }
  },
  {
    id: 'a1-28',
    zone: 'Ogham Farmlands',
    actId: 1,
    type: 'move',
    instruction: 'Continue to Ogham Village (north exit of Farmlands).'
  },

  // ─── OGHAM VILLAGE (Hub 2) ──────────────────────────────────────────────
  {
    id: 'a1-28b',
    zone: 'Ogham Village',
    actId: 1,
    type: 'pickup',
    instruction: 'Find Smithing Tools in Ogham Village (first character per league only — unlocks Salvaging Bench).',
    questType: 'side',
    optional: true,
    detail: 'The Smithing Tools item is in the village. Turn them in to Renly in Clearfell Encampment to unlock the Salvaging Bench. Only required once per league.',
    speedrunNote: 'First character only — skip on alts.'
  },
  {
    id: 'a1-28c',
    zone: 'Ogham Village',
    actId: 1,
    type: 'kill',
    instruction: 'Kill The Executioner at the opposite end of Ogham Village (Trail of Corruption main quest).',
    questName: 'The Trail of Corruption',
    questType: 'main',
    isQuestStart: true,
    detail: 'The Executioner is at the far/opposite end of the village from your entry. Heavy melee boss with fear aura.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Hug right wall heading north — Executioner is at the opposite end of the village',
      exitHint: 'After kill: free Leitis (interact with her cage nearby)',
      tips: ['Kill Executioner → free Leitis → she gives you quest item']
    }
  },
  {
    id: 'a1-28d',
    zone: 'Ogham Village',
    actId: 1,
    type: 'interact',
    instruction: 'Free Leitis from her cage after killing The Executioner.',
    questName: 'The Trail of Corruption',
    questType: 'main',
    reward: { type: 'stat_bonus', description: 'Uncut Skill Gem + quest progression' }
  },
  {
    id: 'a1-29',
    zone: 'Ogham Village',
    actId: 1,
    type: 'waypoint',
    instruction: 'Activate Ogham Village Waypoint.',
  },
  {
    id: 'a1-30',
    zone: 'Ogham Village',
    actId: 1,
    type: 'talk',
    instruction: 'Turn in The Lost Lute to Una (teleport to Encampment if needed, or she may be in Village).',
    questName: 'The Lost Lute',
    questType: 'side',
    isQuestComplete: true,
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points (Book of Specialisation)' },
    speedrunNote: 'Una is in Clearfell Encampment — use waypoint, turn in, come back'
  },
  {
    id: 'a1-31',
    zone: 'Ogham Village',
    actId: 1,
    type: 'talk',
    instruction: 'Talk to Leitis (who you freed) and other Ogham Village NPCs — pick up "The Mad Wolf of Ogham".',
    questName: 'The Mad Wolf of Ogham',
    questType: 'main',
    isQuestStart: true,
    detail: 'Main quest: go to Ogham Manor and kill Count Geonor.'
  },
  {
    id: 'a1-32',
    zone: 'Ogham Village',
    actId: 1,
    type: 'portal',
    instruction: 'Exit north to The Manor Ramparts.'
  },

  // ─── THE MANOR RAMPARTS ─────────────────────────────────────────────────
  {
    id: 'a1-33',
    zone: 'The Manor Ramparts',
    actId: 1,
    type: 'move',
    instruction: 'Fight through The Manor Ramparts to reach Ogham Manor.',
    miniMap: {
      layoutType: 'linear',
      objectiveHint: 'Linear path through the outer walls to Manor entrance',
      exitHint: 'Large manor gate at the end of the ramparts',
      tips: ['Heavy enemy presence — dodge around packs', 'No optional content here']
    }
  },

  // ─── OGHAM MANOR ────────────────────────────────────────────────────────
  {
    id: 'a1-34',
    zone: 'Ogham Manor',
    actId: 1,
    type: 'waypoint',
    instruction: 'Activate Ogham Manor Waypoint.',
    speedrunNote: 'Critical — portal back here from Sekhemas trial'
  },
  {
    id: 'a1-35',
    zone: 'Ogham Manor',
    actId: 1,
    type: 'kill',
    instruction: 'MUST DO: Kill Candlemass, the Living Rite at Fallen Altar (Floor 1) — Candlemass\' Essence grants +20 Max Life (Normal) / +8% Max Life (Cruel).',
    questType: 'side',
    detail: 'Optional boss on Floor 1 of Ogham Manor at the Fallen Altar. Candle/fire themed undead priest. Drops Candlemass\' Essence — consume for permanent Max Life buff.',
    reward: { type: 'stat_bonus', description: '+20 Maximum Life (Normal) / +8% Maximum Life (Cruel) — permanent, via Candlemass\' Essence' },
    speedrunNote: 'DO IT — permanent life bonus. Floor 1 of Manor at Fallen Altar, before going deeper.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Candlemass patrols the chapel area of Floor 1',
      exitHint: 'Chapel room has candles and an altar',
      tips: ['Fire AoE patches — stand in the gaps', 'Low HP for a boss — fast kill']
    }
  },
  {
    id: 'a1-37',
    zone: 'Ogham Manor',
    actId: 1,
    type: 'kill',
    instruction: 'Descend through Ogham Manor Floors 2-3 and kill Count Geonor (Act 1 Boss).',
    questName: 'The Mad Wolf of Ogham',
    questType: 'main',
    isQuestComplete: true,
    detail: 'Count Geonor is a werewolf/beast form noble. Phase 1: semi-human, slower. Phase 2 (~70%): transforms into full beast, very fast, high damage. Phase 3 (~30%): berserk mode, arena fills with corrupted ground.',
    reward: { type: 'stat_bonus', description: 'Unlocks Act 2. Possible rare loot.' },
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Boss room on Floor 3 — deepest level of the manor',
      exitHint: 'After kill: portal to Act 2 appears',
      tips: [
        'Phase 2 transform: dodge the leap attack',
        'Phase 3: corrupted ground deals heavy DoT — keep moving',
        'Flasks on Phase 3 — commit all cooldowns',
        'Arena edges are safest during Phase 3'
      ]
    },
    speedrunNote: 'With all Act 1 bonuses (Crowbell +2SP, Lost Lute +2SP, Beira Res, Candlemass Life, King Spirit), you\'re strong. Blast through Phases.'
  },
  {
    id: 'a1-37b',
    zone: 'Clearfell Encampment',
    actId: 1,
    type: 'talk',
    instruction: 'Turn in Smithing Tools to Renly (first character per league — unlocks Salvaging Bench).',
    questType: 'side',
    optional: true,
    speedrunNote: 'First character only — skip on alts. Use waypoint to Encampment.'
  },
  {
    id: 'a1-38',
    zone: 'Ogham Manor',
    actId: 1,
    type: 'portal',
    instruction: 'Act 1 Complete! Enter the portal to Act 2.',
    questName: 'The Mad Wolf of Ogham',
    questType: 'main'
  }
]

// ACT 1 PERMANENT REWARDS SUMMARY:
// ✦ Beira of the Rotten Pack (Clearfell) → +10% Cold Resistance
// ✦ The Crowbell (Hunting Grounds) → +2 Passive Skill Points ← MUST DO
// ✦ King in the Mists (Freythorn) → +30 Maximum Spirit ← MUST DO
// ✦ Candlemass (Ogham Manor F1) → +20 Maximum Life ← MUST DO
// ✦ The Lost Lute side quest (Ogham Farmlands → Una) → +2 Passive Skill Points ← MUST DO
// Total: 4 Passive Skill Points + Resist + Spirit + Life
