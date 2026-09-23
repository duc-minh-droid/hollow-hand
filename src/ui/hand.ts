// The player's hand: a fanned arc of cards. Hover lifts, click selects, click again (or drag
// above the line) plays. Cards are keyed by uid so they animate between layouts.
import type { CardInst } from '../game/types.ts';
import { addTilt, cardEl } from './cardView.ts';
import { hideKeywords, showKeywords } from './tooltip.ts';
import { h } from './dom.ts';
import { sfx } from '../fx/audio.ts';
import { burst } from '../fx/particles.ts';

export interface HandOpts {
  canPlay: (uid: number) => { ok: boolean; why?: string };
  costOf: (uid: number) => number;
  onPlay: (uid: number, el: HTMLElement) => void;
  onReject: (uid: number, why: string, el: HTMLElement) => void;
}

export class Hand {
  root: HTMLElement;
  dropLine: HTMLElement;
  els = new Map<number, HTMLElement>();
  cards: CardInst[] = [];
  hovered: number | null = null;
  selected: number | null = null;
  locked = false;
  private drag: { uid: number; el: HTMLElement; x0: number; y0: number; moved: boolean; lastX: number } | null = null;

  private o: HandOpts;

  constructor(parent: HTMLElement, o: HandOpts) {
    this.o = o;
    this.root = h('div', { class: 'hand' });
    this.dropLine = h('div', { class: 'drop-line' });
    parent.append(this.dropLine, this.root);
    addEventListener('pointermove', this.onMove);
    addEventListener('pointerup', this.onUp);
    addEventListener('resize', () => this.layout());
  }

  destroy() {
    removeEventListener('pointermove', this.onMove);
    removeEventListener('pointerup', this.onUp);
    hideKeywords();
  }

  /** Sync to the engine's hand. New cards spawn at `from` (the draw pile) and fly into place. */
  sync(cards: CardInst[], from?: { x: number; y: number }) {
    this.cards = cards.slice();
    const alive = new Set(cards.map((c) => c.uid));
    for (const [uid, el] of this.els) {
      if (!alive.has(uid)) {
        if (this.hovered === uid) this.hovered = null;
        el.remove();
        this.els.delete(uid);
      }
    }
    for (const c of cards) {
      if (this.els.has(c.uid)) {
        this.refreshCost(c);
        continue;
      }
      const el = this.make(c);
      this.els.set(c.uid, el);
      this.root.append(el);
      if (from) {
        const r = this.root.getBoundingClientRect();
        el.style.transition = 'none';
        el.style.transform = `translate(${from.x - r.left - 60}px, ${from.y - r.top}px) rotate(-30deg) scale(.4)`;
        el.classList.add('face-down');
        requestAnimationFrame(() => {
          el.style.transition = '';
          setTimeout(() => {
            el.classList.remove('face-down');
            if (c.rev) {
              el.animate([{ rotate: '0deg' }, { rotate: '-6deg' }, { rotate: '5deg' }, { rotate: '0deg' }], { duration: 420, delay: 200 });
              setTimeout(() => {
                const b = el.getBoundingClientRect();
                burst('violet', b.left + b.width / 2, b.top + b.height / 3, { n: 14, speed: 3, life: 40, size: 2.5 });
              }, 260);
            }
          }, 120);
        });
      }
    }
    this.layout();
  }

  private refreshCost(c: CardInst) {
    const el = this.els.get(c.uid)!;
    const seal = el.querySelector('.c-seal');
    const span = seal?.querySelector('span');
    if (span && !seal?.classList.contains('toll')) {
      const cost = this.o.costOf(c.uid);
      span.textContent = String(cost);
      seal!.classList.toggle('discount', cost < Number(el.dataset.base ?? cost));
    }
  }

  private make(c: CardInst) {
    const el = cardEl(c);
    el.dataset.base = String(this.o.costOf(c.uid));
    addTilt(el, 18);
    el.addEventListener('pointerenter', () => {
      if (this.drag) return;
      this.hovered = c.uid;
      sfx.hover();
      this.layout();
      showKeywords(c, el);
    });
    el.addEventListener('pointerleave', () => {
      if (this.hovered === c.uid) this.hovered = null;
      hideKeywords();
      this.layout();
    });
    el.addEventListener('pointerdown', (e) => {
      if (this.locked || e.button !== 0) return;
      this.drag = { uid: c.uid, el, x0: e.clientX, y0: e.clientY, moved: false, lastX: e.clientX };
    });
    return el;
  }

  /** Where each card sits in the fan. */
  layout() {
    const n = this.cards.length;
    if (!n) return;
    const sample = this.els.get(this.cards[0].uid);
    const cw = sample?.offsetWidth ?? 140;
    const maxW = Math.min(innerWidth * 0.56, cw * 7);
    const step = Math.min(cw * 0.78, (maxW - cw) / Math.max(1, n - 1));
    const spread = Math.min(34, n * 5.5);
    const hi = this.hovered !== null ? this.cards.findIndex((c) => c.uid === this.hovered) : -1;
    this.cards.forEach((c, i) => {
      const el = this.els.get(c.uid);
      if (!el || el.classList.contains('dragging')) return;
      const t = n === 1 ? 0 : i / (n - 1) - 0.5;
      let x = (i - (n - 1) / 2) * step - cw / 2;
      const rot = t * spread;
      let y = Math.abs(t) ** 2 * cw * 0.45;
      let scale = 1;
      let r = rot;
      const playable = this.o.canPlay(c.uid).ok;
      el.classList.toggle('unplayable-now', !playable);
      el.classList.toggle('playable-glow', playable && !this.locked);
      el.classList.toggle('selected', this.selected === c.uid);
      if (hi >= 0 && i !== hi) x += (i < hi ? -1 : 1) * Math.max(0, cw * 0.5 - Math.abs(i - hi) * 8);
      if (i === hi || this.selected === c.uid) {
        y = -cw * 0.62;
        scale = 1.34;
        r = 0;
      }
      el.classList.toggle('lifted', i === hi || this.selected === c.uid);
      el.style.zIndex = String(i === hi ? 50 : 10 + i);
      el.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg) scale(${scale})`;
    });
  }

  select(uid: number | null) {
    this.selected = uid;
    this.layout();
  }

  tryPlay(uid: number) {
    const el = this.els.get(uid);
    if (!el || this.locked) return;
    const v = this.o.canPlay(uid);
    if (!v.ok) {
      this.selected = null;
      this.layout();
      this.o.onReject(uid, v.why ?? '', el);
      return;
    }
    this.selected = null;
    hideKeywords();
    this.o.onPlay(uid, el);
  }

  private onMove = (e: PointerEvent) => {
    const d = this.drag;
    if (!d) return;
    const dx = e.clientX - d.x0;
    const dy = e.clientY - d.y0;
    if (!d.moved && Math.hypot(dx, dy) < 8) return;
    if (!d.moved) {
      d.moved = true;
      d.el.classList.add('dragging');
      this.dropLine.classList.add('on');
      hideKeywords();
    }
    const r = this.root.getBoundingClientRect();
    const vx = e.clientX - d.lastX;
    d.lastX = e.clientX;
    const cw = d.el.offsetWidth;
    d.el.style.transform = `translate(${e.clientX - r.left - cw / 2}px, ${e.clientY - r.top - cw * 0.4}px) rotate(${Math.max(-20, Math.min(20, vx * 1.5))}deg) scale(1.15)`;
    const armed = e.clientY < innerHeight * 0.66;
    this.dropLine.classList.toggle('armed', armed);
    if (Math.random() < 0.35) burst('ink', e.clientX, e.clientY + cw * 0.5, { n: 2, speed: 1, life: 30, size: 2, gravity: 0.05 });
  };

  private onUp = (e: PointerEvent) => {
    const d = this.drag;
    this.drag = null;
    if (!d) return;
    this.dropLine.classList.remove('on', 'armed');
    if (!d.moved) {
      if (this.selected === d.uid) this.tryPlay(d.uid);
      else this.select(d.uid);
      return;
    }
    d.el.classList.remove('dragging');
    if (e.clientY < innerHeight * 0.66) this.tryPlay(d.uid);
    else this.layout();
  };
}
