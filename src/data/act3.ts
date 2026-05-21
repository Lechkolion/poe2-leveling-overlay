import type { GuideStep, ZoneEntry } from './types'

// POE2 Act 3 — The Jungle Depths
// Hub: Ziggurat Encampment (NPCs: Alva Valai, Servi, Oswald)
// Act Boss: Doryani, Royal Thaumaturge (The Black Chambers)
// CRITICAL: Kill Xyclucian in Chimeral Wetlands → drops Trial of Chaos key (Ascendancy)

export const ACT3_ZONES: ZoneEntry[] = [
  { logName: 'Sandswept Marsh',          actId: 3 },
  { logName: 'Ziggurat Encampment',      actId: 3, isHub: true, hasWaypoint: true },
  { logName: 'Jungle Ruins',             actId: 3 },
  { logName: 'The Venom Crypts',         actId: 3 },   // side area — Slithering Dead quest
  { logName: 'Infested Barrens',         actId: 3 },
  { logName: 'The Azak Bog',             actId: 3 },   // side area — Ignagduk boss (+30 Spirit)
  { logName: 'Chimeral Wetlands',        actId: 3 },   // Xyclucian → Trial of Chaos unlock
  { logName: "Jiquani's Machinarium",    actId: 3 },
  { logName: "Jiquani's Sanctum",        actId: 3 },
  { logName: 'The Matlan Waterways',     actId: 3 },
  { logName: 'The Drowned City',         actId: 3 },
  { logName: 'The Molten Vault',         actId: 3 },   // optional
  { logName: 'Apex of Filth',            actId: 3 },
  { logName: 'Temple of Kopec',          actId: 3 },
  { logName: 'Utzaal',                   actId: 3 },
  { logName: 'Aggorat',                  actId: 3 },
  { logName: 'The Black Chambers',       actId: 3 },
  { logName: 'Temple of Chaos',          actId: 3, hasWaypoint: true },
]

export const ACT3_STEPS: GuideStep[] = [

  // ─── SANDSWEPT MARSH + ZIGGURAT ENCAMPMENT ──────────────────────────────
  {
    id: 'a3-01',
    zone: 'Sandswept Marsh',
    actId: 3,
    type: 'move',
    instruction: 'Arrive in Act 3 — navigate to Ziggurat Encampment (hub).',
    questName: 'Legacy of the Vaal',
    questType: 'main',
    isQuestStart: true,
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Encampment is northeast of the marsh entry',
      exitHint: 'Stone ziggurats visible above the tree line — head toward them',
      tips: ['Rootdredge optional boss here — skip (gem reward only)']
    }
  },
  {
    id: 'a3-02',
    zone: 'Ziggurat Encampment',
    actId: 3,
    type: 'waypoint',
    instruction: 'Activate Ziggurat Encampment Waypoint.',
  },
  {
    id: 'a3-03',
    zone: 'Ziggurat Encampment',
    actId: 3,
    type: 'talk',
    instruction: 'Talk to Alva Valai, Servi, and Oswald — pick up all quests.',
    detail: 'Key quests: Legacy of the Vaal (main), The Slithering Dead (Servi — threshold choice), Sacrificial Heart background knowledge. Servi sends you to Venom Crypts.'
  },
  {
    id: 'a3-04',
    zone: 'Ziggurat Encampment',
    actId: 3,
    type: 'portal',
    instruction: 'Exit to Jungle Ruins.'
  },

  // ─── JUNGLE RUINS ────────────────────────────────────────────────────────
  {
    id: 'a3-05',
    zone: 'Jungle Ruins',
    actId: 3,
    type: 'kill',
    instruction: 'MUST DO: Kill Mighty Silverfist (+2 Passive Skill Points).',
    questName: 'Mighty Silverfist',
    questType: 'side',
    detail: 'Mighty Silverfist is an optional boss in the Jungle Ruins. Large gorilla-type creature.',
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points (Book of Specialisation)' },
    speedrunNote: 'MUST DO — +2 passive points.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Silverfist patrols the northwest section of Jungle Ruins',
      exitHint: 'After kill: continue to find Canal Mechanism (main quest)',
      tips: ['Ground slam AoE — dodge to the side', 'Fast kill with good DPS']
    }
  },
  {
    id: 'a3-06',
    zone: 'Jungle Ruins',
    actId: 3,
    type: 'interact',
    instruction: 'Scout Jungle Ruins exits — find entrances to Venom Crypts AND Infested Barrens (just tag the checkpoints/waypoints, don\'t fully enter yet).',
    questName: 'Legacy of the Vaal',
    questType: 'main',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Two exits to find: Venom Crypts (near waypoint) + Infested Barrens',
      exitHint: 'After scouting both: go to Venom Crypts first (side quest before main)',
      tips: ['Enter Venom Crypts via Jungle Ruins exit', 'Tag the Infested Barrens waypoint by entering briefly, then portal out']
    }
  },

  // ─── VENOM CRYPTS (Side — Threshold Choice) ─────────────────────────────
  {
    id: 'a3-07',
    zone: 'The Venom Crypts',
    actId: 3,
    type: 'kill',
    instruction: 'Enter The Venom Crypts (side area off Jungle Ruins). Find the venom phial corpse — then portal back to Ziggurat Encampment and turn in to Servi. WARNING: Servi\'s reward is PERMANENT AND CANNOT BE CHANGED LATER.',
    questName: 'The Slithering Dead',
    questType: 'side',
    isQuestStart: true,
    detail: 'Find the corpse holding the venom phial in the Venom Crypts, then portal back to town. Turn in the phial to Servi. CRITICAL WARNING: The reward you choose here is PERMANENT AND CANNOT BE CHANGED LATER. Choose carefully.',
    reward: { type: 'stat_bonus', description: 'PERMANENT choice of 3 Venom Draughts from Servi (e.g., +Stun Threshold / +Ailment Resist / +Mana) — CANNOT be changed later' },
    speedrunNote: 'DO IT — permanent bonus. CANNOT be undone. Pick carefully before confirming.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Venom phial corpse is near the end of the crypt',
      exitHint: 'After looting: portal back to town and turn in at Servi',
      tips: ['Poison-themed zone — bring life flasks', 'PERMANENT CHOICE at Servi — cannot be changed later']
    }
  },

  // ─── INFESTED BARRENS ────────────────────────────────────────────────────
  {
    id: 'a3-08',
    zone: 'Infested Barrens',
    actId: 3,
    type: 'interact',
    instruction: 'Waypoint to Infested Barrens. Activate the Stone Altar in the center (Legacy of the Vaal main quest). Then scout the perimeter for exits to Chimeral Wetlands, Azak Bog, and Matlan Waterways — grab waypoints in each.',
    questName: 'Legacy of the Vaal',
    questType: 'main',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Altar is in the center of the Barrens',
      exitHint: 'Large stone structure with glowing runes',
      tips: [
        'Bug enemies swarm here — keep moving to altar, avoid getting surrounded',
        'Exits at the perimeter: Chimeral Wetlands, Azak Bog, Matlan Waterways — tag waypoints in each before continuing',
      ]
    }
  },

  // ─── AZAK BOG (Side — +30 Spirit) ───────────────────────────────────────
  {
    id: 'a3-09',
    zone: 'The Azak Bog',
    actId: 3,
    type: 'interact',
    instruction: 'Waypoint to Azak Bog. OPTIONAL: Flameskin Ritual — light all Effigies to gain "Ignagduk\'s Harvest" buff: +25% Fire Resistance + 25% increased item Rarity. ZONE-ONLY, lost on death/exit.',
    questName: 'Tribal Vengeance',
    questType: 'side',
    optional: true,
    reward: { type: 'stat_bonus', description: 'Ignagduk\'s Harvest: +25% Fire Res + 25% Rarity (ZONE-DURATION ONLY, repeatable, lost on death/exit)' },
    detail: 'Light all Effigies near zone center. Buff is NOT permanent — lost when you leave the zone or die. Repeatable. Great prep for the Ignagduk boss fight.',
    miniMap: {
      layoutType: 'maze',
      objectiveHint: 'Flameskin Ritual flames are scattered throughout the bog',
      exitHint: 'Activate all flames then proceed to Ignagduk',
      tips: ['Only search for this BEFORE reaching Ignagduk', 'If you find the boss first — skip the ritual']
    }
  },
  {
    id: 'a3-09b',
    zone: 'The Azak Bog',
    actId: 3,
    type: 'kill',
    instruction: 'MUST DO: Kill Ignagduk, the Bog Witch in the deepest part of Azak Bog (+30 Maximum Spirit).',
    questName: 'Tribal Vengeance',
    questType: 'side',
    detail: 'Ignagduk is a boss in the center/deepest part of the bog. Reward is "Gemrot Skull" — consume from inventory for the permanent +30 Spirit buff.',
    reward: { type: 'stat_bonus', description: 'Gemrot Skull → +30 Maximum Spirit (permanent)' },
    speedrunNote: 'DO IT — +30 Spirit is huge. Don\'t forget to CONSUME the Gemrot Skull from inventory after the kill.',
    miniMap: {
      layoutType: 'maze',
      objectiveHint: 'Ignagduk is at the center of the bog',
      exitHint: 'Twisted tree structure marks boss location',
      tips: ['Poison gas patches throughout — use flask on entry', 'Ignagduk has summon spells — kill summons fast']
    }
  },

  // ─── CHIMERAL WETLANDS (Xyclucian → Trial of Chaos unlock) ──────────────
  {
    id: 'a3-10',
    zone: 'Chimeral Wetlands',
    actId: 3,
    type: 'kill',
    instruction: 'Waypoint to Chimeral Wetlands. CRITICAL: Kill Xyclucian, the Chimera — drops Inscribed Ultimatum (Trial of Chaos key). Also tag the Temple of Chaos waypoint while here (Ascendancy unlock).',
    questName: 'The Trials of Chaos',
    questType: 'ascendancy',
    isQuestStart: true,
    detail: 'Xyclucian is required for main quest AND drops the Chimeral Inscribed Ultimatum needed for Trial of Chaos (2nd Ascendancy path). Multiple phases.',
    reward: { type: 'stat_bonus', description: 'Chimeral Inscribed Ultimatum (Trial of Chaos key — required for 2nd Ascendancy)' },
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Xyclucian is in the far end of the wetlands',
      exitHint: 'Large clear area with toxic pools',
      tips: [
        'Multi-phase chimera — different attack types each phase',
        'Phase 1: fire breath — sidestep',
        'Phase 2: electricity — avoid ground charges',
        'Phase 3: poison explosion — pop flask immediately',
        'After kill: pick up the Inscribed Ultimatum from corpse'
      ]
    },
    speedrunNote: 'PICK UP THE INSCRIBED ULTIMATUM after the kill — it\'s your 2nd Ascendancy key.'
  },
  {
    id: 'a3-11',
    zone: 'Chimeral Wetlands',
    actId: 3,
    type: 'pickup',
    instruction: 'Collect the Chimeral Inscribed Ultimatum from Xyclucian\'s corpse.',
    questName: 'The Trials of Chaos',
    questType: 'ascendancy'
  },

  // ─── TRIAL OF CHAOS — TIER 1 (2nd Ascendancy option) ────────────────────
  {
    id: 'a3-12',
    zone: 'Temple of Chaos',
    actId: 3,
    type: 'trial',
    instruction: 'ASCENDANCY (Trial of Chaos Tier 1): Use Inscribed Ultimatum to enter. ONLY 4 floors needed (not 10) for the first 2 points. RECOMMENDED LEVEL 38+. MUCH harder than Sekhemas — overlevel before attempting.',
    questName: 'The Trials of Chaos',
    questType: 'ascendancy',
    detail: 'Monsters are level 38 — be at least lvl 38, ideally higher. Trial has 10 floors total but only the FIRST 4 are needed for the first 2 ascendancy points. Ultimatum-style: shrinking circle each round, modifiers stack. On T1, failure KEEPS your Inscribed Ultimatum (retry-able). On T2-T4 difficulty, failure consumes the key.',
    reward: { type: 'ascendancy_point', amount: 2, description: '+2 Ascendancy Points (now 4 total) — complete first 4 floors only' },
    speedrunNote: 'DO NOT rush this. Grab the Ultimatum from Xyclucian, then keep leveling through Act 3 main quest. Attempt near end of Act 3 (lvl 40+) for safety. T1 retries are free.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Circular arena — stand inside the circle to progress each round',
      exitHint: 'Complete all 10 rounds to get reward',
      tips: [
        'Stay inside the shrinking ring — going outside fails the round',
        'Round 10 is hardest — bring full flasks',
        'Evasion/dodge builds have an easier time here vs Sekhemas',
        'If overwhelmed: kite inside the ring, not outside it'
      ]
    }
  },

  // ─── JIQUANI'S MACHINARIUM + SANCTUM ────────────────────────────────────
  {
    id: 'a3-13',
    zone: "Jiquani's Machinarium",
    actId: 3,
    type: 'kill',
    instruction: 'MUST DO: Find The Oubliette (hidden behind a Stone Altar — use a spare Lesser Soul Core to unlock). Kill Blackjaw, the Remnant → drops The Flame Core → consume for +10% Fire Resistance.',
    questName: 'Blackjaw, the Remnant',
    questType: 'side',
    detail: 'Locked area: find a Stone Altar in the Machinarium, insert a spare Lesser Soul Core (you find several throughout the zone — only 2 needed for main progression, save one for this) → opens The Oubliette → fight Blackjaw. Drops "The Flame Core" — CONSUME from inventory for permanent +10% Fire Res. Also likely repeatable on Cruel for +20% total.',
    reward: { type: 'stat_bonus', description: 'The Flame Core → +10% Fire Resistance per consume. Access requires Lesser Soul Core' },
    speedrunNote: 'DO IT — keep one extra Lesser Soul Core for The Oubliette altar. Consume Flame Core from inventory.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Blackjaw is in the northwest wing of the Machinarium',
      exitHint: 'After kill: place the Small Soul Core (main quest)',
      tips: ['Mechanical AoE — dodge the spinning blades', 'He dies fast — burst damage']
    }
  },
  {
    id: 'a3-14',
    zone: "Jiquani's Machinarium",
    actId: 3,
    type: 'interact',
    instruction: 'Place the Small Soul Core in the Machinarium (Legacy of the Vaal main quest).',
    questName: 'Legacy of the Vaal',
    questType: 'main'
  },
  {
    id: 'a3-14b',
    zone: "Jiquani's Sanctum",
    actId: 3,
    type: 'waypoint',
    instruction: 'WARNING: Activate the waypoint IMMEDIATELY upon entering Jiquani\'s Sanctum — it is easy to miss and you will need it to get back.',
    detail: 'The waypoint in Jiquani\'s Sanctum is right at the entry area. Activate it before doing anything else. Missing it means a long walk back if you die or need to return.',
    speedrunNote: 'Waypoint is right at entry — takes 2 seconds. Do not skip.'
  },
  {
    id: 'a3-15',
    zone: "Jiquani's Sanctum",
    actId: 3,
    type: 'kill',
    instruction: 'Kill Zicoatl, Warden of the Core. Collect the Large Soul Core.',
    questName: 'Legacy of the Vaal',
    questType: 'main',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Boss at the deepest level of the sanctum',
      exitHint: 'Pick up Large Soul Core after kill',
      tips: ['Energy/lightning attacks — cold/chaos immunity helps', 'Phase 2: adds spawn in the corners']
    }
  },

  // ─── MATLAN WATERWAYS + DROWNED CITY ─────────────────────────────────────
  {
    id: 'a3-15b',
    zone: 'Infested Barrens',
    actId: 3,
    type: 'move',
    instruction: 'Return to Infested Barrens with Large Soul Core → insert into the altar → proceed to Matlan Waterways.',
    questName: 'Legacy of the Vaal',
    questType: 'main'
  },
  {
    id: 'a3-16',
    zone: 'The Matlan Waterways',
    actId: 3,
    type: 'interact',
    instruction: 'Activate every lever to navigate the Waterways, then the BIG lever at the end (Legacy of the Vaal).',
    questName: 'Legacy of the Vaal',
    questType: 'main',
    miniMap: {
      layoutType: 'branching',
      objectiveHint: 'Multiple levers throughout — the big final lever is at the end',
      exitHint: 'After the big lever: water drains, access to Drowned City opens',
      tips: ['Activate every lever you encounter — they gate progression', 'Big final lever opens Drowned City entrance']
    }
  },
  {
    id: 'a3-17',
    zone: 'The Drowned City',
    actId: 3,
    type: 'kill',
    instruction: 'From town stairs (near well/Hooded One), enter The Drowned City. Find both exits — Apex of Filth (main) AND Molten Vault (optional, first char only). Continue main path through Drowned City toward Apex of Filth.',
    questName: 'Legacy of the Vaal',
    questType: 'main',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Drowned City → Apex of Filth → Queen of Filth at the bottom',
      exitHint: 'Descend through the flooded ruins to the Apex',
      tips: ['Find both exits from Drowned City: Molten Vault (first char per league) + Apex of Filth (main)']
    }
  },
  {
    id: 'a3-17b',
    zone: 'The Molten Vault',
    actId: 3,
    type: 'kill',
    instruction: 'Enter The Molten Vault via the side exit off Drowned City. FIRST CHAR PER LEAGUE ONLY: Kill the boss (Mektul, the Forgemaster), then talk to Oswald in town → unlocks Reforging Bench. Skip on alts.',
    questName: 'Treasures of Utzaal',
    questType: 'side',
    optional: true,
    detail: 'Side area off the Drowned City. Kill the boss, return to Ziggurat Encampment and speak with Oswald. Unlocks the Reforging Bench (account/league-wide).',
    reward: { type: 'stat_bonus', description: 'Unlocks Reforging Bench (one-time per league)' },
    speedrunNote: 'Skip on alt characters. First char only.'
  },
  {
    id: 'a3-18',
    zone: 'Apex of Filth',
    actId: 3,
    type: 'kill',
    instruction: 'Enter Apex of Filth (from Drowned City). Kill the Queen of Filth. Navigation tip: the zone is a huge spiral — follow it clockwise or counterclockwise. After a full 360° of the spiral you find the boss. After kill: portal back to town for Temple of Kopec.',
    questName: 'Legacy of the Vaal',
    questType: 'main',
    miniMap: {
      layoutType: 'spiral',
      objectiveHint: 'Follow the spiral path (clockwise or counterclockwise) — boss is at the end after a full 360°',
      exitHint: 'After kill: proceed to Temple of Kopec',
      tips: ['Zone is a large spiral — do NOT cut across, follow the path', 'After one full 360° rotation, you reach the boss', 'Slime pools deal DoT — keep moving', 'Phase 2: arena fills, jump between safe islands']
    }
  },

  // ─── TEMPLE OF KOPEC ─────────────────────────────────────────────────────
  {
    id: 'a3-18b',
    zone: 'Ziggurat Encampment',
    actId: 3,
    type: 'portal',
    instruction: 'Portal back to Ziggurat Encampment after Queen of Filth → go down stairs near the well / Hooded One → enter Temple of Kopec (opposite side from Drowned City stairs).',
    questName: 'Legacy of the Vaal',
    questType: 'main'
  },
  {
    id: 'a3-19',
    zone: 'Temple of Kopec',
    actId: 3,
    type: 'kill',
    instruction: 'Kill Ketzuli, High Priest of the Sun. Navigation: go up the stairs twice (stairs are always in the corners of the triangle-shaped zone). STAY IN THE SHADE to avoid sun damage.',
    questName: 'Legacy of the Vaal',
    questType: 'main',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Triangle-shaped zone — stairs are always in the corners. Go up twice to reach boss.',
      exitHint: 'Proceed to Utzaal after kill',
      tips: [
        'Zone is triangle-shaped — stairs always in the corners',
        'Go up the stairs twice to reach Ketzuli',
        'STAY IN THE SHADE — direct sunlight in this zone deals damage',
        'Solar beams — dodge perpendicular to beam direction',
        'Sun priests spawn — kill them fast'
      ]
    }
  },

  // ─── UTZAAL (Sacrificial Heart — RNG drop) ───────────────────────────────
  {
    id: 'a3-19b',
    zone: 'Ziggurat Encampment',
    actId: 3,
    type: 'move',
    instruction: 'After Ketzuli: talk to Alva → ride elevator up → cross the gateway → descend stairs into Utzaal.',
    questName: 'Legacy of the Vaal',
    questType: 'main'
  },
  {
    id: 'a3-20',
    zone: 'Utzaal',
    actId: 3,
    type: 'kill',
    instruction: 'HUNT: Farm Vaal Goliaths in Utzaal/Aggorat until Sacrificial Heart drops (+2 Skill Points).',
    questName: 'The Sacrificial Heart',
    questType: 'side',
    detail: 'Sacrificial Heart is an RNG drop from Vaal Goliaths (the large Vaal elite enemies). Keep killing them until it drops. Then place it on the altar in Aggorat.',
    reward: { type: 'stat_bonus', description: 'Sacrificial Heart quest item drop (used later at Aggorat altar — actual +2 SP awarded there)' },
    speedrunNote: 'MUST DO if drop happens fast. Average ~5-15 Vaal Goliath kills. If taking too long: do it after Act 3, come back.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Vaal Goliaths patrol Utzaal and Aggorat — large golden armored giants',
      exitHint: 'Altar is in Aggorat — look for stone pedestal in center',
      tips: ['Goliaths have high HP — kill as many as you find while progressing', 'Heart glows gold when dropped']
    }
  },
  {
    id: 'a3-21',
    zone: 'Utzaal',
    actId: 3,
    type: 'kill',
    instruction: 'In Utzaal: kill Viper Napuatzi (required main quest boss — towards the right/north end of the zone).',
    questName: 'Legacy of the Vaal',
    questType: 'main',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Napuatzi is in the center/north of Utzaal',
      exitHint: 'After kill: proceed to Aggorat',
      tips: ['Snake empress boss — poison attacks, heavy damage', 'Cold resistance helps significantly here']
    }
  },

  // ─── AGGORAT ─────────────────────────────────────────────────────────────
  {
    id: 'a3-22',
    zone: 'Aggorat',
    actId: 3,
    type: 'interact',
    instruction: 'After Viper Napuatzi: enter Aggorat (top-right exit of Utzaal). Find the Sacrificial Dais (follow voices of Trial of Atziri on the big plaza), loot the dagger, place + stab the Sacrificial Heart on the altar — +2 Skill Points.',
    questName: 'The Sacrificial Heart',
    questType: 'side',
    isQuestComplete: true,
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points' },
    detail: 'If the heart dropped in Utzaal, place it on the altar here. If not: kill Vaal Goliaths here too.',
    speedrunNote: 'Altar is near the start of Aggorat — easy interact, takes 3 seconds'
  },
  {
    id: 'a3-23',
    zone: 'Aggorat',
    actId: 3,
    type: 'move',
    instruction: 'Navigate through Aggorat — find The Black Chambers.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Black Chambers entrance is in the northeast',
      exitHint: 'Dark stone structure with cursed engravings',
      tips: ['Elite Vaal enemies are heavy here — dodge around them']
    }
  },

  // ─── THE BLACK CHAMBERS (Act 3 Boss) ─────────────────────────────────────
  {
    id: 'a3-24',
    zone: 'The Black Chambers',
    actId: 3,
    type: 'kill',
    instruction: 'Kill Doryani, Royal Thaumaturge — Act 3 Final Boss. Rescue Alva.',
    questName: 'Legacy of the Vaal',
    questType: 'main',
    isQuestComplete: true,
    detail: 'Doryani has three phases. Phase 1: Orb projectiles + lightning. Phase 2 (~65%): Teleport attacks, orbs speed up. Phase 3 (~30%): Screen-filling Vaal energy discharge — this is the lethal phase.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Throne room at the end of the Black Chambers',
      exitHint: 'After kill: free Alva, get portal to Act 4',
      tips: [
        'Phase 3 discharge: the safe spot is directly below/behind Doryani',
        'Orbs: walk between them — they have gaps',
        'Lightning columns: move between columns not along them',
        'All flasks on Phase 3 immediately'
      ]
    },
    speedrunNote: 'With 4 ascendancy points + 8 skill points: very fast fight. Nuke Phase 1-2, survive Phase 3.'
  },
  {
    id: 'a3-25',
    zone: 'The Black Chambers',
    actId: 3,
    type: 'portal',
    instruction: 'Act 3 Complete! Interact with portal to Act 4.',
    questName: 'Legacy of the Vaal',
    questType: 'main'
  }
]

// ACT 3 PERMANENT REWARDS SUMMARY:
// ✦ Mighty Silverfist (Jungle Ruins) → +2 Passive Skill Points ← MUST DO
// ✦ Slithering Dead quest (Venom Crypts → Servi) → Threshold choice ← MUST DO
// ✦ Ignagduk, Bog Witch (Azak Bog) → +30 Maximum Spirit ← MUST DO
// ✦ Blackjaw, the Remnant (Jiquani's Machinarium) → +10% Fire Resistance ← MUST DO
// ✦ Sacrificial Heart RNG altar (Aggorat) → +2 Passive Skill Points ← MUST DO (farm it)
// ✦ Trial of Chaos Tier 1 (Xyclucian key) → +2 Ascendancy Points ← CRITICAL
// Total: 4 Passive Skill Points (guaranteed) + 2 SP (RNG) + resist + spirit + 2 Ascendancy
