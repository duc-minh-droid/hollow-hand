# Hollow Hand — art brief

Every card, mask and trinket is a hand-authored inline SVG. No emoji, no text inside art, no raster images, no external fonts.

## Look
Woodcut / engraved tarot (think 15th-century block prints and the Rider–Waite line style), not flat vector clip-art.
- Bold ink outlines (`stroke` INK, 1.2–2px), round joins.
- Shading with the shared hatch patterns, never with gradients: `fill="url(#hh-hatch)"` layered over a flat fill at `opacity .4–.7`.
- Flat washes from `src/art/palette.ts` only. Use colour sparingly: most of the image is ink on parchment; one accent colour (blood, gold or verdigris) carries the eye.
- Strong central silhouette readable at 120px wide. One clear subject, one or two supporting symbols (stars, drops, rays, eyes, candles, hands, moons, keys, bones).
- Tarot symbolism welcome. Slightly uncanny: sleeping faces on moons, eyes on hands, too many teeth.

## Contract
- File: `src/art/cards/<cardId>.ts` (player + Jev cards), `src/art/masks/<maskId>.ts`, `src/art/trinkets/<trinketId>.ts`.
- `export default () => \`...svg inner markup...\``. Import colours from `../palette.ts`.
- Card art viewBox is **0 0 200 150** (landscape art window; the top ~20px corners get clipped by an arch — keep the subject inside x 15–185, y 12–145). Paint a full background rect first.
- Player cards: parchment ground (`PARCH`/`BONE`), ink lines. Jev cards (`j_*`): dark lacquer ground (`url(#hh-lacquer)` or `LACQUER`), linework in `BONE`, accents in `BLOOD`/`GOLD`, shading with `#hh-hatch-bone` / `#hh-xhatch-bone` / `#hh-stipple-bone`.
- Mask viewBox **0 0 240 280**, transparent background (it sits on the dark table). Required groups: `<g class="m-eyes">` (eye glints; glows when Jev thinks), `<g class="m-mouth">` (animated when Jev speaks), `<g class="crack crack-1">`, `crack-2`, `crack-3` (ink crack lines, hidden by default, revealed as HP drops).
- Trinket viewBox **0 0 64 64**, transparent background, single object, bold outline so it reads at 32px.
- Shared defs (already in the document): patterns `hh-hatch hh-hatch-d hh-hatch-r hh-hatch-v hh-hatch-h hh-xhatch hh-stipple hh-hatch-bone hh-hatch-bone-d hh-xhatch-bone hh-stipple-bone hh-hatch-blood hh-hatch-gold`; gradients `hh-gold hh-flame hh-glow hh-glow-red hh-night hh-lacquer`; filter `hh-soft-glow` (use only on small glowing bits like flames/eyes).
- Do not define your own `id`s (they collide across cards). No `<style>`, no `<script>`, no `<text>`.

## Motion (optional, 1–2 per image)
Wrap an element in `<g class="...">` with one of: `a-flicker` (flames), `a-blink` (eyelids / eyes, scaleY), `a-drip` (falling drop), `a-spin` / `a-spin-slow` (wheels, rotates around its own centre), `a-smoke` (rising wisps), `a-float` (gentle bob), `a-pulse` (glow breathing), `a-sway` (hanging things), `a-glint` (sparkle). CSS does the animation.

## Reference
`src/art/cards/strike.ts` is the reference piece: composition, stroke weights, hatch layering.
