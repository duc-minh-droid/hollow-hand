// Briar Veil — a thorned rose vine winds round a small quartered shield; one thorn has drawn blood.
import { BLOOD, BLOOD_D, BONE, INK, PARCH, SHADOW } from '../palette.ts';

const leaf = (x: number, y: number, rot: number) => `
  <g transform="rotate(${rot} ${x} ${y})">
    <path d="M${x} ${y}q7-7 16 0q-9 7-16 0z" fill="${BONE}"/>
    <path d="M${x + 8} ${y}q4 3 8 0q-4 4-8 0z" fill="url(#hh-hatch-d)" opacity=".6" stroke="none"/>
    <path d="M${x} ${y}h13M${x + 5} ${y}l3-3M${x + 9} ${y}l2 2.6" stroke-width=".7"/>
  </g>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V46C140 34 60 56 0 40Z" fill="url(#hh-hatch)" opacity=".5"/>
  <path d="M0 150V138Q100 130 200 138V150Z" fill="url(#hh-hatch-h)" opacity=".5"/>
  <g fill="${INK}"><circle cx="26" cy="30" r="1.1"/><circle cx="178" cy="60" r="1.2"/><circle cx="36" cy="72" r="1"/></g>

  <!-- the vine where it passes behind the shield -->
  <path d="M72 70C80 50 110 44 122 30" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M78.7 61.6L85.1 62L81.2 59.1ZM87.4 51.3L88.5 44.9L90.5 49.3ZM100.5 46.3L106.6 48.4L103.7 44.5ZM110.8 37.6L111.7 31.2L113.8 35.6Z" fill="${INK}" stroke="${INK}" stroke-width=".8" stroke-linejoin="round"/>

  <!-- shield -->
  <g stroke="${INK}" stroke-width="1.7" stroke-linejoin="round">
    <path d="M70 40H130V76Q130 108 100 128Q70 108 70 76Z" fill="${BONE}"/>
    <path d="M100 40H130V76H100Z" fill="url(#hh-xhatch)" opacity=".55" stroke="none"/>
    <path d="M70 76H100V128Q70 108 70 76Z" fill="url(#hh-xhatch)" opacity=".55" stroke="none"/>
    <path d="M100 76H130Q130 108 100 128Z" fill="url(#hh-hatch-r)" opacity=".35" stroke="none"/>
    <path d="M74 44H126V76Q126 104 100 123Q74 104 74 76Z" fill="none" stroke-width=".8"/>
    <path d="M100 40V128M70 76H130" stroke-width="1.1"/>
    <circle cx="100" cy="76" r="5.5" fill="${BONE}"/>
    <circle cx="100" cy="76" r="2" fill="${INK}"/>
  </g>

  <!-- the vine in front -->
  <g fill="none" stroke-linecap="round">
    <path d="M170 142C182 110 152 94 132 100C110 114 80 100 72 70M122 30C128 20 150 22 148 34M30 142C22 122 46 110 64 118" stroke="${INK}" stroke-width="4"/>
    <path d="M170 142C182 110 152 94 132 100C110 114 80 100 72 70M122 30C128 20 150 22 148 34M30 142C22 122 46 110 64 118" stroke="${SHADOW}" stroke-width="1.2" stroke-dasharray="5 4"/>
  </g>
  <path d="M174 126.4L178.3 121.6L173.6 122.9ZM167.7 113.8L161.2 113.2L165.5 110.9ZM159.6 102.8L158.1 96.5L156.5 101.1ZM146.4 100.4L141.6 104.7L142.9 100ZM122.5 105.5L119.3 111.1L119 106.3ZM110.4 104.2L106.8 98.8L106.8 103.7ZM97.8 103.4L91.9 105.8L94.6 101.8ZM88.4 94.6L88.5 88.1L85.7 92.1ZM77.6 85.8L71.3 84.5L75.7 82.7ZM129.9 23.1L133.2 17.6L133.4 22.4ZM141.3 25.6L142.9 31.9L144.5 27.3ZM29.9 130.8L35.9 128.4L31.2 127.4ZM35.1 119.4L36.2 113.1L38.1 117.5ZM48.3 116.9L52.9 121.4L51.8 116.6Z" fill="${INK}" stroke="${INK}" stroke-width=".8" stroke-linejoin="round"/>
  <g stroke="${INK}" stroke-width="1.2" stroke-linejoin="round">
    ${leaf(171, 118, -30)}
    ${leaf(151, 100, -110)}
    ${leaf(64, 118, -20)}
  </g>

  <!-- bud and bloom -->
  <g stroke="${INK}" stroke-width="1.3" stroke-linejoin="round">
    <path d="M64 118q6-8 4-14q-6 2-8 8q2 4 4 6z" fill="${BLOOD}"/>
    <path d="M152 29Q164 28 164 40Q164 52 152 52Q140 52 140 40Q140 30 152 29Z" fill="${BLOOD}"/>
    <path d="M140 40Q146 48 152 52Q164 52 164 40Q160 50 150 48Q144 46 140 40Z" fill="url(#hh-hatch-d)" opacity=".6" stroke="none"/>
    <path d="M152 40q3-3 0-5q-6 0-6 6q0 7 8 7q8-1 8-10q-1-8-10-9" fill="none" stroke-width="1.1"/>
    <path d="M141 34q-4-4-2-8q5 0 7 5M163 34q4-4 2-8q-5 0-7 5M146 51q-3 4 0 7q4-2 3-6" fill="${BLOOD_D}" stroke-width="1"/>
  </g>

  <!-- a thorn has drawn blood -->
  <circle cx="92.5" cy="107" r="1.6" fill="${BLOOD}" stroke="${INK}" stroke-width=".6"/>
  <g class="a-drip">
    <path d="M92.5 111q-3.4 5 0 7.6q3.4-2.6 0-7.6z" fill="${BLOOD}" stroke="${INK}" stroke-width=".8"/>
  </g>
`;
