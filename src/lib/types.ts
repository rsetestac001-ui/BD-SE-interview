export type Topic = {
  id: string;
  order: number;
  title: string;
  blurb: string;
};

export type Basis = {
  label: string;
  note: string;
  url: string;
};

export type Choice = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  topicId: string;
  kind: "scenario" | "mcq";
  title: string;
  prompt: string;
  options?: Choice[];
  answerKey?: string;
  modelAnswer: string;
  legalBasis: Basis[];
  pitfalls: string[];
};

export type ItemState = {
  status: "seen" | "familiar" | "unfamiliar";
  bookmarked: boolean;
  draft: string;
  choice?: string;
  updatedAt: string;
};

export type Store = {
  version: 1;
  items: Record<string, ItemState>;
};
