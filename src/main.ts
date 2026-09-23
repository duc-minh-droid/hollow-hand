import '@fontsource/im-fell-english/400.css';
import '@fontsource/im-fell-english/400-italic.css';
import '@fontsource/im-fell-english-sc/400.css';
import '@fontsource/pirata-one/400.css';
import './styles/base.css';
import './styles/card.css';
import './styles/combat.css';
import './styles/screens.css';

import { injectDefs } from './art/defs.ts';
import { initParticles } from './fx/particles.ts';
import { initJuice } from './fx/juice.ts';
import { unlockAudio } from './fx/audio.ts';
import { probeJev } from './jev/jevClient.ts';
import { initTooltips } from './ui/tooltip.ts';
import { applySettings } from './ui/settings.ts';
import { app, go, initRouter, register } from './ui/app.ts';
import { mountTitle, mountIntro } from './ui/screens/title.ts';
import { mountMap } from './ui/screens/map.ts';
import { mountCombat } from './ui/screens/combat.ts';
import { mountReward } from './ui/screens/reward.ts';
import { mountEvolve } from './ui/screens/evolve.ts';
import { mountEvent, mountShop, mountRest } from './ui/screens/places.ts';
import { mountEnd, mountGallery } from './ui/screens/end.ts';

injectDefs();
applySettings();
initTooltips();

const stage = document.getElementById('stage')!;
initRouter(stage);
initJuice(stage, document.getElementById('overlay')!);
initParticles(document.getElementById('fx') as HTMLCanvasElement, document.getElementById('stains') as HTMLCanvasElement);

// The candle glow follows the cursor.
const glow = document.getElementById('glow')!;
addEventListener('pointermove', (e) => {
  glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
addEventListener('pointerdown', unlockAudio, { once: true });

register('title', mountTitle);
register('intro', mountIntro);
register('map', mountMap);
register('combat', mountCombat);
register('reward', mountReward);
register('evolve', mountEvolve);
register('event', mountEvent);
register('shop', mountShop);
register('rest', mountRest);
register('end', mountEnd);
register('gallery', mountGallery);

void probeJev();
const params = new URLSearchParams(location.search);
go(params.has('gallery') ? 'gallery' : 'title', {}, false);

// Dev-only handle for poking at screens from the console.
if (import.meta.env.DEV) Object.assign(window, { __hh: { app, go } });
