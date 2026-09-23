// Leech — a fat leech curled on a pale wrist beside a gold bangle, swollen dark with someone else's blood.
import { BLOOD, BLOOD_D, BONE, GOLD, GOLD_D, INK, SHADOW } from '../palette.ts';

const BODY = 'M58 98Q50 60 88 52Q132 44 146 72Q154 94 132 98Q116 100 114 86Q110 72 94 74Q76 78 80 98Z';

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>
  <g class="a-pulse"><ellipse cx="100" cy="76" rx="60" ry="40" fill="url(#hh-glow-red)" opacity=".35"/></g>

  <!-- the wrist -->
  <g stroke="${INK}" stroke-width="1.4" stroke-linejoin="round">
    <path d="M0 98Q100 88 200 102L200 140Q100 132 0 142Z" fill="${BONE}"/>
    <path d="M0 124Q100 116 200 126L200 140Q100 132 0 142Z" fill="url(#hh-hatch)" opacity=".55" stroke="none"/>
    <path d="M0 98Q100 88 200 102" fill="none" stroke="${BONE}" stroke-width="1.6"/>
  </g>
  <g fill="none" stroke="${SHADOW}" stroke-width=".9" stroke-linecap="round">
    <path d="M10 112Q40 106 60 112Q80 118 100 110M120 112Q140 106 160 114"/>
    <path d="M30 120q12-2 20 2M140 122q10-3 22 0"/>
  </g>
  <g fill="${BLOOD_D}"><circle cx="72" cy="104" r="1.2"/><circle cx="66" cy="108" r="1"/><circle cx="130" cy="102" r="1.1"/></g>

  <!-- gold bangle -->
  <g stroke="${INK}" stroke-width="1.2">
    <path d="M164 94Q170 118 166 142L178 142Q182 118 176 96Z" fill="${GOLD}"/>
    <path d="M170 96Q174 118 172 142" fill="none" stroke="${GOLD_D}" stroke-width="1.4"/>
    <circle cx="171" cy="118" r="2.6" fill="${BLOOD}"/>
  </g>

  <!-- the leech -->
  <g stroke="${BONE}" stroke-width="1.5" stroke-linejoin="round">
    <path d="${BODY}" fill="${BLOOD_D}"/>
    <path d="${BODY}" fill="url(#hh-xhatch-bone)" opacity=".18" stroke="none"/>
    <path d="M64 88Q60 62 90 58Q126 52 140 74Q144 86 134 92" fill="none" stroke="${BLOOD}" stroke-width="6" opacity=".8"/>
  </g>
  <g fill="none" stroke="${BONE}" stroke-width=".8" stroke-linecap="round" opacity=".75">
    <path d="M60 84q8 2 16-2M62 70q8 4 16 0M72 58q4 6 12 6M90 52q0 8 6 12M108 52q-2 8 2 14M126 58q-6 6-4 14M140 70q-8 2-12 8M144 86q-8-2-14 2"/>
  </g>
  <path d="M74 60Q96 50 118 54" fill="none" stroke="${BONE}" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>
  <ellipse cx="80" cy="99" rx="6" ry="2.4" fill="${INK}" stroke="${BONE}" stroke-width="1"/>
  <ellipse cx="136" cy="97" rx="4" ry="2" fill="${INK}" stroke="${BONE}" stroke-width=".8"/>

  <!-- the bite weeps -->
  <path d="M84 100q2 8 1 14" fill="none" stroke="${BLOOD}" stroke-width="2" stroke-linecap="round"/>
  <g class="a-drip">
    <path d="M85 117q-3.5 5 0 8q3.5-3 0-8z" fill="${BLOOD}" stroke="${INK}" stroke-width=".6"/>
  </g>
`;
