// Gutting Hook — an iron butcher's hook swaying on its chain beneath a beam, bloody from the point down.
import { BLOOD, BLOOD_D, BONE, GOLD, INK, SHADOW } from '../palette.ts';

const HOOK = 'M100 70V102Q100 134 76 134Q56 132 58 110';

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>

  <!-- beam -->
  <g stroke="${BONE}" stroke-width="1.4">
    <path d="M10 2H190V14H10Z" fill="${INK}"/>
    <path d="M10 2H190V14H10Z" fill="url(#hh-xhatch-bone)" opacity=".3"/>
    <path d="M30 8h40M90 6h30M140 9h36" stroke-width=".7" opacity=".6"/>
  </g>
  <circle cx="100" cy="17" r="3.4" fill="none" stroke="${GOLD}" stroke-width="1.6"/>

  <!-- pool below -->
  <ellipse cx="80" cy="144" rx="26" ry="3.4" fill="${BLOOD_D}"/>
  <ellipse cx="78" cy="143.4" rx="12" ry="1.4" fill="${BLOOD}"/>

  <g class="a-sway">
    <!-- chain -->
    <g fill="none" stroke="${BONE}" stroke-linecap="round">
      <ellipse cx="100" cy="26" rx="3.2" ry="6" stroke-width="1.6"/>
      <path d="M100 30V40" stroke-width="3.6"/><path d="M100 30V40" stroke="${INK}" stroke-width="1.4"/>
      <ellipse cx="100" cy="44" rx="3.2" ry="6" stroke-width="1.6"/>
      <path d="M100 48V58" stroke-width="3.6"/><path d="M100 48V58" stroke="${INK}" stroke-width="1.4"/>
    </g>
    <circle cx="100" cy="64" r="5" fill="none" stroke="${BONE}" stroke-width="2"/>

    <!-- the hook: bone rim, iron core, cold highlight -->
    <g fill="none" stroke-linecap="round">
      <path d="${HOOK}" stroke="${BONE}" stroke-width="8"/>
      <path d="${HOOK}" stroke="${INK}" stroke-width="5"/>
      <path d="${HOOK}" stroke="url(#hh-hatch-bone)" stroke-width="5" opacity=".5"/>
      <path d="M102 72V102Q102 128 84 132" stroke="${SHADOW}" stroke-width="1"/>
    </g>
    <path d="M54 112L58 92L62 112Z" fill="${INK}" stroke="${BONE}" stroke-width="1.2" stroke-linejoin="round"/>

    <!-- blood from the point down the belly -->
    <path d="M58 94L60 110Q60 128 76 131" fill="none" stroke="${BLOOD}" stroke-width="3" stroke-linecap="round"/>
    <path d="M86 132q4 2 4 6" fill="none" stroke="${BLOOD}" stroke-width="2" stroke-linecap="round"/>
    <g class="a-drip">
      <path d="M90 136q-3 4.5 0 7q3-2.5 0-7z" fill="${BLOOD}" stroke="${BONE}" stroke-width=".5"/>
    </g>
  </g>

  <g fill="${BONE}" opacity=".5">
    <circle cx="36" cy="40" r="1"/><circle cx="160" cy="56" r="1.2"/><circle cx="148" cy="112" r=".9"/><circle cx="30" cy="96" r=".9"/>
  </g>
`;
