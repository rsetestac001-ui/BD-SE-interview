import affairsJson from "../../data/current-affairs.json";
import { questions } from "./bank";
import type { Question } from "./types";

export type AffairSource = {
  label: string;
  url: string;
};

export type AffairCase = {
  id: string;
  date: string;
  title: string;
  status: string;
  summary: string[];
  timeline?: { date: string; text: string }[];
  sources: AffairSource[];
  angles: string[];
  questionIds: string[];
};

export const affairCases = affairsJson.cases as AffairCase[];
export const affairsAsOf = affairsJson.asOf;

export function questionsForCase(item: AffairCase) {
  const byId = new Map(questions.map((question) => [question.id, question]));
  return item.questionIds
    .map((id) => byId.get(id))
    .filter((question): question is Question => Boolean(question));
}

export const affairQuestions = questions.filter((question) => question.topicId === "affairs");
