// Tallow — a fat rendered-tallow candle set in a hollow knuckle of bone, burning high and smoking.
import { BONE, FLAME, GOLD, INK, PARCH, SHADOW } from '../palette.ts';

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <rect width="200" height="150" fill="url(#hh-xhatch)" opacity=".45"/>
  <circle cx="100" cy="46" r="62" fill="url(#hh-glow)"/>
  <circle cx="100" cy="46" r="34" fill="url(#hh-glow)"/>

  <!-- pewter dish -->
  <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
    <ellipse cx="100" cy="140" rx="46" ry="6.5" fill="${SHADOW}"/>
    <ellipse cx="100" cy="139" rx="38" ry="4" fill="url(#hh-hatch-h)" opacity=".6" stroke-width=".8"/>
  </g>

  <!-- the bone -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M84 92Q90 96 88 104V118Q86 126 76 130Q66 134 70 141Q80 146 92 140Q100 136 108 140Q120 146 130 141Q134 134 124 130Q114 126 112 118V104Q110 96 116 92Z" fill="${BONE}"/>
    <path d="M104 96Q112 94 112 104V118Q114 126 124 130Q134 134 130 141Q122 144 112 138Q106 128 106 114Z" fill="url(#hh-hatch-r)" opacity=".65" stroke="none"/>
    <path d="M92 108q2 8 0 14M96 128q4-3 8 0" fill="none" stroke-width=".8"/>
    <ellipse cx="94" cy="114" rx="1.2" ry="2" fill="${INK}" stroke="none"/>
  </g>

  <!-- the tallow, fat and running -->
  <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
    <path d="M80 94V70Q80 62 100 62Q120 62 120 70V94Q110 98 100 96Q90 98 80 94Z" fill="${BONE}"/>
    <path d="M110 63Q120 64 120 70V94Q116 96 110 97Z" fill="url(#hh-hatch-v)" opacity=".55" stroke="none"/>
    <ellipse cx="100" cy="67" rx="16" ry="3.6" fill="${FLAME}" opacity=".45"/>
    <path d="M80 72Q77 88 80 104Q83 109 85 102Q85 90 83 80ZM113 68Q116 84 114 110Q117 115 119 108Q121 90 119 72ZM96 94Q95 102 98 108Q101 104 100 96Z" fill="${BONE}"/>
    <path d="M86 70q-2 10 0 18" fill="none" stroke="${PARCH}" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
    <path d="M100 63V56" stroke-width="1.8"/>
  </g>

  <!-- flame and smoke -->
  <g class="a-flicker">
    <path d="M100 18Q118 38 110 54Q100 64 90 54Q82 38 100 18Z" fill="url(#hh-flame)" stroke="${INK}" stroke-width="1.1"/>
    <path d="M100 30Q109 43 105 52Q100 58 95 52Q91 43 100 30Z" fill="${FLAME}"/>
    <path d="M100 42Q103 48 101 53Q100 55 99 53Q97 48 100 42Z" fill="${BONE}"/>
  </g>
  <g class="a-smoke">
    <path d="M104 18q8-4 5-10q-3-5 4-8M96 16q-6-4-2-9" fill="none" stroke="${SHADOW}" stroke-width="1.4" stroke-linecap="round"/>
  </g>
  <g fill="${GOLD}" stroke="${INK}" stroke-width=".5">
    <circle cx="124" cy="34" r="1.3"/><circle cx="78" cy="30" r="1.1"/><circle cx="132" cy="54" r=".9"/>
  </g>
  <g>
    <path d="M70 48l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="${GOLD}" stroke="${INK}" stroke-width=".5"/>
  </g>
`;
