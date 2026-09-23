// Devil's Bargain — a pale hand and a clawed one shake over a contract signed in blood;
// the claw has an eye on its back, and the quill is still dripping.
import { BLOOD, BLOOD_D, BONE, INK, PARCH, SHADOW, VIOLET } from '../palette.ts';

const claw = (d: string, tx: number, ty: number) =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-width="5.4" stroke-linecap="round"/>` +
  `<path d="M${tx} ${ty}q-6-1-8 4q4-2 8 0z" fill="${BONE}" stroke="${INK}" stroke-width=".9" stroke-linejoin="round"/>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V96H0Z" fill="url(#hh-hatch-d)" opacity=".35"/>
  <circle cx="100" cy="66" r="44" fill="url(#hh-glow-red)" opacity=".35"/>

  <!-- the contract -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M22 106L178 98L188 140L12 146Z" fill="${BONE}" stroke-width="1.5"/>
    <path d="M12 146L188 140L186 132Q100 136 14 138Z" fill="url(#hh-hatch)" opacity=".45" stroke="none"/>
    <path d="M30 110q10-2 20 0t20-1t20 0t20-1M34 116q12-2 24 0t24-1t24 0t22-1M36 122q12-2 24-1t24 0t20-1" fill="none" stroke-width=".8"/>
    <path d="M110 110q12-1 24-1t24-1M114 118q10-1 20-1t26-1" fill="none" stroke-width=".8"/>
    <path d="M40 136L110 132" fill="none" stroke-width="1"/>
    <path d="M150 130a8 8 0 1 0 .1 0z" fill="${BLOOD}" stroke-width="1"/>
    <path d="M146 134l4-4 4 4-4 4z" fill="none" stroke="${BLOOD_D}" stroke-width="1"/>
  </g>
  <path d="M46 134q6-8 10-2t8-3q4 6 10-1t10 1q4-4 10 0" fill="none" stroke="${BLOOD}" stroke-width="1.6" stroke-linecap="round"/>

  <!-- the quill, lying across -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M98 132L168 102" stroke-width="1.4"/>
    <path d="M114 124C130 110 150 100 170 98C160 106 144 116 126 124C140 116 154 110 164 104" fill="${SHADOW}" stroke-width="1.1"/>
    <path d="M120 122q20-14 44-20" fill="none" stroke-width=".7"/>
    <path d="M98 132l6-4 2 2z" fill="${INK}"/>
  </g>
  <g class="a-drip"><path d="M97 134q-3 4.4 0 6.6q3-2.2 0-6.6z" fill="${BLOOD}" stroke="${INK}" stroke-width=".6"/></g>

  <!-- the clawed arm, from the right -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M200 44C182 46 162 52 140 54C124 54 112 56 100 60L96 80C112 82 128 80 142 80C164 80 184 82 200 86Z" fill="${INK}" stroke-width="1.4"/>
    <path d="M200 44C182 46 162 52 140 54L142 80C164 80 184 82 200 86Z" fill="url(#hh-stipple-bone)" opacity=".5" stroke="none"/>
    <path d="M168 42L176 88H200V40Z" fill="${VIOLET}" stroke-width="1.4"/>
    <path d="M168 42L176 88H200V40Z" fill="url(#hh-hatch-bone)" opacity=".35" stroke="none"/>
    <path d="M168 42l3 6 2-5 3 7 2-6 3 8" fill="none" stroke-width="1"/>
  </g>
  ${claw('M92 80C86 88 78 90 72 86', 72, 86)}
  ${claw('M98 82C94 92 86 94 80 92', 80, 92)}

  <!-- the pale hand, from the left -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M0 50L50 54L54 82L0 88Z" fill="${SHADOW}" stroke-width="1.4"/>
    <path d="M0 50L50 54L54 82L0 88Z" fill="url(#hh-hatch-r)" opacity=".55" stroke="none"/>
    <path d="M48 52q4 4 0 8q4 4 0 8q4 4 0 8q4 4 2 8" fill="${BONE}" stroke-width="1"/>
    <path d="M52 58C66 56 84 56 104 60C112 62 116 66 114 72C112 78 104 82 94 84C80 86 64 84 54 80Z" fill="${BONE}" stroke-width="1.5"/>
    <path d="M54 74C66 78 84 80 100 80C94 84 80 86 54 80Z" fill="url(#hh-hatch)" opacity=".5" stroke="none"/>
    <path d="M106 66C114 64 124 66 126 70C126 74 120 74 110 72M104 72C114 72 122 74 123 78C122 82 114 80 104 78" fill="${BONE}" stroke-width="1.2"/>
    <path d="M96 60C104 54 114 52 122 54C124 56 122 58 118 58C110 59 104 62 100 64Z" fill="${BONE}" stroke-width="1.2"/>
  </g>
  <!-- the claw's thumb over the pale hand -->
  ${claw('M104 60C94 52 82 50 72 54', 72, 54)}

  <!-- an eye on the back of the claw -->
  <g class="a-blink">
    <path d="M146 66q8-7 16 0q-8 7-16 0z" fill="${BONE}" stroke="${BLOOD_D}" stroke-width="1"/>
    <circle cx="154" cy="66" r="2.8" fill="${BLOOD}"/>
    <circle cx="154" cy="66" r="1.1" fill="${INK}"/>
  </g>
`;
