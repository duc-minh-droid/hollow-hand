// The Tower (XVI) — a stone helm-mask built like a crenellated tower, arrow-slit eyes,
// a portcullis mouth, lightning already splitting the battlements and the crown knocked loose.
import { BLOOD, BONE, FLAME, GOLD, GOLD_D, INK, LACQUER, PARCH, SHADOW } from '../palette.ts';

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
  <!-- iron gorget -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M84 204Q120 218 156 204L166 232Q120 250 74 232Z" fill="${SHADOW}"/>
    <path d="M84 204Q120 218 156 204L166 232Q120 250 74 232Z" fill="url(#hh-hatch-d)" opacity=".45"/>
    <path d="M79 218Q120 234 161 218" fill="none" stroke-width="1"/>
    <g fill="${PARCH}"><circle cx="86" cy="226" r="2"/><circle cx="120" cy="238" r="2"/><circle cx="154" cy="226" r="2"/></g>
  </g>

  <!-- the tower-mask -->
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M68 22H86V36H98V22H114V36H126V22H142V36H154V22H172V50L164 58V168C164 192 144 208 120 212C96 208 76 192 76 168V58L68 50Z" fill="${PARCH}"/>
  </g>
  <!-- shading: right flank, merlon sides, lower courses -->
  <path d="M146 58H164V168C164 192 144 208 120 212C140 200 146 186 146 168Z" fill="url(#hh-hatch-r)" opacity=".6"/>
  <path d="M80 22H86V36H80ZM108 22H114V36H108ZM136 22H142V36H136ZM164 22H172V50H164Z" fill="url(#hh-hatch-d)" opacity=".55"/>
  <path d="M76 180C80 194 96 208 120 212C104 204 92 194 88 180Z" fill="url(#hh-stipple)" opacity=".7"/>
  <!-- corbel band and courses -->
  <g fill="none" stroke="${INK}" stroke-linecap="round">
    <path d="M68 50H172" stroke-width="1.6"/>
    <path d="M76 58q5.5-7 11 0q5.5-7 11 0q5.5-7 11 0q5.5-7 11 0q5.5-7 11 0q5.5-7 11 0q5.5-7 11 0q5.5-7 11 0" stroke-width="1.2"/>
    <path d="M76 74H164M76 94H164M76 152H104M136 152H164M76 172H100M140 172H164" stroke-width="1.1"/>
    <path d="M100 58V74M136 58V74M88 74V94M118 74V94M150 74V94M84 94V122M156 94V122M76 122H86M154 122H164M84 122V152M156 122V152M92 152V172M148 152V172M86 172V192M154 172V192" stroke-width="1"/>
    <path d="M80 36H86M130 36H136" stroke-width=".8"/>
  </g>
  <!-- chipped stones -->
  <g fill="${INK}">
    <path d="M77 86l5 2-1 4-4-1z"/><path d="M162 134l-5 3 1 4 4-2z"/><path d="M98 22l3 4 4-4z"/>
  </g>

  <!-- slanted lintel stones: the frown -->
  <g stroke="${INK}" stroke-width="1.4" stroke-linejoin="round">
    <path d="M86 94L114 101V106L86 99Z" fill="${SHADOW}"/>
    <path d="M154 94L126 101V106L154 99Z" fill="${SHADOW}"/>
  </g>

  <g class="m-eyes">
    <path d="M97 106H103V118H111V124H103V142A3 3 0 0 1 97 142V124H89V118H97Z" fill="${INK}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M137 106H143V118H151V124H143V142A3 3 0 0 1 137 142V124H129V118H137Z" fill="${INK}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
    <g filter="url(#hh-soft-glow)">
      <ellipse cx="100" cy="124" rx="2.2" ry="9" fill="${BLOOD}"/>
      <ellipse cx="100" cy="123" rx="1" ry="5" fill="${FLAME}"/>
      <ellipse cx="140" cy="124" rx="2.2" ry="9" fill="${BLOOD}"/>
      <ellipse cx="140" cy="123" rx="1" ry="5" fill="${FLAME}"/>
    </g>
  </g>

  <g class="m-mouth">
    <path d="M100 200V180Q100 160 120 160Q140 160 140 180V200Z" fill="${SHADOW}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M100 180H106M134 180H140M104 168L109 172M136 168L131 172M120 160V166" fill="none" stroke="${INK}" stroke-width="1"/>
    <path d="M107 199V181Q107 167 120 167Q133 167 133 181V199Z" fill="${INK}"/>
    <path d="M113 168V196M120 167V196M127 168V196M107 178H133M107 188H133" fill="none" stroke="${SHADOW}" stroke-width="1.5"/>
    <path d="M111.5 196l1.5 4 1.5-4M118.5 196l1.5 4 1.5-4M125.5 196l1.5 4 1.5-4" fill="${SHADOW}" stroke="${SHADOW}" stroke-width="1"/>
  </g>

  <!-- lightning striking the battlements -->
  <path d="M190 0L168 30L177 34L156 62L163 65L146 94L151 97L143 108" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="miter" stroke-linecap="round"/>
  <path d="M190 0L168 30L177 34L156 62L163 65L146 94L151 97L143 108" fill="none" stroke="${GOLD}" stroke-width="2.4" stroke-linejoin="miter" stroke-linecap="round"/>
  <path d="M189 3L170 29" fill="none" stroke="${FLAME}" stroke-width="1" opacity=".9"/>
  <g class="a-glint" fill="${FLAME}">
    <path d="M166 30l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z"/>
  </g>
  <!-- falling stones -->
  <g stroke="${INK}" stroke-width="1.2" stroke-linejoin="round" fill="${PARCH}">
    <path d="M182 60l7-2 3 5-5 4-5-2z"/><path d="M190 84l5 1 1 5-5 1z"/><path d="M178 104l4-1 2 4-4 2z"/>
  </g>
  <!-- the crown, knocked loose -->
  <g transform="translate(46 42) rotate(-28)" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round">
    <path d="M-13 7V-5L-7 1L0 -9L7 1L13 -5V7Z" fill="${GOLD}"/>
    <path d="M-13 7V2H13V7Z" fill="${GOLD_D}"/>
    <circle cx="0" cy="-9" r="1.6" fill="${BLOOD}" stroke-width="1"/>
  </g>

  <g class="crack crack-1" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M110 36l3 7-4 5 3 7-2 5"/>
    <path d="M111 48l-5 3"/>
  </g>
  <g class="crack crack-2" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M76 142l7-3 4 5 7-2 2 5"/>
    <path d="M164 150l-6 4-1 6-7 3 1 6"/>
    <path d="M157 160l-5-3"/>
  </g>
  <g class="crack crack-3" fill="none" stroke="${INK}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="miter">
    <path d="M143 108l-3 10 6 8-6 12 5 9-8 14 3 9-6 12 2 12"/>
    <path d="M142 138l9 3 4 7"/>
    <path d="M90 58l6 10-4 8 7 7-3 6 4 5"/>
    <path d="M120 212l2-8-4-6 3-8"/>
    <path d="M136 172l-8 4"/>
  </g>
`;
