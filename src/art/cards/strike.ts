// Strike — a dagger driven through a crescent moon; the moon bleeds.
import { BLOOD, BLOOD_D, BONE, GOLD, INK, PARCH, SHADOW } from '../palette.ts';

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V58C150 44 60 70 0 52Z" fill="url(#hh-hatch)" opacity=".55"/>
  <g fill="${INK}">
    <path d="M28 22l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z"/>
    <path d="M168 30l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z"/>
    <circle cx="52" cy="40" r="1.2"/><circle cx="140" cy="16" r="1"/><circle cx="182" cy="62" r="1.1"/>
  </g>

  <!-- crescent moon with a sleeping face -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M122 22a50 50 0 1 0 0 100a40 40 0 1 1 0-100z" fill="${BONE}"/>
    <path d="M122 22a50 50 0 1 0 0 100a40 40 0 1 1 0-100z" fill="url(#hh-hatch-r)" opacity=".6"/>
    <path d="M86 58q5 3 10 0M84 84q6 6 14 2" fill="none" stroke-width="1.3"/>
    <path d="M78 70q-3 4 1 7" fill="none" stroke-width="1.1"/>
  </g>

  <!-- dagger -->
  <g stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
    <path d="M38 132L112 58l6 6-74 74z" fill="${SHADOW}" opacity=".35" stroke="none"/>
    <path d="M110 50l40-30-30 40z" fill="${BONE}"/>
    <path d="M110 50l40-30-30 40z" fill="url(#hh-hatch-d)" opacity=".5"/>
    <path d="M120 60l30-40" stroke-width=".8"/>
    <path d="M100 48l24 24" stroke-width="5" stroke="${INK}"/>
    <path d="M100 48l24 24" stroke-width="2.6" stroke="${GOLD}"/>
    <path d="M110 62L58 114" stroke-width="7"/>
    <path d="M110 62L58 114" stroke-width="4.5" stroke="${BLOOD_D}"/>
    <path d="M108 64L60 112" stroke-width="1" stroke="${GOLD}" stroke-dasharray="2 3"/>
    <circle cx="55" cy="117" r="6" fill="${GOLD}"/>
    <circle cx="55" cy="117" r="2.2" fill="${BLOOD}"/>
  </g>

  <!-- the wound and a falling drop -->
  <path d="M97 66q-2 10 1 18q2 6 0 12" fill="none" stroke="${BLOOD}" stroke-width="3" stroke-linecap="round"/>
  <g class="a-drip">
    <path d="M98 100q-4 6 0 9q4-3 0-9z" fill="${BLOOD}" stroke="${INK}" stroke-width=".8"/>
  </g>
  <path d="M84 140q14-6 28 0" fill="none" stroke="${BLOOD}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
`;
