// Tower's Bolt — a gilt lightning bolt splits a little tower; its crown is thrown off and sparks spray.
import { BLOOD, BONE, FLAME, GOLD, INK } from '../palette.ts';

const BOLT = 'M106 12L71 67H103L99 104L135 49H103Z';

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>

  <!-- storm -->
  <g stroke="${BONE}" stroke-width="1.2" stroke-linejoin="round">
    <path d="M24 34Q22 22 36 22Q42 12 56 18Q66 10 76 20Q88 16 90 28Q80 36 64 32Q52 40 38 34Q30 40 24 34Z" fill="${INK}"/>
    <path d="M124 26Q126 14 140 16Q150 8 162 16Q176 14 176 28Q168 36 152 32Q138 38 124 26Z" fill="${INK}"/>
    <path d="M30 32Q50 36 64 30M130 26Q150 32 168 26" fill="none" stroke-width=".7" opacity=".7"/>
  </g>
  <path d="M24 34Q30 40 38 34Q52 40 64 32Q80 36 90 28L90 34Q60 44 24 38Z" fill="url(#hh-hatch-bone)" opacity=".35"/>

  <g class="a-pulse"><circle cx="100" cy="104" r="26" fill="url(#hh-glow)" opacity=".6"/></g>

  <!-- the bolt -->
  <path d="${BOLT}" fill="url(#hh-gold)" stroke="${BONE}" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M104 18L78 62" stroke="${BONE}" stroke-width=".8" opacity=".8"/>

  <!-- tiny tower -->
  <g stroke="${BONE}" stroke-width="1.3" stroke-linejoin="round">
    <path d="M89 110L94 104L99 110L103 106L106 108L111 104L111 110L114 144H86Z" fill="${INK}"/>
    <path d="M102 110H111L114 144H104Z" fill="url(#hh-xhatch-bone)" opacity=".35" stroke="none"/>
    <path d="M88 118H112M87 128H113M87 136H114M96 110V118M104 118V128M94 128V136M106 136V144" fill="none" stroke-width=".7"/>
    <path d="M97 132Q100 126 103 132V140H97Z" fill="${FLAME}"/>
    <path d="M101 104L98 116L102 124" fill="none" stroke="${GOLD}" stroke-width="1.4"/>
  </g>
  <path d="M60 144H140" stroke="${BONE}" stroke-width="1.2"/>

  <!-- crown thrown clear -->
  <g transform="rotate(28 130 92)" stroke="${INK}" stroke-width=".8" stroke-linejoin="round">
    <path d="M121 96L121 88L125 92L130 86L135 92L139 88L139 96Z" fill="${GOLD}"/>
    <circle cx="130" cy="93" r="1.4" fill="${BLOOD}"/>
  </g>
  <g fill="${INK}" stroke="${BONE}" stroke-width=".7">
    <path d="M72 116l5-2 1 4-5 1z"/><path d="M122 120l5 1-1 4-5-1z"/><path d="M78 132l4-1 1 3-4 1z"/>
  </g>

  <g class="a-glint" stroke-linecap="round">
    <path d="M86 96L76 90M114 96L124 88M82 106H70M118 106H130M88 86L84 78M112 86L118 80" stroke="${GOLD}" stroke-width="1.4"/>
    <path d="M78 100l-4-1M122 100l4-1" stroke="${BONE}" stroke-width="1"/>
  </g>
`;
