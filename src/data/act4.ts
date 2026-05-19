import type { GuideStep, ZoneEntry } from './types'

// POE2 Act 4 — The Northern Isles (Ngamakanui Archipelago)
// Hub: Kingsmarch (NPCs: Tujen, Kaimana, Ange, Dannig, Makoru)
// Act Boss: Tavakai, the Consumed (Heart of the Tribe)
// STRUCTURE: Non-linear — 4 islands must be completed before Arastas unlocks

export const ACT4_ZONES: ZoneEntry[] = [
  { logName: 'Kingsmarch',              actId: 4, isHub: true, hasWaypoint: true },
  { logName: 'Kedge Bay',               actId: 4 },         // Dark Mists quest start
  { logName: "Journey's End",           actId: 4 },         // Dark Mists boss
  { logName: 'Whakapanu Island',        actId: 4 },
  { logName: 'Singing Caverns',         actId: 4 },
  { logName: 'Isle of Kin',             actId: 4 },
  { logName: 'Volcanic Warrens',        actId: 4 },
  { logName: 'Abandoned Prison',        actId: 4 },
  { logName: 'Solitary Confinement',    actId: 4 },
  { logName: 'Shrike Island',           actId: 4 },
  { logName: 'Eye of Hinekora',         actId: 4 },         // Navali +5% MaxMana + Trial of Ancestors
  { logName: 'Halls of the Dead',       actId: 4 },
  { logName: 'Trial of the Ancestors',  actId: 4 },         // Navali awards +2 SP here
  { logName: 'Arastas',                 actId: 4 },         // Unlocks after 4 islands done
  { logName: 'The Excavation',          actId: 4 },
  { logName: 'Ngakanu',                 actId: 4 },
  { logName: 'Heart of the Tribe',      actId: 4 },
]

export const ACT4_STEPS: GuideStep[] = [

  // ─── KINGSMARCH (Hub) ────────────────────────────────────────────────────
  {
    id: 'a4-01',
    zone: 'Kingsmarch',
    actId: 4,
    type: 'waypoint',
    instruction: 'Arrive in Act 4 — activate Kingsmarch Waypoint.',
    questName: 'The Search',
    questType: 'main',
    isQuestStart: true
  },
  {
    id: 'a4-02',
    zone: 'Kingsmarch',
    actId: 4,
    type: 'talk',
    instruction: 'Talk to all Kingsmarch NPCs — grab ALL quests. Critical: Dark Mists (Tujen), Land of the Kin (available after Isle of Kin), Trial of Ancestors (after freeing Matiki).',
    detail: 'NPCs: Tujen (Dark Mists quest), Kaimana (Tribal Medicine — skip), Ange (Hostile Takeover — skip), Dannig, Makoru. Grab "The Search" main quest.'
  },
  {
    id: 'a4-03',
    zone: 'Kingsmarch',
    actId: 4,
    type: 'note',
    instruction: 'ACT 4 IS NON-LINEAR — islands can be done in multiple orders. Best order: Whakapanu → Abandoned Prison → Isle of Kin → Shrike Island. Do Dark Mists (Kedge Bay) in parallel. IMPORTANT: Do Whakapanu Shark Pit (Great White One) BEFORE Arastas or only after full main quest is done.',
    detail: 'Act 4 islands are non-linear — you select them from the boat charter and can do them in any order. However, some content has order dependencies (e.g. Shark Fin turn-in must be before Arastas or after all main quests).',
    speedrunNote: 'Optimal order: Dark Mists (Kedge Bay) → Whakapanu → Prison → Isle of Kin → Shrike → Eye of Hinekora → Halls of Dead → Arastas'
  },

  // ─── KEDGE BAY / JOURNEY'S END (Dark Mists — +2 SP) ─────────────────────
  {
    id: 'a4-04',
    zone: 'Kedge Bay',
    actId: 4,
    type: 'move',
    instruction: 'MUST DO: Enter Kedge Bay — find the entrance to Journey\'s End (Dark Mists quest).',
    questName: 'Dark Mists',
    questType: 'side',
    isQuestStart: true,
    detail: 'Talk to Tujen in Kingsmarch first to get "Dark Mists". The quest takes you to Journey\'s End via Kedge Bay.',
    speedrunNote: 'MUST DO — +2 skill points.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Journey\'s End portal is in the northeast of Kedge Bay',
      exitHint: 'Misty arch with dark energy',
      tips: ['Kedge Bay is foggy — use minimap', 'Dense enemy patrols near the portal']
    }
  },
  {
    id: 'a4-05',
    zone: "Journey's End",
    actId: 4,
    type: 'talk',
    instruction: 'Summon and speak to Tujen at the beginning of Journey\'s End.',
    questName: 'Dark Mists',
    questType: 'side',
  },
  {
    id: 'a4-05b',
    zone: "Journey's End",
    actId: 4,
    type: 'kill',
    instruction: 'Find the Captain\'s Chair — kill Captain Hartlin and loot the Verisium.',
    questName: 'Dark Mists',
    questType: 'side',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Captain\'s Chair is in the main cabin/command area',
      exitHint: 'Loot the Verisium from Hartlin\'s corpse',
      tips: ['Captain Hartlin is a strong elite — burst him down']
    }
  },
  {
    id: 'a4-05c',
    zone: "Journey's End",
    actId: 4,
    type: 'talk',
    instruction: 'Go back to the beginning of Journey\'s End — talk to Freya Hartlin.',
    questName: 'Dark Mists',
    questType: 'side',
  },
  {
    id: 'a4-05d',
    zone: 'Kingsmarch',
    actId: 4,
    type: 'talk',
    instruction: 'Go back to town — speak with Dannig and take the Verisium Spikes.',
    questName: 'Dark Mists',
    questType: 'side',
  },
  {
    id: 'a4-05e',
    zone: "Journey's End",
    actId: 4,
    type: 'interact',
    instruction: 'Return to Journey\'s End — talk to Freya Hartlin again. Impale one of the totems, then kill Omniphobia.',
    questName: 'Dark Mists',
    questType: 'side',
    detail: 'Talk to Freya again, then use the Verisium Spikes to impale one of the totems. This summons Omniphobia. Kill Omniphobia to complete the quest.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Totems are in the main open area — impale one with the Verisium Spikes',
      exitHint: 'After Omniphobia kill: port back to town',
      tips: ['Impale totem first, then fight Omniphobia', 'Fear aura boss — look for safe zones at the arena edges', 'Phase 2: rapid projectiles — keep moving']
    }
  },
  {
    id: 'a4-06',
    zone: 'Kingsmarch',
    actId: 4,
    type: 'talk',
    instruction: 'Port back to town — speak with Tujen to complete Dark Mists (+2 Passive Skill Points + level 13 skill gem).',
    questName: 'Dark Mists',
    questType: 'side',
    isQuestComplete: true,
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points + level 13 skill gem' }
  },

  // ─── WHAKAPANU ISLAND ────────────────────────────────────────────────────
  {
    id: 'a4-07',
    zone: 'Whakapanu Island',
    actId: 4,
    type: 'kill',
    instruction: 'OPTIONAL (IMPORTANT TIMING): Find the Shark Pit — kill the Great White One and loot the Shark Fin. MUST do this BEFORE Arastas, or only after the entire main quest is done.',
    optional: true,
    questName: 'The Great White One',
    questType: 'side',
    reward: { type: 'stat_bonus', description: 'Shark Fin — turn in at Kaimana in Ngakanu for choice of 1 of 3 uncut gems' },
    detail: 'CRITICAL TIMING: The Shark Fin from the Great White One must be turned in at Kaimana (Medicine Circle, Ngakanu) BEFORE doing Arastas, or alternatively only AFTER completing the entire main quest. Do not do Arastas first and then try to turn in.',
    speedrunNote: 'Do Shark Pit now (before Arastas) to get the gem reward from Kaimana later.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Shark Pit is a sub-area on Whakapanu Island',
      exitHint: 'Great White One is inside the Shark Pit',
      tips: ['IMPORTANT: Do this before Arastas or only after full main quest', 'Turn in at Kaimana in Ngakanu later']
    }
  },
  {
    id: 'a4-07b',
    zone: 'Singing Caverns',
    actId: 4,
    type: 'interact',
    instruction: 'OPTIONAL: Find the Beckoning Clam and complete the counter — turn in at Rog for a rare amulet with +8 all elemental resistance.',
    optional: true,
    questName: 'The Beckoning Clam',
    questType: 'side',
    reward: { type: 'stat_bonus', description: 'Rare amulet with +8 all elemental resistance (turn in at Rog)' },
  },
  {
    id: 'a4-08',
    zone: 'Singing Caverns',
    actId: 4,
    type: 'kill',
    instruction: 'Kill Diamora, Song of Death in the Singing Caverns (The Search main quest).',
    questName: 'The Search',
    questType: 'main',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Diamora is in the Chamber of Echoes — deepest part of the caverns',
      exitHint: 'After kill: Whakapanu island cleared',
      tips: ['Diamora uses sonic AoE — move away from expanding rings', 'Water pools throughout — avoid getting cornered']
    }
  },

  // ─── ABANDONED PRISON ────────────────────────────────────────────────────
  {
    id: 'a4-08b',
    zone: 'Kingsmarch',
    actId: 4,
    type: 'portal',
    instruction: 'After Diamora: return to ship (top-left UI button) → select Abandoned Prison island.',
    questName: 'The Search',
    questType: 'main'
  },
  {
    id: 'a4-09',
    zone: 'Abandoned Prison',
    actId: 4,
    type: 'kill',
    instruction: 'Kill monsters until the Chapel Key drops — then find and open the Chapel Door and kill the rare inside.',
    questName: 'Goddess of Justice',
    questType: 'side',
    reward: { type: 'stat_bonus', description: 'Choose: +30% increased Mana Recovery from Flasks OR +30% Life Recovery from Flasks (can be changed later)' },
    detail: 'Step 1: Kill monsters until the Chapel Key drops. Step 2: Find and open the Chapel Door. Step 3: Kill the rare monster inside the chapel. This grants the permanent flask recovery bonus. NOTE: This choice CAN be changed later.',
    speedrunNote: 'DO IT — permanently better flasks. Choice can be changed later.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Kill monsters anywhere in the prison for the Chapel Key drop, then find the Chapel Door',
      exitHint: 'Chapel is in the deeper section of the prison',
      tips: ['Chapel Key is a monster drop — keep killing until it appears', 'Open Chapel Door, kill the rare, get the buff choice', 'Choice CAN be changed later unlike some other permanent rewards']
    }
  },
  {
    id: 'a4-10',
    zone: 'Solitary Confinement',
    actId: 4,
    type: 'kill',
    instruction: 'Find the exit from Abandoned Prison → enter Solitary Confinement. Kill The Prisoner (main quest boss). After kill: return to ship.',
    questName: 'The Search',
    questType: 'main',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Deepest cell in Solitary Confinement',
      exitHint: 'After kill: prison island cleared',
      tips: ['Cursed prisoner — multiple curses applied, move fast to avoid stacking', 'High damage phase at low HP']
    }
  },

  // ─── ISLE OF KIN ────────────────────────────────────────────────────────
  {
    id: 'a4-10a',
    zone: 'Kingsmarch',
    actId: 4,
    type: 'portal',
    instruction: 'After The Prisoner: return to ship → select Isle of Kin.',
    questName: 'The Search',
    questType: 'main'
  },
  {
    id: 'a4-10b',
    zone: 'Isle of Kin',
    actId: 4,
    type: 'interact',
    instruction: 'OPTIONAL: Find the Voltaxic Spire (big sulphur rock) — grants zone-buff: 30% Movement, 30% damage as extra Lightning, 15% Elemental Resistances.',
    questName: 'Isle of Kin Bonuses',
    questType: 'side',
    optional: true,
    detail: 'Zone-buff only (not permanent). Massively boosts clear speed for the rest of Isle of Kin.',
    reward: { type: 'stat_bonus', description: '+30% Move / +30% extra Lightning dmg / +15% Ele Res (zone-duration only)' }
  },
  {
    id: 'a4-10c',
    zone: 'Isle of Kin',
    actId: 4,
    type: 'kill',
    instruction: 'OPTIONAL: Find Beast Pen — free and kill Mimbok the Enslaved.',
    questName: 'Isle of Kin Bonuses',
    questType: 'side',
    optional: true,
    reward: { type: 'stat_bonus', description: 'lvl 12 uncut skill gem + lvl 4 uncut support gem' },
    detail: 'Side encounter. Free Mimbok from the pen, then kill it for the gem drops.'
  },
  {
    id: 'a4-11',
    zone: 'Isle of Kin',
    actId: 4,
    type: 'kill',
    instruction: 'Kill Krutog, Lord of Kin (main quest). Free Matiki nearby.',
    questName: 'The Search',
    questType: 'main',
    detail: 'Krutog is in the Volcanic Warrens below. Free Matiki (cage in main area) after Krutog dies.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Krutog in Volcanic Warrens below island surface. Matiki in a cage on the surface.',
      exitHint: 'Warrens entrance is in the center of the isle',
      tips: ['Kill Krutog first, then come back up to free Matiki']
    }
  },
  {
    id: 'a4-12',
    zone: 'Volcanic Warrens',
    actId: 4,
    type: 'kill',
    instruction: 'Descend into Volcanic Warrens (center of Isle of Kin). Kill Krutog, Lord of Kin at the Tyrant\'s Throne. After kill: return to Isle of Kin surface to free Matiki.',
    questName: 'The Search',
    questType: 'main',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Boss in the largest chamber at the base',
      exitHint: 'Lava-bordered chamber with stone throne',
      tips: ['Fire/lava zone — fire resistance essential', 'Krutog: molten slam attack — dodge to the side']
    }
  },
  {
    id: 'a4-13',
    zone: 'Isle of Kin',
    actId: 4,
    type: 'interact',
    instruction: 'Free Matiki from her cage on Isle of Kin. Talk to her — accept "Land of the Kin" and "Trial of the Ancestors".',
    questName: 'Land of the Kin',
    questType: 'side',
    isQuestStart: true,
    detail: 'Matiki gives: Land of the Kin (→ Beast Pens → Blind Beast → +2 SP) and Trial of the Ancestors (→ Eye of Hinekora → +2 SP + tattoos).',
    speedrunNote: 'MUST talk to Matiki — unlocks +6 more skill points total'
  },

  // ─── LAND OF THE KIN (Isle of Kin Beast Pens — +2 SP) ───────────────────
  {
    id: 'a4-14',
    zone: 'Isle of Kin',
    actId: 4,
    type: 'kill',
    instruction: 'MUST DO: Find and kill The Blind Beast in the Beast Pens (Isle of Kin side area).',
    questName: 'Land of the Kin',
    questType: 'side',
    isQuestComplete: true,
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points (Book of Specialisation)' },
    speedrunNote: 'MUST DO — +2 passive points. Beast Pens is a sub-area of Isle of Kin.',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Beast Pens is a fenced sub-area on the island',
      exitHint: 'Blind Beast is in the largest pen at the back',
      tips: ['Blind creature = uses sound to locate you — move erratically', 'Silence effects help significantly']
    }
  },

  // ─── SHRIKE ISLAND ───────────────────────────────────────────────────────
  {
    id: 'a4-14b',
    zone: 'Kingsmarch',
    actId: 4,
    type: 'portal',
    instruction: 'After Blind Beast: return to ship → select Shrike Island.',
    questName: 'The Search',
    questType: 'main'
  },
  {
    id: 'a4-15',
    zone: 'Shrike Island',
    actId: 4,
    type: 'kill',
    instruction: 'Kill Scourge of the Skies (main quest boss for Shrike Island).',
    questName: 'The Search',
    questType: 'main',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Boss in an open clearing at the island\'s center',
      exitHint: 'After kill: Shrike cleared, Arastas unlocks',
      tips: ['Aerial attacks — watch for shadow pattern on ground marking incoming dive', 'Keep moving at all times']
    }
  },

  // ─── EYE OF HINEKORA (Navali + Trial of Ancestors) ──────────────────────
  {
    id: 'a4-15b',
    zone: 'Kingsmarch',
    actId: 4,
    type: 'talk',
    instruction: 'After Shrike: return to ship → talk to Matiki on the boat → unlocks Eye of Hinekora. Select Eye of Hinekora.',
    detail: 'Eye of Hinekora is NOT in the boat menu by default — Matiki must be spoken to first after freeing her on Isle of Kin.',
    questName: 'The Search',
    questType: 'main',
  },
  {
    id: 'a4-16',
    zone: 'Eye of Hinekora',
    actId: 4,
    type: 'interact',
    instruction: 'MUST DO: Progress through the cavern completing each test of mettle encounter. Find the Silent Hall and "pay respects" (Talk to Navali) for +5% Maximum Mana. Then find the exit to the Hall of the Dead.',
    questName: "Navali's Gift",
    questType: 'side',
    reward: { type: 'stat_bonus', description: '+5% Maximum Mana (permanent) — from Silent Hall / pay respects interaction' },
    speedrunNote: 'DO IT — +5% max mana is permanent. Silent Hall is in this zone.',
    detail: 'Progress through the Eye of Hinekora by completing each test of mettle encounter. When you find the Silent Hall, interact to "pay respects" — Navali is here and talking to her grants +5% Maximum Mana. Then find the exit to the Hall of the Dead.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Complete tests of mettle as you go, then find the Silent Hall for the mana bonus',
      exitHint: 'Hall of the Dead exit is at the end of the zone',
      tips: ['Complete each test of mettle encounter — do not skip', 'Find the Silent Hall — interact / pay respects for +5% max mana', 'Talk to Navali in the Silent Hall', 'Then exit to Hall of the Dead']
    }
  },
  {
    id: 'a4-17',
    zone: 'Halls of the Dead',
    actId: 4,
    type: 'kill',
    instruction: 'Find the three tests (Tawhoa, Tasalio, Ngamahu) and loot blank tattoos. Then find Yama\'s Test — kill Yama the White and loot the silver coin. Then exit to Trial of the Ancestors.',
    questName: 'Trial of the Ancestors',
    questType: 'side',
    isQuestStart: true,
    speedrunNote: 'MUST DO — get all 3 blank tattoos + kill Yama, then do Trial of Ancestors (Navali awards +2 SP).',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Three test areas (Tawhoa/Tasalio/Ngamahu) spread through the halls; Yama is at the end',
      exitHint: 'Exit to Trial of the Ancestors after Yama',
      tips: ['Collect blank tattoos from each of the 3 tests', 'Kill Yama the White at the end — loot silver coin', 'Yama: powerful cold attacks — cold resistance critical', 'Phase 2: screen-wide frost explosion — flask up']
    }
  },
  {
    id: 'a4-17b',
    zone: 'Halls of the Dead',
    actId: 4,
    type: 'interact',
    instruction: 'MUST DO — WARNING PERMANENT: Turn in blank tattoos at the Totem in the Arena. REWARD CANNOT BE CHANGED LATER. Choices: Tawhoa (5 Dex OR 5% lightning res) | Tasalio (5 Int OR 5% cold res) | Ngamahu (5 Str OR 5% fire res).',
    questType: 'side',
    reward: { type: 'stat_bonus', description: 'PERMANENT tattoo stat bonus — CANNOT be changed (3 separate choices)' },
    detail: 'CRITICAL WARNING: These tattoo choices are PERMANENT AND CANNOT BE CHANGED LATER. Choices per totem: Tawhoa = 5 Dex OR 5% lightning res | Tasalio = 5 Int OR 5% cold res | Ngamahu = 5 Str OR 5% fire res.',
    speedrunNote: 'PERMANENT — decide before you click. Stat vs resistance depends on your build needs.',
  },
  {
    id: 'a4-18',
    zone: 'Trial of the Ancestors',
    actId: 4,
    type: 'interact',
    instruction: 'Talk to Navali in the Trial of the Ancestors — receive the Tattoo of Hinekora (+2 Passive Skill Points).',
    questName: 'Trial of the Ancestors',
    questType: 'side',
    isQuestComplete: true,
    reward: { type: 'skill_point', amount: 2, description: '+2 Passive Skill Points (Tattoo of Hinekora)' },
    speedrunNote: 'Talk to Navali — quick interaction for 2 skill points.'
  },

  // ─── ARASTAS (unlocks after all 4 islands done) ──────────────────────────
  {
    id: 'a4-18b',
    zone: 'Kingsmarch',
    actId: 4,
    type: 'portal',
    instruction: 'Return to ship → 3 main islands complete → Arastas now unlocks on the boat menu. Select Arastas. (Also talk to Missionary Lorandis in town first to accept Arastas quest.)',
    questName: 'The Search',
    questType: 'main'
  },
  {
    id: 'a4-19',
    zone: 'Arastas',
    actId: 4,
    type: 'kill',
    instruction: 'Enter Arastas (selected from boat menu). Talk to Missionary Lorandis → follow him into the church → break the forcefield with any attack. Kill everyone, then continue to the Excavated Pit and kill Torvian, Hand of the Saviour.',
    questName: 'The Search',
    questType: 'main',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Boss in the main chamber of Arastas',
      exitHint: 'After kill: proceed to The Excavation',
      tips: ['Crusader/paladin type boss — holy damage', 'Phase 2: arena shrinks with barriers']
    }
  },

  // ─── EXCAVATION + NGAKANU ────────────────────────────────────────────────
  {
    id: 'a4-20',
    zone: 'The Excavation',
    actId: 4,
    type: 'kill',
    instruction: 'Enter The Excavation (past Torvian\'s arena in Arastas). Find the Excavated Pit / Precursor Forge and kill Benedictus, First Herald of Utopia. After kill: witness lore events → talk to the Hooded One → portal back to town.',
    questName: 'The Search',
    questType: 'main',
    miniMap: {
      layoutType: 'dungeon',
      objectiveHint: 'Benedictus is in the Excavated Site beneath The Excavation',
      exitHint: 'Dig down — Excavated Site is the sub-level',
      tips: ['Holy/celestial attacks — avoid standing in light columns']
    }
  },
  {
    id: 'a4-21',
    zone: 'Ngakanu',
    actId: 4,
    type: 'move',
    instruction: 'In Ngakanu: if you have the Shark Fin from Whakapanu, find the Medicine Circle and talk to Kaimana to turn it in (choose 1 of 3 uncut gems). IMPORTANT: Only if done before Arastas or after main quest. Then find and enter the Heart of the Tribe.',
    detail: 'If you killed the Great White One on Whakapanu and have the Shark Fin, find the Medicine Circle in Ngakanu. Talk to Kaimana to turn in the Shark Fin for a choice of 1 of 3 uncut gems. TIMING: Must be done before Arastas or only after the entire main quest is completed.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Medicine Circle (Kaimana) is in the outer area of Ngakanu; Heart of the Tribe is at the center',
      exitHint: 'Massive ritual arena at the center',
      tips: ['Turn in Shark Fin at Medicine Circle with Kaimana first if you have it', 'Then enter Heart of the Tribe']
    }
  },

  // ─── HEART OF THE TRIBE (Act 4 Boss) ─────────────────────────────────────
  {
    id: 'a4-22',
    zone: 'Heart of the Tribe',
    actId: 4,
    type: 'kill',
    instruction: 'Kill Tavakai, the Consumed — Act 4 Final Boss.',
    questName: 'The Search',
    questType: 'main',
    isQuestComplete: true,
    detail: 'Tavakai has 3 phases. Phase 1: tribal warrior form. Phase 2 (~60%): Consumed form, chaos attacks. Phase 3 (~25%): full chaos explosion — the hardest phase.',
    miniMap: {
      layoutType: 'open',
      objectiveHint: 'Circular ritual arena — boss in center',
      exitHint: 'Portal to Interlude 1 after kill',
      tips: [
        'Phase 2: chaos damage — chaos resistance helps',
        'Phase 3: stay at the arena edge during the explosion',
        'Adds spawn in Phase 2 — clear priority adds before focusing boss',
        'All flasks on Phase 3 immediately'
      ]
    },
    speedrunNote: 'With Ascendancy fully done + 14 skill points: this is very fast. Blast through phases.'
  },
  {
    id: 'a4-23',
    zone: 'Heart of the Tribe',
    actId: 4,
    type: 'portal',
    instruction: 'Act 4 Complete! Enter portal to Interlude 1 (Curse of Holten).',
    questName: 'The Search',
    questType: 'main'
  }
]

// ACT 4 PERMANENT REWARDS SUMMARY:
// ✦ Dark Mists quest (Journey's End) → +2 Passive Skill Points ← MUST DO
// ✦ Land of the Kin (Blind Beast, Beast Pens) → +2 Passive Skill Points ← MUST DO
// ✦ Trial of the Ancestors (Yama the White) → +2 Passive Skill Points ← MUST DO
// ✦ Navali (Eye of Hinekora) → +5% Maximum Mana ← MUST DO
// ✦ Hinekora Totems × 3 → stat/resistance choices ← MUST DO
// ✦ Abandoned Prison → Flask Recovery choice ← MUST DO
// Total: 6 Passive Skill Points + Mana + Stats + Flask Recovery
