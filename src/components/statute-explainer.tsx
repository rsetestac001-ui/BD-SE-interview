"use client";

import { useState } from "react";

type Entry = { id: string; title: string; parent: string; plain: string; why: string; caution: string };
const entries: Entry[] = [
  { id: "14", title: "第14條 — 建築工程及街道工程的展開", parent: "Cap.123《建築物條例》／建築工程管制", plain: "一般而言，受規管嘅建築工程唔可以隨便開工，要先處理適用嘅批准及同意要求；但有法定豁免及小型工程等不同制度。", why: "先審查圖則及施工責任，減低不安全或違規工程風險。", caution: "不能單憑有工程就斷定一定違反第14條，須核對豁免及適用制度。" },
  { id: "24", title: "第24條 — 違例建築工程", parent: "Cap.123《建築物條例》／違例工程的執法權力", plain: "對符合條件嘅違例建築工程，建築事務監督可按法例採取命令等行動，要求處理。", why: "令未經合法程序建造、可能帶來風險嘅工程可以被糾正。", caution: "是否 UBW、應否發命令及命令內容，都要視乎證據及具體法定條件。" },
  { id: "26", title: "第26條 — 危險建築物", parent: "Cap.123《建築物條例》／危險建築物監管", plain: "當建築物狀況符合相關危險門檻，法例設有處理危險建築物嘅權力及程序。", why: "唔使等到有人受傷先要求處理危險。", caution: "實際通知或命令種類、對象及法定門檻須查閱現行原文。" },
  { id: "28", title: "第28條 — 危險建築物緊急處理相關權力", parent: "Cap.123《建築物條例》／危險建築物監管", plain: "面對緊急危險，要另外核對法例容許嘅緊急行動同程序，唔好照搬一般個案做法。", why: "有啲風險等唔到普通通知程序完成。", caution: "本頁屬學習摘要，唔構成第28條具體權力範圍嘅法律判定。" },
  { id: "30B", title: "第30B條 — 強制驗樓 MBIS", parent: "Cap.123《建築物條例》／訂明檢驗及訂明修葺制度", plain: "符合條件嘅舊樓獲發法定通知後，相關擁有人要按通知安排訂明檢驗及所需修葺。", why: "由『出事先修』變成『定期檢查、及早發現危險』。", caution: "樓齡達30年唔等於自動收到法定通知；要核對個別通知。" },
  { id: "30C", title: "第30C條 — 強制驗窗 MWIS", parent: "Cap.123《建築物條例》／訂明檢驗及訂明修葺制度", plain: "針對符合條件嘅窗戶，收到法定通知後安排合資格人士檢驗及所需修葺。", why: "窗戶鬆脫可能墮街，專門制度有助預防。", caution: "樓齡、豁免、檢驗資格及期限都要按現行規定核對。" },
  { id: "30D", title: "第30D條 — 檢驗人員及修葺責任", parent: "Cap.123《建築物條例》／訂明檢驗及訂明修葺制度", plain: "講明法定檢驗及相關修葺嘅委任、職責及部分限制，唔係任何人都可以代替合資格人士。", why: "確保檢驗同監督有清晰專業責任。", caution: "MBIS 與 MWIS 所需人士資格不同，需連同其他條文及規例閱讀。" }
];

export function StatuteExplainer({ references }: { references: string }) {
  const [active, setActive] = useState<Entry | null>(null);
  const matched = entries.filter(e => new RegExp(`(?:第|s\\.?\\s*)${e.id}(?![A-Za-z0-9])`, "i").test(references));
  return (
    <>
      <div className="mt-3 flex flex-wrap gap-2">
        {matched.map(e => <button type="button" key={e.id} onClick={() => setActive(e)}
          className="rounded-full border border-primary/30 bg-background px-3 py-1.5 text-xs text-primary hover:bg-muted">
          第{e.id}條 · 人話解釋
        </button>)}
      </div>
      {active && (
        <aside
          role="dialog"
          aria-modal="false"
          aria-label={active.title}
          className="fixed bottom-20 left-3 right-3 z-[100] max-h-[65dvh] overflow-y-auto rounded-2xl border bg-background p-4 shadow-2xl ring-1 ring-foreground/10 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[390px] sm:max-h-[72dvh] sm:p-5"
        >
          <div className="sticky top-0 -mx-1 flex items-start justify-between gap-3 bg-background pb-3">
            <h2 className="text-base font-semibold leading-6">{active.title}</h2>
            <button type="button" onClick={() => setActive(null)} aria-label="關閉法例解釋" className="shrink-0 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">✕</button>
          </div>
          <p className="text-xs text-muted-foreground">所屬架構：{active.parent}</p>
          <div className="mt-3 space-y-3 text-sm leading-7">
            <div><strong>一句人話</strong><p>{active.plain}</p></div>
            <div><strong>點解有呢條法例？</strong><p>{active.why}</p></div>
            <div><strong>面試要小心</strong><p>{active.caution}</p></div>
          </div>
          <a className="mt-4 inline-block text-sm underline underline-offset-4" href="https://www.elegislation.gov.hk/hk/cap123" target="_blank" rel="noopener noreferrer">開啟官方 Cap.123 全文 ↗</a>
        </aside>
      )}
    </>
  );
}
