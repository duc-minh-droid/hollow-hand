// Sleight — a black-gloved hand plucks a card out of the air; a gold coin rolls over the knuckles.
import { BLOOD, BONE, GOLD, GOLD_D, INK } from '../palette.ts';

const FINGERS = 'M112 92L92 70M124 86L106 62';
const CURLED = 'M138 88Q132 74 124 72M150 94Q150 82 144 78';

const star = (x: number, y: number, r: number) =>
  `M${x} ${y - r}L${x + r * .3} ${y - r * .3}L${x + r} ${y}L${x + r * .3} ${y + r * .3}L${x} ${y + r}L${x - r * .3} ${y + r * .3}L${x - r} ${y}L${x - r * .3} ${y - r * .3}Z`;

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>
  <circle cx="80" cy="44" r="34" fill="url(#hh-glow)" opacity=".18"/>

  <!-- ghosts of the card arriving -->
  <g fill="none" stroke="${BONE}" stroke-width=".7" stroke-dasharray="2 3" opacity=".4">
    <rect x="56" y="14" width="36" height="52" rx="3" transform="rotate(-34 74 40)"/>
    <rect x="58" y="16" width="36" height="52" rx="3" transform="rotate(-26 76 42)"/>
  </g>

  <!-- the card -->
  <g transform="rotate(-18 78 44)" stroke-linejoin="round">
    <rect x="60" y="18" width="36" height="52" rx="3" fill="${BONE}" stroke="${GOLD}" stroke-width="1.6"/>
    <rect x="64" y="22" width="28" height="44" rx="1.5" fill="none" stroke="${INK}" stroke-width=".7"/>
    <path d="M78 34L86 44L78 54L70 44Z" fill="${BLOOD}" stroke="${INK}" stroke-width=".8"/>
    <path d="M67 25l2 3 2-3-2-3zM89 63l-2-3-2 3 2 3z" fill="${BLOOD}"/>
    <rect x="80" y="22" width="12" height="44" fill="url(#hh-hatch)" opacity=".25"/>
  </g>

  <!-- lace cuff and wrist -->
  <path d="M134 128L162 128L176 150H128Z" fill="${INK}" stroke="${BONE}" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M128 132q4 6 8 0q4 6 8 0q4 6 8 0q4 6 8 0q4 6 8 0q4 6 8 0" fill="none" stroke="${BONE}" stroke-width="1.2"/>
  <path d="M130 140h40" stroke="${GOLD}" stroke-width="1"/>

  <!-- glove -->
  <g fill="none" stroke-linecap="round">
    <path d="${FINGERS}" stroke="${BONE}" stroke-width="11"/>
    <path d="${CURLED}" stroke="${BONE}" stroke-width="10"/>
    <path d="M108 104L88 98" stroke="${BONE}" stroke-width="11"/>
  </g>
  <path d="M132 128Q110 118 106 100Q108 86 122 82Q146 80 158 98Q166 114 160 128Z" fill="${INK}" stroke="${BONE}" stroke-width="1.5" stroke-linejoin="round"/>
  <g fill="none" stroke-linecap="round">
    <path d="${FINGERS}" stroke="${INK}" stroke-width="8"/>
    <path d="${CURLED}" stroke="${INK}" stroke-width="7"/>
    <path d="M108 104L88 98" stroke="${INK}" stroke-width="8"/>
  </g>
  <path d="M140 100Q158 104 158 122Q146 126 136 122Z" fill="url(#hh-hatch-bone)" opacity=".35"/>
  <path d="M114 94l3 1M126 88l3 1M122 108q10 8 24 6" fill="none" stroke="${BONE}" stroke-width=".8" stroke-linecap="round"/>

  <!-- the coin, rolling on the knuckles -->
  <g class="a-spin">
    <circle cx="140" cy="94" r="7" fill="${GOLD}" stroke="${INK}" stroke-width="1"/>
    <circle cx="140" cy="94" r="4.6" fill="none" stroke="${GOLD_D}" stroke-width="1" stroke-dasharray="1.4 1.4"/>
    <path d="M140 90v8M136 94h8" stroke="${GOLD_D}" stroke-width="1"/>
  </g>

  <g class="a-glint" fill="${BONE}">
    <path d="${star(50, 30, 5)}"/><path d="${star(114, 24, 3.5)}"/><path d="${star(46, 66, 3)}"/>
  </g>
`;
