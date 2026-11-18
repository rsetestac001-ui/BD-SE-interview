export const randomPracticePath = "/practice?mode=random";

export function newPracticeRound() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function shuffleForRound<T>(list: readonly T[], round: string) {
  const arr = [...list];
  let state = hash(round) || 1;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    const swap = arr[i];
    arr[i] = arr[j];
    arr[j] = swap;
  }
  return arr;
}
