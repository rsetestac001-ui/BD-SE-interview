import assert from "node:assert/strict";
import test from "node:test";
import { shuffleForRound } from "./practice-random.ts";

const questionIds = Array.from({ length: 134 }, (_, index) => index + 1);

test("starting a new random round changes the order without losing questions", () => {
  const first = shuffleForRound(questionIds, "round-one");
  const second = shuffleForRound(questionIds, "round-two");

  assert.notDeepEqual(first, second);
  assert.deepEqual([...first].sort((a, b) => a - b), questionIds);
  assert.deepEqual([...second].sort((a, b) => a - b), questionIds);
});

test("reopening a round preserves the queue and the next question", () => {
  const queue = shuffleForRound(questionIds, "saved-round");
  const current = queue[15];
  const reopened = shuffleForRound(questionIds, "saved-round");

  assert.notEqual(queue, questionIds);
  assert.deepEqual(reopened, queue);
  assert.equal(reopened[reopened.indexOf(current) + 1], queue[16]);
});
