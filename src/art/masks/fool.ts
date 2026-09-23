// The Fool (0) — white porcelain jester mask, a harlequin diamond painted over one eye,
// a three-pointed belled cap and a white rose tucked at the temple.
import { BLOOD, BLOOD_D, BONE, FLAME, GOLD, INK, LACQUER, PARCH } from '../palette.ts';

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

  <!-- ruff collar -->
  <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
    <path d="M58 204L66 234L80 216L90 244L104 222L112 250L120 226L128 250L136 222L150 244L160 216L174 234L182 204Q120 228 58 204Z" fill="${PARCH}"/>
    <path d="M58 204L66 234L80 216L90 244L104 222L112 250L120 226L128 250L136 222L150 244L160 216L174 234L182 204Q120 228 58 204Z" fill="url(#hh-hatch)" opacity=".45"/>
    <path d="M66 204L76 226L88 212L98 234L110 216L120 238L130 216L142 234L152 212L164 226L174 204Q120 222 66 204Z" fill="${BONE}"/>
    <path d="M88 212L92 220M110 216L112 224M130 216L128 224M152 212L148 220" fill="none" stroke-width=".9"/>
  </g>

  <!-- cap points behind the face -->
  <g stroke="${INK}" stroke-width="1.7" stroke-linejoin="round">
    <path d="M96 70C66 58 34 70 26 118C40 100 54 96 70 100Z" fill="${BLOOD}"/>
    <path d="M96 70C66 58 34 70 26 118C40 100 54 96 70 100Z" fill="url(#hh-hatch-d)" opacity=".45"/>
    <path d="M86 72C62 70 42 84 34 106" fill="none" stroke-width=".8"/>
    <path d="M144 70C174 58 206 70 214 118C200 100 186 96 170 100Z" fill="${PARCH}"/>
    <path d="M144 70C174 58 206 70 214 118C200 100 186 96 170 100Z" fill="url(#hh-hatch-r)" opacity=".55"/>
    <path d="M154 72C178 70 198 84 206 106" fill="none" stroke-width=".8"/>
    <path d="M104 68C100 40 126 18 160 20C138 30 132 50 136 68Z" fill="${BONE}"/>
    <path d="M122 66C120 46 134 30 152 24C140 34 134 50 136 68Z" fill="url(#hh-hatch)" opacity=".5"/>
  </g>
  <!-- bells -->
  <g stroke="${INK}" stroke-width="1.4">
    <g class="a-sway">
      <circle cx="26" cy="123" r="5.5" fill="${GOLD}"/>
      <path d="M21.5 124h9" stroke-width="1"/><circle cx="26" cy="126" r="1" fill="${INK}"/>
    </g>
    <circle cx="214" cy="123" r="5.5" fill="${GOLD}"/>
    <path d="M209.5 124h9" stroke-width="1"/><circle cx="214" cy="126" r="1" fill="${INK}" stroke="none"/>
    <circle cx="165" cy="20" r="5.5" fill="${GOLD}"/>
    <path d="M160.5 21h9" stroke-width="1"/><circle cx="165" cy="23" r="1" fill="${INK}" stroke="none"/>
  </g>

  <!-- porcelain face -->
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M120 70C152 70 170 94 170 128C170 166 150 198 120 204C90 198 70 166 70 128C70 94 88 70 120 70Z" fill="${BONE}"/>
  </g>
  <path d="M142 76C162 86 170 106 170 128C170 166 150 198 120 204C144 190 156 164 156 130C156 108 152 90 142 76Z" fill="url(#hh-hatch-r)" opacity=".55"/>
  <path d="M100 196Q120 206 140 196Q130 202 120 204Q110 202 100 196Z" fill="url(#hh-stipple)" opacity=".6"/>
  <circle cx="152" cy="160" r="8" fill="url(#hh-hatch-blood)" opacity=".7"/>

  <!-- harlequin diamond over the left eye -->
  <g stroke="${INK}" stroke-linejoin="round">
    <path d="M100 90L121 124L100 160L79 124Z" fill="${BLOOD}" stroke-width="1.6"/>
    <path d="M100 90L110.5 107L100 124L89.5 107ZM100 124L110.5 141L100 160L89.5 141Z" fill="url(#hh-hatch-d)" opacity=".5" stroke="none"/>
    <path d="M89.5 107L110.5 141M110.5 107L89.5 141" fill="none" stroke-width=".8"/>
    <path d="M100 95L117 124L100 155L83 124Z" fill="none" stroke="${BONE}" stroke-width=".6" opacity=".6"/>
  </g>
  <!-- painted brow and tear on the right -->
  <path d="M126 106Q140 94 156 104" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M129 102Q140 96 150 99" fill="none" stroke="${INK}" stroke-width=".8"/>
  <path d="M146 138q-3.5 7 0 10q3.5-3 0-10z" fill="${INK}"/>
  <!-- nose -->
  <path d="M121 130Q116 146 117 153Q121 156 125 153" fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round"/>

  <g class="m-eyes">
    <path d="M86 124Q100 111 114 124Q100 135 86 124Z" fill="${INK}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M126 124Q140 111 154 124Q140 135 126 124Z" fill="${INK}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <g filter="url(#hh-soft-glow)">
      <circle cx="100" cy="124" r="4.4" fill="${BLOOD}"/>
      <circle cx="100" cy="124" r="2" fill="${FLAME}"/>
      <circle cx="140" cy="124" r="4.4" fill="${BLOOD}"/>
      <circle cx="140" cy="124" r="2" fill="${FLAME}"/>
    </g>
    <circle cx="101.6" cy="122.4" r=".8" fill="${BONE}"/>
    <circle cx="141.6" cy="122.4" r=".8" fill="${BONE}"/>
  </g>

  <g class="m-mouth">
    <path d="M104 176Q120 186 136 176Q130 191 120 191Q110 191 104 176Z" fill="${BLOOD}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M107 178Q120 186 133 178Q120 184 107 178Z" fill="${BLOOD_D}" stroke="${INK}" stroke-width="1.2"/>
    <path d="M104 176q-4-1-6-6M136 176q4-1 6-6" fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round"/>
  </g>

  <!-- cap band -->
  <g stroke="${INK}" stroke-width="1.7" stroke-linejoin="round">
    <path d="M68 100C74 78 96 66 120 66C144 66 166 78 172 100C156 90 138 86 120 86C102 86 84 90 68 100Z" fill="${BONE}"/>
    <path d="M142 70C156 76 166 86 172 100C160 92 150 89 140 88Z" fill="url(#hh-hatch)" opacity=".5" stroke="none"/>
    <g fill="${INK}" stroke="none">
      <path d="M86 84l3 3.5-3 3.5-3-3.5z"/><path d="M103 77.5l3 3.5-3 3.5-3-3.5z"/>
      <path d="M120 75l3 3.5-3 3.5-3-3.5z"/><path d="M137 77.5l3 3.5-3 3.5-3-3.5z"/>
      <path d="M154 84l3 3.5-3 3.5-3-3.5z"/>
    </g>
  </g>

  <!-- the white rose -->
  <g stroke="${INK}" stroke-linejoin="round" transform="translate(70 104) scale(1.4) translate(-70 -104)">
    <path d="M58 108Q54 118 62 120Q66 114 58 108Z" fill="${PARCH}" stroke-width="1.2"/>
    <path d="M80 114Q88 118 84 124Q76 122 80 114Z" fill="${PARCH}" stroke-width="1.2"/>
    <path d="M58 108Q60 114 62 120M80 114Q82 119 84 124" fill="none" stroke-width=".7"/>
    <path d="M71 94C77 92 82 96 81 102C83 108 78 113 72 112C66 114 61 110 62 104C60 98 65 94 71 94Z" fill="${BONE}" stroke-width="1.5"/>
    <path d="M71 103m-1.5 0a1.5 1.5 0 1 1 2.5 1.5a3.5 3.5 0 1 1-5-3a5.5 5.5 0 1 1 8 5.5" fill="none" stroke-width="1"/>
    <path d="M72 112C66 114 61 110 62 104C64 109 68 111 72 112Z" fill="url(#hh-hatch)" opacity=".6" stroke="none"/>
  </g>

  <g class="crack crack-1" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M131 86l-3 7 4 4-5 7 2 5-4 5"/>
    <path d="M129 97l6 2"/>
  </g>
  <g class="crack crack-2" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M71 140l8 2 3-4 7 6 5-2 3 5"/>
    <path d="M89 144l-2 8 3 4-1 6"/>
    <path d="M166 162l-6 4-2 7-7 3-2 6"/>
    <path d="M158 173l5 5"/>
  </g>
  <g class="crack crack-3" fill="none" stroke="${INK}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M150 74l-4 10 5 6-8 11 3 8-9 10 2 9-7 11 4 7-8 12 1 9-6 9 3 14"/>
    <path d="M140 109l10 4 7-3 4 5"/>
    <path d="M124 150l-10 2-4 6-8 1"/>
    <path d="M118 175l7 4 1 7"/>
    <path d="M78 104l6 6-2 6 6 4"/>
  </g>
`;
