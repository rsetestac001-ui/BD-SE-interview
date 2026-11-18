import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BO / MBIS / MWIS 互動學習地圖",
  description: "以互動流程圖、條文解釋及面試練習快速掌握香港建築物條例及強制驗樓驗窗計劃。",
};

export default function BoLearningPage() {
  return (
    <article className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">BO / MBIS / MWIS 互動學習地圖</h1>
          <p className="mt-2 text-sm text-muted-foreground">點擊流程、理解背後原理，再用情境題練習。</p>
        </div>
        <div className="flex flex-wrap gap-2">\n          <Link href="/case-simulator" className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">開始 Case Simulator →</Link>\n          <Link href="/mbis" className="rounded-lg border px-3 py-2 text-sm hover:bg-muted">詳細 MBIS 筆記 →</Link>\n        </div>
      </div>
      <iframe
        title="BO MBIS MWIS 互動教學"
        src="/bo-learning-demo.html"
        className="h-[75vh] min-h-[620px] w-full rounded-xl border bg-white"
        loading="eager"
      />
      <p className="text-sm text-muted-foreground">教學示範只供溫習；正式個案須以現行法例、屋宇署指引及法定通知為準。</p>
    </article>
  );
}
