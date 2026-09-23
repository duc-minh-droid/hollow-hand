// Open Ledger — the Dealer's accounts laid open: columns of tallies in red-ruled lines, a quill, two red dice.
import { BLOOD, BLOOD_D, BONE, GOLD, GOLD_D, INK, SHADOW } from '../palette.ts';

// a gate of five tally strokes starting at x,y
const gate = (x: number, y: number) =>
  `M${x} ${y}v7M${x + 2.5} ${y}v7M${x + 5} ${y}v7M${x + 7.5} ${y}v7M${x - 1} ${y + 6}l10-5`;

// an isometric die: top face with n pips (1 or 3 or 5), two shaded sides
const die = (x: number, y: number, n: number) => {
  const pips = n === 1 ? [[0, 0]] : n === 3 ? [[-4, 0], [0, 0], [4, 0]] : [[-4, 0], [4, 0], [0, 0], [0, -2.4], [0, 2.4]];
  return `
    <path d="M${x} ${y - 6}L${x + 10} ${y}L${x} ${y + 6}L${x - 10} ${y}Z" fill="${BLOOD}"/>
    <path d="M${x - 10} ${y}L${x} ${y + 6}V${y + 17}L${x - 10} ${y + 11}Z" fill="${BLOOD_D}"/>
    <path d="M${x + 10} ${y}L${x} ${y + 6}V${y + 17}L${x + 10} ${y + 11}Z" fill="${BLOOD_D}"/>
    <path d="M${x + 10} ${y}L${x} ${y + 6}V${y + 17}L${x + 10} ${y + 11}Z" fill="url(#hh-hatch-bone)" opacity=".3"/>
    ${pips.map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="1.2" fill="${BONE}"/>`).join('')}
    <circle cx="${x - 5}" cy="${y + 8}" r="1" fill="${BONE}"/><circle cx="${x + 5}" cy="${y + 10}" r="1" fill="${BONE}"/>`;
};

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>

  <!-- binding -->
  <path d="M16 70Q60 58 100 70Q140 58 184 70L186 138Q140 128 100 144Q60 128 14 138Z" fill="${BLOOD_D}" stroke="${BONE}" stroke-width="1.4" stroke-linejoin="round"/>
  <g fill="${GOLD}" stroke="${INK}" stroke-width=".6"><path d="M14 138L22 130L24 138Z"/><path d="M186 138L178 130L176 138Z"/></g>

  <!-- pages -->
  <g stroke="${INK}" stroke-width="1.1" stroke-linejoin="round">
    <path d="M22 70Q60 58 100 70V138Q60 124 22 132Z" fill="${BONE}"/>
    <path d="M100 70Q140 58 178 70V132Q140 124 100 138Z" fill="${BONE}"/>
    <path d="M86 66Q94 67 100 70V138Q94 134 86 132Z" fill="url(#hh-hatch)" opacity=".35" stroke="none"/>
    <path d="M100 70V138" stroke-width="1.6"/>
  </g>
  <g fill="none" stroke="${BLOOD}" stroke-width=".7" opacity=".8">
    <path d="M40 67V128M66 64V127M120 66V127M146 64V127"/>
  </g>
  <g fill="none" stroke="${SHADOW}" stroke-width=".5">
    <path d="M24 82Q60 72 98 82M24 96Q60 86 98 96M24 110Q60 100 98 110M102 82Q140 72 176 82M102 96Q140 86 176 96M102 110Q140 100 176 110"/>
  </g>
  <g fill="none" stroke="${INK}" stroke-width=".8" stroke-linecap="round">
    <path d="${gate(106, 82)}${gate(124, 80)}${gate(150, 78)}${gate(106, 96)}${gate(124, 94)}${gate(150, 92)}${gate(124, 108)}${gate(150, 106)}"/>
    <path d="M106 110v7M108.5 110v7M111 110v7M162 106v7M164.5 106v7"/>
    <path d="M44 114v7M46.5 114v7M70 112v7"/>
  </g>
  <path d="M146 120Q158 116 170 120" fill="none" stroke="${BLOOD}" stroke-width="1.2"/>

  <!-- dice on the left page -->
  <g stroke="${INK}" stroke-width=".8" stroke-linejoin="round">${die(52, 86, 1)}${die(76, 98, 5)}</g>

  <!-- quill -->
  <g stroke="${INK}" stroke-width=".9" stroke-linejoin="round">
    <path d="M138 104Q150 60 176 26Q170 52 160 70Q152 88 138 104Z" fill="${BONE}"/>
    <path d="M176 26Q170 52 160 70Q152 88 138 104Q150 76 176 26Z" fill="url(#hh-hatch)" opacity=".5"/>
    <path d="M138 104L172 32" fill="none" stroke-width=".7"/>
    <path d="M150 58l-6 2M156 48l-5 1M162 40l-4 0" fill="none" stroke-width=".6"/>
    <path d="M136 108L138 104L141 106Z" fill="${GOLD}" stroke="${GOLD_D}"/>
  </g>
  <ellipse cx="135" cy="110" rx="3" ry="1.4" fill="${INK}"/>
  <g class="a-glint">
    <path d="M24 136l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z" fill="${GOLD}"/>
  </g>
`;
