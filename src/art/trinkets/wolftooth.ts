// Wolf Tooth — a long curved fang bound to a red cord.
import { BLOOD, BONE, INK, PARCH } from '../palette.ts';

export default () => `
  <g fill="none" stroke-linecap="round">
    <path d="M24 16C14 12 12 4 20 2M40 16C50 12 52 4 44 2M20 2Q32 -1 44 2" stroke="${INK}" stroke-width="4.6"/>
    <path d="M24 16C14 12 12 4 20 2M40 16C50 12 52 4 44 2M20 2Q32 -1 44 2" stroke="${BLOOD}" stroke-width="2.4"/>
  </g>
  <g stroke="${INK}" stroke-width="2.2" stroke-linejoin="round">
    <path d="M23 19C29 17 37 17 42 20C44 36 36 51 16 61C25 47 28 33 23 19Z" fill="${BONE}"/>
  </g>
  <path d="M42 20C44 36 36 51 16 61C30 49 35 35 35 19Z" fill="url(#hh-hatch-d)" opacity=".55"/>
  <path d="M27 24C30 34 28 44 22 53" fill="none" stroke="${PARCH}" stroke-width="1.3" stroke-linecap="round"/>
  <g stroke="${INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M21 13Q32 9 43 13L43 21Q32 17 21 21Z" fill="${BLOOD}"/>
    <path d="M21.5 17Q32 13 42.5 17" fill="none" stroke-width="1"/>
  </g>
`;
