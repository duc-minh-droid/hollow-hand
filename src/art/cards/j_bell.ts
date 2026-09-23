// Bell Toll — a cracked iron bell swinging from its yoke; the toll rings out in bone circles and a crow flees.
import { BLOOD, BONE, GOLD, INK } from '../palette.ts';

const BELL = 'M78 36Q78 28 92 26Q106 28 106 36Q110 70 128 92Q92 100 56 92Q74 70 78 36Z';

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>

  <!-- the toll -->
  <g fill="none" stroke="${BONE}" stroke-linecap="round">
    <path d="M136 64A52 52 0 0 1 128 136" stroke-width="1.4" opacity=".8"/>
    <path d="M150 58A66 66 0 0 1 138 144" stroke-width="1.1" opacity=".55" stroke-dasharray="6 4"/>
    <path d="M164 56A80 80 0 0 1 156 132" stroke-width=".9" opacity=".35" stroke-dasharray="3 5"/>
    <path d="M48 64A52 52 0 0 0 56 136" stroke-width="1.4" opacity=".8"/>
    <path d="M34 58A66 66 0 0 0 46 144" stroke-width="1.1" opacity=".55" stroke-dasharray="6 4"/>
    <path d="M20 60A80 80 0 0 0 26 130" stroke-width=".9" opacity=".35" stroke-dasharray="3 5"/>
  </g>

  <!-- yoke -->
  <g stroke="${BONE}" stroke-width="1.4" stroke-linejoin="round">
    <path d="M58 14H126V22H58Z" fill="${INK}"/>
    <path d="M58 14H126V22H58Z" fill="url(#hh-hatch-bone)" opacity=".35"/>
    <path d="M62 22V30M122 22V30" stroke-width="2.4"/>
  </g>

  <g class="a-sway">
    <path d="M86 26Q86 18 92 18Q98 18 98 26" fill="none" stroke="${BONE}" stroke-width="2.4"/>
    <circle cx="92" cy="104" r="5" fill="${INK}" stroke="${BONE}" stroke-width="1.4"/>
    <path d="M92 92V99" stroke="${BONE}" stroke-width="1.6"/>
    <g stroke="${BONE}" stroke-width="1.6" stroke-linejoin="round">
      <path d="${BELL}" fill="${INK}"/>
      <path d="M92 26Q106 28 106 36Q110 70 128 92Q110 96 96 96Q100 60 92 26Z" fill="url(#hh-xhatch-bone)" opacity=".35" stroke="none"/>
      <path d="M56 92Q92 100 128 92Q126 86 124 86Q92 94 60 86Q58 88 56 92Z" fill="${INK}"/>
    </g>
    <g fill="none" stroke="${GOLD}" stroke-width="1.2">
      <path d="M77 44Q92 40 107 44M64 80Q92 86 120 80"/>
      <path d="M66 76Q92 82 118 76" stroke-dasharray="1 2"/>
    </g>
    <path d="M84 40L80 54L86 60L78 74L82 80L76 90" fill="none" stroke="${BLOOD}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M84 40L80 54L86 60L78 74L82 80L76 90" fill="none" stroke="${BONE}" stroke-width=".5" stroke-linejoin="round"/>
    <path d="M84 36Q82 46 86 52" fill="none" stroke="${BONE}" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>
  </g>

  <!-- the crow takes flight -->
  <g class="a-float">
    <path d="M144 46Q154 40 162 43Q168 26 182 20Q176 34 172 44Q178 46 184 50Q170 52 162 50Q154 54 144 46Z" fill="${INK}" stroke="${BONE}" stroke-width="1.1" stroke-linejoin="round"/>
    <path d="M162 43Q156 30 150 26Q156 36 158 44Z" fill="${INK}" stroke="${BONE}" stroke-width=".8" stroke-linejoin="round"/>
    <path d="M144 46l-5 1.5 5 1" fill="${GOLD}"/>
    <circle cx="148" cy="45.4" r=".9" fill="${BLOOD}"/>
  </g>
  <g fill="none" stroke="${BONE}" stroke-width=".8" opacity=".6">
    <path d="M150 70q-3 3-1 7M166 82q3 2 2 6"/>
  </g>
`;
