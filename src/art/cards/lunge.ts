// Lunge — a rapier driven from the left through a ring of ink, its point a breath from a keyhole.
import { BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <!-- the door -->
  <path d="M146 0H200V150H146Z" fill="${SHADOW}" opacity=".35"/>
  <path d="M146 0H200V150H146Z" fill="url(#hh-hatch-v)" opacity=".55"/>
  <path d="M146 0V150M166 0V150M186 0V150" stroke="${INK}" stroke-width="1.2"/>
  <path d="M150 20q6 30 0 60M176 92q-4 24 2 50" fill="none" stroke="${INK}" stroke-width=".7"/>
  <circle cx="156" cy="128" r="1.6" fill="${INK}"/><circle cx="156" cy="24" r="1.6" fill="${INK}"/>

  <!-- escutcheon and keyhole -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M170 44Q182 50 184 62Q186 78 180 96Q176 108 170 114Q164 108 160 96Q154 78 156 62Q158 50 170 44Z" fill="${GOLD}"/>
    <path d="M170 44Q182 50 184 62Q186 78 180 96Q176 108 170 114Q176 90 176 72Q176 54 170 44Z" fill="url(#hh-hatch-d)" opacity=".55" stroke="none"/>
    <circle cx="170" cy="52" r="1.6" fill="${INK}"/><circle cx="170" cy="106" r="1.6" fill="${INK}"/>
    <path d="M170 66a6 6 0 0 0-3.4 10.9L164 92h12l-2.6-15.1A6 6 0 0 0 170 66Z" fill="${INK}"/>
  </g>

  <!-- motion: speed lines and the ring the blade punches through -->
  <path d="M52 64H92M60 70H86M52 90H90M62 96H84" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>
  <g class="a-pulse">
    <ellipse cx="110" cy="80" rx="7" ry="26" fill="none" stroke="${INK}" stroke-width="1.8"/>
    <ellipse cx="110" cy="80" rx="11" ry="38" fill="none" stroke="${INK}" stroke-width=".8" stroke-dasharray="3 3"/>
    <path d="M118 46l6-6M122 56l8-3M118 114l6 6M122 104l8 3" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>
  </g>

  <!-- rapier -->
  <g stroke="${INK}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
    <path d="M44 83L152 80.6L44 78Z" fill="${BONE}"/>
    <path d="M44 80.5L152 80.6" stroke-width=".7"/>
    <path d="M44 78L152 80.6L44 80.5Z" fill="url(#hh-hatch-d)" opacity=".5" stroke="none"/>
    <path d="M42 62Q34 80 42 98" fill="none" stroke-width="4.4"/>
    <path d="M42 62Q34 80 42 98" fill="none" stroke="${GOLD}" stroke-width="2.2"/>
    <path d="M44 72Q52 80 44 88Q38 80 44 72Z" fill="${GOLD}"/>
    <path d="M40 56L38 104" stroke-width="4.4"/>
    <path d="M40 56L38 104" stroke="${GOLD}" stroke-width="2.2"/>
    <circle cx="40" cy="55" r="2.6" fill="${GOLD}"/><circle cx="38" cy="105" r="2.6" fill="${GOLD}"/>
    <path d="M22 80Q18 100 38 100" fill="none" stroke-width="3.6"/>
    <path d="M22 80Q18 100 38 100" fill="none" stroke="${GOLD_D}" stroke-width="1.6"/>
    <path d="M22 77h16v6H22z" fill="${INK}"/>
    <path d="M25 77l2 6M29 77l2 6M33 77l2 6" stroke="${GOLD}" stroke-width=".8"/>
    <circle cx="18" cy="80" r="5" fill="${GOLD}"/>
    <circle cx="18" cy="80" r="5" fill="url(#hh-hatch)" opacity=".4"/>
  </g>
  <g class="a-glint">
    <path d="M154 80.6l1.4-4 1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4z" fill="${BONE}" stroke="${INK}" stroke-width=".7"/>
  </g>
`;
