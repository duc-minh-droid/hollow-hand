// The Magician — as above, so below: wand raised, finger pointing down, the lemniscate over his head;
// a second, fainter magician stands a step behind him, moving a heartbeat late.
import { BLOOD, BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

const limb = (d: string, w = 4.4) =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 2.4}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${BONE}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const pentacle = () => {
  const p = Array.from({ length: 5 }, (_, i) => {
    const a = ((i * 144 - 90) * Math.PI) / 180;
    return `${(142 + Math.cos(a) * 5).toFixed(1)} ${(86 + Math.sin(a) * 5).toFixed(1)}`;
  });
  return `M${p.join('L')}Z`;
};
const INF = 'M100 22c-4-5-11-5-11 0s7 5 11 0s11-5 11 0s-7 5-11 0z';

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V96H0Z" fill="url(#hh-hatch-r)" opacity=".3"/>
  <path d="M20 60q10-10 20 0q-10 10-20 0zM160 60q10-10 20 0q-10 10-20 0z" fill="none" stroke="${INK}" stroke-width=".8"/>

  <!-- the echo, one step behind -->
  <g transform="translate(9 -3)" fill="none" stroke="${INK}" stroke-width="1" stroke-dasharray="2 2" opacity=".5">
    <circle cx="100" cy="42" r="7.5"/>
    <path d="M88 54L80 42L77 28M112 54L120 72L123 90M88 54L84 96M112 54L116 96"/>
    <path d="${INF}"/>
  </g>

  <!-- the lemniscate -->
  <g class="a-pulse">
    <path d="${INF}" fill="none" stroke="${INK}" stroke-width="3.6"/>
    <path d="${INF}" fill="none" stroke="${GOLD}" stroke-width="1.8"/>
  </g>

  <!-- the figure -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M86 52Q100 46 114 52L120 96H80Z" fill="${BLOOD}" stroke-width="1.5"/>
    <path d="M86 52Q100 46 114 52L120 96H80Z" fill="url(#hh-hatch)" opacity=".5" stroke="none"/>
    <path d="M94 52L92 96H108L106 52Z" fill="${BONE}" stroke-width="1.2"/>
    <circle cx="100" cy="76" r="4" fill="none" stroke-width="1.6"/>
    <path d="M96.5 74l-1.5-1" stroke-width="1.2"/>
    <circle cx="100" cy="42" r="7.5" fill="${BONE}" stroke-width="1.4"/>
    <path d="M92.6 40h14.8" stroke="${GOLD_D}" stroke-width="1.6"/>
    <path d="M96 44q1.5 1 3 0M101 44q1.5 1 3 0M98.5 48h3" fill="none" stroke-width=".9"/>
  </g>
  ${limb('M89 56L80 42L77 30')}
  ${limb('M111 56L120 72L123 88')}
  <path d="M123 88l1 7" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>
  <!-- the wand, white at both ends -->
  <g stroke="${INK}" stroke-linecap="round">
    <path d="M73 14L81 40" stroke-width="3.8"/>
    <path d="M73 14L81 40" stroke="${BONE}" stroke-width="2"/>
    <circle cx="73" cy="14" r="2" fill="${BONE}" stroke-width="1"/><circle cx="81" cy="40" r="2" fill="${BONE}" stroke-width="1"/>
  </g>
  <g class="a-glint" fill="${GOLD}"><path d="M70 6l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/></g>

  <!-- the table and its four tools -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M44 104V144M156 104V144" stroke-width="3"/>
    <path d="M34 96H166V106H34Z" fill="${SHADOW}" stroke-width="1.5"/>
    <path d="M34 96H166V106H34Z" fill="url(#hh-hatch-v)" opacity=".6" stroke="none"/>
    <path d="M34 106H166L160 112H40Z" fill="url(#hh-hatch-d)" opacity=".4" stroke="none"/>
    <!-- cup -->
    <path d="M46 78h16q0 10-8 11q-8-1-8-11z" fill="${GOLD}" stroke-width="1.2"/>
    <path d="M54 89v5M49 96h10l-2-2h-6z" fill="${GOLD}" stroke-width="1.2"/>
    <!-- blade -->
    <path d="M70 94L96 90l-24 6z" fill="${BONE}" stroke-width="1.1"/>
    <path d="M69 90v8" stroke-width="2.2"/>
    <path d="M62 95l7-1" stroke-width="3" stroke-linecap="round"/>
    <!-- coin -->
    <circle cx="142" cy="86" r="8" fill="${GOLD}" stroke-width="1.3"/>
    <path d="${pentacle()}" fill="none" stroke-width=".9"/>
    <path d="M136 96h12" stroke-width="1.2"/>
    <!-- wand -->
    <path d="M150 94L164 84" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M150 94L164 84" stroke="${SHADOW}" stroke-width="1.6" stroke-linecap="round"/>
  </g>
`;
