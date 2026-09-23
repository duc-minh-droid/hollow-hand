// Drowned Mirror — a verdigris hand mirror half-sunk in black water; its glass shows the world turned over,
// water above, a moon below, and a pale hand reaching down.
import { BONE, INK, NIGHT, PARCH, SHADOW, VERD, VERD_D } from '../palette.ts';

const beads = () =>
  Array.from({ length: 14 }, (_, i) => {
    const a = ((i * 360) / 14 - 90) * (Math.PI / 180);
    return `<circle cx="${(100 + Math.cos(a) * 31).toFixed(1)}" cy="${(70 + Math.sin(a) * 39).toFixed(1)}" r="1.5"/>`;
  }).join('');

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V88H0Z" fill="url(#hh-hatch-r)" opacity=".3"/>
  <g fill="${INK}"><circle cx="30" cy="30" r="1.1"/><circle cx="170" cy="24" r="1.2"/><circle cx="154" cy="50" r=".9"/><circle cx="44" cy="58" r=".9"/></g>

  <!-- the mirror, bobbing -->
  <g class="a-float">
    <g stroke="${INK}" stroke-linejoin="round">
      <path d="M94 106h12l2 40h-16z" fill="${VERD}" stroke-width="1.4"/>
      <path d="M92 116h16M92 126h16M93 136h14" stroke-width="1"/>
      <path d="M100 22q-6-8 0-12q6 4 0 12zM92 26q-8-2-8-8q6 0 8 8zM108 26q8-2 8-8q-6 0-8 8z" fill="${VERD}" stroke-width="1.1"/>
      <ellipse cx="100" cy="70" rx="35" ry="43" fill="${VERD}" stroke-width="1.8"/>
      <ellipse cx="100" cy="70" rx="35" ry="43" fill="url(#hh-hatch)" opacity=".45" stroke="none"/>
      <g fill="${VERD_D}" stroke="none">${beads()}</g>
      <ellipse cx="100" cy="70" rx="28" ry="36" fill="${BONE}" stroke-width="1.4"/>
    </g>
    <!-- the reversed world inside the glass -->
    <path d="M74.2 56A28 36 0 0 1 125.8 56Z" fill="${NIGHT}"/>
    <path d="M78 56q11 3 22 0t22 0" fill="none" stroke="${BONE}" stroke-width=".8" opacity=".7"/>
    <path d="M80 48q10 2 20 0t20 0M86 40q7 2 14 0t14 0" fill="none" stroke="${BONE}" stroke-width=".6" opacity=".5"/>
    <path d="M90 64v7M93 64.5v9M96 64.5v8M98.6 63.5v6M87.4 58l-3 5" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M90 64v7M93 64.5v9M96 64.5v8M98.6 63.5v6M87.4 58l-3 5" fill="none" stroke="${BONE}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M87 46h12l1 18.5q-7 2-13.5 0z" fill="${BONE}" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
    <path d="M89 58q4 2 8 0" fill="none" stroke="${INK}" stroke-width=".7"/>
    <path d="M110 66a8 8 0 1 0 14 6a6 6 0 1 1-14-6z" fill="${BONE}" stroke="${INK}" stroke-width="1.1"/>
    <path d="M112 64q-2 4 0 8" fill="none" stroke="${SHADOW}" stroke-width=".8"/>
    <g fill="${INK}"><circle cx="84" cy="80" r=".9"/><circle cx="106" cy="84" r=".8"/><circle cx="118" cy="62" r=".7"/></g>
  </g>

  <!-- the black water, over the lower half -->
  <path d="M0 88Q50 84 100 88T200 88V150H0Z" fill="${NIGHT}" opacity=".88"/>
  <path d="M0 88Q50 84 100 88T200 88V150H0Z" fill="url(#hh-hatch-bone)" opacity=".18"/>
  <path d="M0 88Q50 84 100 88T200 88" fill="none" stroke="${INK}" stroke-width="1.6"/>
  <g fill="none" stroke="${BONE}" stroke-linecap="round">
    <path d="M58 92q10-3 20 0M122 92q10-3 20 0" stroke-width="1.1"/>
    <path d="M44 98q12-3 24 0M132 98q12-3 24 0M20 106q10-2 20 0M160 108q10-2 20 0" stroke-width=".8" opacity=".7"/>
    <path d="M86 112q14 4 28 0M84 124q16 4 32 0" stroke-width=".7" opacity=".5" stroke-dasharray="4 3"/>
  </g>
  <g class="a-glint" fill="${BONE}"><path d="M130 30l1.2 3.2 3.2 1.2-3.2 1.2-1.2 3.2-1.2-3.2-3.2-1.2 3.2-1.2z"/></g>
`;
