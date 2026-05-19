// Canonical boss + NPC name lists for QuestSteps proper-noun highlighting.
// Order matters: check zones first (most specific), then bosses, then NPCs.
// Multi-word names must appear in BOTH forms when needed (full + short).

export const BOSS_NAMES = new Set<string>([
  // Act 1
  'The Bloated Miller', 'Bloated Miller',
  'Beira of the Rotten Pack', 'Beira',
  'The Rust King', 'Rust King',
  'Brambleghast',
  'The Rotten Druid', 'Rotten Druid',
  'Ervig',
  'Asinia, Praetor Consort', 'Asinia',
  'Draven, the Eternal Praetor', 'Draven',
  'Lachlann of Endless Lament', 'Lachlann',
  'The Crowbell', 'Crowbell',
  'The Executioner', 'Executioner',
  'The King in the Mists', 'King in the Mists', 'King of the Mists',
  'Candlemass, the Living Rite', 'Candlemass',
  'Count Geonor', 'Count of Ogham',
  // Act 2
  'Rathbreaker',
  'Rudja, the Dread Engineer', 'Rudja',
  'Balbala',
  'Jamanra, the Risen King', 'Jamanra the Risen King', 'Jamanra',
  'Jamanra, the Abomination', 'Jamanra the Abomination',
  'Iktab', 'Ekbab',
  'Kabala, Constrictor Queen', 'Kabala',
  'Azarian, the Forsaken Son', 'Azarian',
  'Zalmarath, the Colossus', 'Zalmarath',
  'Tor Gul, the Defiler', 'Tor Gul',
  'Sisters of Garukhan',
  'Rattlecage, the Earthbreaker', 'Rattlecage',
  // Act 3
  'Rootdredge',
  'Mighty Silverfist', 'Silverfist',
  'Ignagduk, the Bog Witch', 'Ignagduk',
  'Xyclucian, the Chimera', 'Xyclucian',
  'Blackjaw, the Remnant', 'Blackjaw',
  'Zicoatl, Warden of the Core', 'Zicoatl',
  'Mektul, the Forgemaster', 'Mektul',
  'Queen of Filth',
  'Ketzuli, High Priest of the Sun', 'Ketzuli',
  'Viper Napuatzi', 'Napuatzi',
  'Doryani, Royal Thaumaturge', 'Doryani',
  // Act 4
  'Omniphobia',
  'Captain Hartlin', 'Hartlin', 'Freya Hartlin',
  'Diamora, Song of Death', 'Diamora',
  'The Prisoner',
  'Krutog, Lord of Kin', 'Krutog',
  'The Blind Beast', 'Blind Beast',
  'Mimbok the Enslaved', 'Mimbok',
  'Scourge of the Skies',
  'Yama the White', 'Yama',
  'Bronnach, the Manhunter', 'Bronnach',
  'Torvian, Hand of the Saviour', 'Torvian',
  'Benedictus, First Herald of Utopia', 'Benedictus',
  'Tavakai, the Consumed', 'Tavakai',
  'The Great White One', 'Great White One',
  // Interludes
  'Siora, Blade of the Mists', 'Siora',
  'Oswin, the Dread Warden', 'Oswin',
  'Lady Elswyth', 'Elswyth',
  'Thane Wulfric', 'Wulfric',
  'Akthi', 'Anundr',
  'Elzarah, the Cobra Lord', 'Elzarah',
  'Vornas, the Fell Flame', 'Vornas',
  'Lythara, the Wayward Spear', 'Lythara',
  'The Abominable Yeti', 'Abominable Yeti',
  'Architect of Dominion',
  'Stormgore, the Guardian', 'Stormgore',
  'Rakkar, the Frozen Talon', 'Rakkar',
])

export const NPC_NAMES = new Set<string>([
  // Act 1
  'Renly', 'Una', 'Finn', 'Leitis', 'Nessa',
  // Act 2
  'Asala', 'Shambrin', 'Zarka', 'Risu',
  // Act 3
  'Servi', 'Alva', 'Alva Valai', 'Oswald',
  // Act 4
  'Tujen', 'Kaimana', 'Ange', 'Dannig', 'Makoru',
  'Matiki', 'Navali', 'Rog', 'Rhodri', 'Missionary Lorandis', 'Lorandis',
  // Interludes
  'Isolde', 'Heldra', 'Azmadi', 'Elder Madox', 'Madox',
  // Generic
  'The Hooded One', 'Hooded One', 'The Sin', 'Sin',
])

export const NPC_TITLES = new Set<string>([
  'Renly', 'Una', 'Finn', 'Leitis',
  'Asala', 'Shambrin', 'Zarka', 'Risu',
  'Servi', 'Alva', 'Oswald',
  'Tujen', 'Kaimana', 'Ange', 'Dannig', 'Makoru', 'Matiki', 'Navali',
])
