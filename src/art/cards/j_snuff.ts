// Snuff — a brass snuffer on a long handle comes down over a candle flame; the smoke is already rising.
import { BLOOD, BONE, GOLD, GOLD_D, INK, SHADOW } from '../palette.ts';

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>
  <ellipse cx="100" cy="82" rx="38" ry="30" fill="url(#hh-glow)" opacity=".22"/>

  <!-- smoke slipping out from under the cone -->
  <g class="a-smoke" fill="none" stroke="${BONE}" stroke-linecap="round" opacity=".55">
    <path d="M86 62Q78 50 86 40Q94 30 84 18" stroke-width="1.3"/>
    <path d="M78 58Q70 50 74 40" stroke-width=".9"/>
  </g>

  <!-- candle -->
  <g stroke="${INK}" stroke-width="1.2" stroke-linejoin="round">
    <path d="M88 96Q100 92 112 96V140H88Z" fill="${BONE}"/>
    <path d="M102 96Q108 95 112 96V140H102Z" fill="url(#hh-hatch)" opacity=".55" stroke="none"/>
    <path d="M90 96Q92 106 90 112Q88 116 91 118M108 96Q107 104 109 108" fill="none" stroke="${SHADOW}"/>
  </g>
  <path d="M100 94V86" stroke="${INK}" stroke-width="1.4"/>
  <g stroke="${BONE}" stroke-width="1.4" stroke-linejoin="round">
    <path d="M66 140Q100 132 134 140Q100 150 66 140Z" fill="${GOLD_D}"/>
    <path d="M66 140Q100 146 134 140" fill="none" stroke="${GOLD}"/>
  </g>
  <path d="M136 132q6-4 10 2q-2 6-8 4" fill="none" stroke="${GOLD}" stroke-width="1.6"/>

  <!-- flame -->
  <g class="a-flicker" filter="url(#hh-soft-glow)">
    <path d="M100 68Q110 80 105 88Q100 93 95 88Q90 80 100 68Z" fill="url(#hh-flame)"/>
    <path d="M100 76Q104 82 101 87Q99 88 98 86Q97 82 100 76Z" fill="${BONE}"/>
  </g>

  <!-- the snuffer, descending -->
  <g stroke="${BONE}" stroke-width="1.4" stroke-linejoin="round">
    <path d="M106 36L168 30" stroke-width="4" stroke-linecap="round"/>
    <path d="M106 36L168 30" stroke="${GOLD_D}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="172" cy="29" r="4" fill="none" stroke="${GOLD}" stroke-width="1.8"/>
    <path d="M82 62Q100 56 118 62L108 34Q100 30 92 34Z" fill="${GOLD_D}"/>
    <path d="M100 32Q108 34 108 34L118 62Q110 60 104 59Z" fill="url(#hh-hatch-bone)" opacity=".4" stroke="none"/>
    <path d="M82 62Q100 68 118 62" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
    <path d="M90 42Q96 40 100 42" fill="none" stroke-width=".8"/>
  </g>
  <circle cx="100" cy="30" r="2" fill="${BLOOD}" stroke="${BONE}" stroke-width=".8"/>
  <g fill="none" stroke="${BONE}" stroke-width=".9" stroke-linecap="round" opacity=".6">
    <path d="M72 30v10M128 30v10M66 44v8M134 44v8"/>
  </g>
`;
