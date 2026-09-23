// Cut Palm — an open hand held over a gilt chalice; a fresh cut across the palm bleeds into the cup.
import { BLOOD, BLOOD_D, BONE, GOLD, GOLD_D, INK, PARCH } from '../palette.ts';

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 150V112C50 100 150 100 200 112V150Z" fill="url(#hh-hatch-h)" opacity=".45"/>
  <path d="M0 112C50 100 150 100 200 112" fill="none" stroke="${INK}" stroke-width="1"/>
  <g fill="${INK}">
    <path d="M36 30l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4z"/>
    <path d="M48 92l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z"/>
    <circle cx="24" cy="60" r="1.1"/><circle cx="166" cy="100" r="1.2"/><circle cx="150" cy="16" r="1"/>
  </g>

  <!-- hand from the right, palm turned out, fingers to the left -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
    <path d="M200 38L152 38Q140 30 130 20Q122 14 118 20Q116 26 126 38L118 40L84 38Q74 38 74 43Q74 48 80 48Q68 48 68 53Q68 58 78 58Q72 58 72 62.5Q72 67 80 67Q78 67 78 71Q78 75 86 75L130 74Q164 72 200 66Z" fill="${BONE}"/>
    <path d="M86 75L130 74Q164 72 200 66V58Q164 66 132 67Q108 70 88 70Z" fill="url(#hh-hatch)" opacity=".55" stroke="none"/>
    <path d="M120 22Q126 30 134 36" fill="none" stroke-width=".9"/>
    <path d="M80 48L112 48.5M78 58L114 58M80 67L112 66" fill="none" stroke-width="1.1"/>
    <path d="M92 40q-1 3 0 6M86 50q-1 3 0 6M88 60q-1 2.6 0 5M94 68q-1 2 0 4" fill="none" stroke-width=".8" opacity=".8"/>
    <path d="M112 44Q124 50 118 62M150 46Q146 56 150 66" fill="none" stroke-width=".9"/>  </g>
  <!-- the cut and the blood running down to the edge of the hand -->
  <path d="M116 44L152 62" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  <path d="M116 44L152 62" stroke="${BLOOD}" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M130 51q-4 8-12 14q-6 6-12 9M142 57q0 8-4 16" fill="none" stroke="${BLOOD}" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M104 75q-2 5 0 9q2-4 0-9z" fill="${BLOOD}" stroke="${INK}" stroke-width=".7"/>
  <g class="a-drip">
    <path d="M104 88q-4 6 0 9q4-3 0-9z" fill="${BLOOD}" stroke="${INK}" stroke-width=".8"/>
  </g>

  <!-- chalice -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M74 104Q76 128 104 130Q132 128 134 104Z" fill="${GOLD}"/>
    <path d="M114 106Q130 108 134 104Q132 126 106 130Q124 122 124 106Z" fill="url(#hh-hatch-d)" opacity=".6" stroke="none"/>
    <path d="M82 112Q84 124 100 126" fill="none" stroke="${BONE}" stroke-width="1.4" opacity=".7"/>
    <ellipse cx="104" cy="104" rx="30" ry="5.5" fill="${GOLD_D}"/>
    <ellipse cx="104" cy="104.6" rx="25" ry="3.6" fill="${BLOOD_D}" stroke-width="1"/>
    <path d="M90 104q14 3 28-1" fill="none" stroke="${BLOOD}" stroke-width="1.4"/>
    <path d="M100 130h8v12h-8z" fill="${GOLD}"/>
    <ellipse cx="104" cy="135" rx="7" ry="3.4" fill="${GOLD_D}"/>
    <path d="M82 146Q104 132 126 146Z" fill="${GOLD}"/>
    <path d="M104 139Q118 140 126 146H108Z" fill="url(#hh-hatch-d)" opacity=".6" stroke="none"/>
    <circle cx="90" cy="116" r="2" fill="${BLOOD}" stroke-width=".8"/>
    <circle cx="104" cy="119" r="2.4" fill="${BLOOD}" stroke-width=".8"/>
    <circle cx="118" cy="116" r="2" fill="${BLOOD}" stroke-width=".8"/>
  </g>
`;
