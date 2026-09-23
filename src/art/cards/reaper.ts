// Reaper's Arc — a scythe carves a crescent through the wheat; the heads fly, the blade trails blood,
// and an eye is etched into its heel.
import { BLOOD, BLOOD_D, BONE, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

// wheat: stalks left standing below the arc, heads cut and tumbling above it
const cutY = (x: number) => 102 + Math.sin(((x - 20) / 166) * Math.PI) * 18;
const ear = (x: number, y: number, r: number) => `
  <g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r})">
    <path d="M0 0v-14" stroke-width="1"/>
    <path d="M0-4q-3-2-3-5q3 1 3 4zM0-4q3-2 3-5q-3 1-3 4zM0-9q-3-2-3-5q3 1 3 4zM0-9q3-2 3-5q-3 1-3 4zM0-14q0-4 0-5" fill="${BONE}" stroke-width=".8"/>
  </g>`;
const field = () => {
  let s = '';
  for (let x = 18; x <= 184; x += 8) {
    const top = cutY(x) + ((x * 7) % 5);
    s += `<path d="M${x} 150L${x + ((x * 3) % 4) - 2} ${top.toFixed(1)}" stroke-width="1.2"/>`;
    s += `<path d="M${x - 2} ${top.toFixed(1)}l4-1.4" stroke-width="1"/>`;
  }
  return s;
};

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V70Q100 40 0 70Z" fill="url(#hh-hatch-d)" opacity=".4"/>
  <path d="M0 150V120Q100 110 200 120V150Z" fill="${SHADOW}" opacity=".4"/>
  <g fill="none" stroke="${INK}" stroke-linecap="round">${field()}</g>
  <!-- wheat the blade has not reached yet -->
  <g fill="none" stroke="${INK}" stroke-linecap="round">
    <path d="M10 150L14 92M190 150L184 90M196 150L193 96M4 150L6 100" stroke-width="1.2"/>
    ${ear(14, 92, 6)}${ear(184, 90, -8)}${ear(193, 96, -4)}${ear(6, 100, 3)}
  </g>

  <!-- the crescent of the swing -->
  <path d="M22 94Q100 146 186 94Q100 128 22 94Z" fill="url(#hh-hatch)" opacity=".7" stroke="${INK}" stroke-width="1"/>
  <path d="M40 106Q100 136 170 108M60 116Q100 132 150 118" fill="none" stroke="${INK}" stroke-width=".7" stroke-dasharray="6 4"/>

  <!-- heads cut loose -->
  <g class="a-float" fill="none" stroke="${INK}">
    ${ear(62, 92, -30)}${ear(94, 98, 20)}${ear(128, 94, -60)}${ear(154, 84, 40)}
  </g>

  <!-- the scythe -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M84 32L168 148" stroke-width="6" stroke-linecap="round"/>
    <path d="M84 32L168 148" stroke="${SHADOW}" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M116 78l-10 6M117 80l-8 5" stroke-width="3" stroke-linecap="round"/>
    <path d="M88 30C62 32 38 52 24 90C44 62 64 48 92 44Z" fill="${BONE}" stroke-width="1.6"/>
    <path d="M88 30C62 32 38 52 24 90C40 60 56 44 84 38Z" fill="url(#hh-hatch-d)" opacity=".45" stroke="none"/>
    <path d="M24 90C44 62 64 48 92 44" fill="none" stroke="${BLOOD}" stroke-width="1.8"/>
    <path d="M80 34q4 3 8 0q-4-3-8 0z" fill="${BONE}" stroke-width=".9"/>
    <circle cx="84" cy="34" r="1.1" fill="${INK}" stroke="none"/>
    <path d="M86 28h6v18h-6z" fill="${GOLD_D}" stroke-width="1.2"/>
  </g>

  <!-- blood trailing the blade along the arc -->
  <g fill="${BLOOD}" stroke="${INK}" stroke-width=".6">
    <path d="M44 106q-3 4 0 6q3-2 0-6z"/><path d="M70 118q-3.4 5 0 7q3.4-2 0-7z"/><path d="M104 124q-2.6 3.8 0 5.4q2.6-1.6 0-5.4z"/>
    <path d="M136 120q-2 3 0 4.4q2-1.4 0-4.4z"/><circle cx="160" cy="112" r="1.2"/><circle cx="176" cy="102" r=".9"/>
  </g>
  <g class="a-drip"><path d="M30 96q-3.6 5 0 7.4q3.6-2.4 0-7.4z" fill="${BLOOD_D}" stroke="${INK}" stroke-width=".6"/></g>
`;
