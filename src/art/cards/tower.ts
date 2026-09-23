// The Tower — a stone tower split by a gold bolt, its crown blown off, two tiny figures thrown from the top.
import { BONE, GOLD, GOLD_D, INK, PARCH, SHADOW } from '../palette.ts';

const faller = (x: number, y: number, r: number) => `
  <g transform="translate(${x} ${y}) rotate(${r})" stroke="${INK}" stroke-width="1.3" stroke-linecap="round" fill="none">
    <circle cx="0" cy="-8" r="2.6" fill="${BONE}"/>
    <path d="M0-5.4V4M-5-4L0-2l5-3M0 4l-4 6M0 4l4 5"/>
  </g>`;

export default () => `
  <rect width="200" height="150" fill="${PARCH}"/>
  <path d="M0 0H200V52q-16 8-34 0q-18 10-36 2q-20 8-40-2q-22 10-44 0q-26 8-46-2Z" fill="url(#hh-hatch-d)" opacity=".6"/>
  <path d="M0 0H200V30q-24 8-46 0q-24 8-48-2q-26 8-52 0q-26 8-54 0Z" fill="url(#hh-xhatch)" opacity=".45"/>

  <!-- tower -->
  <g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">
    <path d="M78 145L84 47H116L122 145Z" fill="${BONE}"/>
    <path d="M78 145L84 47H96L94 145Z" fill="url(#hh-hatch)" opacity=".55" stroke="none"/>
    <path d="M122 145L116 47H108L110 145Z" fill="url(#hh-xhatch)" opacity=".6" stroke="none"/>
    <path d="M80 47V36h6v5h6v-5h8v5h6v-5h6v5h8v11z" fill="${BONE}"/>
    <path d="M80 47V36h6v5h6v-5h8v5h6v-5h6v5h8v11z" fill="url(#hh-hatch-r)" opacity=".45" stroke="none"/>
    <path d="M83 62h34M82 80h36M81 98h38M80 116h40M79 134h42" fill="none" stroke-width=".8" stroke-dasharray="7 2 5 3"/>
    <path d="M101 36L96 54L104 66L97 82L105 96L98 112L103 126" fill="none" stroke-width="2.4"/>
    <path d="M101 38L97 54L104 66L97 82" fill="none" stroke="${GOLD}" stroke-width="1"/>
    <path d="M89 76v-7a5 5 0 0 1 10 0v7z M104 106v-7a5 5 0 0 1 10 0v7z M86 128v-6a4.5 4.5 0 0 1 9 0v6z" fill="${INK}"/>
  </g>

  <!-- flames from the windows -->
  <g class="a-flicker">
    <path d="M94 74q-7-7-2-16q1 5 4 6q2-6 0-11q8 6 5 15q-2 5-7 6z" fill="url(#hh-flame)"/>
    <path d="M109 104q-8-6-3-15q1 4 4 5q1-6-1-10q9 6 6 14q-2 5-6 6z" fill="url(#hh-flame)"/>
    <path d="M90 126q-6-5-2-12q1 4 3 4q1-4 0-8q7 5 4 12q-2 3-5 4z" fill="url(#hh-flame)"/>
  </g>

  <!-- the bolt -->
  <g stroke="${INK}" stroke-width="1.3" stroke-linejoin="round">
    <path d="M26 12L68 27L59 30L94 41L84 43L103 52L74 47L82 44L48 34L57 31Z" fill="${GOLD}"/>
    <path d="M26 12L68 27L59 30L94 41" fill="none" stroke="${GOLD_D}" stroke-width=".8"/>
  </g>
  <g fill="${INK}"><path d="M30 44l3-6 2 5 3-3" fill="none" stroke="${INK}" stroke-width=".9"/><circle cx="170" cy="18" r="1"/><circle cx="46" cy="58" r="1.1"/></g>

  <!-- crown blown off -->
  <g transform="translate(144 26) rotate(28)" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round">
    <path d="M-11 6L-13-7L-5 0L0-10L5 0L13-7L11 6Z" fill="${GOLD}"/>
    <path d="M-11 6L-13-7L-5 0L0-10L5 0" fill="url(#hh-hatch)" opacity=".4" stroke="none"/>
    <path d="M-11 6H11" stroke-width="2"/>
    <circle cx="0" cy="2" r="1.6" fill="${BONE}"/>
  </g>
  <path d="M124 38q8-6 12-14M128 44q10-4 16-8" fill="none" stroke="${INK}" stroke-width=".8" stroke-dasharray="2 2"/>

  <!-- falling figures and debris -->
  ${faller(56, 82, 160)}
  ${faller(146, 100, -140)}
  <g fill="${SHADOW}" stroke="${INK}" stroke-width=".9">
    <path d="M66 58l5-2 2 4-5 2z"/><path d="M134 62l4 1-1 4-4-1z"/><path d="M60 110l4-1 1 4-4 1z"/><path d="M152 74l3 2-2 3-3-2z"/>
  </g>

  <!-- rocks at the base -->
  <path d="M0 150V138q22-8 44-3q18-8 36 2l40 0q18-9 36-1q24-6 44 2V150Z" fill="${SHADOW}" stroke="${INK}" stroke-width="1.4"/>
  <path d="M0 150V138q22-8 44-3q18-8 36 2l40 0q18-9 36-1q24-6 44 2V150Z" fill="url(#hh-hatch-d)" opacity=".6"/>
`;
