"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Popup = { title: string; html: string };

export default function BoLearningPage() {
  const [popup, setPopup] = useState<Popup | null>(null);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.type !== "bo-learning-popup" || typeof data.title !== "string" || typeof data.html !== "string") return;
      setPopup({ title: data.title, html: data.html });
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setPopup(null);
    }
    window.addEventListener("message", onMessage);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <article className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">BO / MBIS / MWIS 互動學習地圖</h1>
          <p className="mt-2 text-sm text-muted-foreground">點擊流程，喺獨立浮動視窗睇解釋，唔會推走原本內容。</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/case-simulator" className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">開始 Case Simulator →</Link>
          <Link href="/mbis" className="rounded-lg border px-3 py-2 text-sm hover:bg-muted">詳細 MBIS 筆記 →</Link>
        </div>
      </div>
      <iframe
        title="BO MBIS MWIS 互動教學"
        src="/bo-learning-demo.html?v=popup-parent-2"
        className="h-[75vh] min-h-[620px] w-full rounded-xl border bg-white"
        loading="eager"
      />
      <p className="text-sm text-muted-foreground">教學示範只供溫習；正式個案須以現行法例、屋宇署指引及法定通知為準。</p>
      {popup && (
        <aside
          role="dialog"
          aria-modal="false"
          aria-label={popup.title}
          className="fixed bottom-[76px] left-3 right-3 z-[100] max-h-[56dvh] overflow-y-auto rounded-2xl border bg-background p-4 text-foreground shadow-2xl ring-1 ring-foreground/10 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[400px] sm:max-h-[70dvh] sm:p-5"
        >
          <div className="sticky top-0 flex items-start justify-between gap-3 bg-background pb-3">
            <h2 className="text-lg font-semibold leading-7">{popup.title}</h2>
            <button type="button" onClick={() => setPopup(null)} aria-label="關閉解釋" className="shrink-0 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">✕</button>
          </div>
          <div className="space-y-3 text-sm leading-7 [&_a]:underline [&_p]:mt-2" dangerouslySetInnerHTML={{ __html: popup.html }} />
        </aside>
      )}
    </article>
  );
}
