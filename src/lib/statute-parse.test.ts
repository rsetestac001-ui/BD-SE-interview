import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  compareProvisionPaths,
  provisionsFromLabel,
  sectionsFromLabel,
} from "./statute-parse.ts";

function marks(label: string) {
  return provisionsFromLabel(label).map(
    (item) => `${item.section}${item.path.map((part) => `(${part})`).join("")}`,
  );
}

test("keeps parent sections and reads the sub-provision actually written", () => {
  assert.deepEqual(marks("《建築物條例》第30B(1)、(2)、(3)條"), ["30B(1)", "30B(2)", "30B(3)"]);
  assert.deepEqual(marks("《建築物條例》第30B(1)及(2)條"), ["30B(1)", "30B(2)"]);
  assert.deepEqual(marks("《建築物(管理)規例》第30(3)及32(3)條"), ["30(3)", "32(3)"]);
  assert.deepEqual(marks("《建築物條例》第33及40(1BC)條"), ["33", "40(1BC)"]);
  assert.deepEqual(
    marks("《建築物條例》第40(2A)(a)(i)、40(2B)、40(2AE)及40(2AF)條"),
    ["40(2A)(a)(i)", "40(2B)", "40(2AE)", "40(2AF)"],
  );
  assert.deepEqual(marks("《建築物條例》第41(1)(a)條"), ["41(1)(a)"]);
  assert.deepEqual(marks("《建築物條例》第41(1)(aa)條"), ["41(1)(aa)"]);
  assert.deepEqual(marks("《建築物條例》第30B條"), ["30B"]);
  assert.deepEqual(marks("《建築物條例》第26A條"), ["26A"]);
  assert.deepEqual(marks("《建築物條例》第14(1)及14AA條"), ["14(1)", "14AA"]);
  assert.deepEqual(marks("《建築物條例》第14A及15條"), ["14A", "15"]);
  assert.deepEqual(marks("《建築物(管理)規例》第30(3)及(4)條"), ["30(3)", "30(4)"]);
  assert.deepEqual(marks("《建築物(管理)規例》第32(3)及40條"), ["32(3)", "40"]);
  assert.deepEqual(marks("《建築物條例》第8條標題"), ["8"]);
  assert.deepEqual(marks("《建築物條例》第30B（13）條"), ["30B(13)"]);
  assert.deepEqual(marks("《建築物條例》第30B(1)及41(1)(a)條"), ["30B(1)", "41(1)(a)"]);
  assert.deepEqual(marks("《建築物條例》第16(1)(b)條"), ["16(1)(b)"]);
  assert.deepEqual(marks("《建築物條例》第16(1)(a)、(b)、(d)、(i)及(m)條"), [
    "16(1)(a)",
    "16(1)(b)",
    "16(1)(d)",
    "16(1)(i)",
    "16(1)(m)",
  ]);
  assert.deepEqual(marks("《建築物條例》第4(1)(b)、(1A)及(3)條"), ["4(1)(b)", "4(1A)", "4(3)"]);
  assert.deepEqual(marks("《建築物條例》第40(2A)(a)(i)、(ii)條"), ["40(2A)(a)(i)", "40(2A)(a)(ii)"]);
  assert.deepEqual(marks("《建築物條例》第40(1AA)條"), ["40(1AA)"]);
  assert.deepEqual(
    marks("《建築物條例》第30D(2)、(3)、(7)、(9)及(10)條"),
    ["30D(2)", "30D(3)", "30D(7)", "30D(9)", "30D(10)"],
  );
});

test("a bare section is not invented as a subsection, and 26A is not under 26", () => {
  const bare = provisionsFromLabel("《建築物條例》第30B條");
  assert.equal(bare.length, 1);
  assert.deepEqual(bare[0].path, []);
  assert.ok(!marks("《建築物條例》第26A條").some((item) => item.startsWith("26(")));
});

test("sorts in statutory order, not alphabetically", () => {
  const paths = ["10", "2", "1AA", "1", "1B", "1A", "1BC", "13", "2B", "2AF", "2A", "2AE", "2AA"].map(
    (token) => [token],
  );
  const sorted = [...paths].sort(compareProvisionPaths).map((path) => path[0]);
  assert.deepEqual(sorted, ["1", "1A", "1AA", "1B", "1BC", "2", "2A", "2AA", "2AE", "2AF", "2B", "10", "13"]);
  assert.ok(compareProvisionPaths(["1"], ["1", "a"]) < 0);
  assert.ok(compareProvisionPaths(["1", "a"], ["1", "aa"]) < 0);
  assert.ok(compareProvisionPaths(["1", "aa"], ["1", "b"]) < 0);
  assert.ok(compareProvisionPaths(["2A", "a", "i"], ["2A", "a", "ii"]) < 0);
  assert.ok(compareProvisionPaths(["2A", "a", "iv"], ["2A", "a", "ix"]) < 0);
  assert.ok(compareProvisionPaths(["2A", "a", "ix"], ["2A", "a", "x"]) < 0);
  assert.ok(compareProvisionPaths(["2A", "a", "i"], ["2B"]) < 0);
});

test("scenario answers that need both roles keep one citation list", () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
  const questions = JSON.parse(readFileSync(join(root, "data/questions.json"), "utf8")) as Array<{
    id: string;
    kind: string;
    modelAnswer: string;
    roles?: Array<{ id: string; heading: string; answer: string; why: string }>;
    legalBasis: unknown[];
  }>;
  const excluded = new Set(["q01", "q02", "q05", "q07", "q09", "q11", "q13", "q59", "q60"]);
  let existing = 0;
  let added = 0;
  for (const question of questions) {
    const number = Number(question.id.slice(1));
    const expectsRoles = question.kind === "scenario" && !excluded.has(question.id);
    if (!expectsRoles) {
      assert.equal(question.roles, undefined, question.id);
      continue;
    }
    assert.ok(question.roles, question.id);
    assert.deepEqual(
      question.roles.map((role) => role.id),
      ["officer", "citizen"],
      question.id,
    );
    assert.equal(question.roles[0].heading, "情況一：如果我係屋宇署人員");
    assert.equal(question.roles[1].heading, "情況二：如果我係普通市民");
    const [spoken, why] = question.modelAnswer.split("\n\n點解：");
    assert.equal(question.roles[0].answer, spoken, question.id);
    assert.equal(question.roles[0].why, why, question.id);
    assert.ok(question.roles[1].answer.length > 40, question.id);
    assert.ok(question.roles[1].why.length > 15, question.id);
    assert.ok(!("legalBasis" in question.roles[0]) && !("legalBasis" in question.roles[1]));
    assert.ok(question.legalBasis.length > 0);
    if (number >= 87) added += 1;
    else existing += 1;
  }
  assert.equal(existing, 54);
  assert.equal(added, 48);
});

test("every bank label yields the same parent sections from both parsers", () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
  const questions = JSON.parse(readFileSync(join(root, "data/questions.json"), "utf8")) as Array<{
    legalBasis: Array<{ label: string }>;
  }>;
  for (const question of questions) {
    for (const basis of question.legalBasis) {
      const parents = sectionsFromLabel(basis.label);
      const fromProvisions = [...new Set(provisionsFromLabel(basis.label).map((item) => item.section))];
      assert.deepEqual(fromProvisions, parents, basis.label);
    }
  }
});

test("every question has its own short takeaway", () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
  const questions = JSON.parse(readFileSync(join(root, "data/questions.json"), "utf8")) as Array<{
    id: string;
    keyPoint?: string;
  }>;
  const seen = new Set<string>();

  for (const question of questions) {
    const keyPoint = question.keyPoint?.trim();
    assert.ok(keyPoint && !keyPoint.includes("\n"), question.id);
    assert.ok(!seen.has(keyPoint), question.id);
    seen.add(keyPoint);
  }
});

test("each bank question has timelines for its answer roles", () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
  const readData = (name: string) => JSON.parse(readFileSync(join(root, "data", name), "utf8"));
  const questions = readData("questions.json") as {
    id: string;
    roles?: { id: string }[];
  }[];
  type Step = { label: string; text: string };
  const timelines = readData("answer-timelines.json") as Record<string, {
    kind: string;
    steps: Step[];
    citizenSteps?: Step[];
  }>;

  assert.deepEqual(Object.keys(timelines).sort(), questions.map(({ id }) => id).sort());

  for (const { id, roles } of questions) {
    const { kind, steps, citizenSteps } = timelines[id];
    assert.ok(kind === "sequence" || kind === "explanation", id);
    assert.equal(Boolean(citizenSteps), Boolean(roles?.some((role) => role.id === "citizen")), id);

    for (const track of citizenSteps ? [steps, citizenSteps] : [steps]) {
      assert.ok(track.length >= 2, id);
      assert.equal(new Set(track.map(({ label }) => label)).size, track.length, id);
      assert.ok(track.every(({ label, text }) => label.trim() && text.trim()), id);
    }
  }
});
