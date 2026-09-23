// The Hanged Man — serene, upside-down from a living tau-tree whose knot has opened one eye.
import { BONE, GOLD, INK, PARCH, SHADOW, VERD } from '../palette.ts';

// a limb drawn as an ink-outlined bone-coloured tube
const limb = (d: string, w = 6) =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 2.6}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${BONE}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const leaf = (x: number, y: number, r: number) =>
  `<path transform="translate(${x} ${y}) rotate(${r})" d="M0 0q4-6 0-10q-4 4 0 10z" fill="${VERD}" stroke="${INK}" stroke-width=".8"/>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 150V126q50-10 100-4q50-8 100 2V150Z" fill="${SHADOW}" opacity=".5"/>
  <path d="M0 150V126q50-10 100-4q50-8 100 2V150Z" fill="url(#hh-hatch-d)" opacity=".5"/>

  <!-- the living tau -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M93 150L95 30H105L108 150Z" fill="${SHADOW}"/>
    <path d="M93 150L95 30H105L108 150Z" fill="url(#hh-xhatch)" opacity=".6" stroke="none"/>
    <path d="M40 18q-4 8 4 10H156q8-2 4-10q-2-4-6-2H46q-4-2-6 2z" fill="${BONE}"/>
    <path d="M42 24H158" fill="none" stroke="url(#hh-hatch)" stroke-width="3" opacity=".5"/>
    <path d="M52 22q10 2 18-1M120 22q12 2 22-1M97 60q4 6 2 14M103 96q-3 8 1 14" fill="none" stroke-width=".8"/>
    <path d="M60 22q8-5 14 0q-6 4-14 0z" fill="${BONE}" stroke-width="1"/>
    <circle cx="67" cy="22" r="1.6" fill="${INK}" stroke="none"/>
    <path d="M93 146q-10 2-16 0M108 146q10 2 18 0" fill="none" stroke-width="1.2"/>
  </g>
  ${leaf(46, 18, -60)}${leaf(52, 18, -20)}${leaf(150, 18, 30)}${leaf(156, 20, 70)}${leaf(128, 18, 10)}

  <!-- the hanging man, swaying -->
  <g class="a-sway">
   <g transform="translate(100 28) scale(1.15) translate(-100 -28)">
    <path d="M100 28V38" stroke="${INK}" stroke-width="1.6"/>
    <path d="M97 36h6M97 39h6" stroke="${SHADOW}" stroke-width="1.4"/>
    <circle cx="100" cy="112" r="15" fill="url(#hh-glow)"/>
    <circle cx="100" cy="112" r="14" fill="none" stroke="${GOLD}" stroke-width="2.4"/>
    <circle cx="100" cy="112" r="14" fill="none" stroke="${INK}" stroke-width=".6" stroke-dasharray="1 2.4"/>
    ${limb('M100 40V70', 6.5)}
    ${limb('M100 70L114 60L102 52', 6)}
    ${limb('M96 96L86 86L98 80', 4)}
    ${limb('M104 96L114 86L102 80', 4)}
    <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
      <path d="M90 72H110L107 98H93Z" fill="${BONE}"/>
      <path d="M90 72H100V98H93Z" fill="url(#hh-hatch-r)" opacity=".6" stroke="none"/>
      <path d="M90.3 76H109.7" stroke-width="2.4"/>
      <circle cx="100" cy="108" r="7.5" fill="${BONE}"/>
      <path d="M92.6 109q7.4 3 14.8 0a7.5 7.5 0 0 1-14.8 0z" fill="${INK}" stroke-width="1"/>
      <path d="M95.5 106.5q2-2 3.5 0M101 106.5q2-2 3.5 0M98.5 102q1.5 1 3 0" fill="none" stroke-width="1"/>
    </g>
    <path d="M93.5 112q-2 6 -1 12M97 115q-1 6 0 11M100 116v10M103 115q1 6 0 11M106.5 112q2 6 1 12" fill="none" stroke="${INK}" stroke-width="1.1" stroke-linecap="round"/>
   </g>
  </g>
`;
