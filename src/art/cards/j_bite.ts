// Bite — a grinning jaw with far too many teeth snapping shut; the gums are raw red.
import { BLOOD, BLOOD_D, BONE, INK } from '../palette.ts';

// a row of pointed teeth hanging from (dir 1) or rising off (dir -1) a gumline
const teeth = (pts: [number, number, number][], dir: number) =>
  pts.map(([x, y, l]) => `M${x - 4} ${y}L${x} ${y + dir * l}L${x + 4} ${y}Z`).join('');

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>
  <path d="M0 0H200V40C150 30 50 30 0 40Z" fill="url(#hh-stipple-bone)" opacity=".25"/>
  <path d="M0 150H200V124C150 136 50 136 0 124Z" fill="url(#hh-stipple-bone)" opacity=".25"/>

  <!-- the snap: downward strike marks -->
  <g stroke="${BONE}" stroke-width="1.3" stroke-linecap="round" opacity=".7">
    <path d="M70 16l4 10M100 12v12M130 16l-4 10M50 26l6 8M150 26l-6 8"/>
  </g>

  <!-- throat -->
  <path d="M44 64Q100 44 156 64Q162 84 156 104Q100 126 44 104Q38 84 44 64Z" fill="${INK}"/>
  <path d="M60 72Q100 60 140 72Q146 84 140 96Q100 110 60 96Q54 84 60 72Z" fill="${BLOOD_D}" opacity=".7"/>
  <path d="M60 72Q100 60 140 72Q146 84 140 96Q100 110 60 96Q54 84 60 72Z" fill="url(#hh-xhatch-bone)" opacity=".15"/>

  <!-- lower jaw, teeth rising -->
  <g stroke="${INK}" stroke-width="1" stroke-linejoin="round">
    <path d="${teeth([[56, 102.3, 9], [66, 105.4, 11], [76, 107.7, 16], [86, 109.2, 10], [96, 109.9, 11], [106, 109.9, 10], [116, 109, 11], [126, 107.3, 16], [136, 104.8, 11], [146, 101.5, 9]], -1)}" fill="${BONE}"/>
    <path d="M40 102Q100 138 160 102L150 100Q100 120 50 100Z" fill="${BLOOD}"/>
    <path d="M40 102Q100 138 160 102L150 100Q100 120 50 100Z" fill="url(#hh-hatch-bone)" opacity=".3"/>
  </g>

  <!-- upper jaw, teeth hanging -->
  <g stroke="${INK}" stroke-width="1" stroke-linejoin="round">
    <path d="${teeth([[52, 64.4, 9], [62, 60.9, 11], [72, 58.2, 18], [82, 56.3, 11], [92, 55.3, 12], [102, 55, 12], [112, 55.6, 11], [122, 57, 12], [132, 59.2, 18], [142, 62.2, 11], [150, 65.1, 8]], 1)}" fill="${BONE}"/>
    <path d="M38 64Q100 24 162 64L152 66Q100 44 48 66Z" fill="${BLOOD}"/>
    <path d="M38 64Q100 24 162 64L152 66Q100 44 48 66Z" fill="url(#hh-hatch-bone)" opacity=".3"/>
  </g>

  <!-- lips / jaw line and the grin creases -->
  <g fill="none" stroke="${BONE}" stroke-width="1.6" stroke-linecap="round">
    <path d="M34 66Q100 16 166 66"/>
    <path d="M34 100Q100 146 166 100"/>
    <path d="M34 66Q26 84 34 100M166 66Q174 84 166 100" stroke-width="1.2"/>
    <path d="M28 60q-8 4-10 12M172 60q8 4 10 12M26 108q-6-2-10-8M174 108q6-2 10-8" stroke-width="1"/>
  </g>
  <path d="M60 46Q100 30 140 46" fill="none" stroke="${BONE}" stroke-width=".8" stroke-dasharray="2 3" opacity=".6"/>

  <!-- blood off the long fang -->
  <path d="M132 77q1 6 0 10" fill="none" stroke="${BLOOD}" stroke-width="2" stroke-linecap="round"/>
  <g class="a-drip">
    <path d="M132 90q-3.5 5 0 8q3.5-3 0-8z" fill="${BLOOD}" stroke="${BONE}" stroke-width=".6"/>
  </g>
`;
