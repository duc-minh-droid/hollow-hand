// Wide Grin — a black lacquer mask whose grin runs past its own edges; slit eyes smoulder, cheeks rouged red.
import { BLOOD, BLOOD_D, BONE, GOLD, INK } from '../palette.ts';

const MASK = 'M100 16Q154 16 152 74Q150 130 100 140Q50 130 48 74Q46 16 100 16Z';

const teeth = (pts: [number, number][], dir: number) =>
  pts.map(([x, y]) => `M${x - 4} ${y}L${x} ${y + dir * 7}L${x + 4} ${y}Z`).join('');

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>
  <g fill="none" stroke="${GOLD}" stroke-width=".8" opacity=".4">
    <path d="M22 30q10 8 8 20M178 30q-10 8-8 20M18 120q12-4 18 4M182 120q-12-4-18 4"/>
  </g>

  <!-- the mask -->
  <path d="${MASK}" fill="${INK}" stroke="${GOLD}" stroke-width="2.2"/>
  <path d="M100 16Q154 16 152 74Q150 130 100 140Q134 110 132 70Q130 30 100 16Z" fill="url(#hh-hatch-bone)" opacity=".3"/>
  <path d="${MASK}" fill="none" stroke="${BONE}" stroke-width=".7" stroke-dasharray="1.5 2.5" transform="translate(100 78) scale(.92) translate(-100 -78)"/>
  <path d="M64 50Q78 42 92 50M136 50Q122 42 108 50M100 56V74Q96 78 100 80" fill="none" stroke="${BONE}" stroke-width="1.1" stroke-linecap="round"/>

  <!-- rouge -->
  <circle cx="68" cy="84" r="10" fill="${BLOOD}" opacity=".75"/>
  <circle cx="132" cy="84" r="10" fill="${BLOOD}" opacity=".75"/>
  <circle cx="68" cy="84" r="10" fill="url(#hh-hatch-bone-d)" opacity=".25"/>
  <circle cx="132" cy="84" r="10" fill="url(#hh-hatch-bone-d)" opacity=".25"/>

  <!-- slit eyes -->
  <g class="a-pulse" filter="url(#hh-soft-glow)">
    <path d="M62 62Q76 52 90 58Q76 62 62 62Z" fill="${BLOOD}" stroke="${BONE}" stroke-width=".8"/>
    <path d="M138 62Q124 52 110 58Q124 62 138 62Z" fill="${BLOOD}" stroke="${BONE}" stroke-width=".8"/>
  </g>

  <!-- the grin, wider than the face -->
  <path d="M28 70Q40 112 100 116Q160 112 172 70Q156 96 100 98Q44 96 28 70Z" fill="${BLOOD_D}"/>
  <g fill="${BONE}" stroke="${INK}" stroke-width=".7" stroke-linejoin="round">
    <path d="${teeth([[37, 81], [46, 88], [56, 92], [66, 95], [76, 96.5], [86, 97.5], [96, 98], [104, 98], [114, 97.5], [124, 96.5], [134, 95], [144, 92], [154, 88], [163, 81]], 1)}"/>
    <path d="${teeth([[40, 92], [50, 101], [60, 107], [70, 110.5], [80, 113], [90, 115], [100, 116], [110, 115], [120, 113], [130, 110.5], [140, 107], [150, 101], [160, 92]], -1)}"/>
  </g>
  <path d="M28 70Q40 112 100 116Q160 112 172 70Q156 96 100 98Q44 96 28 70Z" fill="none" stroke="${BONE}" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M28 70q-6-4-6-12M172 70q6-4 6-12" fill="none" stroke="${BONE}" stroke-width="1.2" stroke-linecap="round"/>
`;
