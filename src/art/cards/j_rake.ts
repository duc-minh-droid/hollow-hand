// Rake — a black-gloved hand with long gilded nails; three gashes torn down the frame behind it.
import { BLOOD, BLOOD_D, BONE, GOLD, INK } from '../palette.ts';

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>
  <path d="M0 150V96C40 110 60 140 110 150Z" fill="url(#hh-hatch-bone)" opacity=".15"/>

  <!-- three gashes, torn from the nail tips down-left -->
  <g stroke="${BONE}" stroke-width=".9" stroke-linejoin="round">
    <path d="M120 76Q82 114 26 128Q72 98 120 76Z" fill="${BLOOD}"/>
    <path d="M138 80Q106 124 56 142Q92 106 138 80Z" fill="${BLOOD}"/>
    <path d="M156 78Q134 124 94 146Q120 106 156 78Z" fill="${BLOOD}"/>
  </g>
  <g fill="none" stroke="${BLOOD_D}" stroke-width="1.6" stroke-linecap="round">
    <path d="M112 86Q82 110 40 124M130 92Q104 120 66 136M150 90Q130 120 100 140"/>
  </g>
  <g fill="none" stroke="${BONE}" stroke-width=".8" stroke-linecap="round" opacity=".7">
    <path d="M104 90l-4-5M86 104l-5-4M68 114l-4-5M124 100l-5-3M108 116l-4-5M144 102l-5-2M130 120l-4-4"/>
  </g>
  <g fill="${BLOOD}">
    <circle cx="34" cy="116" r="1.6"/><circle cx="46" cy="136" r="1.2"/><circle cx="80" cy="146" r="1.4"/><circle cx="24" cy="138" r="1"/>
  </g>

  <!-- glove: cuff, palm and curled fingers -->
  <g stroke="${BONE}" stroke-width="1.5" stroke-linejoin="round">
    <path d="M140 0H192V16Q170 26 142 18Z" fill="${INK}"/>
    <path d="M144 4H190M144 10H190" stroke="${GOLD}" stroke-width="1"/>
    <path d="M128 20Q152 10 178 20L174 46Q152 54 128 46Z" fill="${INK}"/>
    <path d="M150 22Q172 22 174 44Q160 50 150 50Z" fill="url(#hh-hatch-bone)" opacity=".35" stroke="none"/>
    <path d="M134 32q16-6 34 0" fill="none" stroke-width=".8"/>
  </g>
  <g stroke-linecap="round" fill="none">
    <path d="M132 44L126 60M148 48L140 64M164 46L158 62" stroke="${BONE}" stroke-width="10"/>
    <path d="M132 44L126 60M148 48L140 64M164 46L158 62" stroke="${INK}" stroke-width="7"/>
    <path d="M176 38Q186 46 180 56" stroke="${BONE}" stroke-width="9"/>
    <path d="M176 38Q186 46 180 56" stroke="${INK}" stroke-width="6"/>
    <path d="M128 52l3 1M143 56l3 1M159 54l3 1" stroke="${BONE}" stroke-width=".8"/>
  </g>

  <!-- long lacquered nails -->
  <g fill="${GOLD}" stroke="${INK}" stroke-width=".8" stroke-linejoin="round">
    <path d="M123 60Q120 70 119 78Q124 72 129 62Z"/>
    <path d="M137 64Q136 74 137 82Q140 74 143 65Z"/>
    <path d="M155 62Q155 72 157 80Q159 71 161 63Z"/>
    <path d="M178 56Q180 62 184 66Q183 60 182 56Z"/>
  </g>
  <g class="a-glint">
    <path d="M140 68l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z" fill="${BONE}"/>
  </g>

  <g class="a-drip">
    <path d="M58 134q-3.5 5 0 8q3.5-3 0-8z" fill="${BLOOD}" stroke="${BONE}" stroke-width=".6"/>
  </g>
`;
