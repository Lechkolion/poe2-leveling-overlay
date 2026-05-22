// Auto-generated from Lailloken/Exile-UI (MIT licensed).
// Source: https://github.com/Lailloken/Exile-UI
// Combines areas 2.json + file-list 2.json (act-decoder POE2 layouts).
//
// levelRange format: "normal | cruel" (e.g., "5 | 6")
// layouts: filenames from img/GUI/act-decoder/zones 2/<filename>.jpg

export interface ExileAreaInfo {
  name: string         // lowercase canonical name from Exile-UI
  levelRange?: string  // "N | M" or "N" (normal | cruel)
  layouts: string[]    // layout image filenames (without path)
}

export const EXILE_BASE_URL =
  'https://raw.githubusercontent.com/Lailloken/Exile-UI/main/img/GUI/act-decoder/zones%202/'

export const EXILE_AREAS_2: Record<string, ExileAreaInfo> = {
  'g1_1': { name: 'the riverbank', layouts: [] },
  'g1_10': { name: 'root hollow', layouts: [] },
  'g1_11': { name: 'hunting grounds', levelRange: '7 | 8', layouts: ['g1_11 1.jpg', 'g1_11 2.jpg'] },
  'g1_12': { name: 'freythorn', levelRange: '8 | 9', layouts: ['g1_12 1.jpg', 'g1_12 2.jpg'] },
  'g1_13_1': { name: 'ogham farmlands', levelRange: '9 | 10', layouts: ['g1_13_1 1.jpg', 'g1_13_1 1_1.jpg', 'g1_13_1 2.jpg', 'g1_13_1 2_1.jpg', 'g1_13_1 2_1_1.jpg', 'g1_13_1 2_1_2.jpg', 'g1_13_1 2_1_3.jpg', 'g1_13_1 2_2.jpg', 'g1_13_1 2_2_1.jpg', 'g1_13_1 2_2_2.jpg', 'g1_13_1 2_3.jpg', 'g1_13_1 2_3_1.jpg', 'g1_13_1 2_3_2.jpg', 'g1_13_1 x.jpg'] },
  'g1_13_2': { name: 'ogham village', levelRange: '10 | 11', layouts: ['g1_13_2 1.jpg', 'g1_13_2 1_1.jpg', 'g1_13_2 1_1_1.jpg', 'g1_13_2 1_2.jpg', 'g1_13_2 1_2_1.jpg', 'g1_13_2 1_2_2.jpg', 'g1_13_2 1_2_3.jpg', 'g1_13_2 2.jpg', 'g1_13_2 2_1.jpg', 'g1_13_2 2_2.jpg', 'g1_13_2 2_3.jpg'] },
  'g1_14': { name: 'manor ramparts', levelRange: '11 | 12', layouts: ['g1_14 1.jpg', 'g1_14 1_1.jpg', 'g1_14 2.jpg', 'g1_14 2_1.jpg', 'g1_14 3.jpg', 'g1_14 3_1.jpg', 'g1_14 4.jpg', 'g1_14 4_1.jpg'] },
  'g1_15': { name: 'ogham manor', levelRange: '12 | 13', layouts: ['g1_15 1.jpg', 'g1_15 1_1.jpg', 'g1_15 1_1_1.jpg', 'g1_15 1_1_1_1.jpg', 'g1_15 2.jpg', 'g1_15 2_1.jpg', 'g1_15 2_1_1.jpg', 'g1_15 2_1_1_1.jpg', 'g1_15 3.jpg', 'g1_15 3_1.jpg', 'g1_15 3_1_1.jpg', 'g1_15 3_1_1_1.jpg', 'g1_15 x_x.jpg'] },
  'g1_2': { name: 'clearfell', levelRange: '2 | 2', layouts: ['g1_2 1.jpg', 'g1_2 1_1.jpg', 'g1_2 2.jpg', 'g1_2 2_1.jpg', 'g1_2 3.jpg', 'g1_2 3_1.jpg', 'g1_2 3_2.jpg', 'g1_2 3_3.jpg'] },
  'g1_3': { name: 'mud burrow', layouts: ['g1_3 1.jpg', 'g1_3 2.jpg'] },
  'g1_4': { name: 'the grelwood', levelRange: '2 | 2', layouts: ['g1_4 1.jpg', 'g1_4 2.jpg', 'g1_4 3.jpg'] },
  'g1_5': { name: 'red vale', levelRange: '2 | 4', layouts: ['g1_5 1.jpg', 'g1_5 1_1.jpg', 'g1_5 1_1_1.jpg', 'g1_5 1_2.jpg', 'g1_5 1_2_1.jpg', 'g1_5 1_3.jpg', 'g1_5 1_3_1.jpg', 'g1_5 1_4.jpg', 'g1_5 1_4_1.jpg', 'g1_5 1_5.jpg', 'g1_5 1_5_1.jpg', 'g1_5 1_6.jpg', 'g1_5 1_6_1.jpg', 'g1_5 1_7.jpg', 'g1_5 1_7_1.jpg', 'g1_5 1_8.jpg', 'g1_5 1_8_1.jpg'] },
  'g1_6': { name: 'grim tangle', levelRange: '4 | 5', layouts: ['g1_6 1.jpg', 'g1_6 1_1.jpg', 'g1_6 1_1_1.jpg', 'g1_6 1_1_2.jpg', 'g1_6 1_2.jpg', 'g1_6 1_2_1.jpg', 'g1_6 1_2_2.jpg'] },
  'g1_7': { name: 'cemetery of eternals', levelRange: '5 | 6', layouts: ['g1_7 1.jpg', 'g1_7 2.jpg', 'g1_7 3.jpg'] },
  'g1_8': { name: 'mausoleum of praetor', levelRange: '7 | 7', layouts: ['g1_8 1.jpg', 'g1_8 1_1.jpg', 'g1_8 1_2.jpg', 'g1_8 2.jpg', 'g1_8 2_1.jpg', 'g1_8 3.jpg', 'g1_8 3_1.jpg', 'g1_8 3_2.jpg', 'g1_8 4.jpg', 'g1_8 4_1.jpg', 'g1_8 5.jpg', 'g1_8 5_1.jpg', 'g1_8 5_2.jpg', 'g1_8 x.jpg', 'g1_8 x_x.jpg'] },
  'g1_9': { name: 'tomb of consort', levelRange: '6 | 7', layouts: ['g1_9 1.jpg', 'g1_9 1_1.jpg', 'g1_9 1_2.jpg', 'g1_9 1_3.jpg'] },
  'g1_town': { name: 'clearfell encampment', layouts: [] },
  'g2_1': { name: 'vastiri outskirts', levelRange: '13 | 14', layouts: ['g2_1 1.jpg', 'g2_1 1_1.jpg', 'g2_1 1_2.jpg', 'g2_1 1_3.jpg'] },
  'g2_10_1': { name: 'mawdun quarry', levelRange: '14 | 15.5', layouts: ['g2_10_1 1.jpg', 'g2_10_1 2.jpg'] },
  'g2_10_2': { name: 'mawdun mine', levelRange: '15.5 | 16.5', layouts: ['g2_10_2 1.jpg', 'g2_10_2 2.jpg', 'g2_10_2 3.jpg'] },
  'g2_12_1': { name: 'the dreadnought', levelRange: '26 | 28.5', layouts: ['g2_12_1 1.jpg'] },
  'g2_13': { name: 'trial of sekhemas', layouts: [] },
  'g2_2': { name: 'traitor\'s passage', levelRange: '16.5 | 17.5', layouts: ['g2_2 1.jpg', 'g2_2 1_1.jpg', 'g2_2 2.jpg', 'g2_2 2_1.jpg', 'g2_2 3.jpg', 'g2_2 3_1.jpg', 'g2_2 4.jpg', 'g2_2 4_1.jpg', 'g2_2 4_2.jpg'] },
  'g2_3': { name: 'halani gates', levelRange: '17.5 | 18.5', layouts: ['g2_3 1.jpg'] },
  'g2_3a': { name: 'halani gates (blocked)', layouts: [] },
  'g2_4_1': { name: 'keth', levelRange: '18.5 | 19', layouts: ['g2_4_1 1.jpg', 'g2_4_1 1_1.jpg'] },
  'g2_4_2': { name: 'lost city', levelRange: '19 | 20', layouts: ['g2_4_2 1.jpg', 'g2_4_2 1_1.jpg'] },
  'g2_4_3': { name: 'buried shrines', levelRange: '20 | 21', layouts: ['g2_4_3 1.jpg', 'g2_4_3 1_1.jpg', 'g2_4_3 1_2.jpg', 'g2_4_3 2.jpg', 'g2_4_3 2_1.jpg', 'g2_4_3 3.jpg', 'g2_4_3 3_1.jpg', 'g2_4_3 3_2.jpg', 'g2_4_3 4.jpg', 'g2_4_3 4_1.jpg', 'g2_4_3 4_2.jpg'] },
  'g2_5_1': { name: 'mastodon badlands', levelRange: '21 | 21.5', layouts: ['g2_5_1 1.jpg', 'g2_5_1 2.jpg'] },
  'g2_5_2': { name: 'bone pits', levelRange: '21.5 | 22.5', layouts: ['g2_5_2 1.jpg', 'g2_5_2 1_1.jpg', 'g2_5_2 1_2.jpg', 'g2_5_2 x_x.jpg'] },
  'g2_6': { name: 'valley of the titans', levelRange: '22.5 | 23.5', layouts: ['g2_6 1.jpg', 'g2_6 1_1.jpg', 'g2_6 1_1_1.jpg', 'g2_6 1_1_1_1.jpg', 'g2_6 1_1_2.jpg', 'g2_6 1_1_2_1.jpg', 'g2_6 1_1_3.jpg', 'g2_6 1_1_3_1.jpg', 'g2_6 1_2.jpg', 'g2_6 1_2_1.jpg', 'g2_6 1_2_1_1.jpg', 'g2_6 1_2_2.jpg', 'g2_6 1_2_2_1.jpg', 'g2_6 1_2_3.jpg', 'g2_6 1_2_3_1.jpg', 'g2_6 2.jpg', 'g2_6 2_1.jpg', 'g2_6 2_1_1.jpg', 'g2_6 2_1_1_1.jpg', 'g2_6 2_1_2.jpg', 'g2_6 2_1_2_1.jpg', 'g2_6 2_1_3.jpg', 'g2_6 2_1_3_1.jpg', 'g2_6 2_2.jpg', 'g2_6 2_2_1.jpg', 'g2_6 2_2_1_1.jpg', 'g2_6 2_2_2.jpg', 'g2_6 2_2_2_1.jpg', 'g2_6 2_2_3.jpg', 'g2_6 2_2_3_1.jpg'] },
  'g2_7': { name: 'titan grotto', levelRange: '23.5 | 24', layouts: ['g2_7 1.jpg', 'g2_7 2.jpg'] },
  'g2_8': { name: 'deshar', levelRange: '24 | 25', layouts: ['g2_8 1.jpg', 'g2_8 1_1.jpg', 'g2_8 1_2.jpg', 'g2_8 x_x.jpg'] },
  'g2_9_1': { name: 'path of mourning', levelRange: '25 | 25', layouts: ['g2_9_1 1.jpg', 'g2_9_1 2.jpg'] },
  'g2_9_2': { name: 'spires of deshar', levelRange: '25 | 26', layouts: ['g2_9_2 1.jpg', 'g2_9_2 2.jpg', 'g2_9_2 3.jpg'] },
  'g2_town': { name: 'ardura caravan', layouts: [] },
  'g3_1': { name: 'sandswept marsh', levelRange: '28.5 | 29', layouts: ['g3_1 1.jpg', 'g3_1 1_1.jpg', 'g3_1 1_2.jpg', 'g3_1 x_x.jpg'] },
  'g3_10_airlock': { name: 'temple of chaos', layouts: [] },
  'g3_11': { name: 'apex of filth', levelRange: '36 | 37', layouts: ['g3_11 1.jpg', 'g3_11 1_1.jpg', 'g3_11 2.jpg', 'g3_11 2_1.jpg', 'g3_11 x_x.jpg'] },
  'g3_12': { name: 'temple of kopec', levelRange: '37 | 38', layouts: ['g3_12 1.jpg', 'g3_12 2.jpg'] },
  'g3_14': { name: 'utzaal', levelRange: '38 | 39', layouts: ['g3_14 1.jpg', 'g3_14 2.jpg'] },
  'g3_16': { name: 'aggorat', levelRange: '39 | 40', layouts: ['g3_16 1.jpg', 'g3_16 2.jpg', 'g3_16 x.jpg'] },
  'g3_17': { name: 'black chambers', levelRange: '40 | 41', layouts: ['g3_17 1.jpg'] },
  'g3_2_1': { name: 'infested barrens', levelRange: '30 | 31', layouts: ['g3_2_1 1.jpg', 'g3_2_1 2.jpg', 'g3_2_1 x.jpg'] },
  'g3_2_2': { name: 'matlan waterways', levelRange: '34 | 35', layouts: [] },
  'g3_3': { name: 'jungle ruins', levelRange: '29 | 30', layouts: ['g3_3 1.jpg', 'g3_3 1_1.jpg', 'g3_3 1_1_1.jpg', 'g3_3 1_1_1_1.jpg', 'g3_3 1_1_2.jpg', 'g3_3 1_1_2_1.jpg', 'g3_3 1_1_2_2.jpg', 'g3_3 1_1_3.jpg', 'g3_3 1_1_3_1.jpg', 'g3_3 1_1_4.jpg', 'g3_3 1_1_4_1.jpg', 'g3_3 2.jpg', 'g3_3 2_1.jpg', 'g3_3 2_1_1.jpg', 'g3_3 2_1_1_1.jpg', 'g3_3 2_1_2.jpg', 'g3_3 2_1_2_1.jpg', 'g3_3 2_1_3.jpg', 'g3_3 2_1_3_1.jpg', 'g3_3 2_2.jpg', 'g3_3 2_2_1.jpg', 'g3_3 2_2_1_1.jpg', 'g3_3 2_2_1_2.jpg', 'g3_3 2_2_2.jpg', 'g3_3 2_2_2_1.jpg', 'g3_3 x_x_x_x.jpg'] },
  'g3_4': { name: 'venom crypts', levelRange: '31 | 31', layouts: ['g3_4 1.jpg', 'g3_4 2.jpg', 'g3_4 3.jpg'] },
  'g3_5': { name: 'chimeral wetlands', levelRange: '32 | 33', layouts: ['g3_5 1.jpg', 'g3_5 2.jpg', 'g3_5 3.jpg'] },
  'g3_6_1': { name: 'jiquani\'s machinarium', levelRange: '33 | 33', layouts: ['g3_6_1 1.jpg', 'g3_6_1 2.jpg'] },
  'g3_6_2': { name: 'jiquani\'s sanctum', levelRange: '33 | 34', layouts: ['g3_6_2 1.jpg'] },
  'g3_7': { name: 'azak bog', levelRange: '31 | 32', layouts: ['g3_7 1.jpg', 'g3_7 2.jpg'] },
  'g3_8': { name: 'drowned city', levelRange: '35 | 36', layouts: ['g3_8 1.jpg', 'g3_8 1_1.jpg', 'g3_8 x.jpg', 'g3_8 x_x.jpg'] },
  'g3_9': { name: 'molten vault', levelRange: '37 | 37', layouts: ['g3_9 1.jpg'] },
  'g3_town': { name: 'ziggurat encampment', layouts: [] },
  'g4_10': { name: 'the excavation', levelRange: '46 | 47', layouts: ['g4_10 1.jpg', 'g4_10 2.jpg', 'g4_10 3.jpg'] },
  'g4_11_1a': { name: 'ngakanu', layouts: [] },
  'g4_11_1b': { name: 'ngakanu (hostile)', levelRange: '47 | 47', layouts: ['g4_11_1b 1.jpg', 'g4_11_1b 2.jpg'] },
  'g4_11_2': { name: 'heart of the tribe', levelRange: '47 | 48', layouts: ['g4_11_2 1.jpg', 'g4_11_2 1_1.jpg', 'g4_11_2 2.jpg', 'g4_11_2 2_1.jpg', 'g4_11_2 3.jpg', 'g4_11_2 3_1.jpg'] },
  'g4_13': { name: 'plunder\'s point', layouts: [] },
  'g4_1_1': { name: 'isle of kin', levelRange: '43 | 44', layouts: ['g4_1_1 1.jpg', 'g4_1_1 2.jpg', 'g4_1_1 3.jpg'] },
  'g4_1_2': { name: 'volcanic warrens', levelRange: '44 | 44', layouts: ['g4_1_2 1.jpg', 'g4_1_2 2.jpg', 'g4_1_2 3.jpg'] },
  'g4_2_1': { name: 'kedge bay', levelRange: '41 | 41', layouts: ['g4_2_1 1.jpg'] },
  'g4_2_2': { name: 'journey\'s end', levelRange: '41 | 42', layouts: ['g4_2_2 1.jpg', 'g4_2_2 2.jpg'] },
  'g4_3_1': { name: 'whakapanu island', levelRange: '42 | 42', layouts: ['g4_3_1 1.jpg', 'g4_3_1 2.jpg', 'g4_3_1 3.jpg'] },
  'g4_3_2': { name: 'singing caverns', levelRange: '42 | 42', layouts: ['g4_3_2 1.jpg', 'g4_3_2 2.jpg', 'g4_3_2 3.jpg'] },
  'g4_4_1': { name: 'eye of hinekora', levelRange: '45 | 45', layouts: ['g4_4_1 1.jpg', 'g4_4_1 x.jpg'] },
  'g4_4_2': { name: 'halls of the dead', levelRange: '45 | 46', layouts: ['g4_4_2 1.jpg', 'g4_4_2 x.jpg'] },
  'g4_4_3': { name: 'trial of the ancestors', layouts: [] },
  'g4_5_1': { name: 'abandoned prison', levelRange: '42 | 43', layouts: ['g4_5_1 1.jpg', 'g4_5_1 1_1.jpg', 'g4_5_1 2.jpg', 'g4_5_1 2_1.jpg', 'g4_5_1 3.jpg', 'g4_5_1 3_1.jpg', 'g4_5_1 4.jpg', 'g4_5_1 4_1.jpg', 'g4_5_1 x.jpg', 'g4_5_1 x_x.jpg'] },
  'g4_5_2': { name: 'solitary confinement', levelRange: '43 | 43', layouts: ['g4_5_2 1.jpg'] },
  'g4_7': { name: 'shrike island', levelRange: '44 | 45', layouts: ['g4_7 1.jpg'] },
  'g4_8a': { name: 'arastas', layouts: [] },
  'g4_8b': { name: 'arastas (hostile)', levelRange: '46 | 46', layouts: ['g4_8b 1.jpg', 'g4_8b 1_1.jpg', 'g4_8b 1_2.jpg', 'g4_8b x.jpg', 'g4_8b x_x.jpg'] },
  'g4_town': { name: 'kingsmarch', layouts: [] },
  'g_endgame_town': { name: 'ziggurat refuge', layouts: [] },
  'p1_1': { name: 'scorched farmlands', layouts: [] },
  'p1_2': { name: 'stones of serle', layouts: [] },
  'p1_3': { name: 'the blackwood', layouts: [] },
  'p1_4': { name: 'holten', layouts: [] },
  'p1_5': { name: 'wolvenhold', layouts: [] },
  'p1_6': { name: 'holten estate', layouts: [] },
  'p1_town': { name: 'the refuge', layouts: [] },
  'p2_1': { name: 'khari crossing', layouts: [] },
  'p2_2': { name: 'pools of khatal', layouts: [] },
  'p2_3': { name: 'sel khari sanctuary', layouts: [] },
  'p2_5': { name: 'galai gates', layouts: [] },
  'p2_6': { name: 'qimah', layouts: [] },
  'p2_7': { name: 'qimah reservoir', layouts: [] },
  'p2_town': { name: 'khari bazaar', layouts: [] },
  'p3_1': { name: 'ashen forest', layouts: [] },
  'p3_2': { name: 'kriar village', layouts: [] },
  'p3_3': { name: 'glacial tarn', layouts: [] },
  'p3_4': { name: 'howling caves', layouts: [] },
  'p3_5': { name: 'kriar peaks', layouts: [] },
  'p3_6': { name: 'etched ravine', layouts: [] },
  'p3_7': { name: 'cuachic vault', layouts: [] },
  'p3_town': { name: 'the glade', layouts: [] },
}

/** Parse "5 | 6" or "37.5 | 38" -> { normal, cruel } */
export function parseLevelRange(range?: string): { normal?: number; cruel?: number } {
  if (!range) return {}
  const parts = range.split('|').map(s => s.trim()).map(Number)
  return { normal: parts[0], cruel: parts[1] }
}
