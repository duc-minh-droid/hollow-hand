// Twin Knives — two crossed knives laid over a bleeding heart, under a scatter of small stars.
import { BLOOD, BLOOD_D, BONE, GOLD, INK, PARCH, SHADOW } from '../palette.ts';

const knife = (rot: number) => `
  <g transform="rotate(${rot} 100 82)">
    <path d="M97 104V28Q99 20 104 14Q107 40 105 104Z" fill="${BONE}"/>
    <path d="M101 102V30Q103 24 104 14Q107 40 105 102Z" fill="url(#hh-hatch-d)" opacity=".5" stroke="none"/>
    <path d="M99.5 98V34" stroke-width=".7"/>
    <rect x="88" y="104" width="24" height="5" rx="2.2" fill="${INK}"/>
    <rect x="96.5" y="109" width="7" height="25" rx="1.5" fill="${BLOOD_D}"/>
    <path d="M96.5 114l7 3M96.5 119l7 3M96.5 124l7 3M96.5 129l7 3" stroke-width=".8"/>
    <circle cx="100" cy="137" r="4.2" fill="${GOLD}"/>
    <circle cx="100" cy="137" r="1.4" fill="${INK}" stroke="none"/>
  </g>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V50C140 36 60 64 0 46Z" fill="url(#hh-hatch)" opacity=".5"/>
  <g fill="${INK}">
    <path d="M26 40l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z"/>
    <path d="M174 44l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4z"/>
    <path d="M38 118l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z"/>
    <path d="M166 112l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z"/>
    <circle cx="54" cy="24" r="1.1"/><circle cx="150" cy="22" r="1.2"/><circle cx="20" cy="84" r="1"/><circle cx="184" cy="82" r="1.1"/>
  </g>
  <g class="a-glint">
    <path d="M150 64l1.2 3.4 3.4 1.2-3.4 1.2-1.2 3.4-1.2-3.4-3.4-1.2 3.4-1.2z" fill="${GOLD}" stroke="${INK}" stroke-width=".6"/>
  </g>

  <!-- the heart -->
  <g stroke="${INK}" stroke-width="1.7" stroke-linejoin="round">
    <path d="M100 118C72 100 62 84 66 70C70 56 90 54 100 68C110 54 130 56 134 70C138 84 128 100 100 118Z" fill="${BLOOD}"/>
    <path d="M100 118C118 104 132 90 131 74Q128 94 100 118Z" fill="url(#hh-hatch-d)" opacity=".6" stroke="none"/>
    <path d="M100 118C84 108 74 98 70 88Q84 104 100 110Z" fill="url(#hh-hatch)" opacity=".5" stroke="none"/>
    <path d="M74 70Q78 62 88 63" fill="none" stroke="${BONE}" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
    <path d="M100 68q-3-10 4-16M104 52q4-3 9-1" fill="none" stroke-width="1.4" stroke-linecap="round"/>
  </g>
  <path d="M62 136Q100 128 138 136" fill="none" stroke="${SHADOW}" stroke-width="1.2" stroke-linecap="round"/>

  <!-- crossed knives -->
  <g stroke="${INK}" stroke-width="1.4" stroke-linejoin="round">
    ${knife(-38)}
    ${knife(38)}
  </g>

  <g class="a-drip">
    <path d="M100 121q-4 6 0 9q4-3 0-9z" fill="${BLOOD}" stroke="${INK}" stroke-width=".8"/>
  </g>
`;
