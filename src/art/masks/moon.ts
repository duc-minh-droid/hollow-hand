// The Moon (XVIII) — a pale crescent mask with a sleeping profile covers half the face;
// the other half is bare night, starred, with one wide-awake eye.
import { BLOOD, BONE, FLAME, GOLD, INK, LACQUER, NIGHT, SHADOW, VIOLET } from '../palette.ts';

const star = (x: number, y: number, r: number) => {
  const k = r * 0.28;
  return `<path d="M${x} ${y - r}L${x + k} ${y - k}L${x + r} ${y}L${x + k} ${y + k}L${x} ${y + r}L${x - k} ${y + k}L${x - r} ${y}L${x - k} ${y - k}Z"/>`;
};

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
  <!-- star clasp at the throat -->
  <g stroke="${INK}" stroke-width="1.2" fill="${GOLD}">${star(120, 234, 9)}</g>
  <circle cx="120" cy="234" r="2" fill="${INK}"/>

  <!-- stars in the dark around the head -->
  <g fill="${BONE}">
    ${star(196, 46, 6)}${star(210, 98, 3.5)}${star(28, 74, 4)}${star(202, 170, 3)}${star(36, 190, 3)}
    <circle cx="186" cy="130" r="1.2"/><circle cx="46" cy="130" r="1"/><circle cx="214" cy="36" r="1"/><circle cx="24" cy="36" r="1.2"/>
  </g>
  <g class="a-glint" fill="${FLAME}">${star(182, 72, 4)}</g>

  <!-- the bare, shadowed face -->
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M120 52C154 52 174 84 174 126C174 170 152 204 120 208C88 204 66 170 66 126C66 84 86 52 120 52Z" fill="${NIGHT}"/>
  </g>
  <path d="M120 52C154 52 174 84 174 126C174 170 152 204 120 208C88 204 66 170 66 126C66 84 86 52 120 52Z" fill="url(#hh-xhatch-bone)" opacity=".12"/>
  <path d="M150 64C166 80 174 102 174 126C174 170 152 204 120 208C148 190 162 160 162 126C162 100 158 80 150 64Z" fill="${VIOLET}" opacity=".7"/>
  <!-- night-face modelling in faint bone -->
  <g fill="none" stroke="${BONE}" stroke-linecap="round" opacity=".5">
    <path d="M132 108Q146 101 160 110" stroke-width="1.2"/>
    <path d="M150 152Q162 146 168 134" stroke-width=".9"/>
    <path d="M126 152q5 5 10 2" stroke-width="1"/>
    <path d="M128 196Q140 194 150 186" stroke-width=".8"/>
  </g>
  <g fill="${BONE}" opacity=".75">
    ${star(156, 88, 2.6)}${star(160, 164, 2)}${star(140, 196, 1.6)}
    <circle cx="164" cy="116" r=".8"/><circle cx="148" cy="172" r=".7"/><circle cx="136" cy="72" r=".8"/>
  </g>

  <!-- the crescent mask with a sleeping profile -->
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M134 38C88 42 56 82 56 128C56 176 90 214 136 218C122 208 114 196 112 184C116 180 120 178 118 172C114 168 118 164 116 160C118 156 126 150 124 144C118 138 112 132 110 124C108 104 112 70 134 38Z" fill="${BONE}"/>
  </g>
  <path d="M134 38C88 42 56 82 56 128C56 176 90 214 136 218C104 206 74 176 72 128C70 88 96 52 134 38Z" fill="url(#hh-hatch-r)" opacity=".55"/>
  <path d="M124 144C118 138 112 132 110 124C108 104 112 70 134 38C118 64 114 96 116 120C118 130 122 138 124 144Z" fill="url(#hh-hatch)" opacity=".35"/>
  <!-- sleeping profile details: brow, nostril, lips, chin -->
  <g fill="none" stroke="${INK}" stroke-linecap="round">
    <path d="M82 108Q94 101 106 108" stroke-width="1.5"/>
    <path d="M116 150q-4 1-5 4" stroke-width="1.2"/>
    <path d="M116 166q-4 0-6 2" stroke-width="1.1"/>
    <path d="M112 184q-6-2-8 2" stroke-width="1"/>
    <path d="M84 150q4 6 10 7" stroke-width=".9"/>
  </g>
  <circle cx="86" cy="150" r="5" fill="url(#hh-hatch-blood)" opacity=".5"/>

  <g class="m-eyes">
    <path d="M82 124Q96 115 110 124Q96 132 82 124Z" fill="${INK}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M130 124Q144 113 158 124Q144 134 130 124Z" fill="${INK}" stroke="${BONE}" stroke-width=".9" stroke-linejoin="round"/>
    <g filter="url(#hh-soft-glow)">
      <circle cx="96" cy="125.5" r="3.6" fill="${BLOOD}"/>
      <circle cx="96" cy="125.5" r="1.5" fill="${FLAME}"/>
      <circle cx="144" cy="124" r="4.6" fill="${BLOOD}"/>
      <circle cx="144" cy="124" r="2.1" fill="${FLAME}"/>
    </g>
    <circle cx="145.6" cy="122.4" r=".8" fill="${BONE}"/>
    <!-- the crescent's heavy sleeping lid -->
    <path d="M81 123.5Q96 111 111 123.5Q96 120 81 123.5Z" fill="${BONE}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M84 123l-1.5 3.5M89 121.8l-1 3.8M94.5 121.3l-.5 4M100 121.5v4M105.5 122.2l.5 3.8" fill="none" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>
  </g>

  <g class="m-mouth">
    <path d="M117 178Q132 171 147 178Q132 187 117 178Z" fill="${INK}" stroke="${SHADOW}" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M122 182Q132 186 142 181" fill="none" stroke="${BONE}" stroke-width=".8" opacity=".6"/>
  </g>

  <g class="crack crack-1" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M94 50l2 8-4 5 4 6-2 5"/>
    <path d="M94 63l-5 2"/>
  </g>
  <g class="crack crack-2" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M57 136l8 2 3-4 7 5 5-2 3 6"/>
    <path d="M75 139l-1 8 4 4"/>
    <path d="M100 206l2-8-4-5 3-7"/>
  </g>
  <g class="crack crack-3" fill="none" stroke="${INK}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M122 46l-6 10 4 7-7 10 3 9-8 9 4 10-9 8 3 11-7 9 4 10-6 10 3 12-5 12"/>
    <path d="M99 99l-9-2-5 5"/>
    <path d="M94 154l-10 4-3 7"/>
    <path d="M86 186l8 4"/>
  </g>
`;
