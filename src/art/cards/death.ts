// Death — a skeleton in black armour rides the pale horse under a black banner with a white rose;
// the sun goes down between two pillars, a crown lies in the dust.
import { BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

const rose = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" stroke="${INK}" stroke-width=".8">` +
  [0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-4.2" rx="3.4" ry="4" transform="rotate(${a})" fill="${BONE}"/>`).join('') +
  `<circle r="2.4" fill="${BONE}"/><path d="M-1.4 0a1.4 1.4 0 1 1 2.8 0" fill="none"/></g>`;
const bone = (d: string, w = 2.2) =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 2}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${BONE}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V104H0Z" fill="url(#hh-hatch-r)" opacity=".3"/>

  <!-- setting sun between pillars -->
  <g class="a-pulse" stroke="${GOLD}" stroke-width="1.4" stroke-linecap="round">
    <path d="M169 88V80M160 91l-4-5M178 91l4-5M156 98l-6-2M182 98l6-2"/>
  </g>
  <path d="M159 104a10 10 0 0 1 20 0z" fill="${GOLD}" stroke="${INK}" stroke-width="1.3"/>
  <g stroke="${INK}" stroke-width="1.3" stroke-linejoin="round">
    <path d="M150 104V64h8v40zM180 104V64h8v40z" fill="${BONE}"/>
    <path d="M154 104V64h4v40zM184 104V64h4v40z" fill="url(#hh-hatch)" opacity=".6" stroke="none"/>
    <path d="M148 64h12v-4h-12zM178 64h12v-4h-12z" fill="${BONE}"/>
  </g>
  <path d="M0 104H200" stroke="${INK}" stroke-width="1.2"/>
  <path d="M0 104H200V150H0Z" fill="${SHADOW}" opacity=".35"/>
  <path d="M0 104H200V150H0Z" fill="url(#hh-hatch-h)" opacity=".35"/>

  <!-- fallen crown -->
  <g transform="translate(160 136) rotate(-18)" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round">
    <path d="M-9 4L-10-5L-4 0L0-7L4 0L10-5L9 4Z" fill="${GOLD}"/>
    <path d="M-9 4H9" stroke-width="1.6" stroke="${GOLD_D}"/>
  </g>

  <g transform="translate(-10 6)">
    <!-- banner -->
    <path d="M84 16L90 96" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M84 12l-2 5h4z" fill="${INK}"/>
    <g class="a-float">
      <path d="M85 18C70 14 50 24 32 18C36 28 30 38 36 48C52 54 70 44 87 48Z" fill="${INK}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M40 26q16 4 40-2M42 40q16 4 42 0" fill="none" stroke="${BONE}" stroke-width=".6" opacity=".45"/>
      ${rose(60, 33)}
    </g>

    <!-- pale horse -->
    <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
      <path d="M58 80C46 86 44 104 48 120M56 84C50 94 50 106 54 116" fill="none" stroke-width="1.6"/>
      <path d="M62 74C74 68 100 70 112 70C120 62 128 50 136 46L136 40L140 45L150 56C154 60 152 64 148 64C142 62 136 60 132 64C128 72 128 80 128 88L136 98L142 104L140 108L134 102L124 97L122 100L122 128L126 134L118 134L116 104C104 106 88 106 80 104L80 128L84 134L76 134L72 106L66 112L60 132L64 138L56 138L58 110C54 100 54 82 62 74Z" fill="${BONE}"/>
      <path d="M58 110C54 100 54 82 62 74C70 84 72 96 80 104L72 106L66 112L60 132ZM80 104C92 106 104 106 116 104L122 100C104 96 90 98 80 104Z" fill="url(#hh-hatch)" opacity=".5" stroke="none"/>
      <path d="M114 70q8-8 10-18M118 72q8-8 12-20M122 74q6-10 12-24" fill="none" stroke-width="1"/>
      <circle cx="141" cy="52" r="1.6" fill="${INK}" stroke="none"/>
      <path d="M147 60l-4 0M140 48l6 8 6 2" fill="none" stroke-width="1"/>
      <path d="M146 58L118 60" fill="none" stroke-width="1"/>
    </g>

    <!-- the rider: black armour, bare skull -->
    <g stroke="${INK}" stroke-linejoin="round">
      ${bone('M100 72L110 84L106 98L112 99', 2.4)}
      <path d="M94 72L96 46H110L108 72Z" fill="${INK}" stroke-width="1.4"/>
      <path d="M97 50l10 0M97 56h10M96 62h11" fill="none" stroke="${SHADOW}" stroke-width=".9"/>
      <path d="M94 46q9-6 18 0l-2 6h-14z" fill="${INK}" stroke="${BONE}" stroke-width=".7"/>
      ${bone('M106 50L114 58L120 60', 2)}
      ${bone('M98 50L92 52', 2)}
      <path d="M98 38a7 7 0 1 1 12 4l-1 4h-8l-1-3a7 7 0 0 1-2-5z" fill="${BONE}" stroke-width="1.2"/>
      <circle cx="104" cy="37" r="1.9" fill="${INK}" stroke="none"/><circle cx="109" cy="37" r="1.7" fill="${INK}" stroke="none"/>
      <circle cx="104" cy="37" r=".6" fill="${GOLD}" stroke="none"/>
      <path d="M102 45h6M104 43v3M106 43v3" stroke-width=".8"/>
    </g>
  </g>
`;
