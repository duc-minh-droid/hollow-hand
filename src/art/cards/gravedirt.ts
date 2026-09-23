// Grave Dirt — a spade left standing in a fresh mound by a little cross; worms stir, a crow has walked here.
import { BONE, INK, PARCH, SHADOW, VERD, VERD_D } from '../palette.ts';

const track = (x: number, y: number, rot: number) =>
  `<path transform="rotate(${rot} ${x} ${y})" d="M${x} ${y}l-3.4-5M${x} ${y}v-6.4M${x} ${y}l3.4-5M${x} ${y}v3" stroke="${INK}" stroke-width="1.1" stroke-linecap="round"/>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <!-- night sky and a sleeping moon -->
  <rect width="200" height="110" fill="url(#hh-hatch)" opacity=".55"/>
  <rect width="200" height="70" fill="url(#hh-hatch-r)" opacity=".3"/>
  <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
    <circle cx="148" cy="50" r="28" fill="${BONE}"/>
    <path d="M148 22a28 28 0 0 1 0 56a22 28 0 0 0 0-56z" fill="url(#hh-hatch-r)" opacity=".55" stroke="none"/>
    <path d="M134 44q4 3 8 0M154 44q4 3 8 0M140 62q8 5 16 0" fill="none" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M147 48q-2 5 1 7" fill="none" stroke-width="1"/>
    <circle cx="160" cy="60" r="2.4" fill="none" stroke-width=".7"/><circle cx="134" cy="32" r="1.6" fill="none" stroke-width=".7"/>
  </g>
  <g fill="${INK}"><circle cx="30" cy="30" r="1.2"/><circle cx="64" cy="18" r="1"/><circle cx="92" cy="40" r="1.1"/><circle cx="186" cy="92" r="1"/>
    <path d="M44 48l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z"/></g>

  <!-- the mound -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M0 150V124Q22 102 70 96Q110 88 150 100Q184 110 200 124V150Z" fill="${SHADOW}" opacity=".5" stroke="none"/>
    <path d="M0 150V124Q22 102 70 96Q110 88 150 100Q184 110 200 124V150Z" fill="url(#hh-stipple)"/>
    <path d="M0 124Q22 102 70 96Q110 88 150 100Q184 110 200 124" fill="none"/>
    <path d="M30 118q10-4 20-2M86 104q12-3 24 0M160 116q10 2 18 8" fill="none" stroke-width=".8"/>
  </g>

  <!-- a small cross -->
  <g transform="rotate(-8 52 100)" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round">
    <rect x="49" y="62" width="6" height="40" fill="${BONE}"/>
    <rect x="40" y="72" width="24" height="5" fill="${BONE}"/>
    <rect x="52" y="62" width="3" height="40" fill="url(#hh-hatch-v)" opacity=".7" stroke="none"/>
    <path d="M49 71l6 7M55 71l-6 7" stroke-width=".9"/>
  </g>

  <!-- the spade, handle across the moon -->
  <g transform="rotate(20 100 96)" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
    <rect x="98" y="20" width="4" height="46" fill="${BONE}"/>
    <rect x="100.2" y="20" width="1.8" height="46" fill="url(#hh-hatch-v)" stroke="none"/>
    <path d="M94 20V14Q94 10 100 10Q106 10 106 14V20ZM97 18V15Q97 13 100 13Q103 13 103 15V18Z" fill="${BONE}" fill-rule="evenodd"/>
    <path d="M96 76L97 64H103L104 76Z" fill="${VERD_D}"/>
    <path d="M89 97V80Q89 76 94 76H106Q111 76 111 80V97Z" fill="${VERD}"/>
    <path d="M101 77H106Q111 76 111 80V97H101Z" fill="url(#hh-hatch-d)" opacity=".55" stroke="none"/>
    <path d="M92 80v14" stroke="${BONE}" stroke-width="1" opacity=".7"/>
  </g>
  <path d="M84 100q6-5 12-3q8-3 14 1q6 0 8 4" fill="${SHADOW}" stroke="${INK}" stroke-width="1.2"/>
  <g fill="${SHADOW}" stroke="${INK}" stroke-width=".8"><ellipse cx="80" cy="104" rx="3" ry="1.8"/><ellipse cx="122" cy="104" rx="2.4" ry="1.5"/><ellipse cx="38" cy="116" rx="2" ry="1.3"/></g>

  <!-- worms and a crow's tracks -->
  <ellipse cx="68" cy="130" rx="4" ry="1.6" fill="${INK}"/>
  <g class="a-sway">
    <path d="M68 130q-2-8 4-10q6-1 6-7q0-4 4-4" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <path d="M68 130q-2-8 4-10q6-1 6-7q0-4 4-4" fill="none" stroke="${BONE}" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 1"/>
  </g>
  <path d="M160 134q4-6 10-3q5 3 9-2" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M160 134q4-6 10-3q5 3 9-2" fill="none" stroke="${BONE}" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="2 1"/>
  <ellipse cx="160" cy="135" rx="3" ry="1.4" fill="${INK}"/>
  ${track(118, 128, -18)}
  ${track(132, 138, 10)}
  ${track(104, 142, -12)}
`;
