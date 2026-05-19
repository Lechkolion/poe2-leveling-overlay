# POE2 Leveling Guide Overlay

Speedrun-focused campaign overlay for Path of Exile 2. Tracks zones via Client.txt log parsing, auto-advances guide steps on zone transitions, and highlights all permanent reward opportunities (skill points, ascendancy, stat bonuses).

## Quick Start

```bash
npm install
npm run dev       # development (Electron + hot-reload)
npm run build     # production build
npm run package   # create .exe installer
```

## Features

- **Zone tracking** — auto-detects zone changes from `Client.txt` (both POE2 areaId log line + `[SCENE] Set Source` fallback)
- **Kakao client support** — auto-detects `C:\Daum Games\Path of Exile2\logs\KakaoClient.txt` (and unspaced/spaced variants), with Korean → English zone translation
- **Micro-step guide** — every zone, quest, boss, and optional reward documented with explicit navigation between objectives
- **Step ordering** — numbered chips per quest (`1` `2` `3`, plus `OPT` for optional steps)
- **Color-coded proper nouns** — bosses in red, zones in teal italic, NPCs in gold
- **Reward alerts** — highlights upcoming skill points + ascendancy points within 15 steps
- **Zone layouts** — clickable thumbnail gallery + full-size modal viewer (301 layout images across 61 zones from Lailloken/Exile-UI, MIT-licensed; loaded lazily from GitHub raw, not bundled)
- **Level recommendations** — per-zone level chip (e.g., "Lv 7/8" = lvl 7 normal / lvl 8 cruel) from Exile-UI's data
- **Mini-map hints** — zone layout type, objective direction, exit hints, speedrun tips
- **Ascendancy tracking** — Trial of Sekhemas T1 (Act 2 unlock: Balbala) + Trial of Chaos T1 (Act 3 unlock: Xyclucian), with level/timing recommendations
- **Game-Icons.net icon set** — Diablo-style fantasy SVGs (CC BY 3.0)
- **All 7 campaign chapters** — Acts 1-4 + Interludes 1-3

## Hotkeys

| Key | Action |
|-----|--------|
| `Ctrl+Shift+H` | Toggle hide/show overlay |
| `Ctrl+Shift+N` | Next step |
| `Ctrl+Shift+B` | Previous step |
| `Ctrl+Shift+[` | Previous quest |
| `Ctrl+Shift+]` | Next quest |
| Click step | Mark current step done + advance |
| `Esc` (in layout modal) | Close layout viewer |
| `← / →` (in layout modal) | Cycle through zone layout variants |

A single-key "Quick Advance" hotkey can also be configured in Settings.

## Campaign Summary (26 Skill Points)

| # | Source | Zone | Reward |
|---|--------|------|--------|
| 1 | The Crowbell (optional boss) | Hunting Grounds, Act 1 | +2 SP |
| 2 | The Lost Lute (side quest) | Ogham Farmlands, Act 1 | +2 SP |
| 3 | Kabala, Constrictor Queen (optional) | Keth, Act 2 | +2 SP |
| 4 | Tradition's Toll (side quest) | Deshar, Act 2 | +2 SP |
| 5 | Mighty Silverfist (optional boss) | Jungle Ruins, Act 3 | +2 SP |
| 6 | Sacrificial Heart (RNG altar) | Aggorat, Act 3 | +2 SP |
| 7 | Dark Mists (side quest) | Journey's End, Act 4 | +2 SP |
| 8 | Land of the Kin (Blind Beast) | Isle of Kin, Act 4 | +2 SP |
| 9 | Tattoo of Hinekora (Navali) | Trial of the Ancestors, Act 4 | +2 SP |
| 10 | Oswin, Dread Warden | Wolvenhold, Interlude 1 | +2 SP |
| 11 | Clearing the Way (Akthi+Anundr) | Khari Crossing, Interlude 2 | +2 SP |
| 12 | The Abominable Yeti | Howling Caves, Interlude 3 | +2 SP |
| 13 | Hooded One (post all interludes) | Kingsmarch | +2 SP |

### Ascendancy (4 Points in Campaign)
- **First 2 points:** Kill Balbala in Traitor's Passage (Act 2) → drops Djinn Barya → Trial of the Sekhemas T1 (recommended Lv 22+, retries free)
- **Next 2 points:** Kill Xyclucian in Chimeral Wetlands (Act 3) → drops Chimeral Inscribed Ultimatum → Trial of Chaos T1 (recommended Lv 38+, only first 4 of 10 floors needed)
- **Remaining 4 points** come from endgame T2-T4 trials (not in campaign)

## Log File Auto-Detection

The overlay checks these paths in order:
1. Kakao registry-resolved install path (`HKCU\Software\DaumGames\POE2`) → `\logs\KakaoClient.txt` or `\logs\Client.txt`
2. `C:\Daum Games\Path of Exile2\logs\KakaoClient.txt` ← **Kakao default (no space)**
3. `C:\Daum Games\Path of Exile2\logs\Client.txt`
4. `C:\Daum Games\Path of Exile 2\logs\KakaoClient.txt` ← variant with space
5. `C:\Daum Games\Path of Exile 2\logs\Client.txt`
6. `%USERPROFILE%\Documents\My Games\Path of Exile 2\logs\Client.txt`
7. `C:\Program Files (x86)\Grinding Gear Games\Path of Exile 2\logs\Client.txt`
8. Steam + Epic paths

Custom path can be set in Settings (gear icon, top-right).

## POE2 Log Format

POE2 uses two log lines for zone entry:
- `Generating level N area "areaId"` — language-agnostic stable areaId (primary detection)
- `[SCENE] Set Source [ZoneName]` — display name fallback (may be localized in Kakao)

## Credits

- **Game-Icons.net** — fantasy SVG icons used throughout the UI (CC BY 3.0)
- **[Lailloken/Exile-UI](https://github.com/Lailloken/Exile-UI)** — zone layout images, areaId mappings, and level recommendations (MIT)

## License

MIT.
