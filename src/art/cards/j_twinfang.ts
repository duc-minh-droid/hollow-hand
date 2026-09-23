// Twin Fang — two serpents braided into one stalk, striking out left and right; venom drips from both.
import { BLOOD, BONE, GOLD, INK } from '../palette.ts';

const A = 'M86 148C86 128 118 122 116 104C114 88 84 86 84 70C84 56 72 46 58 42';
const A_TOP = 'M116 104C114 88 84 86 84 70';
const B = 'M114 148C114 128 82 122 84 104C86 88 116 86 116 70C116 56 128 46 142 42';

// a coil: bone rim, dark body, scale hatch, gilt spine
const coil = (d: string) => `
    <path d="${d}" stroke="${BONE}" stroke-width="12"/>
    <path d="${d}" stroke="${INK}" stroke-width="9"/>
    <path d="${d}" stroke="url(#hh-xhatch-bone)" stroke-width="9" opacity=".45"/>
    <path d="${d}" stroke="${GOLD}" stroke-width="1" stroke-dasharray="3 3"/>`;

// a striking head facing left; mirrored for the right-hand serpent
const head = `
    <path d="M62 36Q48 22 28 28Q36 36 54 44Z" fill="${INK}" stroke="${BONE}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M60 36Q48 26 34 30" fill="none" stroke="url(#hh-hatch-bone)" stroke-width="4" opacity=".6"/>
    <path d="M56 46Q44 54 30 58Q40 48 50 42Z" fill="${INK}" stroke="${BONE}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M34 31L35 43L38 33ZM41 35L42 44L45 37Z" fill="${BONE}" stroke="${INK}" stroke-width=".5"/>
    <path d="M44 46L28 46L22 42M28 46L22 50" fill="none" stroke="${BLOOD}" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="50" cy="33" r="2.6" fill="${GOLD}"/><ellipse cx="50" cy="33" rx=".7" ry="2" fill="${INK}"/>`;

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>
  <circle cx="100" cy="74" r="46" fill="none" stroke="${BONE}" stroke-width=".8" stroke-dasharray="1 4" opacity=".5"/>
  <path d="M60 150Q100 132 140 150Z" fill="url(#hh-hatch-bone)" opacity=".3"/>

  <!-- braid: B over at the low crossing, A over at the high one -->
  <g fill="none" stroke-linecap="round">${coil(A)}${coil(B)}${coil(A_TOP)}</g>

  <g>${head}</g>
  <g transform="matrix(-1 0 0 1 200 0)">${head}</g>

  <!-- venom -->
  <g class="a-drip">
    <path d="M35 46q-3 4.5 0 7q3-2.5 0-7z" fill="${BLOOD}" stroke="${BONE}" stroke-width=".5"/>
  </g>
  <g class="a-drip">
    <path d="M165 46q-3 4.5 0 7q3-2.5 0-7z" fill="${BLOOD}" stroke="${BONE}" stroke-width=".5"/>
  </g>
`;
