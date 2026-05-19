import type { GuideStep, ZoneEntry } from './types'

// POE2 Act 2 — The Desert Expanse
// Hubs: Vastiri Outskirts → The Ardura Caravan
// Act Boss: Jamanra the Abomination (Dreadnought Vanguard)
// IMPORTANT: Balbala kill in Traitor's Passage unlocks Trial of the Sekhemas

export const ACT2_ZONES: ZoneEntry[] = [
  { logName: 'Vastiri Outskirts',        actId: 2, isHub: true, hasWaypoint: true },
  { logName: 'Mawdun Quarry',            actId: 2 },
  { logName: 'Mawdun Mine',              actId: 2 },
  { logName: "Traitor's Passage",        actId: 2 },  // REQUIRED for Ascendancy unlock
  { logName: 'The Halani Gates',         actId: 2 },
  { logName: 'Mastodon Badlands',        actId: 2 },
  { logName: 'The Bone Pits',            actId: 2 },
  { logName: 'Keth',                     actId: 2 },  // Optional side area off Bone Pits
  { logName: 'The Lost City',            actId: 2 },
  { logName: 'Buried Shrines',           actId: 2 },
  { logName: 'Heart of Keth',            actId: 2 },
  { logName: 'Valley of the Titans',     actId: 2 },
  { logName: 'The Titan Grotto',         actId: 2 },
  { logName: 'Deshar',                   actId: 2 },
  { logName: 'The Ardura Caravan',       actId: 2, isHub: true, hasWaypoint: true },
  { logName: 'Path of Mourning',         actId: 2 },
  { logName: 'The Spires of Deshar',     actId: 2 },
  { logName: 'The Dreadnought',          actId: 2 },
  { logName: 'Dreadnought Vanguard',     actId: 2 },
  { logName: 'Trial of the Sekhemas',    actId: 2, hasWaypoint: true },
]

export const ACT2_STEPS: GuideStep[] = [

  // ─── VASTIRI OUTSKIRTS (Hub 1) ───────────────────────────────────────────
  {
    id: 'a2-01',
    zone: 'Vastiri Outskirts',
    actId: 2,
    type: 'waypoint',
    instruction: 'Arrive in Act 2 — activate Vastiri Outskirts Waypoint.',
    questName: 'Earning Passage',
    questType: 'main',
    isQuestStart: true
  },
  {
    id: 'a2-02',
    zone: 'Vastiri Outskirts',
    actId: 2,
    type: 'talk',
    instruction: 'Talk to Shambrin — accept "Earning Passage" and available quests.',
    detail: 'Shambrin is the Act 2 main quest giver. Also check for gem quests and Ancient Vows prerequisites.'
  },
  {
    id: 'a2-03',
    zone: 'Vastiri Outskirts',
    actId: 2,
    type: 'portal',
    instruction: 'Exit to Mawdun Quarry.'
  },

  // ─── MAWDUN QUARRY / MINE ────────────────────────────────────────────────
  {
    id: 'a2-04',
    zone: 'Mawdun Quarry',
    actId: 2,
    type: 'kill',
    instruction: 'Kill Rathbreaker (Earning Passage main quest boss) — defend the caravan.',
    questName: 'Earning Passage',
    questType: 'main',
    detail: 'Rathbreaker is a large desert beast blocking the caravan route. Found in Mawdun Quarry.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Boss is at the caravan blockade in the center/north',
      exitHint: 'After kill: proceed into Mawdun Mine',
      tips: ['Rubble AoE attacks — dodge away from ground markers', 'After kill: continue into Mawdun Mine via the connected tunnel']
    }
  },
  {
    id: 'a2-04b',
    zone: 'Mawdun Mine',
    actId: 2,
    type: 'move',
    instruction: 'Enter Mawdun Mine — follow the connected tunnel east from the Quarry.',
    questName: 'Earning Passage',
    questType: 'main'
  },
  {
    id: 'a2-05',
    zone: 'Mawdun Mine',
    actId: 2,
    type: 'kill',
    instruction: 'Kill Rudja (required) — then talk to Risu to continue the quest chain.',
    detail: 'Rudja, the Dread Engineer is a required kill in the mine. After killing Rudja, talk to Risu who is nearby to advance the quest.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Rudja is in the main chamber of the mine',
      exitHint: 'After kill and Risu dialogue: proceed to Traitor\'s Passage',
      tips: ['Talk to Risu after the kill — she continues the quest chain', 'Traitor\'s Passage is the next zone exit']
    }
  },
  {
    id: 'a2-05b',
    zone: 'Mawdun Mine',
    actId: 2,
    type: 'portal',
    instruction: 'Portal to Vastiri Outskirts — Risu has returned to the caravan. Talk to her there to advance Earning Passage, then come back and proceed through Mawdun Mine exit to Traitor\'s Passage.',
    detail: 'After killing Rudja and speaking to Risu inside the mine, she relocates to the Vastiri Outskirts caravan. Portal to town, speak with her there, then return to Mawdun Mine and exit east into Traitor\'s Passage.',
  },

  // ─── TRAITOR'S PASSAGE (Ascendancy Unlock!) ──────────────────────────────
  {
    id: 'a2-05c',
    zone: "Traitor's Passage",
    actId: 2,
    type: 'move',
    instruction: 'Use Vastiri Outskirts desert map → travel to Traitor\'s Passage.',
    questName: 'Ascent to Power',
    questType: 'ascendancy'
  },
  {
    id: 'a2-06',
    zone: "Traitor's Passage",
    actId: 2,
    type: 'kill',
    instruction: 'CRITICAL: Kill Balbala (the Djinn Barya drops here) — look for papers on walls to know you\'re close.',
    questName: 'Ascent to Power',
    questType: 'ascendancy',
    isQuestStart: true,
    detail: 'Balbala\'s death gives you the Djinn Barya quest item which is required to enter the Trial of the Sekhemas. Tip: if you find papers on the walls, you are close to Balbala. Stairs going up mean you are on the right path.',
    reward: { type: 'stat_bonus', description: 'Djinn Barya — Trial of Sekhemas key (required for Ascendancy)' },
    speedrunNote: 'CANNOT SKIP — no Barya = no Ascendancy. This is a required detour.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'If you find papers on walls, you are close. Stairs going up = right way.',
      exitHint: 'After kill: find the exit to the Halani Gates',
      tips: ['Balbala has mirror/illusion attacks — hit the real one (different glow)', 'After kill: pick up the Djinn Barya from the ground', 'After Balbala: find the exit stairs to the Halani Gates']
    }
  },
  {
    id: 'a2-07',
    zone: "Traitor's Passage",
    actId: 2,
    type: 'pickup',
    instruction: 'Pick up the Djinn Barya from the ground after Balbala\'s death. Then find the exit to the Halani Gates.',
    questName: 'Ascent to Power',
    questType: 'ascendancy'
  },
  {
    id: 'a2-07b',
    zone: "Traitor's Passage",
    actId: 2,
    type: 'interact',
    instruction: 'OPTIONAL: Find and loot the Bell Chest (dead end with a checkpoint, monsters, and dropped gold on ground).',
    optional: true,
    questType: 'side',
    reward: { type: 'stat_bonus', description: 'Two level 6 uncut skill gems (UNCONFIRMED)' },
    detail: 'The Bell Chest is in a dead end branch of Traitor\'s Passage. Look for a checkpoint with monsters and dropped gold on the ground nearby.',
  },

  // ─── TRIAL OF THE SEKHEMAS — TIER 1 (First Ascendancy) ──────────────────
  {
    id: 'a2-08',
    zone: 'Trial of the Sekhemas',
    actId: 2,
    type: 'trial',
    instruction: 'ASCENDANCY (Tier 1): Use Djinn Barya to enter — RECOMMENDED LEVEL 22+. Complete trial → 2 Ascendancy Points + choose Ascendancy class. Failure keeps Barya (retry-able).',
    questName: 'Trial of the Sekhemas',
    questType: 'ascendancy',
    detail: 'Recommended character level 22+ (one source: do it earlier — design supports it). Failure: you keep the Djinn Barya and can retry. Floor boss varies; Rattlecage the Earthbreaker is one possibility. HONOUR = secondary HP — if it hits 0 you fail. Aim for 75% Honour Resistance via Sanctum Relics.',
    reward: { type: 'ascendancy_point', amount: 2, description: '+2 Ascendancy Points — CHOOSE your Ascendancy class here (permanent)' },
    speedrunNote: 'Do EARLY in Act 2 (lvl ~22+). Easier than Trial of Chaos and unlocks Ascendancy for the rest of the campaign — huge power spike.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Single-floor trial with 10 rooms — boss at the end',
      exitHint: 'Find the Sanctum door each floor segment',
      tips: [
        '⚡ HONOUR = your protection. If it hits 0, trial fails.',
        'Always pick Boons that restore or protect Honour',
        'Avoid Afflictions that reduce maximum Honour',
        'Floor boss: Rattlecage the Earthbreaker — dodge the slams',
        'Relics with "Honour on Kill" = pick every time',
        'After clear: choose Ascendancy class + first 2 nodes'
      ]
    }
  },

  // ─── CONTINUE ACT 2 ─────────────────────────────────────────────────────
  {
    id: 'a2-08b',
    zone: 'The Halani Gates',
    actId: 2,
    type: 'move',
    instruction: 'Use Vastiri Outskirts desert map → travel to The Halani Gates.',
    questName: 'The Trail of Corruption',
    questType: 'main'
  },
  {
    id: 'a2-09',
    zone: 'The Halani Gates',
    actId: 2,
    type: 'kill',
    instruction: 'Kill Jamanra, the Risen King at Halani Gates (main quest — Trail of Corruption).',
    questName: 'The Trail of Corruption',
    questType: 'main',
    detail: 'Jamanra is a massive stone/sand giant. Shockwave slam — dodge to the side.',
    miniMap: {
      layoutType: 'linear',
      objectiveHint: 'Jamanra blocks the main gate path',
      exitHint: 'After kill: interact with the gate to open it',
      tips: ['Ranged attacks work well here — stay at max range', 'After kill: get Horn of Vastiri from the area']
    }
  },
  {
    id: 'a2-10',
    zone: 'The Halani Gates',
    actId: 2,
    type: 'pickup',
    instruction: 'Collect the Horn of Vastiri from the Halani Gates area.',
    questName: 'The Trail of Corruption',
    questType: 'main',
    detail: 'After collecting the Horn, proceed north through the now-open gates into Mastodon Badlands.'
  },

  // ─── MASTODON BADLANDS ──────────────────────────────────────────────────
  {
    id: 'a2-10b',
    zone: 'Mastodon Badlands',
    actId: 2,
    type: 'move',
    instruction: 'Proceed north through the now-open Halani Gates into Mastodon Badlands.',
    questName: 'A Theft of Ivory',
    questType: 'main'
  },
  {
    id: 'a2-11',
    zone: 'Mastodon Badlands',
    actId: 2,
    type: 'kill',
    instruction: 'Kill Iktab (Deathlord) and Ekbab (Ancient Steed) — "A Theft of Ivory" quest. Collect Mastodon Tusks. Also kill HYENA mobs in Badlands until Sun Clan Relic drops (for Ancient Vows).',
    questName: 'A Theft of Ivory',
    questType: 'main',
    isQuestStart: true,
    detail: 'Two bosses in sequence. Iktab is a spectral rider atop Ekbab (the mastodon). Kill Ekbab first — his rider falls. Sun Clan Relic drops randomly from hyena mobs here OR in Bone Pits — keep killing them.',
    reward: { type: 'stat_bonus', description: 'Mastodon Tusks (A Theft of Ivory) + Sun Clan Relic RNG drop (for Ancient Vows medallion)' },
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Boss pair patrols the center-north of the Badlands',
      exitHint: 'After kill: take Mastodon Tusks to Bone Pits area',
      tips: ['Ekbab charges — dodge sideways', 'Iktab uses curse aura — cleanse or resist it']
    }
  },

  // ─── THE BONE PITS + KETH ────────────────────────────────────────────────
  {
    id: 'a2-12',
    zone: 'The Bone Pits',
    actId: 2,
    type: 'move',
    instruction: 'Navigate Bone Pits — head to Keth (optional side area, MANDATORY for skill points).',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Keth entrance is a side path off the Bone Pits (marked on minimap)',
      exitHint: 'Stone archway leading to Keth settlement',
      tips: ['Keth is a SHORT side detour for +2 skill points', 'Sun Relic is also in this area (for Ancient Vows)']
    }
  },
  {
    id: 'a2-13',
    zone: 'Keth',
    actId: 2,
    type: 'kill',
    instruction: 'MUST DO: Kill Kabala, Constrictor Queen (+2 Passive Skill Points). Also kill snake mobs here until Kabala Clan Relic drops (for Ancient Vows).',
    questName: 'Kabala, Constrictor Queen',
    questType: 'side',
    detail: 'Kabala is a giant snake queen in the Keth ruins. Constriction attack — keep moving. Kabala Clan Relic also drops randomly from snake mobs in Keth and Lost City — keep them dying.',
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points (Book of Specialisation) + Kabala Clan Relic RNG drop' },
    speedrunNote: 'MUST DO — +2 passive points. Also farm Kabala Clan Relic from snakes.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Kabala is at the back of the Keth ruins',
      exitHint: 'After kill: exit back to Bone Pits → continue northwest through Bone Pits to reach The Lost City entrance',
      tips: ['Dodge the constriction — it deals heavy DoT', 'Ranged = easier fight', 'Lost City entrance is on the northwest/north end of Bone Pits (main path)']
    }
  },

  // ─── THE LOST CITY + BURIED SHRINES + HEART OF KETH ─────────────────────
  {
    id: 'a2-14',
    zone: 'The Lost City',
    actId: 2,
    type: 'move',
    instruction: 'Navigate the Lost City — find the exit to Buried Shrines.',
    questName: 'The City of Seven Waters',
    questType: 'main',
    isQuestStart: true,
    miniMap: {
      layoutType: 'maze',
      objectiveHint: 'Buried Shrines exit is always bottom right after a big bridge',
      exitHint: 'Look for the bridge leading to the buried zone entrance',
      tips: ['Maze-like ruins — follow the water channel remnants', 'Exit is always bottom right of the zone after a big bridge']
    }
  },
  {
    id: 'a2-15',
    zone: 'Buried Shrines',
    actId: 2,
    type: 'interact',
    instruction: 'Find the Heart of Keth — navigate through Buried Shrines to reach it.',
    questName: 'The City of Seven Waters',
    questType: 'main',
    reward: { type: 'stat_bonus', description: 'Uncut Support Gem (quest reward)' },
    detail: 'Buried Shrines does NOT drop Sun Relic — the Sun Clan Relic comes from hyena mobs in Mastodon Badlands/Bone Pits, and Kabala Clan Relic from snake mobs in Keth/Lost City.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Descend through the buried structure to reach Heart of Keth',
      exitHint: 'Heart of Keth is at the deepest level',
      tips: ['Pick up the Sun Relic drop here', 'Sun Relic + Mastodon Tusks = Ancient Vows turn-in later']
    }
  },
  {
    id: 'a2-15a2',
    zone: 'Heart of Keth',
    actId: 2,
    type: 'move',
    instruction: 'Descend deeper into the Buried Shrines structure → enter Heart of Keth (deepest level).',
    questName: 'The City of Seven Waters',
    questType: 'main'
  },
  {
    id: 'a2-15b',
    zone: 'Heart of Keth',
    actId: 2,
    type: 'kill',
    instruction: 'Kill Azarian, the Forsaken Son.',
    questName: 'The City of Seven Waters',
    questType: 'main',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Boss is in the inner sanctum of the Heart of Keth',
      exitHint: 'After kill: perform the ritual sequence',
      tips: ['Azarian has water/ice attacks — dodge the wave slams']
    }
  },
  {
    id: 'a2-15c',
    zone: 'Heart of Keth',
    actId: 2,
    type: 'interact',
    instruction: 'Complete the ritual: Talk to the goddess → loot the cinders → burn the goddess → loot the Essence of Water.',
    questName: 'The City of Seven Waters',
    questType: 'main',
    isQuestComplete: true,
    detail: 'After killing Azarian, a ritual sequence begins. Steps in order: 1) Talk to the goddess, 2) Loot the cinders, 3) Burn the goddess, 4) Loot the Essence of Water. After completion: exit Heart of Keth back through Buried Shrines and proceed to Valley of the Titans.',
  },

  // ─── VALLEY OF THE TITANS ────────────────────────────────────────────────
  {
    id: 'a2-15d',
    zone: 'Valley of the Titans',
    actId: 2,
    type: 'move',
    instruction: 'Exit Heart of Keth → portal back to Ardura Caravan → travel to Valley of the Titans.',
    questName: 'A Crown of Stone',
    questType: 'main'
  },
  {
    id: 'a2-16',
    zone: 'Valley of the Titans',
    actId: 2,
    type: 'interact',
    instruction: 'SIDE QUEST: Place Sun Clan Relic + Kabala Clan Relic in the medallion (Offering to Amrit) for a permanent buff choice.',
    questName: 'Ancient Vows',
    questType: 'side',
    isQuestComplete: true,
    detail: 'Requires BOTH Sun Clan Relic (hyena mobs in Mastodon Badlands/Bone Pits) AND Kabala Clan Relic (snake mobs in Keth/Lost City). Place both in the medallion in Valley of the Titans. Choice CAN be changed by re-clicking.',
    reward: { type: 'stat_bonus', description: 'CHOOSE: +30% Increased Charm Charges Gained OR +15% Mana Recovery from Flasks (switchable at any time)' },
    speedrunNote: 'DO IT — free permanent buff. Choice CAN be switched later by re-clicking the medallion.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Ancient altar is in the center of the valley',
      exitHint: 'Large stone altar with carved runes',
      tips: ['Only interactable after having both items', 'Choice cannot be changed — pick carefully']
    }
  },
  {
    id: 'a2-17',
    zone: 'Valley of the Titans',
    actId: 2,
    type: 'kill',
    instruction: 'Activate the 3 Ancient Seals. Find the medallion and place the two relics in it — CHOOSE a permanent buff (can be changed later). Then find the exit to Titan Grotto.',
    questName: 'A Crown of Stone',
    questType: 'main',
    isQuestStart: true,
    reward: { type: 'stat_bonus', description: 'One of two permanent buffs (choice at medallion — can be changed later)' },
    detail: 'The waypoint is in this zone. After clicking all 3 seals, find the medallion and place both relics in it to choose one of two permanent buffs. This choice CAN be changed later.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: '3 seals spread across Valley corners; medallion is near the waypoint',
      exitHint: 'After relics placed: find the exit to the Titan Grotto',
      tips: ['Activate seals first', 'Place both relics in the medallion to unlock buff choice', 'Buff choice CAN be changed later', 'Exit to Titan Grotto is at the far end']
    }
  },
  {
    id: 'a2-18',
    zone: 'The Titan Grotto',
    actId: 2,
    type: 'kill',
    instruction: 'Kill Zalmarath, the Colossus at the Dais of Reckoning (completes A Crown of Stone).',
    questName: 'A Crown of Stone',
    questType: 'main',
    isQuestComplete: true,
    detail: 'Zalmarath is a massive stone titan — extremely dangerous, especially on Hardcore. Boss spawns opposite the entry point. Has heavy slam + earthquake AoE.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Boss at Dais of Reckoning — opposite the entry point',
      exitHint: 'After kill: continue to Deshar',
      tips: [
        'Slow but devastating slams — dodge to the side',
        'Earthquake AoE — wide telegraph',
        'Bring strong physical/fire resistance',
        'After kill: portal/walk back to caravan'
      ]
    },
    speedrunNote: 'Tough mid-act boss. With Sekhemas ascendancy done, much easier.'
  },
  {
    id: 'a2-18b',
    zone: 'The Titan Grotto',
    actId: 2,
    type: 'move',
    instruction: 'Continue through Titan Grotto exit to Deshar.'
  },

  // ─── DESHAR + ARDURA CARAVAN ─────────────────────────────────────────────
  {
    id: 'a2-19',
    zone: 'Deshar',
    actId: 2,
    type: 'interact',
    instruction: 'Talk to the abandoned Rhoa in Deshar. Also find the final letter on a corpse on the ground near a big tower (2 SP on turn-in).',
    questName: "Tradition's Toll",
    questType: 'side',
    detail: 'Two objectives: 1) Find and talk to the abandoned Rhoa (Tradition\'s Toll quest). 2) Find the final letter — it is on a corpse on the ground, near a big tower. The final letter gives 2 skill points when turned in.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Rhoa is near the southern edge of Deshar; final letter corpse is near a big tower',
      exitHint: 'Ardura Caravan hub is in the north — look for wagons and campfires',
      tips: ['Talk to the Rhoa first', 'Final letter corpse is near a big tower landmark', 'After picking up letter: find exit to Path of Mourning (enter zone, take waypoint, backtrack to Deshar)']
    }
  },
  {
    id: 'a2-20',
    zone: 'The Ardura Caravan',
    actId: 2,
    type: 'waypoint',
    instruction: 'Activate Ardura Caravan Waypoint (Hub 2).',
    speedrunNote: 'Key waypoint — use this to portal back after Spires of Deshar reward'
  },
  {
    id: 'a2-21',
    zone: 'The Ardura Caravan',
    actId: 2,
    type: 'talk',
    instruction: 'Talk to Shambrin — confirm "Tradition\'s Toll" progress (Rhoa and letter found in Deshar).',
    questName: "Tradition's Toll",
    questType: 'side',
    isQuestStart: true,
    detail: 'Shambrin / Asala tracks the Tradition\'s Toll quest. The Rhoa and final letter are found in Deshar (see previous step). The quest may auto-start when you find the Rhoa.',
    speedrunNote: 'MUST DO — +2 passive points. Quest items found in Deshar (previous zone).'
  },
  {
    id: 'a2-22',
    zone: 'The Ardura Caravan',
    actId: 2,
    type: 'talk',
    instruction: 'Turn in the final letter at Shambrin in the caravan (+2 Passive Skill Points).',
    questName: "Tradition's Toll",
    questType: 'side',
    isQuestComplete: true,
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points (final letter turn-in to Shambrin)' },
    detail: 'After finding the final letter on the corpse in Deshar (near the big tower), return to the caravan and turn it in to Shambrin for 2 skill points.',
  },

  // ─── SPIRES OF DESHAR (Lightning Resist — MUST DO) ───────────────────────
  {
    id: 'a2-22b',
    zone: 'The Spires of Deshar',
    actId: 2,
    type: 'move',
    instruction: 'Travel from Ardura Caravan → Path of Mourning → Spires of Deshar (use desert map at the caravan).',
    questName: "Tradition's Toll",
    questType: 'side',
  },
  {
    id: 'a2-23',
    zone: 'The Spires of Deshar',
    actId: 2,
    type: 'interact',
    instruction: 'MUST DO: Find the Shrine of Garukhan — interact for +10% Lightning Resistance (PERMANENT). REPEATABLE on Cruel Act 2 for +20% TOTAL Lightning Resistance.',
    questName: 'Sisters of Garukhan',
    questType: 'side',
    detail: 'Interact with the Shrine of Garukhan (chakram automatons wake up and attack — kill them, but the buff is granted ON INTERACT, not on kill). Repeatable on Cruel Act 2 — activate it twice across difficulties for +20% Lightning Resist total.',
    reward: { type: 'stat_bonus', description: '+10% Lightning Resistance per interact (PERMANENT). Repeatable Normal + Cruel = +20% total' },
    speedrunNote: 'DO IT — permanent resistance. Hit it again in Cruel for double.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Sisters of Garukhan are in the center/upper area of the Spires',
      exitHint: 'Glowing sisters between the large stone spires',
      tips: ['Find the sisters first for the 10% lightning res', 'Then kill Tor Gul nearby']
    }
  },
  {
    id: 'a2-23b',
    zone: 'The Spires of Deshar',
    actId: 2,
    type: 'kill',
    instruction: 'Kill Tor Gul, the Defiler in the Spires of Deshar.',
    questType: 'main',
    detail: 'Tor Gul is the main quest target in the Spires of Deshar. Kill him to progress.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Tor Gul is in the upper spires area',
      exitHint: 'After kill: portal back to town',
      tips: ['Heavy corruption attacks — keep moving']
    }
  },
  {
    id: 'a2-24',
    zone: 'The Spires of Deshar',
    actId: 2,
    type: 'portal',
    instruction: 'Portal back to town (Ardura Caravan) after Tor Gul. Then continue to Path of Mourning → The Dreadnought.',
  },

  // ─── PATH OF MOURNING / DREADNOUGHT ──────────────────────────────────────
  {
    id: 'a2-25',
    zone: 'Path of Mourning',
    actId: 2,
    type: 'move',
    instruction: 'Cross Path of Mourning to reach The Dreadnought.',
    miniMap: {
      layoutType: 'linear',
      objectiveHint: 'Dreadnought looms ahead — single path',
      exitHint: 'The Dreadnought structure is visible from the path',
      tips: ['Strong corrupted enemies here — dodge around them']
    }
  },
  {
    id: 'a2-26',
    zone: 'The Dreadnought',
    actId: 2,
    type: 'move',
    instruction: 'Navigate through The Dreadnought to reach Dreadnought Vanguard.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Vanguard area is at the top/forward section of the Dreadnought',
      exitHint: 'Massive door into the Vanguard area',
      tips: ['Linear — keep pushing forward']
    }
  },

  // ─── DREADNOUGHT VANGUARD (Act 2 Boss) ───────────────────────────────────
  {
    id: 'a2-27',
    zone: 'Dreadnought Vanguard',
    actId: 2,
    type: 'kill',
    instruction: 'Enter Dreadnought Vanguard (forward section of The Dreadnought). Kill Jamanra the Abomination — Act 2 Final Boss.',
    questName: 'The Trail of Corruption',
    questType: 'main',
    isQuestComplete: true,
    detail: 'Phase 1: Sand/lightning attacks, summoned constructs. Phase 2 (~60% HP): huge sand storm fills arena edges. Phase 3 (~30%): full berserk — all attacks chain.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Circular arena with sand pillar obstacles',
      exitHint: 'After kill: Act 3 portal appears',
      tips: [
        'Use pillar obstacles to break line of sight on lightning beams',
        'Adds spawn in Phase 2 — kill priority adds (healers first)',
        'Phase 3: commit all flasks and cooldowns',
        'Death: waypoint to Ardura Caravan, walk back quickly'
      ]
    },
    speedrunNote: 'With Ascendancy + 4 skill points active, this is very manageable. Burst all phases.'
  },
  {
    id: 'a2-28',
    zone: 'Dreadnought Vanguard',
    actId: 2,
    type: 'portal',
    instruction: 'Act 2 Complete! Enter the portal to Act 3.',
    questName: 'The Trail of Corruption',
    questType: 'main'
  }
]

// ACT 2 PERMANENT REWARDS SUMMARY:
// ✦ Kabala, Constrictor Queen (Keth) → +2 Passive Skill Points ← MUST DO
// ✦ Tradition's Toll side quest (Deshar) → +2 Passive Skill Points ← MUST DO
// ✦ Sisters of Garukhan Shrine (Spires of Deshar) → +10% Lightning Resistance ← MUST DO
// ✦ Ancient Vows (Valley of Titans altar) → +30% Charm Charges OR +15% Mana Recovery ← MUST DO
// ✦ Trial of Sekhemas Tier 1 (Balbala's Barya from Traitor's Passage) → +2 Ascendancy Points ← CRITICAL
// Total: 4 Passive Skill Points + Resist + Charm/Mana + 2 Ascendancy Points
