"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SpokenAnswer } from "@/components/spoken-answer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/components/use-store";
import type { Question, Topic } from "@/lib/types";
import { readStore, updateItem } from "@/lib/progress";

type Props = {
  questions: Question[];
  topics: Topic[];
  initialTopic?: string;
  initialMode?: string;
  initialId?: string;
};

export function PracticeSession({
  questions,
  topics,
  initialTopic,
  initialMode,
  initialId,
}: Props) {
  const { store, commit } = useStore();
  const signature = `${initialMode ?? ""}|${initialTopic ?? ""}|${initialId ?? ""}`;
  const [queue, setQueue] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const next = buildQueue(questions, readStore(), {
      topic: initialTopic,
      mode: initialMode,
      id: initialId,
      signature,
    });
    const found = initialId ? next.findIndex((item) => item.id === initialId) : 0;
    /* eslint-disable react-hooks/set-state-in-effect -- session order is stored in the browser */
    setQueue(next);
    setIndex(found < 0 ? 0 : found);
    setRevealed(false);
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [questions, initialTopic, initialMode, initialId, signature]);

  const question = queue[index];
  const saved = question ? store.items[question.id] : undefined;
  const [draft, setDraft] = useState("");
  const [choice, setChoice] = useState("");

  useEffect(() => {
    if (!question) return;
    const item = readStore().items[question.id];
    /* eslint-disable react-hooks/set-state-in-effect -- restore this question's saved draft */
    setDraft(item?.draft ?? "");
    setChoice(item?.choice ?? "");
    setRevealed(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [question]);

  if (!loaded) {
    return (
      <p className="text-sm text-muted-foreground" aria-live="polite">
        正在讀取這部裝置上的進度…
      </p>
    );
  }

  if (!question) {
    return <EmptyQueue mode={initialMode} topic={initialTopic} />;
  }

  const topic = topics.find((item) => item.id === question.topicId);
  const correct = question.kind === "mcq" && choice && choice === question.answerKey;

  function persist(patch: Parameters<typeof updateItem>[2]) {
    commit(updateItem(store, question.id, patch));
  }

  function reveal() {
    setRevealed(true);
    const status = saved?.status === "familiar" || saved?.status === "unfamiliar"
      ? saved.status
      : "seen";
    persist({ draft, choice, status, bookmarked: saved?.bookmarked ?? false });
  }

  function go(nextIndex: number) {
    setIndex(nextIndex);
    setRevealed(false);
    const next = queue[nextIndex];
    if (!next) return;
    const params = new URLSearchParams();
    if (initialMode) params.set("mode", initialMode);
    if (initialTopic) params.set("topic", initialTopic);
    params.set("id", next.id);
    window.history.replaceState(null, "", `/practice?${params.toString()}`);
  }

  return (
    <article className="mx-auto max-w-2xl space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{topic?.title ?? "題目"}</Badge>
        <Badge variant="outline">{question.kind === "mcq" ? "選擇題" : "情景題"}</Badge>
        <span className="text-sm text-muted-foreground">
          {index + 1} / {queue.length}
        </span>
        {saved?.status === "familiar" && <Badge>上次：已掌握</Badge>}
        {saved?.status === "unfamiliar" && <Badge variant="destructive">上次：仍未熟悉</Badge>}
      </div>

      <header className="space-y-3">
        <h1 className="text-2xl leading-snug font-semibold">{question.title}</h1>
        <p className="text-base leading-8 whitespace-pre-wrap">{question.prompt}</p>
        {question.topicId === "mbis" && (
          <p className="text-sm leading-6 text-muted-foreground">
            <Link href="/mbis" className="font-medium text-foreground underline underline-offset-4">
              強制驗樓計劃專頁
            </Link>
            。先整理條文和範圍，再對這題的示範答法。
          </p>
        )}
      </header>

      {question.kind === "mcq" && question.options && (
        <fieldset className="space-y-2" disabled={revealed}>
          <legend className="sr-only">選項</legend>
          {question.options.map((option) => {
            const selected = choice === option.id;
            const showCorrect = revealed && option.id === question.answerKey;
            const showWrong = revealed && selected && option.id !== question.answerKey;
            return (
              <label
                key={option.id}
                className={`flex cursor-pointer gap-3 rounded-xl px-3 py-3 ring-1 ring-foreground/10 ${
                  showCorrect
                    ? "bg-primary/15"
                    : showWrong
                      ? "bg-destructive/10"
                      : selected
                        ? "bg-muted"
                        : "bg-card"
                }`}
              >
                <input
                  type="radio"
                  name={`choice-${question.id}`}
                  className="mt-1"
                  checked={selected}
                  onChange={() => {
                    setChoice(option.id);
                    persist({
                      choice: option.id,
                      draft,
                      bookmarked: saved?.bookmarked ?? false,
                      status: saved?.status ?? "seen",
                    });
                  }}
                />
                <span className="leading-7">
                  <span className="mr-2 font-medium">{option.id}.</span>
                  {option.text}
                </span>
              </label>
            );
          })}
        </fieldset>
      )}

      <div className="space-y-2">
        <label htmlFor="draft" className="text-sm font-medium">
          你的要點（可選，只存在這部裝置）
        </label>
        <Textarea
          id="draft"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() =>
            persist({
              draft,
              choice,
              bookmarked: saved?.bookmarked ?? false,
              status: saved?.status ?? "seen",
            })
          }
          placeholder="先用自己的話寫下會在面試說的三兩點。"
          className="min-h-28 text-base leading-7"
        />
      </div>

      {!revealed ? (
        <Button type="button" className="h-11 w-full sm:w-auto" onClick={reveal}>
          睇答案
        </Button>
      ) : (
        <section className="space-y-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10" aria-live="polite">
          {question.kind === "mcq" && (
            <p className="text-sm font-medium">
              {correct
                ? "答啱咗。"
                : `${choice ? "" : "你仲未揀。"}答案係 ${question.answerKey}。`}
            </p>
          )}
          <SpokenAnswer key={question.id} question={question} />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              className="h-11"
              onClick={() => persist({ status: "familiar", draft, choice, bookmarked: saved?.bookmarked ?? false })}
            >
              已掌握
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11"
              onClick={() =>
                persist({ status: "unfamiliar", draft, choice, bookmarked: saved?.bookmarked ?? false })
              }
            >
              仍未熟悉
            </Button>
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-11"
          onClick={() =>
            persist({
              bookmarked: !(saved?.bookmarked ?? false),
              draft,
              choice,
              status: saved?.status ?? "seen",
            })
          }
        >
          <Bookmark />
          {saved?.bookmarked ? "已收藏" : "收藏"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11"
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          <ChevronLeft />
          上一題
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11"
          disabled={index >= queue.length - 1}
          onClick={() => go(index + 1)}
        >
          下一題
          <ChevronRight />
        </Button>
      </div>
    </article>
  );
}

function EmptyQueue({ mode, topic }: { mode?: string; topic?: string }) {
  const title =
    mode === "bookmarks"
      ? "還沒有收藏"
      : mode === "unfamiliar"
        ? "沒有標成仍未熟悉的題"
        : topic
          ? "找不到這個題目分類"
          : "這組題目是空的";
  const text =
    mode === "bookmarks"
      ? "做題時可以收藏，之後從這裏返回。"
      : mode === "unfamiliar"
        ? "揭示答案後，把還想再看的題目標成仍未熟悉。"
        : "返回首頁揀一個職責，或改為隨機練習。";
  return (
    <div className="mx-auto max-w-lg space-y-3 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="leading-7 text-muted-foreground">{text}</p>
      <Button className="h-11" render={<Link href="/" />}>
        返回首頁
      </Button>
    </div>
  );
}

function buildQueue(
  questions: Question[],
  store: ReturnType<typeof useStore>["store"],
  input: { topic?: string; mode?: string; id?: string; signature: string },
) {
  let list = questions;
  if (input.topic) {
    list = questions.filter((question) => question.topicId === input.topic);
  } else if (input.mode === "bookmarks") {
    list = questions.filter((question) => store.items[question.id]?.bookmarked);
  } else if (input.mode === "unfamiliar") {
    list = questions.filter((question) => store.items[question.id]?.status === "unfamiliar");
  } else if (input.mode === "random") {
    list = shuffle(questions, hash(input.signature + sessionSeed()));
  } else if (input.id) {
    const found = questions.filter((question) => question.id === input.id);
    list = found.length ? found : [];
  }
  if (input.id && input.mode !== "random" && !input.topic && input.mode !== "bookmarks" && input.mode !== "unfamiliar") {
    return list;
  }
  return list;
}

function sessionSeed() {
  if (typeof window === "undefined") return "server";
  const key = "bd-se-random-seed";
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;
  const next = String(Date.now());
  window.sessionStorage.setItem(key, next);
  return next;
}

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle<T>(list: T[], seed: number) {
  const arr = [...list];
  let state = seed || 1;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    const swap = arr[i];
    arr[i] = arr[j];
    arr[j] = swap;
  }
  return arr;
}
