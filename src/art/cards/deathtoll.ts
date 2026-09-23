// Death's Toll — a skeleton hauls the bell rope; the bronze bell has a lip of teeth and a skull for a clapper.
import { BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

const bone = (d: string, w = 2.6) =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 2}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${BONE}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const teeth = () =>
  Array.from({ length: 11 }, (_, i) => `<path d="M${97 + i * 5} 90l2.5 4 2.5-4z"/>`).join('');

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H16V150H0ZM184 0H200V150H184Z" fill="${SHADOW}" opacity=".6"/>
  <path d="M0 0H16V150H0ZM184 0H200V150H184Z" fill="url(#hh-xhatch)" opacity=".6"/>
  <path d="M16 24V150M184 24V150" stroke="${INK}" stroke-width="1.4"/>
  <path d="M10 12H190V22H10Z" fill="${SHADOW}" stroke="${INK}" stroke-width="1.5"/>
  <path d="M10 12H190V22H10Z" fill="url(#hh-hatch-h)" opacity=".7"/>
  <path d="M0 140H200V150H0Z" fill="${SHADOW}" stroke="${INK}" stroke-width="1.3"/>
  <path d="M0 140H200V150H0Z" fill="url(#hh-hatch-d)" opacity=".6"/>

  <!-- sound rings -->
  <g class="a-pulse" fill="none" stroke="${INK}" stroke-linecap="round">
    <path d="M160 48q12 22 0 44" stroke-width="1.6"/>
    <path d="M168 40q17 30 0 60" stroke-width="1.2"/>
    <path d="M176 34q20 36 0 72" stroke-width=".8" stroke-dasharray="3 3"/>
    <path d="M104 118q18 8 36 0M98 126q24 10 48 0" stroke-width="1"/>
  </g>

  <!-- the bell, swinging -->
  <g class="a-sway" stroke="${INK}" stroke-linejoin="round">
    <path d="M110 22H134V31H110Z" fill="${INK}"/>
    <path d="M108 34C108 27 136 27 136 34C138 56 142 76 154 90Q156 96 150 96H94Q88 96 90 90C102 76 106 56 108 34Z" fill="${GOLD}" stroke-width="1.8"/>
    <path d="M124 30C130 30 136 31 136 34C138 56 142 76 154 90Q156 96 150 96H132C136 76 132 50 124 30Z" fill="url(#hh-hatch)" opacity=".55" stroke="none"/>
    <path d="M108 42Q122 45 136 42M107 47Q122 50 137 47M96 84Q122 88 148 84" fill="none" stroke="${GOLD_D}" stroke-width="1.4"/>
    <path d="M114 36q-2 20-10 44" fill="none" stroke="${BONE}" stroke-width="1.2" opacity=".7"/>
    <g fill="${BONE}" stroke-width=".7">${teeth()}</g>
    <path d="M122 96V100" stroke-width="1.4"/>
    <circle cx="122" cy="104" r="5" fill="${BONE}" stroke-width="1.2"/>
    <path d="M119 106h6v3h-6z" fill="${BONE}" stroke-width=".9"/>
    <circle cx="120" cy="103.5" r="1.3" fill="${INK}" stroke="none"/><circle cx="124" cy="103.5" r="1.3" fill="${INK}" stroke="none"/>
  </g>

  <!-- bell wheel and rope -->
  <circle cx="98" cy="28" r="7" fill="${BONE}" stroke="${INK}" stroke-width="1.4"/>
  <path d="M98 21V35M91 28H105M93 23l10 10M103 23l-10 10" stroke="${INK}" stroke-width=".8"/>
  <path d="M92 32L63 44L65 120q-6 6-2 12q6 2 5-8" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M92 32L63 44L65 120q-6 6-2 12q6 2 5-8" fill="none" stroke="${GOLD_D}" stroke-width="1.6" stroke-dasharray="2 1.4"/>

  <!-- the skeleton ringer -->
  <g>
    ${bone('M44 140L46 118L49 102M58 140L55 118L52 102', 2.8)}
    ${bone('M41 141h-4M60 141h4', 2)}
    ${bone('M50 102V66', 2.2)}
    <path d="M42 100q8-6 16 0l-2 5h-12z" fill="${BONE}" stroke="${INK}" stroke-width="1.2"/>
    <path d="M50 72q-9 1-9 6M50 72q9 1 9 6M50 78q-8 1-8 6M50 78q8 1 8 6M50 84q-7 1-6 5M50 84q7 1 6 5" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M50 72q-9 1-9 6M50 72q9 1 9 6M50 78q-8 1-8 6M50 78q8 1 8 6M50 84q-7 1-6 5M50 84q7 1 6 5" fill="none" stroke="${BONE}" stroke-width="1.2" stroke-linecap="round"/>
    ${bone('M44 68L42 54L61 45M56 68L68 64L64 58', 2.2)}
    <g stroke="${INK}" stroke-width="1.2" stroke-linejoin="round">
      <path d="M44 55a8 8 0 1 1 13 5l-1 3h-8l-1-3a8 8 0 0 1-3-5z" fill="${BONE}"/>
      <path d="M48 63l1 3h6l1-3" fill="${BONE}"/>
      <circle cx="49" cy="54" r="2" fill="${INK}" stroke="none"/><circle cx="55" cy="53" r="2" fill="${INK}" stroke="none"/>
      <path d="M52 57l-1 2h2z" fill="${INK}"/>
    </g>
  </g>
`;
