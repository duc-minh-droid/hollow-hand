// Carapace — a scarab seen from above, its black wing-cases edged in gold, a gilt halo turning behind.
import { BLOOD, BONE, GOLD, GOLD_D, INK } from '../palette.ts';

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>
  <g class="a-pulse">
    <circle cx="100" cy="80" r="62" fill="none" stroke="${GOLD}" stroke-width="1.2" stroke-dasharray="2 4" opacity=".55"/>
    <circle cx="100" cy="80" r="54" fill="none" stroke="${GOLD_D}" stroke-width=".8" opacity=".6"/>
  </g>

  <!-- legs -->
  <g fill="none" stroke="${BONE}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M80 50L60 42L50 26M76 78L54 80L38 70M78 106L58 118L48 134"/>
    <path d="M120 50L140 42L150 26M124 78L146 80L162 70M122 106L142 118L152 134"/>
    <path d="M57 41l-3 5M52 80l1 5M57 118l-5 1M143 41l3 5M148 80l-1 5M143 118l5 1" stroke-width="1"/>
  </g>

  <!-- head with toothed clypeus -->
  <path d="M86 38L90 28L95 33L100 22L105 33L110 28L114 38Q100 44 86 38Z" fill="${INK}" stroke="${GOLD}" stroke-width="1.4" stroke-linejoin="round"/>
  <circle cx="92" cy="37" r="1.4" fill="${BLOOD}"/><circle cx="108" cy="37" r="1.4" fill="${BLOOD}"/>

  <!-- pronotum -->
  <g stroke="${GOLD}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M78 42Q100 34 122 42Q132 52 124 64Q100 70 76 64Q68 52 78 42Z" fill="${INK}"/>
    <path d="M100 38Q124 40 126 56Q122 64 100 66Z" fill="url(#hh-hatch-bone)" opacity=".35" stroke="none"/>
    <path d="M84 50Q100 44 116 50" fill="none" stroke="${BONE}" stroke-width=".8"/>
  </g>

  <!-- elytra: two armoured plates split down the seam -->
  <g stroke="${GOLD}" stroke-width="1.8" stroke-linejoin="round">
    <path d="M99 66Q80 64 72 74Q64 102 80 124Q92 134 99 132Z" fill="${INK}"/>
    <path d="M101 66Q120 64 128 74Q136 102 120 124Q108 134 101 132Z" fill="${INK}"/>
    <path d="M101 66Q120 64 128 74Q136 102 120 124Q108 134 101 132Z" fill="url(#hh-xhatch-bone)" opacity=".3" stroke="none"/>
    <path d="M99 66Q80 64 72 74Q66 90 70 104Q80 96 99 98Z" fill="url(#hh-hatch-bone)" opacity=".25" stroke="none"/>
  </g>
  <g fill="none" stroke="${BONE}" stroke-width=".8" stroke-linecap="round">
    <path d="M94 72Q82 98 92 126M86 72Q74 96 82 120M106 72Q118 98 108 126M114 72Q126 96 118 120"/>
    <path d="M78 80q4-2 8 0M76 96q4-2 8 0M80 112q4-2 8 0M116 80q4-2 8 0M116 96q4-2 8 0M112 112q4-2 8 0" opacity=".7"/>
  </g>
  <path d="M100 66V132" stroke="${GOLD}" stroke-width="2.4"/>
  <path d="M78 78Q80 72 88 70" fill="none" stroke="${BONE}" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
  <g fill="${GOLD}"><circle cx="100" cy="72" r="1.6"/><circle cx="100" cy="100" r="1.6"/><circle cx="100" cy="126" r="1.6"/></g>
`;
