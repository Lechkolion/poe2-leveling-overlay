#!/usr/bin/env python3
"""Generate src/data/exileLayouts.ts from Exile-UI source JSONs."""
import json, re, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, 'scripts', '_cache')
with open(os.path.join(CACHE, 'exile_areas2.json')) as f: areas = json.load(f)
with open(os.path.join(CACHE, 'exile_layouts.json')) as f: filelist = json.load(f)

# Build layouts map: areaId -> sorted list of layout filenames
layouts = {}
for fname in filelist:
    m = re.match(r'(g\d+(?:_\w+)?) (.+)\.jpg$', fname)
    if m:
        zid = m.group(1)
        layouts.setdefault(zid, []).append(fname)
for k in layouts: layouts[k].sort()

# Build combined map: areaId -> { name, levelRange, layouts }
combined = {}
for act in areas:
    for zone in act:
        zid = zone['id']
        combined[zid] = {
            'name': zone['name'],
            'levelRange': zone.get('recommendation',''),
            'layouts': layouts.get(zid, []),
        }
for zid in layouts:
    if zid not in combined:
        combined[zid] = {'name': zid, 'levelRange': '', 'layouts': layouts[zid]}

# Stats
total_layouts = sum(len(v['layouts']) for v in combined.values())
zones_with_layouts = sum(1 for v in combined.values() if v['layouts'])
zones_with_levels = sum(1 for v in combined.values() if v['levelRange'])
print(f'Total areaIds: {len(combined)}')
print(f'Zones with levelRange: {zones_with_levels}')
print(f'Zones with layouts: {zones_with_layouts}')
print(f'Total layout images: {total_layouts}')

# Write TS module
def js_str(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

ts = '''// Auto-generated from Lailloken/Exile-UI (MIT licensed).
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
'''
for zid in sorted(combined):
    v = combined[zid]
    name_e = js_str(v['name'])
    parts = [f"name: '{name_e}'"]
    if v['levelRange']:
        parts.append(f"levelRange: '{v['levelRange']}'")
    if v['layouts']:
        files_inline = ', '.join(f"'{f}'" for f in v['layouts'])
        parts.append(f"layouts: [{files_inline}]")
    else:
        parts.append("layouts: []")
    ts += f"  '{zid}': {{ {', '.join(parts)} }},\n"
ts += '}\n\n'

ts += '''/** Parse "5 | 6" or "37.5 | 38" -> { normal, cruel } */
export function parseLevelRange(range?: string): { normal?: number; cruel?: number } {
  if (!range) return {}
  const parts = range.split('|').map(s => s.trim()).map(Number)
  return { normal: parts[0], cruel: parts[1] }
}
'''

out_path = os.path.join(ROOT, 'src', 'data', 'exileLayouts.ts')
with open(out_path, 'w') as f: f.write(ts)
print(f'\nWrote {out_path} ({len(ts)} bytes)')
