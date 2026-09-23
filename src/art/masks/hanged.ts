// The Hanged Man (XII) — an upside-down face (chin at the top), serene closed eyes that still glow
// through the lids, a noose knotted round the mask's neck, and a halo behind the fallen head.
import { BLOOD, BLOOD_D, BONE, FLAME, GOLD, GOLD_D, INK, LACQUER, PARCH, SHADOW } from '../palette.ts';

const rays = () =>
  Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const r1 = 84;
    const r2 = i % 2 ? 92 : 100;
    const p = (r: number) => `${(120 + Math.cos(a) * r).toFixed(1)} ${(150 + Math.sin(a) * r).toFixed(1)}`;
    return `M${p(r1)}L${p(r2)}`;
  }).join('');

export default () => `
  <!-- hood and shoulders -->
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M0 280V250C18 226 50 212 80 206L120 222L160 206C190 212 222 226 240 250V280Z" fill="${LACQUER}"/>
    <path d="M120 6C68 6 38 50 34 112C31 162 44 204 66 234L84 256H156L174 234C196 204 209 162 206 112C202 50 172 6 120 6Z" fill="${LACQUER}"/>
    <path d="M120 24C80 24 58 62 56 112C54 158 68 196 90 222H150C172 196 186 158 184 112C182 62 160 24 120 24Z" fill="${INK}" stroke="none"/>
  </g>
  <path d="M120 6C68 6 38 50 34 112C31 162 44 204 66 234L76 246C56 206 46 164 48 114C52 56 80 14 120 12Z" fill="url(#hh-hatch-bone)" opacity=".3"/>
  <path d="M120 6C68 6 38 50 34 112C31 162 44 204 66 234M120 6C172 6 202 50 206 112C209 162 196 204 174 234" fill="none" stroke="${BONE}" stroke-width=".9" opacity=".4"/>
  <path d="M0 262C24 240 52 228 80 222M240 262C216 240 188 228 160 222M34 280C38 262 50 248 62 240M206 280C202 262 190 248 178 240" fill="none" stroke="${BONE}" stroke-width=".8" opacity=".3"/>
  <path d="M0 280V250C18 226 50 212 80 206L88 210C58 220 30 238 12 264V280Z" fill="url(#hh-hatch-bone-d)" opacity=".25"/>

  <!-- halo behind the fallen head -->
  <g class="a-pulse">
    <circle cx="120" cy="150" r="82" fill="url(#hh-hatch-gold)" opacity=".35"/>
  </g>
  <circle cx="120" cy="150" r="82" fill="none" stroke="${GOLD}" stroke-width="2.6"/>
  <circle cx="120" cy="150" r="76" fill="none" stroke="${GOLD_D}" stroke-width="1"/>
  <path d="${rays()}" fill="none" stroke="${GOLD}" stroke-width="1.6" stroke-linecap="round"/>

  <!-- hair falling toward the ground -->
  <g fill="none" stroke-linecap="round">
    <path d="M86 188q-8 14-3 26q4 10-2 20M98 196q-4 14 0 24q3 10-1 20M110 200q-2 14 2 24M130 200q3 12-1 22q-3 8 1 16M142 196q6 12 2 24M154 188q8 12 4 24q-3 10 3 18" stroke="${INK}" stroke-width="3.2"/>
    <path d="M86 188q-8 14-3 26q4 10-2 20M98 196q-4 14 0 24q3 10-1 20M110 200q-2 14 2 24M130 200q3 12-1 22q-3 8 1 16M142 196q6 12 2 24M154 188q8 12 4 24q-3 10 3 18" stroke="${SHADOW}" stroke-width="1.4"/>
  </g>

  <!-- rope from above, down to the mask's neck -->
  <g fill="none" stroke-linecap="round">
    <path d="M120 0V22" stroke="${INK}" stroke-width="7.5"/>
    <path d="M120 0V22" stroke="${PARCH}" stroke-width="4.6"/>
    <path d="M118 2l4 3M118 8l4 3M118 14l4 3" stroke="${INK}" stroke-width="1"/>
  </g>
  <!-- neck stub -->
  <path d="M105 20Q120 15 135 20V48H105Z" fill="${PARCH}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M126 18Q131 18 135 20V48H126Z" fill="url(#hh-hatch-r)" opacity=".6"/>

  <!-- the inverted face -->
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M120 40C142 40 158 56 166 80C174 106 176 134 170 158C162 186 144 202 120 202C96 202 78 186 70 158C64 134 66 106 74 80C82 56 98 40 120 40Z" fill="${BONE}"/>
  </g>
  <path d="M146 52C160 64 168 84 172 108C176 134 172 162 160 182C150 194 136 202 120 202C142 190 156 170 158 140C160 110 156 76 146 52Z" fill="url(#hh-hatch-r)" opacity=".55"/>
  <path d="M84 176C92 192 104 200 120 202C136 200 148 192 156 176C144 186 132 190 120 190C108 190 96 186 84 176Z" fill="url(#hh-stipple)" opacity=".6"/>
  <!-- cheek and chin modelling -->
  <g fill="none" stroke="${INK}" stroke-linecap="round">
    <path d="M100 52Q120 46 140 52" stroke-width="1"/>
    <path d="M80 104Q86 92 94 88M160 104Q154 92 146 88" stroke-width="1"/>
  </g>
  <!-- painted tear running upward -->
  <path d="M148 124q2-10-1-20q-1-6 1-12" fill="none" stroke="${BLOOD}" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M148 90q-3-5 0-8q3 3 0 8z" fill="${BLOOD}"/>
  <!-- nose, tip upward -->
  <path d="M114 124Q111 108 110 100Q114 91 120 94Q126 91 130 100Q129 108 126 124" fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round"/>
  <path d="M113 97q3-2 5 1M122 98q2-3 5-1" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
  <!-- brows below the eyes -->
  <path d="M86 150Q100 158 114 151M126 151Q140 158 154 150" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>

  <g class="m-eyes">
    <path d="M86 135Q100 123 114 135Q100 131 86 135Z" fill="${INK}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M126 135Q140 123 154 135Q140 131 126 135Z" fill="${INK}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
    <g filter="url(#hh-soft-glow)">
      <path d="M90 133.5Q100 126.5 110 133.5Q100 130.5 90 133.5Z" fill="${BLOOD}"/>
      <path d="M130 133.5Q140 126.5 150 133.5Q140 130.5 130 133.5Z" fill="${BLOOD}"/>
      <path d="M94 132Q100 128.6 106 132M134 132Q140 128.6 146 132" fill="none" stroke="${FLAME}" stroke-width="1" stroke-linecap="round"/>
    </g>
    <path d="M89 131l-2-4M94.5 128.6l-1-4.5M100 127.6v-5M105.5 128.6l1-4.5M111 131l2-4M129 131l-2-4M134.5 128.6l-1-4.5M140 127.6v-5M145.5 128.6l1-4.5M151 131l2-4" fill="none" stroke="${INK}" stroke-width="1.1" stroke-linecap="round"/>
  </g>

  <g class="m-mouth">
    <path d="M104 76Q120 63 136 76Q120 72 104 76Z" fill="${BLOOD_D}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M108 75Q120 68 132 75" fill="none" stroke="${INK}" stroke-width="1.2"/>
    <path d="M104 76q-3 1-4 4M136 76q3 1 4 4" fill="none" stroke="${INK}" stroke-width="1.1" stroke-linecap="round"/>
  </g>

  <!-- noose coils about the neck, knot and tail -->
  <g stroke-linecap="round" fill="none">
    <path d="M102 26Q120 33 138 26M102 33Q120 40 138 33M102 40Q120 47 138 40" stroke="${INK}" stroke-width="7.5"/>
    <path d="M102 26Q120 33 138 26M102 33Q120 40 138 33M102 40Q120 47 138 40" stroke="${PARCH}" stroke-width="4.6"/>
    <path d="M108 26l3 4M116 28l3 4M124 28l3 4M132 26l3 4M108 33l3 4M116 35l3 4M124 35l3 4M132 33l3 4M108 40l3 4M116 42l3 4M124 42l3 4M132 40l3 4" stroke="${INK}" stroke-width=".9"/>
    <path d="M140 30q10 6 6 20q-2 8 2 14" stroke="${INK}" stroke-width="7"/>
    <path d="M140 30q10 6 6 20q-2 8 2 14" stroke="${PARCH}" stroke-width="4.2"/>
  </g>
  <ellipse cx="141" cy="33" rx="6" ry="8" fill="${PARCH}" stroke="${INK}" stroke-width="1.8"/>
  <path d="M137 29q4 4 8 1M137 36q4 3 8 0" fill="none" stroke="${INK}" stroke-width="1"/>
  <path d="M146 62l2 6M149 61l1 6" fill="none" stroke="${PARCH}" stroke-width="1.2" stroke-linecap="round"/>

  <g class="crack crack-1" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M96 184l3-7-4-4 5-7-2-5"/>
    <path d="M97 173l-5-2"/>
  </g>
  <g class="crack crack-2" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M168 120l-8 2-3 6-7-2-4 5"/>
    <path d="M160 122l2 7"/>
    <path d="M74 90l8 3 2 6 7 1"/>
  </g>
  <g class="crack crack-3" fill="none" stroke="${INK}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M118 50l3 10-5 6 6 9-4 9 7 10-3 9 6 11-5 8 4 10-6 12 3 9-5 10 2 9-4 10"/>
    <path d="M122 124l-10 4-4 8"/>
    <path d="M119 158l12 3 5 6"/>
    <path d="M70 140l9-2 5 5"/>
  </g>
`;
