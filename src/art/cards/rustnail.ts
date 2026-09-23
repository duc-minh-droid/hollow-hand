// Rust Nail — one great square-cut coffin nail driven into the lid; the wood beads with blood.
import { BLOOD, BLOOD_D, BONE, INK, PARCH, SHADOW } from '../palette.ts';

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V92L0 100Z" fill="url(#hh-hatch)" opacity=".55"/>
  <g fill="${INK}"><circle cx="24" cy="30" r="1.2"/><circle cx="166" cy="22" r="1"/><circle cx="184" cy="60" r="1.1"/>
    <path d="M150 44l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4z"/></g>

  <!-- the coffin lid -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M0 100L200 92V150H0Z" fill="${SHADOW}" opacity=".45" stroke="none"/>
    <path d="M0 100L200 92V150H0Z" fill="url(#hh-hatch-h)" opacity=".4" stroke="none"/>
    <path d="M0 100L200 92" stroke-width="1.8"/>
    <path d="M0 106L200 98" stroke-width=".8"/>
    <path d="M0 132L200 126" stroke-width="1.2"/>
    <path d="M6 116Q50 112 80 114Q96 116 98 110M112 110Q124 118 150 112Q176 108 200 110M4 124Q60 120 90 122Q100 126 112 122Q150 116 196 118M10 142Q80 136 196 138" fill="none" stroke-width=".8"/>
    <ellipse cx="40" cy="140" rx="6" ry="2" fill="none" stroke-width=".8"/>
  </g>

  <!-- the nail -->
  <g transform="rotate(-28 104 112)" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
    <path d="M96 36L100 112H108L112 36Z" fill="${SHADOW}"/>
    <path d="M96 36L100 112H104V36Z" fill="${BONE}" stroke="none"/>
    <path d="M104 36V112H108L112 36Z" fill="url(#hh-xhatch)" opacity=".7" stroke="none"/>
    <path d="M96 36L100 112H108L112 36Z" fill="none"/>
    <path d="M104 36V112" stroke-width=".7"/>
    <path d="M99 44q3 4 2 10q-2 3-2.4 0zM101 70q3 6 0 12q-1 2-.4-6zM106 52q3 6 1 12M105 88q3 4 2 10" fill="${BLOOD_D}" stroke="none" opacity=".75"/>
    <path d="M99.4 60q2 2 4 1M100 96q2 1 3.6 0" fill="none" stroke="${BLOOD_D}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M90 34L92 22Q104 16 116 22L118 34Z" fill="${SHADOW}"/>
    <path d="M104 18.6Q110 19 116 22L118 34H104Z" fill="url(#hh-xhatch)" opacity=".7" stroke="none"/>
    <path d="M104 18.6V34M92 22L97 34M116 22L111 34" stroke-width=".8"/>
    <path d="M94 28q1-4 5-6" fill="none" stroke="${BONE}" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M88 34H120V38H88Z" fill="${INK}"/>
    <circle cx="95" cy="27" r="1.6" fill="${BLOOD_D}" stroke="none"/><circle cx="114" cy="29" r="1.2" fill="${BLOOD_D}" stroke="none"/>
    <circle cx="100.3" cy="104" r="1.8" fill="${BLOOD}" stroke-width=".6"/>
    <circle cx="100" cy="95" r="1.3" fill="${BLOOD}" stroke-width=".6"/>
  </g>

  <!-- splinters, blood beading at the wound in the wood -->
  <path d="M96 110l-8-3 6 5M112 111l9-2-7 5M100 116l-4 6 7-5" fill="${BONE}" stroke="${INK}" stroke-width="1" stroke-linejoin="round"/>
  <path d="M98 113q6 4 14 0q4 6 12 7q10 1 12 8" fill="none" stroke="${BLOOD}" stroke-width="2.6" stroke-linecap="round"/>
  <g fill="${BLOOD}" stroke="${INK}" stroke-width=".7">
    <circle cx="94" cy="114" r="2"/><circle cx="116" cy="112" r="1.6"/><circle cx="104" cy="118" r="1.4"/>
    <path d="M136 128q-4 3 0 6q6 1 8-2q-2-4-8-4z"/>
  </g>
  <g class="a-drip">
    <path d="M91 103q-3.4 5 0 7.6q3.4-2.6 0-7.6z" fill="${BLOOD}" stroke="${INK}" stroke-width=".8"/>
  </g>
  <!-- rust flecks -->
  <g fill="${BLOOD_D}">
    <circle cx="80" cy="108" r="1"/><circle cx="72" cy="120" r=".8"/><circle cx="126" cy="104" r=".9"/><circle cx="88" cy="126" r="1.1"/>
    <path d="M60 80l2 1-1 2zM44 64l2-1 1 2zM140 118l2 1-2 1z"/>
  </g>
`;
