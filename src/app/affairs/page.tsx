import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { RevealAnswer } from "@/components/reveal-answer";
import { affairCases, affairQuestions, affairsAsOf, questionsForCase } from "@/lib/affairs";

export const metadata: Metadata = {
  title: "時事",
  description:
    "樓宇維修和樓宇安全的官方個案溫習。控罪不是定罪，修例建議不是現行法例。",
};

export default function AffairsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-3">
        <Badge variant="outline">私人溫習 · 不是官方紀錄</Badge>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          時事
        </h1>
        <p className="leading-8 text-muted-foreground">
          這頁整理樓宇維修和樓宇安全的官方個案，供面試練習。它不是政府網站，也不代替法庭紀錄。控罪、拘捕和調查簡報都是指控或官方表述，不是定罪。死傷數字只轉述有日期的公報。已實施的作業備考、仍在討論的修例建議，和現行條文分開寫。資料核對至 {affairsAsOf}。
        </p>
        <p className="leading-8">
          <Link href="/practice?topic=affairs" className="underline underline-offset-4">
            在練習頁做這組 {affairQuestions.length} 題
          </Link>
        </p>
      </header>

      <div className="space-y-8">
        {affairCases.map((item) => {
          const linked = questionsForCase(item);
          return (
            <section key={item.id} id={item.id} className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{item.date}</Badge>
                  <Badge variant="outline">{item.status}</Badge>
                </div>
                <h2 className="text-2xl font-semibold">{item.title}</h2>
              </div>
              {item.summary.map((paragraph) => (
                <p key={paragraph} className="leading-8">
                  {paragraph}
                </p>
              ))}
              {item.timeline && (
                <ol className="space-y-3">
                  {item.timeline.map((entry) => (
                    <li key={entry.date} className="rounded-xl bg-muted/70 px-4 py-3">
                      <div className="text-sm font-medium tabular-nums">{entry.date}</div>
                      <p className="mt-1 leading-7">{entry.text}</p>
                    </li>
                  ))}
                </ol>
              )}
              <div>
                <h3 className="font-semibold">面試時可以怎樣用</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
                  {item.angles.map((angle) => (
                    <li key={angle}>{angle}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">官方連結</h3>
                <ul className="mt-2 space-y-2 leading-7">
                  {item.sources.map((source) => (
                    <li key={source.url}>
                      <a className="underline underline-offset-4" href={source.url}>
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {linked.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  相關題目：
                  {linked.map((question, index) => (
                    <span key={question.id}>
                      {index > 0 ? "、" : " "}
                      <a href={`#q-${question.id}`} className="underline underline-offset-4">
                        {question.title}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </section>
          );
        })}
      </div>

      <section id="questions" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold">面試題</h2>
        <p className="leading-8 text-muted-foreground">
          先自己講，再揭示示範答法。這些題也在題庫的「時事與維修監管」，可以用練習頁的進度標記。
        </p>
        <ol className="space-y-4">
          {affairQuestions.map((question, index) => (
            <li
              key={question.id}
              id={`q-${question.id}`}
              className="scroll-mt-24 space-y-3 rounded-xl bg-card p-5 ring-1 ring-foreground/10"
            >
              <div className="text-sm text-muted-foreground">
                第{index + 1}題 · {question.kind === "mcq" ? "選擇題" : "情景題"} · {question.id}
              </div>
              <h3 className="text-lg font-semibold">{question.title}</h3>
              <p className="leading-8">{question.prompt}</p>
              {question.options && (
                <ul className="space-y-2">
                  {question.options.map((option) => (
                    <li key={option.id} className="rounded-lg bg-muted/70 px-3 py-2 leading-7">
                      <span className="font-medium">{option.id}. </span>
                      {option.text}
                    </li>
                  ))}
                </ul>
              )}
              <RevealAnswer question={question} />
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
