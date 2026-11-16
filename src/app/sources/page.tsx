import type { Metadata } from "next";
import { questions } from "@/lib/bank";

export const metadata: Metadata = {
  title: "出處",
};

export default function SourcesPage() {
  const seen = new Set<string>();
  const items = questions.flatMap((question) =>
    question.legalBasis.filter((basis) => {
      const key = `${basis.label}|${basis.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }),
  );

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">出處與核對範圍</h1>
        <p className="leading-7 text-muted-foreground">
          題目在 2026 年 11 月 16 日整理。職位條款來自公務員事務局職位查詢系統的繁體中文廣告。條號只引用當日已對過標題及要點的條文；沒有對過的條號不會寫進示範答案。
        </p>
      </header>
      <section className="space-y-3 leading-7">
        <h2 className="text-lg font-semibold">版本</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            《建築物條例》（第123章）取自律政司現行法例開放數據，版本日期 2026 年 3 月 1 日。
          </li>
          <li>
            《建築物(管理)規例》（第123A章）同一來源，版本日期 2024 年 6 月 30 日。
          </li>
          <li>
            強制驗樓的條號，包括第30B、30C、30D、30E、33及40(1BC)條，取自上述第123章文本。署方網頁上的「一般期限」、三層住用樓宇除外，以及第5級罰款的港幣表述，另註明出處，不把月數寫進第30B(7)條。
          </li>
          <li>
            <a className="underline underline-offset-4" href="/mbis">
              強制驗樓計劃專頁
            </a>
            把這些出處收成可溫習的說明。
          </li>
        </ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">題目用到的連結</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.label + item.url} className="leading-7">
              <a className="font-medium underline underline-offset-4" href={item.url}>
                {item.label}
              </a>
              <p className="text-muted-foreground">{item.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
