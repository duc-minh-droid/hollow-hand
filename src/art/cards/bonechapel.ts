// Bone Chapel — a chapel walled in skulls and roofed in femurs; its lit windows are eye sockets, its door a mouth.
import { BONE, GOLD, INK, NIGHT, PARCH, SHADOW } from '../palette.ts';

const skull = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-4 1.5a4.4 4.4 0 1 1 8 0l-.6 2.4h-6.8z" fill="${BONE}"/>` +
  `<circle cx="-1.6" cy="0" r="1.1" fill="${INK}" stroke="none"/><circle cx="1.6" cy="0" r="1.1" fill="${INK}" stroke="none"/></g>`;
const EYES = [
  [84, 88],
  [116, 88],
];
const wall = () => {
  let s = '';
  for (let row = 0; row < 5; row++) {
    const y = 80 + row * 12;
    const off = row % 2 ? 4.5 : 0;
    for (let x = 67 + off; x <= 134; x += 9) {
      if (EYES.some(([ex, ey]) => Math.hypot(x - ex, y - ey) < 11)) continue;
      if (x > 86 && x < 114 && y > 106) continue; // door
      if (x > 94 && x < 106 && y > 94 && y < 108) continue; // nose
      s += skull(x, y);
    }
  }
  return s;
};
const femur = (d: string) =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` +
  `<path d="${d}" fill="none" stroke="${BONE}" stroke-width="2.8" stroke-linecap="round"/>`;
const bat = (x: number, y: number, s: number) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0q-4-5-10-4q2 2 1 4q-3-1-5 1q4 0 5 3q3-3 9-1q6-2 9 1q1-3 5-3q-2-2-5-1q-1-2 1-4q-6-1-10 4z" fill="${INK}"/>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V120H0Z" fill="${NIGHT}" opacity=".12"/>
  <path d="M0 0H200V120H0Z" fill="url(#hh-hatch-r)" opacity=".35"/>
  <path d="M0 150V132Q100 122 200 132V150Z" fill="${SHADOW}" stroke="${INK}" stroke-width="1.3"/>
  <path d="M0 150V132Q100 122 200 132V150Z" fill="url(#hh-hatch-d)" opacity=".6"/>

  <!-- walls -->
  <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
    <path d="M62 74H138V140H62Z" fill="${SHADOW}"/>
    <path d="M62 74H138V140H62Z" fill="url(#hh-xhatch)" opacity=".5"/>
    <g stroke-width=".8">${wall()}</g>
    <!-- gable of stacked femurs -->
    <path d="M56 76L100 38L144 76Z" fill="${SHADOW}"/>
    <path d="M56 76L100 38L144 76Z" fill="url(#hh-hatch)" opacity=".6"/>
  </g>
  ${femur('M70 70L100 46M130 70L100 46M78 62L122 62M84 70L116 70')}
  ${femur('M56 76L100 38M144 76L100 38M58 77H142')}
  <path d="M96 58a4 4 0 1 1 8 0v3h-8z" fill="${BONE}" stroke="${INK}" stroke-width="1"/>
  <!-- belfry and femur cross -->
  <g stroke="${INK}" stroke-width="1.3">
    <path d="M94 42V30h12v12z" fill="${SHADOW}"/>
    <path d="M97 40v-6a3 3 0 0 1 6 0v6z" fill="${INK}"/>
  </g>
  ${femur('M100 29V13M94 18H106')}

  <!-- the face: nose, mouth-door with teeth -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M100 96l-4 9h8z" fill="${INK}" stroke-width="1"/>
    <path d="M88 140V118a12 12 0 0 1 24 0V140Z" fill="${INK}" stroke-width="1.5"/>
    <path d="M90 116l2.5 4 2.5-5 2.5 5 2.5-5.5 2.5 5.5 2.5-5 2.5 5 2.5-4" fill="${BONE}" stroke-width=".8"/>
    <path d="M88 140l3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4" fill="${BONE}" stroke-width=".8"/>
  </g>

  <!-- the lit eye-windows -->
  <g class="a-flicker">
    <circle cx="84" cy="88" r="12" fill="url(#hh-glow)"/>
    <circle cx="116" cy="88" r="12" fill="url(#hh-glow)"/>
    <circle cx="84" cy="88" r="7" fill="${GOLD}" stroke="${INK}" stroke-width="1.6"/>
    <circle cx="116" cy="88" r="7" fill="${GOLD}" stroke="${INK}" stroke-width="1.6"/>
    <path d="M84 81v14M77 88h14M116 81v14M109 88h14" stroke="${INK}" stroke-width="1"/>
  </g>

  <!-- bats -->
  <g class="a-float">${bat(40, 34, 0.9)}${bat(160, 26, 1)}${bat(150, 52, 0.7)}${bat(30, 60, 0.6)}</g>
`;
