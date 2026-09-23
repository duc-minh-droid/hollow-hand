// Doubt — a painted porcelain eye on a cracked shard, looking away; it weeps streaks of ink.
import { BONE, INK, PARCH, SHADOW, VIOLET } from '../palette.ts';

const SHARD = 'M30 60L44 34L70 26L92 30L104 22L132 28L158 36L172 58L166 80L150 96L132 104L118 100L104 110L84 104L64 108L46 96L36 82Z';

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <rect width="200" height="150" fill="url(#hh-xhatch)" opacity=".4"/>
  <path d="M0 150V120Q100 108 200 120V150Z" fill="${VIOLET}" opacity=".35"/>
  <path d="M0 150V120Q100 108 200 120V150Z" fill="url(#hh-hatch-h)" opacity=".6"/>

  <!-- the porcelain shard, its broken edge showing thickness -->
  <path d="${SHARD}" transform="translate(2 4)" fill="${SHADOW}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="${SHARD}" fill="${BONE}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M46 96L64 108L84 104L104 110L118 100L132 104L150 96L166 80Q140 96 104 98Q70 98 46 86Z" fill="url(#hh-hatch-r)" opacity=".45"/>
  <path d="M44 34L58 40L56 50L44 54L36 48Z" fill="${INK}"/>
  <path d="M44 34L58 40L56 50L44 54" fill="none" stroke="${SHADOW}" stroke-width="1"/>

  <!-- painted brow and eye -->
  <path d="M64 50Q100 26 138 46" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M58 68Q100 38 142 68Q100 96 58 68Z" fill="${PARCH}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
  <circle cx="114" cy="66" r="15" fill="${VIOLET}" stroke="${INK}" stroke-width="1.4"/>
  <circle cx="114" cy="66" r="15" fill="url(#hh-hatch-d)" opacity=".45"/>
  <circle cx="114" cy="66" r="10" fill="none" stroke="${INK}" stroke-width=".6" stroke-dasharray="1 1.6"/>
  <circle cx="115" cy="66" r="5.4" fill="${INK}"/>
  <circle cx="111" cy="62" r="2" fill="${BONE}"/>
  <path d="M58 68Q100 38 142 68" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
  <path d="M66 60l-5-6M76 54l-3-7M88 50l-1-7M100 48v-7M112 49l2-7M124 52l3-6M134 58l5-5" stroke="${INK}" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M74 80l-2 4M86 85l-1 4M114 85l1 4M126 80l2 4" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>

  <!-- cracks -->
  <path d="M104 22L100 34L106 40L102 48M30 60L46 62L52 66L58 68M150 96L140 86L134 84L126 76M166 80L152 74L146 70M118 100L112 90L108 84" fill="none" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
  <path d="M100 34l-6 3M140 86l2-7" fill="none" stroke="${INK}" stroke-width=".7"/>

  <!-- tears of ink -->
  <g fill="none" stroke-linecap="round">
    <path d="M86 84Q84 100 88 116Q90 130 86 146M102 88Q104 104 100 118Q98 128 101 136M118 84Q120 96 116 106" stroke="${INK}" stroke-width="2.4"/>
    <path d="M89 86Q88 100 91 114M105 90Q106 102 104 112" stroke="${VIOLET}" stroke-width="1.2" opacity=".9"/>
  </g>
  <circle cx="116" cy="108" r="2.2" fill="${INK}"/>
  <ellipse cx="90" cy="146" rx="12" ry="2.6" fill="${INK}"/>
  <g class="a-drip">
    <path d="M101 138q-3.4 5 0 7.6q3.4-2.6 0-7.6z" fill="${INK}" stroke="${VIOLET}" stroke-width=".6"/>
  </g>
`;
