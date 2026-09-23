// Iron Thimble — a pitted iron thimble with a bead of blood on its crown.
import { BLOOD, BONE, INK, PARCH, SHADOW } from '../palette.ts';

export default () => `
  <path d="M18 50V28C18 16 24 10 32 10C40 10 46 16 46 28V50Z" fill="${SHADOW}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M19 49V28C19 17 25 11 32 11C39 11 45 17 45 28V49Z" fill="url(#hh-stipple)"/>
  <path d="M38 12C43 15 45 20 45 28V49H39V28C39 22 39 16 38 12Z" fill="url(#hh-hatch-d)" opacity=".6"/>
  <path d="M23 22C22 30 22 40 23 48" fill="none" stroke="${BONE}" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
  <path d="M14 47H50V55Q32 60 14 55Z" fill="${PARCH}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M40 47H50V55Q45 56.5 40 57Z" fill="url(#hh-hatch-d)" opacity=".55"/>
  <path d="M15 51Q32 55 49 51" fill="none" stroke="${INK}" stroke-width="1"/>
  <path d="M38 6Q34 11 36 13.5Q38 15 40 13.5Q42 11 38 6Z" fill="${BLOOD}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
  <circle cx="37.2" cy="11.6" r=".7" fill="${BONE}"/>
`;
