// Procedural sound. No files: every sound is synthesised in WebAudio on demand.
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muffle: BiquadFilterNode | null = null;
let droneNodes: { stop: () => void } | null = null;
let volume = 0.7;
let muted = false;

function ac() {
  if (!ctx) {
    ctx = new AudioContext();
    muffle = ctx.createBiquadFilter();
    muffle.type = 'lowpass';
    muffle.frequency.value = 18000;
    master = ctx.createGain();
    master.gain.value = muted ? 0 : volume;
    master.connect(muffle).connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export function setVolume(v: number, m: boolean) {
  volume = v;
  muted = m;
  if (master && ctx) master.gain.setTargetAtTime(m ? 0 : v, ctx.currentTime, 0.05);
}

/** Low-HP heartbeat muffles the world. */
export function setMuffled(on: boolean) {
  if (!muffle || !ctx) return;
  muffle.frequency.setTargetAtTime(on ? 900 : 18000, ctx.currentTime, 0.3);
}

let noiseBuf: AudioBuffer | null = null;
function noise(c: AudioContext) {
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const src = c.createBufferSource();
  src.buffer = noiseBuf;
  return src;
}

function env(c: AudioContext, g: GainNode, t: number, a: number, peak: number, d: number) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  void c;
}

function out() {
  return master!;
}

function tone(freq: number, type: OscillatorType, dur: number, peak = 0.3, bend = 1, delay = 0) {
  const c = ac();
  const t = c.currentTime + delay;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (bend !== 1) o.frequency.exponentialRampToValueAtTime(freq * bend, t + dur);
  env(c, g, t, 0.005, peak, dur);
  o.connect(g).connect(out());
  o.start(t);
  o.stop(t + dur + 0.05);
}

function hiss(dur: number, f0: number, f1: number, peak = 0.25, q = 1.2, type: BiquadFilterType = 'bandpass', delay = 0) {
  const c = ac();
  const t = c.currentTime + delay;
  const n = noise(c);
  const f = c.createBiquadFilter();
  f.type = type;
  f.Q.value = q;
  f.frequency.setValueAtTime(f0, t);
  f.frequency.exponentialRampToValueAtTime(Math.max(40, f1), t + dur);
  const g = c.createGain();
  env(c, g, t, 0.01, peak, dur);
  n.connect(f).connect(g).connect(out());
  n.start(t, Math.random());
  n.stop(t + dur + 0.05);
}

export const sfx = {
  hover: () => hiss(0.06, 3000, 5000, 0.03, 2),
  draw: () => hiss(0.12, 1200, 4200, 0.09, 1.5),
  shuffle: () => {
    for (let i = 0; i < 7; i++) hiss(0.05, 2000, 3500, 0.07, 2, 'bandpass', i * 0.035);
  },
  whoosh: () => hiss(0.28, 400, 2600, 0.18, 0.8),
  play: () => {
    hiss(0.22, 600, 3000, 0.14, 0.9);
    tone(180, 'sine', 0.12, 0.12, 0.6, 0.05);
  },
  hit: (big = false) => {
    tone(big ? 90 : 140, 'sine', big ? 0.35 : 0.2, big ? 0.55 : 0.4, 0.4);
    hiss(big ? 0.25 : 0.12, 2500, 300, big ? 0.35 : 0.22, 0.7, 'lowpass');
    if (big) tone(55, 'triangle', 0.5, 0.35, 0.5, 0.02);
  },
  slash: () => hiss(0.16, 5000, 900, 0.22, 3),
  crit: () => {
    [0, 0.07, 0.15].forEach((d, i) => tone([880, 1320, 1760][i], 'sine', 0.9, 0.12, 1, d));
    tone(70, 'sine', 0.5, 0.5, 0.5);
  },
  ward: () => {
    tone(420, 'triangle', 0.25, 0.12, 1.02);
    tone(630, 'sine', 0.3, 0.07, 1, 0.02);
  },
  shatter: () => {
    for (let i = 0; i < 6; i++) tone(1800 + Math.random() * 2400, 'square', 0.08, 0.04, 0.8, i * 0.018);
    hiss(0.3, 7000, 2000, 0.2, 1, 'highpass');
  },
  bleed: () => {
    tone(300, 'sine', 0.18, 0.1, 0.5);
    hiss(0.1, 900, 400, 0.08, 4);
  },
  curse: () => {
    tone(110, 'sawtooth', 0.6, 0.07, 0.8);
    tone(116, 'sawtooth', 0.6, 0.07, 0.8);
  },
  buff: () => {
    tone(330, 'triangle', 0.18, 0.12, 1.5);
    tone(495, 'triangle', 0.22, 0.08, 1.5, 0.06);
  },
  candle: () => hiss(0.25, 300, 1500, 0.15, 0.6),
  snuff: () => hiss(0.3, 1400, 200, 0.14, 0.8),
  bell: () => {
    [1, 2.76, 5.4, 8.93].forEach((m, i) => tone(196 * m, 'sine', 2.2 / (i + 1), 0.16 / (i + 1)));
  },
  coin: () => {
    tone(2200, 'square', 0.05, 0.05);
    tone(3300, 'sine', 0.25, 0.06, 1, 0.04);
  },
  dice: () => {
    for (let i = 0; i < 5; i++) tone(700 + Math.random() * 500, 'square', 0.03, 0.05, 0.9, i * 0.06 + Math.random() * 0.02);
  },
  burn: () => {
    hiss(0.8, 800, 200, 0.18, 0.5);
    for (let i = 0; i < 8; i++) tone(2000 + Math.random() * 3000, 'square', 0.015, 0.03, 1, Math.random() * 0.7);
  },
  quill: () => {
    for (let i = 0; i < 10; i++) hiss(0.04, 5000, 7000, 0.05, 6, 'bandpass', i * 0.07 + Math.random() * 0.03);
  },
  crack: () => {
    hiss(0.12, 3000, 500, 0.3, 1, 'lowpass');
    tone(160, 'square', 0.06, 0.08, 0.5);
  },
  heart: () => {
    tone(60, 'sine', 0.12, 0.4, 0.7);
    tone(55, 'sine', 0.14, 0.3, 0.7, 0.18);
  },
  thinking: () => {
    tone(98, 'sine', 1.2, 0.05, 1.01);
    tone(147, 'sine', 1.2, 0.03, 0.99);
  },
  death: () => {
    tone(220, 'sawtooth', 2, 0.1, 0.25);
    tone(110, 'sine', 2.5, 0.3, 0.3);
    hiss(2, 2000, 80, 0.2, 0.5, 'lowpass');
  },
  victory: () => {
    [0, 0.12, 0.24, 0.4].forEach((d, i) => tone([392, 494, 587, 784][i], 'triangle', 0.9, 0.12, 1, d));
  },
  page: () => hiss(0.3, 1500, 3500, 0.1, 0.6),
  click: () => tone(900, 'square', 0.03, 0.05, 0.5),
  error: () => tone(130, 'square', 0.12, 0.08, 0.8),
};

/** A low drone for the table. Two detuned oscillators through a slow filter sweep. */
export function startDrone() {
  const c = ac();
  if (droneNodes) return;
  const g = c.createGain();
  g.gain.value = 0;
  g.gain.setTargetAtTime(0.05, c.currentTime, 2);
  const f = c.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = 300;
  const lfo = c.createOscillator();
  const lfoGain = c.createGain();
  lfo.frequency.value = 0.07;
  lfoGain.gain.value = 140;
  lfo.connect(lfoGain).connect(f.frequency);
  const oscs = [55, 55.4, 82.4].map((fr) => {
    const o = c.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = fr;
    o.connect(f);
    o.start();
    return o;
  });
  f.connect(g).connect(out());
  lfo.start();
  droneNodes = {
    stop: () => {
      g.gain.setTargetAtTime(0, c.currentTime, 0.5);
      setTimeout(() => [...oscs, lfo].forEach((o) => o.stop()), 2000);
    },
  };
}

export function stopDrone() {
  droneNodes?.stop();
  droneNodes = null;
}

export function unlockAudio() {
  ac();
}
