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

- **Zone tracking** — auto-detects zone changes via `[SCENE] Set Source [...]` in Client.txt
- **Kakao client support** — auto-detects `C:\Daum Games\Path of Exile 2\logs\Client.txt`
- **Micro-step guide** — every zone, quest, boss, and optional reward documented
- **Reward alerts** — highlights upcoming skill points and ascendancy points
- **Mini-map hints** — zone layout type, objective direction, exit hints, speedrun tips
- **Ascendancy tracking** — Trial of Sekhemas (Act 2 unlock: Balbala) + Trial of Chaos (Act 3 unlock: Xyclucian)
- **All 7 campaign chapters** — Acts 1-4 + Interludes 1-3

## Hotkeys

| Key | Action |
|-----|--------|
| `Ctrl+Shift+H` | Toggle hide/show overlay |
| `Ctrl+Shift+N` | Next step |
| `Ctrl+Shift+B` | Previous step |
| `Ctrl+Shift+M` | Compact mode toggle |
| Click step | Mark current step done + advance |

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
| 9 | Trial of the Ancestors | Halls of the Dead, Act 4 | +2 SP |
| 10 | Oswin, Dread Warden | Wolvenhold, Interlude 1 | +2 SP |
| 11 | Clearing the Way (Akthi+Anundr) | Khari Crossing, Interlude 2 | +2 SP |
| 12 | The Abominable Yeti | Howling Caves, Interlude 3 | +2 SP |
| 13 | Hooded One (post all interludes) | Kingsmarch | +2 SP |

### Ascendancy (8 Points)
- **Unlock 1:** Kill Balbala the Traitor in Traitor's Passage (Act 2) → Balbala's Barya
- **Unlock 2:** Kill Xyclucian in Chimeral Wetlands (Act 3) → Inscribed Ultimatum
- **Trials:** Trial of the Sekhemas (4 tiers) + Trial of Chaos — 2 points each = 8 total

## Log File Auto-Detection

The overlay checks these paths in order:
1. `C:\Daum Games\Path of Exile 2\logs\Client.txt` ← **Kakao default**
2. `%USERPROFILE%\Documents\My Games\Path of Exile 2\logs\Client.txt`
3. `C:\Program Files (x86)\Grinding Gear Games\Path of Exile 2\logs\Client.txt`
4. Steam/Epic paths

Custom path can be set in Settings (⚙ button).

## POE2 Log Format

POE2 uses `[SCENE] Set Source [ZoneName]` for zone transitions (different from POE1's "You have entered").
