"use client";

import { useState } from "react";
import Link from "next/link";

type Option = { label: string; correct: boolean; why: string };
type Step = { title: string; context: string; options: Option[]; principle: string; law: string };
type Case = { id: string; title: string; subtitle: string; steps: Step[]; officer: string; public: string };

const cases: Case[] = [
  {
    id: "falling-concrete", title: "外牆石屎剝落", subtitle: "市民報稱行人路上有石屎跌落，懷疑樓宇外牆有危險",
    steps: [
      { title: "第一步：你會點處理投訴？", context: "資料未核實，現場可能仍有墮物風險。", law: "BO 第26條及第28條（須視實際情況核對適用權力）", principle: "先辨識即時風險，保障公眾安全；唔應該未查證就當成一般定期驗樓個案。", options: [
        { label: "先安排風險評估及適當現場跟進；有即時危險則協調緊急安全措施", correct: true, why: "正確。先判斷現場危險程度，並按事實決定適當法定程序。" },
        { label: "直接等下一輪 MBIS 選樓", correct: false, why: "MBIS 係預防性計劃，唔能夠代替即時危險個案嘅處理。" },
        { label: "單憑電話投訴即發出法定命令", correct: false, why: "應先核實事實、法定門檻及適用權力；緊急情況另按法例處理。" }
      ] },
      { title: "第二步：查明有危險後點揀法定途徑？", context: "現場檢查發現部分外牆構件有墮下風險。", law: "BO 第26條（危險建築物相關權力）；第28條（緊急情況相關權力）", principle: "先分清一般危險同需要即時行動嘅緊急危險；兩者處理權力同程序可能唔同。", options: [
        { label: "按危險程度及法定條件，考慮危險樓宇通知／命令或緊急措施", correct: true, why: "正確。要以現場證據同法定條件選擇途徑，唔係機械式套用一條 Section。" },
        { label: "所有外牆問題一律用 MBIS 第30B條", correct: false, why: "第30B條係強制驗樓計劃，唔等於所有危險樓宇個案嘅唯一執法權力。" },
        { label: "只要業主口頭承諾就一定唔需要跟進", correct: false, why: "應評估風險、法定責任及完成修葺證據，唔可以只靠口頭承諾。" }
      ] },
      { title: "第三步：業主表示已經修好，點結案？", context: "業主傳來一張修葺後相片。", law: "BO 第26條及相關通知／命令條款（視個案）", principle: "行政上要有可核實證據，確認危險已妥善消除，而唔係見到相片就自動當遵從。", options: [
        { label: "核對修葺範圍、證明文件及需要時現場覆核，記錄結案理由", correct: true, why: "正確。以風險、法定要求及證據判斷是否已遵從。" },
        { label: "收到相片就即刻結案", correct: false, why: "相片未必證明全部危險範圍已處理。" },
        { label: "一定要等十年先覆查", correct: false, why: "十年限制係 MBIS 特定再發通知規則，唔係危險樓宇個案覆核時間。" }
      ] }
    ],
    officer: "我會先評估有冇即時公眾安全風險，核實現場狀況同證據，再按危險程度及 BO 適用條文決定一般法定程序或緊急措施。其後監察業主消除危險，核實修葺證明同需要時覆查，確保有充分理據結案。",
    public: "有石屎跌落街，第一件事係確保行人安全，再搵人查清楚邊度鬆脫、有幾危險。政府會按嚴重程度要求業主處理；業主話修好咗，都要有證據先可以放心。"
  },
  {
    id: "mbis-notice", title: "MBIS 業主逾期未驗樓", subtitle: "一幢已收到強制驗樓法定通知嘅大廈，限期已過",
    steps: [
      { title: "第一步：你首先核實乜？", context: "管理公司表示『已經搵緊工程師』。", law: "BO 第30B條、第30D條；Cap.123P", principle: "執法要先確認通知、送達、期限及實際遵從情況；口頭進度唔等於法定遵從。", options: [
        { label: "核對通知範圍、送達、期限、RI 委任及已交文件", correct: true, why: "正確。先掌握完整事實，再決定跟進。" },
        { label: "樓齡超過30年就直接當刑事違規", correct: false, why: "樓齡唔等於已發出及違反特定法定通知。" },
        { label: "管理公司話搵緊人就當完成", correct: false, why: "仍需核對法定期限及履行情況。" }
      ] },
      { title: "第二步：核實確實未遵從，點跟進？", context: "通知有效，已逾期，亦無提交足夠履行證據。", law: "BO 第30B(10)–(11)條及相關罰則條文", principle: "執法要公平、合比例並有證據；可用嘅法定選項須逐項核對，唔係一律同一處理。", options: [
        { label: "按個案證據、合理辯解及風險評估適當執法選項", correct: true, why: "正確。包括依法跟進不遵從及在符合法定條件下考慮由政府安排工作和追討費用。" },
        { label: "法定通知過期就自動失效", correct: false, why: "逾期唔代表通知自動取消。" },
        { label: "一律由 BD 免費代業主完成驗樓", correct: false, why: "政府代辦嘅法定費用一般可按條例追討，唔係免費服務。" }
      ] }
    ],
    officer: "我會先核實法定通知有效性、送達、指明期限、RI 委任同報告提交情況，並了解業主有否合理辯解。確認不遵從後，再按風險、證據及 BO 第30B條相關權力採取合適跟進，並保存完整執法紀錄。",
    public: "政府出咗正式驗樓通知，唔係叫你得閒先做。過咗期要查清楚原因同進度；真係唔做，政府可以按法律採取行動，部分情況仲可以安排工作再追討費用。"
  },
  {
    id: "window-risk", title: "窗戶鬆脫：MWIS 定危險個案？", subtitle: "住戶發現窗鉸嚴重鬆脫，擔心窗扇跌落街",
    steps: [
      { title: "第一步：你點分流？", context: "窗戶可能隨時跌落街，但未知有冇 MWIS 通知。", law: "BO 第30C條；危險建築物及緊急權力視情況另行核對", principle: "MWIS 係定期預防制度；即時危險唔應該等候 MWIS 通知。", options: [
        { label: "先處理即時墮窗風險，再查有冇 MWIS 通知及適用責任", correct: true, why: "正確。即時風險處理與定期驗窗責任要分開理解。" },
        { label: "未夠10年樓齡就完全唔使理", correct: false, why: "未達 MWIS 樓齡門檻唔代表窗戶危險可以忽略。" },
        { label: "所有窗戶一律歸 MBIS 第30B條", correct: false, why: "MWIS 主要由第30C條規管，亦要留意窗戶與幕牆分類。" }
      ] },
      { title: "第二步：收到 MWIS 通知後由邊個驗？", context: "業主準備委任檢驗人士。", law: "BO 第30C條及 Cap.123P", principle: "法定驗窗要由具備適當資格嘅人士進行，唔係任何裝修師傅都可簽署。", options: [
        { label: "委任符合要求嘅 Qualified Person (QP)", correct: true, why: "正確。按適用規定進行檢驗、維修及提交文件。" },
        { label: "只搵普通清潔工簽名", correct: false, why: "唔符合 QP 法定資格要求。" },
        { label: "一定要委任 RI，QP 唔可以驗", correct: false, why: "MWIS 嘅法定檢驗人員類別係 QP。" }
      ] }
    ],
    officer: "我會區分即時墮窗危險同 MWIS 法定檢驗制度。前者優先評估公眾安全及所需措施；後者則核實第30C條通知、QP 資格、檢驗維修及提交文件，避免將兩種監管機制混為一談。",
    public: "隻窗就快跌落街，唔使等政府寄驗窗信先處理，應該即刻確保安全。至於收到強制驗窗通知，就要搵合資格人士檢查，有問題要修。"
  }
];

export default function CaseSimulator() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [role, setRole] = useState<"officer" | "public">("officer");
  const current = cases[caseIndex];
  const step = current.steps[stepIndex];
  const key = current.id + ":" + stepIndex;
  const selected = answers[key];
  const completed = current.steps.every((_, i) => answers[current.id + ":" + i] !== undefined);
  const score = current.steps.filter((s, i) => {
    const choice = answers[current.id + ":" + i];
    return choice !== undefined && s.options[choice]?.correct;
  }).length;
  function chooseCase(index: number) { setCaseIndex(index); setStepIndex(0); }
  function reset() { setAnswers({}); setStepIndex(0); }

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">BD Interview · 互動訓練</p>
        <h1 className="text-3xl font-semibold">BD Officer Case Simulator</h1>
        <p className="leading-7 text-muted-foreground">唔係背條文，而係扮演 BD 個案主任：收到投訴、揀法定途徑、跟進執法、判斷幾時結案。每一步即時解釋背後原理。</p>
        <div className="flex flex-wrap gap-2">\n          <Link href="/bo-learning" className="inline-block rounded-lg border px-3 py-2 text-sm hover:bg-muted">← 返回 BO 架構地圖</Link>\n          <Link href="/decision-tree" className="inline-block rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">進階：分支決策樹 →</Link>\n        </div>
      </header>
      <div className="grid gap-2 sm:grid-cols-3" aria-label="選擇個案">
        {cases.map((item, i) => (
          <button key={item.id} onClick={() => chooseCase(i)} aria-pressed={i === caseIndex}
            className={`rounded-xl border p-3 text-left text-sm transition-colors ${i === caseIndex ? "border-primary bg-primary/10 font-semibold" : "hover:bg-muted"}`}>
            <span className="block text-xs text-muted-foreground">Case {i + 1}</span>{item.title}
          </button>
        ))}
      </div>
      <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
        <p className="text-sm text-muted-foreground">{current.subtitle}</p>
        <div className="my-4 flex items-center justify-between gap-3 text-sm">
          <span>第 {stepIndex + 1} / {current.steps.length} 步</span>
          <span>目前答啱 {score} 題</span>
        </div>
        <div className="mb-5 flex gap-1.5" aria-label="流程進度">
          {current.steps.map((_, i) => <button key={i} onClick={() => setStepIndex(i)}
            aria-label={`跳到第 ${i + 1} 步`} className={`h-2 flex-1 rounded-full ${i === stepIndex ? "bg-primary" : answers[current.id + ":" + i] !== undefined ? "bg-emerald-500" : "bg-muted"}`} />)}
        </div>
        <h2 className="text-xl font-semibold">{step.title}</h2>
        <p className="my-3 leading-7 text-muted-foreground">{step.context}</p>
        <div className="space-y-2">
          {step.options.map((option, i) => (
            <button key={i} onClick={() => setAnswers((old) => ({ ...old, [key]: i }))} aria-pressed={selected === i}
              className={`w-full rounded-xl border p-3 text-left leading-6 transition-colors ${selected === i ? "border-primary bg-primary/10" : "hover:bg-muted"}`}>
              <span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span>{option.label}
            </button>
          ))}
        </div>
        {selected !== undefined && (
          <div className="mt-5 space-y-3 rounded-xl bg-muted p-4" aria-live="polite">
            <p className="font-semibold">{step.options[selected].correct ? "✓ 判斷正確" : "需要再諗一諗"}</p>
            <p className="leading-7">{step.options[selected].why}</p>
            <p className="leading-7"><strong>背後原理：</strong>{step.principle}</p>
            <p className="text-sm"><strong>相關法例：</strong>{step.law}</p>
            <a href="https://www.elegislation.gov.hk/hk/cap123" target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">查看 Cap.123 官方原文 ↗</a>
          </div>
        )}
        <div className="mt-5 flex justify-between gap-3">
          <button disabled={stepIndex === 0} onClick={() => setStepIndex(i => i - 1)} className="rounded-lg border px-4 py-2 disabled:opacity-40">上一步</button>
          {stepIndex < current.steps.length - 1 ? (
            <button disabled={selected === undefined} onClick={() => setStepIndex(i => i + 1)} className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-40">下一步 →</button>
          ) : <button onClick={reset} className="rounded-lg border px-4 py-2">重新練習</button>}
        </div>
      </section>
      {completed && (
        <section className="rounded-xl border p-4" aria-live="polite">
          <h2 className="font-semibold">本個案完成：{score} / {current.steps.length}</h2>
          <p className="mt-2 text-sm text-muted-foreground">可以重做，或者切換其他個案練習。答錯時重點睇背後原理。</p>
        </section>
      )}
      <section className="space-y-3 rounded-xl border p-4 sm:p-6">
        <h2 className="text-lg font-semibold">面試 45 秒答法</h2>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setRole("officer")} aria-pressed={role === "officer"} className={`rounded-lg border px-3 py-2 text-sm ${role === "officer" ? "bg-primary text-primary-foreground" : ""}`}>BD Officer 版本</button>
          <button onClick={() => setRole("public")} aria-pressed={role === "public"} className={`rounded-lg border px-3 py-2 text-sm ${role === "public" ? "bg-primary text-primary-foreground" : ""}`}>普通市民版本</button>
        </div>
        <p className="rounded-lg bg-muted p-4 leading-8">{role === "officer" ? current.officer : current.public}</p>
      </section>
      <p className="text-xs leading-6 text-muted-foreground">本模擬器為教學情境，並非 BD 內部執法指引或法律意見。條文標示為學習線索；實際權力、通知形式、程序及罰則須按個案事實和現行法例核對。</p>
    </article>
  );
}
