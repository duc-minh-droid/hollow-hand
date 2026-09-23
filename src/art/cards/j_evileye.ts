// Evil Eye — a gilt hamsa amulet with one enormous red-irised eye in the palm. It blinks.
import { BLOOD, BLOOD_D, BONE, GOLD, INK } from '../palette.ts';

const HAND = 'M100 140Q72 140 66 116Q62 100 54 88Q46 76 54 72Q62 70 70 82L70 44Q70 34 77 34Q84 34 85 44L86 30Q86 20 93 20Q99 20 100 28Q101 20 107 20Q114 20 114 30L115 44Q116 34 123 34Q130 34 130 44L130 82Q138 70 146 72Q154 76 146 88Q138 100 134 116Q128 140 100 140Z';

export default () => `
  <rect width="200" height="150" fill="url(#hh-lacquer)"/>
  <g fill="none" stroke="${BONE}" stroke-width=".9" stroke-linecap="round" opacity=".45">
    <path d="M40 60L24 54M36 84H18M42 108L26 116M160 60L176 54M164 84H182M158 108L174 116"/>
  </g>
  <ellipse cx="100" cy="98" rx="40" ry="26" fill="url(#hh-glow-red)" opacity=".5"/>

  <!-- the amulet -->
  <path d="${HAND}" fill="${INK}" stroke="${GOLD}" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="${HAND}" fill="url(#hh-hatch-bone)" opacity=".2"/>
  <path d="${HAND}" fill="none" stroke="${BONE}" stroke-width=".8" stroke-dasharray="1.5 2.5" transform="translate(100 84) scale(.9) translate(-100 -84)"/>
  <g fill="none" stroke="${GOLD}" stroke-width="1" stroke-linecap="round">
    <path d="M85 44V62M100 28V58M115 44V62"/>
    <path d="M76 132Q100 146 124 132" stroke-width=".8"/>
  </g>
  <g fill="${GOLD}">
    <circle cx="77" cy="44" r="1.8"/><circle cx="93" cy="31" r="1.8"/><circle cx="107" cy="31" r="1.8"/><circle cx="123" cy="44" r="1.8"/>
    <circle cx="56" cy="78" r="1.4"/><circle cx="144" cy="78" r="1.4"/>
  </g>
  <path d="M92 128l8 6 8-6-8-4z" fill="${BLOOD}" stroke="${GOLD}" stroke-width=".8"/>

  <!-- the eye -->
  <g class="a-blink">
    <path d="M70 98Q100 74 130 98Q100 122 70 98Z" fill="${BONE}" stroke="${GOLD}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M76 100Q100 116 124 100Q100 110 76 100Z" fill="url(#hh-hatch)" opacity=".5"/>
    <circle cx="100" cy="98" r="11" fill="${BLOOD}" stroke="${INK}" stroke-width="1.2"/>
    <circle cx="100" cy="98" r="11" fill="url(#hh-hatch-blood)" opacity=".6"/>
    <circle cx="100" cy="98" r="7" fill="none" stroke="${BLOOD_D}" stroke-width="1"/>
    <ellipse cx="100" cy="98" rx="2" ry="7.5" fill="${INK}"/>
    <circle cx="104" cy="93" r="1.8" fill="${BONE}"/>
    <path d="M76 90l-3-4M84 85l-2-5M92 82l-1-5M100 81v-5M108 82l1-5M116 85l2-5M124 90l3-4" stroke="${BONE}" stroke-width="1" stroke-linecap="round"/>
  </g>
`;
