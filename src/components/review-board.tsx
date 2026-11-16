"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStore } from "@/components/use-store";
import { questions, topicById } from "@/lib/bank";
import { emptyStore, writeStore } from "@/lib/progress";

export function ReviewBoard() {
  const { store, commit } = useStore();
  const [message, setMessage] = useState("");
  const bookmarks = questions.filter((question) => store.items[question.id]?.bookmarked);
  const unfamiliar = questions.filter(
    (question) => store.items[question.id]?.status === "unfamiliar",
  );
  const touched = questions.filter((question) => store.items[question.id]);

  function reset() {
    writeStore(emptyStore);
    commit(emptyStore);
    setMessage("這部裝置上的進度、草稿和收藏已清除。");
  }

  function exportProgress() {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bd-se-study-progress.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importProgress(file: File) {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as { version?: number; items?: unknown };
      if (parsed.version !== 1 || !parsed.items || typeof parsed.items !== "object") {
        setMessage("這個檔案不是本工具匯出的進度。");
        return;
      }
      writeStore(parsed as typeof store);
      commit(parsed as typeof store);
      setMessage("已匯入進度。它仍然只存在這部裝置。");
    } catch {
      setMessage("讀不到這個檔案。");
    }
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">收藏與進度</h1>
        <p className="max-w-2xl leading-7 text-muted-foreground">
          標記、草稿和收藏都在瀏覽器的 localStorage，不會上傳。換裝置或清除網站資料後便會消失，可以先匯出檔案。
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">仍未熟悉（{unfamiliar.length}）</h2>
        <QuestionList
          items={unfamiliar}
          empty="未有題目標成仍未熟悉。做完一題後可以這樣標記，方便返工。"
          mode="unfamiliar"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">已收藏（{bookmarks.length}）</h2>
        <QuestionList
          items={bookmarks}
          empty="未有收藏。練習時按「收藏」，題目會出現在這裏。"
          mode="bookmarks"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">做過的題（{touched.length}）</h2>
        <QuestionList
          items={touched}
          empty="尚未做過題目。"
          mode="seen"
        />
      </section>

      <section className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button type="button" variant="outline" className="h-11" onClick={exportProgress}>
          匯出進度
        </Button>
        <label className="inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-medium">
          匯入進度
          <input
            type="file"
            accept="application/json"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void importProgress(file);
              event.target.value = "";
            }}
          />
        </label>
        <Dialog>
          <DialogTrigger render={<Button variant="destructive" className="h-11" />}>
            清除本機進度
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>清除這部裝置上的溫習紀錄？</DialogTitle>
              <DialogDescription>
                草稿、收藏和掌握標記會一併刪除，不能從伺服器找回。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>返回</DialogClose>
              <Button type="button" variant="destructive" onClick={reset}>
                確認清除
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
      {message && (
        <p className="text-sm" role="status">
          {message}
        </p>
      )}
    </div>
  );
}

function QuestionList({
  items,
  empty,
  mode,
}: {
  items: typeof questions;
  empty: string;
  mode: string;
}) {
  const { store } = useStore();
  if (items.length === 0) {
    return <p className="rounded-xl bg-muted/70 p-4 text-sm leading-6 text-muted-foreground">{empty}</p>;
  }
  return (
    <ul className="divide-y overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      {items.map((question) => {
        const item = store.items[question.id];
        const topic = topicById(question.topicId);
        return (
          <li key={question.id}>
            <Link
              href={`/practice?mode=${mode}&id=${question.id}`}
              className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-muted/60"
            >
              <span>
                <span className="block font-medium">{question.title}</span>
                <span className="text-sm text-muted-foreground">{topic?.title}</span>
              </span>
              <Badge variant="outline">
                {item?.status === "familiar"
                  ? "已掌握"
                  : item?.status === "unfamiliar"
                    ? "未熟悉"
                    : "看過"}
              </Badge>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
