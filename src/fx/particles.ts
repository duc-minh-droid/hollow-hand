// One pooled canvas for every particle in the game: ink, blood, embers, sparks, glass, smoke.
import { settings } from '../ui/settings.ts';

type Kind = 'ink' | 'blood' | 'ember' | 'spark' | 'shard' | 'smoke' | 'gold' | 'dust' | 'violet' | 'bone';

interface P {
  kind: Kind;
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number; rot: number; vr: number;
  g: number; drag: number; color: string; alive: boolean; stain: boolean;
}

const MAX = 900;
const pool: P[] = Array.from({ length: MAX }, () => ({
  kind: 'ink', x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 1, rot: 0, vr: 0, g: 0, drag: 1, color: '#000', alive: false, stain: false,
}));

let canvas: HTMLCanvasElement;
let g2: CanvasRenderingContext2D;
let stains: HTMLCanvasElement;
let s2: CanvasRenderingContext2D;
let dpr = 1;
let running = false;

const COLORS: Record<Kind, string[]> = {
  ink: ['#0d0907', '#1b1410', '#261c16'],
  blood: ['#8a1c17', '#b3261e', '#5a0f0c'],
  ember: ['#f2c14e', '#e8742c', '#ffdf8a'],
  spark: ['#fff3cf', '#f2c14e'],
  shard: ['#cfe3ea', '#9fb9c4', '#f0f7fa'],
  smoke: ['#5b5048', '#3d3530'],
  gold: ['#e0bd6a', '#c79a3e', '#fff0b8'],
  dust: ['#c9b791', '#a8966f'],
  violet: ['#8e6aa1', '#4b3354', '#c7a6d8'],
  bone: ['#efe4cb', '#d9c9a3'],
};

export function initParticles(el: HTMLCanvasElement, stainEl: HTMLCanvasElement) {
  canvas = el;
  stains = stainEl;
  g2 = canvas.getContext('2d')!;
  s2 = stains.getContext('2d')!;
  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    for (const c of [canvas, stains]) {
      c.width = innerWidth * dpr;
      c.height = innerHeight * dpr;
    }
    g2.setTransform(dpr, 0, 0, dpr, 0, 0);
    s2.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  addEventListener('resize', resize);
}

export function clearStains() {
  s2?.clearRect(0, 0, innerWidth, innerHeight);
}

function spawn(): P | null {
  for (const p of pool) if (!p.alive) return p;
  return null;
}

export interface BurstOpts {
  n?: number;
  speed?: number;
  spread?: number; // radians
  angle?: number; // direction
  size?: number;
  life?: number;
  gravity?: number;
  stain?: boolean;
}

export function burst(kind: Kind, x: number, y: number, o: BurstOpts = {}) {
  if (!canvas) return;
  const amt = Math.round((o.n ?? 16) * (0.25 + 0.75 * settings.juice));
  const cols = COLORS[kind];
  for (let i = 0; i < amt; i++) {
    const p = spawn();
    if (!p) return;
    const ang = (o.angle ?? -Math.PI / 2) + (Math.random() - 0.5) * (o.spread ?? Math.PI * 2);
    const sp = (o.speed ?? 6) * (0.35 + Math.random() * 0.9);
    p.kind = kind;
    p.x = x;
    p.y = y;
    p.vx = Math.cos(ang) * sp;
    p.vy = Math.sin(ang) * sp;
    p.max = p.life = (o.life ?? 50) * (0.6 + Math.random() * 0.7);
    p.size = (o.size ?? 3) * (0.5 + Math.random());
    p.rot = Math.random() * 6.28;
    p.vr = (Math.random() - 0.5) * 0.4;
    p.g = o.gravity ?? (kind === 'ember' || kind === 'smoke' || kind === 'spark' ? -0.04 : 0.28);
    p.drag = kind === 'smoke' ? 0.96 : 0.985;
    p.color = cols[Math.floor(Math.random() * cols.length)];
    p.alive = true;
    p.stain = !!o.stain && (kind === 'ink' || kind === 'blood') && Math.random() < 0.5;
  }
  if (!running) {
    running = true;
    requestAnimationFrame(tick);
  }
}

function draw(p: P) {
  const t = p.life / p.max;
  g2.globalAlpha = Math.min(1, t * 1.6);
  g2.fillStyle = p.color;
  switch (p.kind) {
    case 'ink':
    case 'blood': {
      // Stretched droplets in the direction of travel.
      const sp = Math.hypot(p.vx, p.vy);
      g2.save();
      g2.translate(p.x, p.y);
      g2.rotate(Math.atan2(p.vy, p.vx));
      g2.beginPath();
      g2.ellipse(0, 0, p.size + sp * 0.6, p.size, 0, 0, 6.28);
      g2.fill();
      g2.restore();
      break;
    }
    case 'shard':
      g2.save();
      g2.translate(p.x, p.y);
      g2.rotate(p.rot);
      g2.beginPath();
      g2.moveTo(0, -p.size * 1.6);
      g2.lineTo(p.size, p.size);
      g2.lineTo(-p.size * 0.8, p.size * 0.6);
      g2.closePath();
      g2.fill();
      g2.strokeStyle = 'rgba(255,255,255,.7)';
      g2.lineWidth = 0.6;
      g2.stroke();
      g2.restore();
      break;
    case 'smoke':
      g2.globalAlpha = t * 0.35;
      g2.beginPath();
      g2.arc(p.x, p.y, p.size * (3 - t * 2), 0, 6.28);
      g2.fill();
      break;
    case 'ember':
    case 'spark':
    case 'gold':
      g2.globalCompositeOperation = 'lighter';
      g2.beginPath();
      g2.arc(p.x, p.y, p.size * (0.4 + t * 0.6), 0, 6.28);
      g2.fill();
      g2.globalCompositeOperation = 'source-over';
      break;
    default:
      g2.beginPath();
      g2.arc(p.x, p.y, p.size, 0, 6.28);
      g2.fill();
  }
}

function tick() {
  g2.clearRect(0, 0, innerWidth, innerHeight);
  let alive = 0;
  for (const p of pool) {
    if (!p.alive) continue;
    p.vx *= p.drag;
    p.vy = p.vy * p.drag + p.g;
    if (p.kind === 'ember') p.vx += (Math.random() - 0.5) * 0.15;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= 1;
    if (p.life <= 0) {
      p.alive = false;
      if (p.stain) {
        s2.globalAlpha = 0.18;
        s2.fillStyle = p.color;
        s2.beginPath();
        s2.arc(p.x, p.y, p.size * 1.8, 0, 6.28);
        s2.fill();
      }
      continue;
    }
    alive++;
    draw(p);
  }
  g2.globalAlpha = 1;
  if (alive) requestAnimationFrame(tick);
  else running = false;
}

/** Slowly fade stains so the table remembers the fight without drowning in ink. */
export function fadeStains() {
  if (!s2) return;
  s2.save();
  s2.globalCompositeOperation = 'destination-out';
  s2.globalAlpha = 0.08;
  s2.fillRect(0, 0, innerWidth, innerHeight);
  s2.restore();
}
