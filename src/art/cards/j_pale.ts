// Pale Card — skeletal fingers hold up a card with nothing on it, and a violet glow burns behind.
import { BLOOD, BONE, GOLD, INK, SHADOW, VIOLET } from '../palette.ts';

const FINGERS = 'M96 122L94 104L94 80M104 120L106 102L106 78M112 122L116 106L116 84';
const THUMB = 'M88 126L80 108L84 94L92 86';

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>

  <!-- violet glow -->
  <g class="a-pulse">
    <circle cx="100" cy="54" r="62" fill="${VIOLET}" opacity=".18"/>
    <circle cx="100" cy="54" r="48" fill="${VIOLET}" opacity=".25"/>
    <circle cx="100" cy="54" r="36" fill="${VIOLET}" opacity=".4"/>
  </g>
  <g stroke="${VIOLET}" stroke-width="1.6" stroke-linecap="round" opacity=".9">
    <path d="M100 8V2M60 20l-6-6M140 20l6-6M44 54H34M156 54H166M58 90l-6 6M142 90l6 6"/>
  </g>
  <g stroke="${BONE}" stroke-width=".7" stroke-linecap="round" opacity=".5">
    <path d="M66 30l-8-6M134 30l8-6M60 60H48M140 60H152"/>
  </g>

  <!-- fingers behind the card -->
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="${FINGERS}" stroke="${INK}" stroke-width="6.4"/>
    <path d="${FINGERS}" stroke="${BONE}" stroke-width="4.2"/>
  </g>

  <!-- the blank card -->
  <rect x="76" y="16" width="48" height="72" rx="4" fill="${BONE}" stroke="${INK}" stroke-width="1.2"/>
  <rect x="80" y="20" width="40" height="64" rx="2" fill="none" stroke="${SHADOW}" stroke-width=".6" opacity=".6"/>
  <path d="M110 16H120Q124 16 124 20V88H110Z" fill="url(#hh-hatch)" opacity=".18"/>

  <!-- metacarpals, wrist, thumb in front -->
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M96 122L100 146M104 120L102 146M112 122L106 146M88 126L96 146" stroke="${INK}" stroke-width="5.6"/>
    <path d="M96 122L100 146M104 120L102 146M112 122L106 146M88 126L96 146" stroke="${BONE}" stroke-width="3.6"/>
    <path d="${THUMB}" stroke="${INK}" stroke-width="6.4"/>
    <path d="${THUMB}" stroke="${BONE}" stroke-width="4.2"/>
  </g>
  <g fill="${BONE}" stroke="${INK}" stroke-width=".8">
    <circle cx="96" cy="122" r="2.8"/><circle cx="104" cy="120" r="2.8"/><circle cx="112" cy="122" r="2.8"/><circle cx="88" cy="126" r="2.8"/>
    <circle cx="94" cy="104" r="2.2"/><circle cx="106" cy="102" r="2.2"/><circle cx="116" cy="106" r="2.2"/>
    <circle cx="80" cy="108" r="2.2"/><circle cx="84" cy="94" r="2"/>
  </g>
  <path d="M104 106l4 1" stroke="${GOLD}" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="106" cy="106.6" r="1.1" fill="${BLOOD}"/>
`;
