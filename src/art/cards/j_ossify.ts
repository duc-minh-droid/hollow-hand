// Ossify — the flesh of a forearm splits and falls away; beneath, bone grows out in spurs like a ribcage.
import { BLOOD, BLOOD_D, BONE, GOLD, INK } from '../palette.ts';

const BONES = 'M92 122V52M108 122V52';
const HAND = 'M92 46L80 38L70 28M97 40L93 29L90 18M102 38L102 26L102 15M107 40L111 30L115 21M111 45L121 38L129 32';

// a curved thorn growing out of the shaft, bending upward
const spur = (x: number, y: number, dir: number, len: number) =>
  `M${x} ${y}Q${x + dir * len * .6} ${y} ${x + dir * len} ${y - len * .5}Q${x + dir * len * .5} ${y - 6} ${x} ${y - 7}Z`;

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>
  <circle cx="100" cy="80" r="56" fill="url(#hh-glow)" opacity=".1"/>

  <!-- rib spurs -->
  <g fill="${BONE}" stroke="${INK}" stroke-width=".8" stroke-linejoin="round">
    <path d="${spur(92, 112, -1, 44)}"/><path d="${spur(92, 94, -1, 40)}"/><path d="${spur(92, 76, -1, 32)}"/><path d="${spur(92, 60, -1, 22)}"/>
    <path d="${spur(108, 112, 1, 44)}"/><path d="${spur(108, 94, 1, 40)}"/><path d="${spur(108, 76, 1, 32)}"/><path d="${spur(108, 60, 1, 22)}"/>
  </g>
  <g fill="url(#hh-hatch)" opacity=".4">
    <path d="${spur(92, 112, -1, 44)}"/><path d="${spur(92, 94, -1, 40)}"/><path d="${spur(108, 112, 1, 44)}"/><path d="${spur(108, 94, 1, 40)}"/>
  </g>

  <!-- radius and ulna -->
  <g fill="none" stroke-linecap="round">
    <path d="${BONES}" stroke="${INK}" stroke-width="9"/>
    <path d="${BONES}" stroke="${BONE}" stroke-width="6.5"/>
    <path d="M110 58V118" stroke="url(#hh-hatch)" stroke-width="3" opacity=".6"/>
    <path d="M92 64l-3-4M92 86l-3-3M108 70l3-4M108 100l3-3" stroke="${BONE}" stroke-width="2"/>
  </g>

  <!-- carpals and splayed finger bones -->
  <g fill="${BONE}" stroke="${INK}" stroke-width="1">
    <circle cx="94" cy="47" r="4.4"/><circle cx="106" cy="47" r="4.4"/><circle cx="100" cy="42" r="4"/><circle cx="100" cy="51" r="3.6"/>
  </g>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="${HAND}" stroke="${INK}" stroke-width="5.4"/>
    <path d="${HAND}" stroke="${BONE}" stroke-width="3.4"/>
  </g>
  <g fill="${BONE}" stroke="${INK}" stroke-width=".8">
    <circle cx="80" cy="38" r="2.2"/><circle cx="93" cy="29" r="2.2"/><circle cx="102" cy="26" r="2.2"/><circle cx="111" cy="30" r="2.2"/><circle cx="121" cy="38" r="2.2"/>
  </g>
  <path d="M99 31h6" stroke="${GOLD}" stroke-width="2.6"/>

  <!-- the sleeve of flesh, torn back -->
  <g stroke="${BONE}" stroke-width="1.4" stroke-linejoin="round">
    <path d="M76 150L80 120L86 124L90 114L96 122L102 110L106 120L112 114L116 124L120 118L124 150Z" fill="${INK}"/>
    <path d="M104 118L112 114L116 124L120 118L124 150H108Z" fill="url(#hh-hatch-bone)" opacity=".35" stroke="none"/>
    <path d="M80 120L86 124L90 114L96 122L102 110L106 120L112 114L116 124L120 118" fill="none" stroke="${BLOOD}" stroke-width="2.6"/>
  </g>
  <path d="M84 132q10 4 30 0" fill="none" stroke="${GOLD}" stroke-width="1.8"/>
  <path d="M96 122q0 6 0 8" stroke="${BLOOD_D}" stroke-width="1.6" stroke-linecap="round"/>
  <g class="a-drip">
    <path d="M88 122q-3 4.5 0 7q3-2.5 0-7z" fill="${BLOOD}" stroke="${BONE}" stroke-width=".5"/>
  </g>
  <g class="a-glint">
    <path d="M48 80l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z" fill="${BONE}"/>
  </g>
`;
