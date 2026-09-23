// Browser side of the Jev link. The API key never reaches the browser: requests go to the
// local proxy (server/jevProxy.ts), which adds credentials and forwards to TypeSafe.

export type Question =
  | { type: 'choice'; instructions: string; criteria: Record<string, string> }
  | { type: 'score'; instructions: string; criteria: string[] }
  | { type: 'noul'; instructions: string };

export interface ChoiceAnswer {
  type?: 'choice';
  choice: string;
  probabilities: Record<string, number>;
  confidence: number;
}

export interface ScoreAnswer {
  type?: 'score';
  score: number;
  confidence: number;
  probabilities: Record<string, number>;
}

export type Answers = Record<string, ChoiceAnswer | ScoreAnswer | { probability: number }>;

export type JevStatus = 'unknown' | 'awake' | 'dreaming';

let status: JevStatus = 'unknown';
const listeners = new Set<(s: JevStatus) => void>();

export function jevStatus() {
  return status;
}

export function onJevStatus(fn: (s: JevStatus) => void) {
  listeners.add(fn);
  fn(status);
  return () => listeners.delete(fn);
}

function setStatus(s: JevStatus) {
  if (s === status) return;
  status = s;
  listeners.forEach((fn) => fn(s));
}

export async function probeJev(): Promise<JevStatus> {
  try {
    const r = await fetch('/api/jev/status');
    const j = (await r.json()) as { ready: boolean };
    setStatus(j.ready ? 'awake' : 'dreaming');
  } catch {
    setStatus('dreaming');
  }
  return status;
}

/** Ask Jev. Resolves to null on any failure — callers must have a fallback. */
export async function askJev(state: unknown, questions: Record<string, Question>, timeoutMs = 2600): Promise<Answers | null> {
  if (status === 'dreaming') return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch('/api/jev/decide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state, questions }),
      signal: ctrl.signal,
    });
    if (r.status === 503) {
      setStatus('dreaming');
      return null;
    }
    if (!r.ok) return null;
    const j = (await r.json()) as { answers?: Answers };
    setStatus('awake');
    return j.answers ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
