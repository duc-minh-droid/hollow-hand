// Captures documentation screenshots and a gameplay demo from a running dev server.
//   npm run dev            (in another terminal)
//   npm run capture        → docs/screenshots/*.png, docs/media/frames/* (demo frames)
// Then `python scripts/encode_demo.py` turns the frames into docs/media/demo.mp4 + demo.gif.
// Uses the locally installed Chrome through playwright-core (no browser download).
import { chromium } from 'playwright-core';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.BASE ?? 'http://localhost:5173';
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SHOTS = 'docs/screenshots';
const FRAMES = 'docs/media/frames';
const W = 1600;
const H = 900;

mkdirSync(SHOTS, { recursive: true });
rmSync(FRAMES, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on('pageerror', (e) => console.error('[page error]', e.message));

const wait = (ms) => page.waitForTimeout(ms);
const shot = async (name, opts = {}) => {
  await page.screenshot({ path: join(SHOTS, `${name}.jpg`), type: 'jpeg', quality: 86, ...opts });
  console.log('shot', name);
};
const screen = () => page.evaluate(() => document.querySelector('.screen')?.className ?? '');
const go = (name, args = {}) => page.evaluate(([n, a]) => window.__hh.go(n, a), [name, args]);

// ── screencast (demo video frames) ──
const cdp = await ctx.newCDPSession(page);
const frames = [];
let recording = false;
cdp.on('Page.screencastFrame', async (f) => {
  if (recording) frames.push({ data: f.data, t: f.metadata.timestamp });
  await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
});
async function startRec() {
  recording = true;
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 82, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
}
async function stopRec() {
  recording = false;
  await cdp.send('Page.stopScreencast');
}

/** Drag a card from the hand up onto the table, like a player would. */
async function dragPlay(card) {
  const b = await card.boundingBox();
  if (!b) return false;
  const x = b.x + b.width / 2;
  const y = b.y + b.height * 0.35;
  await page.mouse.move(x, y, { steps: 6 });
  await wait(220);
  await page.mouse.down();
  await page.mouse.move(x + 20, y - 80, { steps: 5 });
  await page.mouse.move(W / 2 + (x - W / 2) * 0.3, H * 0.56, { steps: 12 });
  await wait(60);
  await page.mouse.up();
  return true;
}

async function playerTurn(maxCards = 6) {
  for (let i = 0; i < maxCards; i++) {
    if (!(await screen()).includes('combat')) return;
    const ready = await page.evaluate(() => !document.querySelector('.end-turn')?.disabled);
    if (!ready) return;
    // Prefer attacks, then anything playable.
    const cards = await page.$$('.hand .card.playable-glow');
    if (!cards.length) break;
    let pick = cards[0];
    for (const c of cards) {
      const id = await c.getAttribute('data-id');
      if (['strike', 'twinknives', 'lunge', 'cutpalm', 'tower'].includes(id)) {
        pick = c;
        break;
      }
    }
    await dragPlay(pick);
    await page.waitForFunction(() => !document.querySelector('.end-turn')?.disabled || !document.querySelector('.screen-combat'), null, { timeout: 15000 }).catch(() => {});
    await wait(250);
  }
  if ((await screen()).includes('combat')) {
    await page.mouse.move(W - 120, H - 200, { steps: 8 });
    await page.click('.end-turn').catch(() => {});
  }
}

async function waitPlayerTurn() {
  await page.waitForFunction(() => !document.querySelector('.screen-combat') || !document.querySelector('.end-turn')?.disabled, null, { timeout: 30000 }).catch(() => {});
  await wait(400);
}

// ── fresh start ──
await page.goto(BASE);
await page.evaluate(() => localStorage.clear());
await page.goto(BASE);
await wait(3200);
await shot('01-title');

await startRec();
await wait(1500);
await page.click('text=Take a seat');
await wait(1200);
// Skip the typewriter, then read the intro for a beat.
await page.mouse.click(W / 2, H / 3);
await wait(1800);
await shot('02-intro');
await page.click('.intro-col .seal-btn');
await wait(1600);
await shot('03-map');
await page.hover('.node.next');
await wait(700);
await page.click('.node.next');
await wait(2600);
await shot('04-combat-start');

// Hover a card to show the lift, tilt and keyword panel.
const hover = await page.$('.hand .card[data-id="cutpalm"]') ?? await page.$('.hand .card');
if (hover) {
  const b = await hover.boundingBox();
  await page.mouse.move(b.x + b.width * 0.3, b.y + b.height * 0.3, { steps: 10 });
  await wait(500);
  await page.mouse.move(b.x + b.width * 0.7, b.y + b.height * 0.4, { steps: 10 });
  await wait(400);
  await shot('05-card-hover');
}

// Play the fight out; grab a couple of action shots along the way.
let turn = 0;
let tookHit = false;
let tookJev = false;
while ((await screen()).includes('combat') && turn < 14) {
  if (!tookHit) {
    const c = await page.$('.hand .card.playable-glow[data-id="strike"]') ?? await page.$('.hand .card.playable-glow');
    if (c) {
      await dragPlay(c);
      await wait(620);
      await shot('06-hit');
      tookHit = true;
      await waitPlayerTurn();
    }
  }
  await playerTurn();
  if (!tookJev) {
    await page.waitForSelector('.mask-wrap.thinking', { timeout: 8000 }).catch(() => {});
    await wait(200);
    await shot('07-jev-thinking');
    await page.waitForSelector('body > .card.played', { timeout: 8000 }).catch(() => {});
    await wait(500);
    await shot('08-jev-plays');
    tookJev = true;
  }
  await waitPlayerTurn();
  turn++;
  if (turn === 4) await stopRec();
}
if (recording) await stopRec();

// Reward → evolve (the adaptation scene).
if ((await screen()).includes('reward')) {
  await wait(3200);
  await shot('09-reward');
  await page.click('.reward-slot .card').catch(() => {});
  await page.waitForSelector('.screen-evolve', { timeout: 10000 }).catch(() => {});
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.evolve .seal-btn')).opacity === '1', null, { timeout: 30000 }).catch(() => {});
  await wait(400);
  await shot('10-evolve');
  await page.click('.evolve .seal-btn');
  await wait(1600);
  await shot('11-map-after');
}

// Places, via the dev handle.
const nodeOf = (type) => page.evaluate((t) => window.__hh.app.run.nodes.find((n) => n.type === t)?.id, type);
await page.evaluate(() => (window.__hh.app.run.teeth = 180));
for (const [type, name, delay] of [['event', '12-event', 5200], ['shop', '13-shop', 2500], ['rest', '14-rest', 2500]]) {
  const id = await nodeOf(type);
  if (!id) continue;
  await go(type, { nodeId: id });
  await wait(delay);
  await shot(name);
}

// Gallery + close-ups.
await go('gallery');
await wait(1500);
await shot('15-gallery', { fullPage: false });
const rows = await page.$$('.gallery-row');
const names = ['16-cards-starter', '17-cards-common', '18-cards-uncommon', '19-cards-rare', '20-curse', '21-cards-jev', '22-masks', '23-trinkets'];
for (let i = 0; i < rows.length && i < names.length; i++) {
  await rows[i].scrollIntoViewIfNeeded();
  await wait(250);
  await rows[i].screenshot({ path: join(SHOTS, `${names[i]}.jpg`), type: 'jpeg', quality: 86 });
}
await page.click('text=Reversed');
await wait(600);
const revRow = (await page.$$('.gallery-row'))[3];
if (revRow) {
  await revRow.scrollIntoViewIfNeeded();
  await wait(250);
  await revRow.screenshot({ path: join(SHOTS, '24-cards-reversed.jpg'), type: 'jpeg', quality: 86 });
}

// Endings.
await page.evaluate(() => { window.__hh.app.memory.grudge = 3; });
await go('end', { won: false, mask: 'The Tower' });
await wait(6000);
await shot('26-end-lost');
await go('end', { won: true });
await wait(6000);
await shot('27-end-won');

// Write the frames with their timestamps for the encoder.
const index = [];
frames.forEach((f, i) => {
  const file = `f${String(i).padStart(5, '0')}.jpg`;
  writeFileSync(join(FRAMES, file), Buffer.from(f.data, 'base64'));
  index.push({ file, t: f.t });
});
writeFileSync(join(FRAMES, 'index.json'), JSON.stringify(index));
console.log(`frames: ${frames.length}`);
await browser.close();
