// Wheel of Fortune — an eight-spoked wheel of signs turning under a watching sphinx; a serpent slides down its flank.
import { BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

const CX = 100;
const CY = 86;
const at = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [CX + Math.cos(a) * r, CY + Math.sin(a) * r].map((n) => n.toFixed(1)).join(' ');
};
// small rim glyphs, drawn around the origin
const GLYPHS = [
  `<circle r="2.6" fill="none"/><circle r=".8"/>`,
  `<path d="M0-3V3M-3 0H3" fill="none"/>`,
  `<path d="M0-3L2.8 2.2H-2.8Z" fill="none"/>`,
  `<path d="M1.5-3a3 3 0 1 0 0 6a2.2 2.2 0 1 1 0-6z"/>`,
  `<path d="M-2.4-2.4L2.4 2.4M2.4-2.4L-2.4 2.4" fill="none"/>`,
  `<path d="M0-3L3 0L0 3L-3 0Z" fill="none"/>`,
  `<path d="M-3 1q3-5 6 0M0-3V3" fill="none"/>`,
  `<circle r="1.4"/><path d="M0-3.4V-2M0 2V3.4M-3.4 0H-2M2 0H3.4" fill="none"/>`,
];
const cloud = (x: number, y: number, s: number) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-18 6q-6-10 6-12q2-10 14-6q8-8 16 2q12-2 8 10q2 6-6 6h-32q-8 0-6 0z" fill="${BONE}"/>
    <path d="M-20 4q20 6 44 0q2 6-6 6h-32q-6 0-6-6z" fill="url(#hh-hatch)" opacity=".6" stroke="none"/>
  </g>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <circle cx="${CX}" cy="${CY}" r="62" fill="url(#hh-hatch-r)" opacity=".25"/>

  <g stroke="${INK}" stroke-width="1.3" stroke-linejoin="round">
    ${cloud(28, 28, 0.9)}${cloud(172, 30, 0.9)}${cloud(24, 128, 0.8)}${cloud(176, 126, 0.8)}
    <path d="M100 86L82 144M100 86L118 144" stroke-width="3"/>
    <path d="M72 144H128" stroke-width="2"/>
  </g>

  <!-- the turning wheel -->
  <g class="a-spin-slow" stroke="${INK}" stroke-linejoin="round">
    <circle cx="${CX}" cy="${CY}" r="44" fill="${BONE}" stroke-width="1.8"/>
    <path d="M${CX - 44} ${CY}a44 44 0 1 0 88 0a44 44 0 1 0-88 0zM${CX - 35} ${CY}a35 35 0 1 1 70 0a35 35 0 1 1-70 0z" fill="url(#hh-hatch)" fill-rule="evenodd" opacity=".45" stroke="none"/>
    <circle cx="${CX}" cy="${CY}" r="35" fill="none" stroke-width="1.3"/>
    <circle cx="${CX}" cy="${CY}" r="22" fill="none" stroke-width=".8" stroke-dasharray="3 2"/>
    ${[0, 45, 90, 135].map((d) => `<path d="M${at(d, 35)}L${at(d + 180, 35)}" stroke-width="2"/>`).join('')}
    ${[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((d) => `<circle cx="${at(d, 22).split(' ')[0]}" cy="${at(d, 22).split(' ')[1]}" r="1.8" fill="${GOLD}" stroke-width=".8"/>`).join('')}
    <g fill="${INK}" stroke-width="1">
      ${GLYPHS.map((g, i) => `<g transform="translate(${at(i * 45 - 90, 39.5)}) rotate(${i * 45})">${g}</g>`).join('')}
    </g>
    <circle cx="${CX}" cy="${CY}" r="9" fill="${GOLD}" stroke-width="1.5"/>
    <circle cx="${CX}" cy="${CY}" r="9" fill="url(#hh-hatch-d)" opacity=".35" stroke="none"/>
    <circle cx="${CX}" cy="${CY}" r="3" fill="${GOLD_D}" stroke-width="1"/>
  </g>

  <!-- the serpent sliding down the left flank -->
  <path d="M60 50q-10 10-4 20t-2 22t2 20q4 8 12 10" fill="none" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>
  <path d="M60 50q-10 10-4 20t-2 22t2 20q4 8 12 10" fill="none" stroke="${SHADOW}" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 1.5"/>
  <path d="M57 47q4-4 7 0l-2 4z" fill="${INK}"/>

  <!-- sphinx on top, one gold eye open -->
  <g stroke="${INK}" stroke-width="1.2" stroke-linejoin="round">
    <path d="M82 42C80 33 88 31 96 32L108 32L108 27C106 23 108 17 113 17C118 17 120 22 119 27L121 33L117 33L117 42Z" fill="${INK}"/>
    <path d="M109 20L105 33M118 20L121 32" fill="none" stroke="${BONE}" stroke-width=".7" stroke-dasharray="1.2 1.2"/>
    <path d="M116 42h9v-2.5h-8M82 40q-7-1-6-9" fill="none" stroke-width="1.4"/>
    <circle cx="116" cy="23" r="1.3" fill="${GOLD}" stroke="none"/>
  </g>
`;
