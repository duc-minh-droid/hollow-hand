// Ward — an open palm raised against the viewer; an eye opens in its centre. Rays of ink behind.
import { BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V44C150 30 50 30 0 44Z" fill="url(#hh-hatch)" opacity=".5"/>

  <!-- halo and radiating rays -->
  <circle cx="100" cy="84" r="46" fill="${GOLD}" opacity=".22"/>
  <circle cx="100" cy="84" r="46" fill="url(#hh-hatch-gold)" opacity=".7"/>
  <circle cx="100" cy="84" r="46" fill="none" stroke="${INK}" stroke-width="1.3"/>
  <circle cx="100" cy="84" r="41" fill="none" stroke="${INK}" stroke-width=".7" stroke-dasharray="1.5 2.5"/>
  <path d="M148 84L176 84M143.9 103.5L169.4 114.9M132.1 119.7L150.9 140.5M61.2 112.2L38.5 128.7M53 94L25.7 99.8M53 74L25.7 68.2M61.2 55.8L38.5 39.3M76 42.4L62 18.2M95 36.3L92.1 8.4M114.8 38.3L123.5 11.7M132.1 48.3L150.9 27.5M143.9 64.5L169.4 53.1" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M147 94L160.6 96.9M138.8 112.2L150.2 120.4M56.1 103.5L43.4 109.2M52 84L38 84M56.1 64.5L43.4 58.8M67.9 48.3L58.5 37.9M85.2 38.3L80.8 25M105 36.3L106.5 22.3M124 42.4L131 30.3M138.8 55.8L150.2 47.6M147 74L160.6 71.1" stroke="${GOLD_D}" stroke-width="1.4" stroke-linecap="round"/>
  <g fill="${INK}">
    <path d="M30 26l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4z"/>
    <path d="M172 34l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z"/>
    <circle cx="20" cy="84" r="1.1"/><circle cx="182" cy="96" r="1.2"/><circle cx="160" cy="14" r="1"/>
  </g>

  <!-- the open hand -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
    <path d="M84 150L80 118Q68 108 58 94Q52 84 57 79Q63 76 69 84L76 94L76 42Q76 33 82 33Q88 33 88 42L88 60L89 30Q89 21 95 21Q101 21 101 30L101 60L102 36Q102 28 107.5 28Q113 28 113 36L113 64L114 50Q114 43 119 43Q124 43 124 50L124 100Q124 118 118 128L116 150Z" fill="${BONE}"/>
    <path d="M118 50Q118 45 121 45Q124 47 124 50L124 100Q124 118 118 128L116 150H109L111 128Q119 114 119 98Z" fill="url(#hh-hatch-r)" opacity=".7" stroke="none"/>
    <path d="M80 118Q68 108 58 94Q56 88 58 84Q66 98 80 108Z" fill="url(#hh-hatch)" opacity=".55" stroke="none"/>
    <path d="M88 60L88 72M101 60L101 70M113 64L113 70" stroke-width="1.2"/>
    <path d="M77 52h10M77 44h9M90 44h10M90 34h10M103 48h9M103 39h9M115 60h8M115 52h8" stroke-width=".8" opacity=".8"/>
    <path d="M78 76Q100 82 123 72M80 84Q90 86 98 82" fill="none" stroke-width="1"/>
    <path d="M76 98Q84 118 96 146" fill="none" stroke-width="1"/>
  </g>

  <!-- the eye in the palm -->
  <path d="M82 100Q100 84 118 100Q100 116 82 100Z" fill="${SHADOW}" opacity=".4"/>
  <g class="a-blink">
    <path d="M84 100Q100 87 116 100Q100 113 84 100Z" fill="${BONE}" stroke="${INK}" stroke-width="1.4"/>
    <circle cx="100" cy="100" r="6.5" fill="${GOLD}" stroke="${INK}" stroke-width="1.2"/>
    <circle cx="100" cy="100" r="6.5" fill="url(#hh-hatch-r)" opacity=".4"/>
    <circle cx="100" cy="100" r="2.6" fill="${INK}"/>
    <circle cx="98" cy="98" r="1" fill="${BONE}"/>
  </g>
  <path d="M84 100Q100 84 116 100" fill="none" stroke="${INK}" stroke-width="2"/>
  <path d="M88 94l-2-3M94 91l-1-3.5M100 90v-3.5M106 91l1-3.5M112 94l2-3" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>
`;
