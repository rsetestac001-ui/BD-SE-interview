import questionsJson from "../../data/questions.json";
import topicsJson from "../../data/topics.json";
import type { Question, Topic } from "./types";

export const topics: Topic[] = [...(topicsJson as Topic[])].sort(
  (a, b) => a.order - b.order,
);

export const questions = questionsJson as Question[];

export function topicById(id: string) {
  return topics.find((topic) => topic.id === id);
}

export function countByTopic(topicId: string) {
  return questions.filter((question) => question.topicId === topicId).length;
}
