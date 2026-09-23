// Reading — three cards fanned face-down on a table, a single tallow candle guttering beside them.
import { BONE, FLAME, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

const back = (rot: number) => `
  <g transform="rotate(${rot} 96 134)">
    <rect x="79" y="62" width="34" height="54" rx="3" fill="${BONE}"/>
    <rect x="83" y="66" width="26" height="46" rx="1.5" fill="url(#hh-xhatch)" opacity=".55" stroke-width=".8"/>
    <rect x="79" y="62" width="34" height="54" rx="3" fill="none"/>
    <circle cx="96" cy="89" r="8" fill="${BONE}" stroke-width="1"/>
    <path d="M96 81.5l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" fill="${GOLD}" stroke-width=".8"/>
    <path d="M96 70v5M96 103v5" stroke-width=".9"/>
  </g>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <!-- wall and table -->
  <rect width="200" height="56" fill="url(#hh-hatch)" opacity=".6"/>
  <rect width="200" height="56" fill="url(#hh-hatch-r)" opacity=".25"/>
  <circle cx="160" cy="50" r="40" fill="url(#hh-glow)"/>
  <path d="M0 56H200" stroke="${INK}" stroke-width="1.6"/>
  <path d="M0 60H200" stroke="${INK}" stroke-width=".7"/>
  <path d="M0 76Q60 72 110 78T200 74M0 98Q50 94 90 100T200 96M0 124Q70 118 120 126T200 122M20 140Q40 136 60 140" fill="none" stroke="${SHADOW}" stroke-width=".9"/>
  <ellipse cx="42" cy="110" rx="6" ry="3" fill="none" stroke="${SHADOW}" stroke-width=".8"/>

  <!-- the fan of cards -->
  <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
    <path d="M58 118Q100 112 142 118Q100 128 58 118Z" fill="${SHADOW}" opacity=".45" stroke="none"/>
    ${back(-26)}
    ${back(26)}
    ${back(0)}
  </g>

  <!-- candle -->
  <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
    <ellipse cx="160" cy="116" rx="20" ry="5" fill="${GOLD}"/>
    <path d="M140 116a20 5 0 0 0 40 0v3a20 5 0 0 1-40 0z" fill="${GOLD_D}"/>
    <path d="M150 66V114Q160 118 170 114V66Z" fill="${BONE}"/>
    <path d="M163 67V116Q167 115.5 170 114V66Z" fill="url(#hh-hatch-v)" opacity=".6" stroke="none"/>
    <path d="M150 66Q150 62 160 62Q170 62 170 66Q170 72 168 76Q166 80 167 88Q165 94 164 88Q163 78 162 72Q158 70 156 74Q154 84 152 80Q151 72 150 66Z" fill="${BONE}"/>
    <path d="M166 84q1.6 6 0 9q-1.6-3 0-9z" fill="${BONE}" stroke-width="1"/>
    <path d="M148 113q-3 2-6 1.4" fill="none" stroke-width="1"/>
    <path d="M160 64V56" stroke-width="1.4"/>
  </g>
  <g class="a-flicker">
    <path d="M160 32Q170 46 164 55Q160 60 156 55Q150 46 160 32Z" fill="url(#hh-flame)" stroke="${INK}" stroke-width="1"/>
    <path d="M160 42Q164 50 161 55Q160 57 159 55Q156 50 160 42Z" fill="${FLAME}"/>
  </g>
`;
