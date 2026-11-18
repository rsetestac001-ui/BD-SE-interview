"use client";

import Link from "next/link";
import { Bookmark, Building2, Shuffle } from "lucide-react";
import { RandomPracticeLink } from "@/components/random-practice-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/components/use-store";
import { countByTopic, questions, topics } from "@/lib/bank";
import { summarise } from "@/lib/progress";

export function HomeDashboard() {
  const { store } = useStore();
  const stats = summarise(
    store,
    questions.map((question) => question.id),
  );

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <Badge variant="outline">職位編號 50460 · 屋宇署 · 非官方</Badge>
        <h1 className="max-w-xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          面試前，先把情景說清楚。
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          這是給香港屋宇署「結構工程師（合約）」遴選面試的溫習工具。先看情景，可選寫下自己的要點，再對照示範答法、法理依據和常見陷阱。進度只存在這部裝置。
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            className="h-11"
            render={<RandomPracticeLink />}
          >
            <Shuffle />
            隨機一題
          </Button>
          <Button
            variant="outline"
            className="h-11"
            render={<Link href="/practice?mode=unfamiliar" />}
          >
            仍未熟悉（{stats.unfamiliar}）
          </Button>
          <Button
            variant="outline"
            className="h-11"
            render={<Link href="/review" />}
          >
            <Bookmark />
            收藏與進度
          </Button>
        </div>
      </section>

      <section aria-label="強制驗樓計劃">
        <div className="rounded-xl bg-primary px-5 py-5 text-primary-foreground">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="size-4" />
            職位職責 (c) · 獨立專題
          </div>
          <h2 className="mt-2 text-2xl font-semibold">強制驗樓計劃</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-primary-foreground/85">
            第30B條、樓齡30年或以上的私人樓宇、註冊檢驗人員、結構與消防安全構件、遵從通知後的十年，以及署方工程師和註冊檢驗人員的分工。驗窗只放在對照，不和驗樓混成一組。
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button
              className="h-11 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              render={<Link href="/mbis" />}
            >
              先看驗樓專頁
            </Button>
            <Button
              variant="outline"
              className="h-11 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              render={<Link href="/practice?topic=mbis" />}
            >
              開始驗樓題目（{countByTopic("mbis")}）
            </Button>
          </div>
        </div>
      </section>

      <section aria-label="法例與時事" className="grid gap-3 sm:grid-cols-2">
        <Link href="/statutes" className="block">
          <Card className="h-full transition-colors hover:bg-muted/60">
            <CardHeader>
              <CardTitle className="text-base">法例出現次數</CardTitle>
              <CardDescription className="text-sm leading-6">
                看這本題庫最常引用哪一條，再打開該條的詳情。次數不是官方面試頻率。
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/affairs" className="block">
          <Card className="h-full transition-colors hover:bg-muted/60">
            <CardHeader>
              <CardTitle className="text-base">時事與維修監管</CardTitle>
              <CardDescription className="text-sm leading-6">
                官方個案、已實施的抽查，以及尚未成為法例的改革。控罪不是定罪。
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </section>

      <section aria-label="進度" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="題庫" value={String(questions.length)} />
        <Stat label="已看過" value={String(stats.touched)} />
        <Stat label="已掌握" value={String(stats.familiar)} />
        <Stat label="仍未熟悉" value={String(stats.unfamiliar)} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">按職責揀題</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[...topics.filter((topic) => topic.id === "mbis"), ...topics.filter((topic) => topic.id !== "mbis")].map((topic) => (
            <li key={topic.id}>
              <Link href={`/practice?topic=${topic.id}`} className="block h-full">
                <Card className="h-full transition-colors hover:bg-muted/60">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-base">{topic.title}</CardTitle>
                      <Badge variant="secondary">
                        {countByTopic(topic.id)} 題
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-6">
                      {topic.blurb}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Step n="1" title="看情景" text="用面試官會問的方式讀題，不要先翻答案。" />
        <Step n="2" title="寫要點" text="可選。草稿只寫在這部裝置，用來對照你真正會說的話。" />
        <Step n="3" title="再揭示" text="看示範答法、出處和陷阱，然後自己標記掌握或未熟悉。" />
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10">
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="rounded-xl bg-muted/70 p-4">
      <div className="text-sm text-muted-foreground">第{n}步</div>
      <div className="mt-1 font-medium">{title}</div>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
