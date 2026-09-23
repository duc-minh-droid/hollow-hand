// Veil — an empty shroud hangs in the air under a gilt circlet; a face presses out through the cloth.
import { BLOOD, BONE, GOLD, INK } from '../palette.ts';

const SHROUD = 'M100 20Q132 20 138 52Q142 80 150 104Q156 122 166 130Q150 128 142 138Q132 126 122 136Q112 126 100 140Q88 126 78 136Q68 126 58 138Q50 128 34 130Q44 122 50 104Q58 80 62 52Q68 20 100 20Z';

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>
  <g class="a-pulse"><ellipse cx="100" cy="146" rx="46" ry="3.5" fill="${INK}" opacity=".9"/></g>
  <path d="M0 0H200V30C150 22 50 22 0 30Z" fill="url(#hh-stipple-bone)" opacity=".2"/>

  <g class="a-float">
    <path d="${SHROUD}" fill="${BONE}" opacity=".22"/>
    <path d="${SHROUD}" fill="url(#hh-hatch-bone-d)" opacity=".3"/>
    <path d="M100 20Q132 20 138 52Q142 80 150 104Q156 122 166 130Q150 128 142 138Q134 110 126 84Q120 50 100 20Z" fill="url(#hh-xhatch-bone)" opacity=".25"/>
    <path d="${SHROUD}" fill="none" stroke="${BONE}" stroke-width="1.6" stroke-linejoin="round"/>

    <!-- folds -->
    <g fill="none" stroke="${BONE}" stroke-width=".9" stroke-linecap="round" opacity=".8">
      <path d="M70 70Q66 100 58 136M80 92Q78 116 78 134M122 92Q122 116 122 134M132 72Q136 100 142 136M100 96V138"/>
      <path d="M88 98Q86 118 90 130M112 98Q114 118 110 130" opacity=".6"/>
    </g>

    <!-- the face pushing through -->
    <ellipse cx="100" cy="62" rx="20" ry="26" fill="${BONE}" opacity=".3"/>
    <path d="M82 50Q90 44 98 50M102 50Q110 44 118 50" fill="none" stroke="${BONE}" stroke-width="1.2" stroke-linecap="round"/>
    <ellipse cx="90" cy="56" rx="5" ry="3.6" fill="${INK}" opacity=".85"/>
    <ellipse cx="110" cy="56" rx="5" ry="3.6" fill="${INK}" opacity=".85"/>
    <path d="M100 54Q98 64 96 68Q100 71 104 68" fill="none" stroke="${BONE}" stroke-width="1.1" stroke-linecap="round"/>
    <ellipse cx="100" cy="78" rx="5" ry="6.5" fill="${INK}" opacity=".8"/>
    <path d="M80 70Q84 86 100 90Q116 86 120 70" fill="none" stroke="${BONE}" stroke-width=".8" opacity=".6"/>

    <!-- circlet -->
    <path d="M74 38Q100 28 126 38" fill="none" stroke="${GOLD}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M80 36l2-6 3 4M115 34l3-4 2 6" fill="none" stroke="${GOLD}" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M100 26l3 4-3 4-3-4z" fill="${BLOOD}" stroke="${GOLD}" stroke-width=".8"/>
  </g>
`;
