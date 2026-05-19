// Korean → English zone name translation map for Kakao client
// The Kakao client logs zone names in Korean regardless of UI language setting.
// TIP: In POE2 Options → Language → English will make logs use English names
//      and this map becomes unnecessary.
//
// Confirmed via live log:  클리어펠 야영지 = Clearfell Encampment
// Others derived from phonetic transliteration + Korean translation.

export const KO_ZONE_MAP: Record<string, string> = {

  // ── Act 1 ──────────────────────────────────────────────────────────────
  '리버뱅크':           'The Riverbank',
  '클리어펠':           'Clearfell',
  '클리어펠 야영지':    'Clearfell Encampment',   // ✓ confirmed
  '진흙 굴':            'The Mud Burrow',
  '그렐우드':           'The Grelwood',
  '붉은 계곡':          'The Red Vale',
  '음산한 엉킴':        'The Grim Tangle',
  '영원의 묘지':        'Cemetery of the Eternals',
  '왕비의 무덤':        'Tomb of the Consort',
  '집정관의 영묘':      'The Mausoleum of the Praetor',
  '사냥 구역':          'The Hunting Grounds',
  '프레이손':           'Freythorn',
  '오감 농장 지대':     'Ogham Farmlands',
  '오감 마을':          'Ogham Village',
  '저택 성가퀴':        'The Manor Ramparts',
  '오감 저택':          'Ogham Manor',

  // ── Act 2 ──────────────────────────────────────────────────────────────
  '바스티리 외곽':      'Vastiri Outskirts',
  '모둔 채석장':        'Mawdun Quarry',
  '모둔 광산':          'Mawdun Mine',
  '반역자의 통로':      "Traitor's Passage",
  '할라니 관문':        'The Halani Gates',
  '매스토돈 황무지':    'Mastodon Badlands',
  '뼈의 구덩이':        'The Bone Pits',
  '케스':               'Keth',
  '잃어버린 도시':      'The Lost City',
  '매장된 신전':        'Buried Shrines',
  '거인의 계곡':        'Valley of the Titans',
  '거인 동굴':          'The Titan Grotto',
  '데샤르':             'Deshar',
  '아르두라 대상':      'The Ardura Caravan',
  '데샤르의 첨탑':      'The Spires of Deshar',
  '드레드노트':         'The Dreadnought',
  '드레드노트 선봉대':  'Dreadnought Vanguard',

  // ── Act 3 ──────────────────────────────────────────────────────────────
  '모래 쓸린 늪':       'Sandswept Marsh',
  '정글 폐허':          'Jungle Ruins',
  '키마에라 습지':      'Chimeral Wetlands',
  '아고라트':           'Aggorat',
  '도리아니 연구소':    'Doryani\'s Laboratorium',
  '풍화된 볼트':        'Weathered Vault',
  '험준한 고지':        'Rugged Highlands',
  '험한 고지대':        'Rugged Highlands',
  '원시 야지':          'Primeval Wilderness',
  '갈라진 거인의 길':   "Titan's Passage",

  // ── Act 4 ──────────────────────────────────────────────────────────────
  '킹스마치':           'Kingsmarch',
  '와카파누':           'Whakapanu Island',
  '친족의 섬':          'Isle of Kin',
  '버려진 감옥':        'Abandoned Prison',
  '슈라이크':           'Shrike Island',
  '얼음 동굴':          'Howling Caves',
  '아라스타':           'Arastas',
  '죽은 자의 홀':       'Halls of the Dead',
  '울부짖는 동굴':      'Howling Caves',
  '볼벤홀드':           'Wolvenhold',

  // ── Interludes ─────────────────────────────────────────────────────────
  '불탄 농장 지대':     'Scorched Farmlands',
  '카리 교차로':        'The Khari Crossing',
  '재의 숲':            'Ashen Forest',
}

/** Translate a Korean log zone name to its English equivalent.
 *  Returns the original name if no mapping found. */
export function translateZoneName(name: string): string {
  return KO_ZONE_MAP[name] ?? name
}
