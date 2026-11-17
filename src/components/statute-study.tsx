import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  buildStatuteReport,
  percentLabel,
  practiceHref,
  statuteCatalogue,
  type StatuteRecord,
} from "@/lib/statutes";

type Tab = "stats" | "detail";

export function StatuteStudy({ tab, id }: { tab: Tab; id?: string }) {
  const report = buildStatuteReport();
  const selected =
    (id ? report.byId.get(id) : undefined) ??
    (tab === "detail" ? report.ordinances[0] : undefined);
  const statsHref = selected ? `/statutes?tab=stats&id=${selected.id}#statute-stats` : "/statutes?tab=stats#statute-stats";
  const detailHref = selected
    ? `/statutes?tab=detail&id=${selected.id}#statute-detail`
    : "/statutes?tab=detail#statute-detail";

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <Badge variant="outline">私人溫習 · 不是官方統計</Badge>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          法例
        </h1>
        <p className="max-w-3xl leading-8 text-muted-foreground">
          統計這本題庫的法理依據引用了哪些條文，並為每一條打開一份可溫習的詳情。次數只來自這本私人題庫，不是屋宇署面試的官方出題頻率。
        </p>
      </header>

      <div className="flex gap-2" role="tablist" aria-label="法例頁">
        <TabLink href={statsHref} current={tab === "stats"} label="統計" />
        <TabLink href={detailHref} current={tab === "detail"} label="詳情" />
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-6">
        <section
          id="statute-stats"
          role="tabpanel"
          aria-label="統計"
          className={`scroll-mt-24 space-y-6 ${tab === "detail" ? "hidden lg:block" : ""} ${
            tab === "stats" ? "lg:rounded-xl lg:bg-muted/40 lg:p-3" : ""
          }`}
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Total label="題庫" value={`${report.questionCount} 題`} />
            <Total label="已識別條文" value={`${report.statuteCount} 條`} />
            <Total label="其他出處" value={`${report.guidance.length} 項`} />
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            同一題即使重複寫同一條，只計一次。第26條和第26A條分開。款號併入所屬條文，例如第30B(13)條計入第30B條。作業備考、守則、署方網頁和職位廣告不放進法例排名。
          </p>
          <RankedList
            title="條例及規例"
            items={report.ordinances}
            selectedId={selected?.id}
            total={report.questionCount}
          />
          <RankedList
            title="作業守則、署方網頁、職位廣告及其他出處"
            items={report.guidance}
            selectedId={selected?.id}
            total={report.questionCount}
          />
          {report.vague.length > 0 && (
            <RankedList
              title="未能識別具體條文"
              items={report.vague}
              selectedId={selected?.id}
              total={report.questionCount}
            />
          )}
        </section>

        <section
          id="statute-detail"
          role="tabpanel"
          aria-label="詳情"
          className={`scroll-mt-24 ${tab === "stats" ? "hidden lg:block" : ""} ${
            tab === "detail" ? "lg:rounded-xl lg:bg-muted/40 lg:p-3" : ""
          }`}
        >
          {selected ? (
            <Detail item={selected} />
          ) : (
            <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              <h2 className="text-xl font-semibold">尚未選擇</h2>
              <p className="mt-2 leading-7 text-muted-foreground">
                在統計點一條法例或一項出處，這裡會顯示詳情。
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function TabLink({ href, current, label }: { href: string; current: boolean; label: string }) {
  return (
    <Link
      href={href}
      role="tab"
      aria-selected={current}
      className={`rounded-full px-4 py-2 text-sm font-medium ${
        current ? "bg-primary text-primary-foreground" : "bg-muted"
      }`}
    >
      {label}
    </Link>
  );
}

function Total({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/10">
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function RankedList({
  title,
  items,
  selectedId,
  total,
}: {
  title: string;
  items: StatuteRecord[];
  selectedId?: string;
  total: number;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ol className="space-y-2">
        {items.map((item) => {
          const active = item.id === selectedId;
          const width = Math.max(item.share * 100, item.count > 0 ? 2 : 0);
          return (
            <li key={item.id}>
              <Link
                href={`/statutes?tab=detail&id=${item.id}#statute-detail`}
                className={`block rounded-xl px-3 py-3 ring-1 ring-foreground/10 ${
                  active ? "bg-primary/10 ring-primary/40" : "bg-card hover:bg-muted/60"
                }`}
                aria-current={active ? "true" : undefined}
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-muted-foreground">
                    {item.rank ?? "–"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-6">
                      {item.kind === "ordinance" && item.section ? `第${item.section}條 ` : ""}
                      {item.heading}
                    </span>
                    {item.kind === "ordinance" && (
                      <span className="mt-0.5 block text-sm text-muted-foreground">{item.citation}</span>
                    )}
                    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${width}%` }}
                      />
                    </span>
                  </span>
                  <span className="shrink-0 text-right text-sm tabular-nums">
                    <span className="block font-semibold">{item.count}</span>
                    <span className="text-muted-foreground">
                      {percentLabel(item.share)} · {total}題
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Detail({ item }: { item: StatuteRecord }) {
  const note = statuteCatalogue(item.id);
  const report = buildStatuteReport();
  return (
    <article className="space-y-5 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{item.kind === "ordinance" ? "法例" : item.kind === "vague" ? "未指明條文" : "非法例出處"}</Badge>
          {item.rank && <Badge variant="outline">第{item.rank}位 · {item.count} 題</Badge>}
        </div>
        <h2 className="text-2xl font-semibold leading-snug">
          {note?.officialTitle ?? item.heading}
        </h2>
        <p className="leading-7">{item.citation}</p>
        {item.kind !== "ordinance" && (
          <p className="text-sm leading-6 text-muted-foreground">
            這一項不是條例條文排名裡的一條。它留在題庫，是因為題目用它做官方說明、作業備考或職位廣告。
          </p>
        )}
      </header>

      <div className="space-y-3 leading-8">
        <p>{note?.lead ?? item.notes[0]}</p>
        {note?.points?.map((point) => (
          <p key={point}>{point}</p>
        ))}
        {!note &&
          item.notes.slice(1).map((point) => (
            <p key={point}>{point}</p>
          ))}
      </div>

      {note?.terms && note.terms.length > 0 && (
        <section className="space-y-2">
          <h3 className="font-semibold">用詞</h3>
          <ul className="flex flex-wrap gap-2">
            {note.terms.map((term) => (
              <li key={term}>
                <Badge variant="outline">{term}</Badge>
              </li>
            ))}
          </ul>
        </section>
      )}

      {note?.relations && (
        <section className="space-y-2">
          <h3 className="font-semibold">和鄰近條文</h3>
          <p className="leading-8">{note.relations}</p>
          {note.relatedIds && note.relatedIds.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {note.relatedIds.map((relatedId) => {
                const related = report.byId.get(relatedId);
                if (!related) return null;
                return (
                  <li key={relatedId}>
                    <Link
                      href={`/statutes?tab=detail&id=${relatedId}#statute-detail`}
                      className="inline-flex rounded-full bg-muted px-3 py-1.5 text-sm"
                    >
                      {related.section ? `第${related.section}條` : related.heading}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {item.url && (
        <p className="leading-7">
          <a className="font-medium underline underline-offset-4" href={item.url}>
            官方連結
          </a>
          <span className="text-muted-foreground"> · 以該頁現行文本為準</span>
        </p>
      )}

      {item.labels.length > 0 && (
        <section className="space-y-2">
          <h3 className="font-semibold">題庫裡的寫法</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground">
            {item.labels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-2">
        <h3 className="font-semibold">引用這項的題目</h3>
        <ul className="space-y-2">
          {item.questions.map((question) => (
            <li key={question.id}>
              <Link href={practiceHref(question.id)} className="underline underline-offset-4">
                {question.title}
              </Link>
              <span className="text-muted-foreground"> · {question.id}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
