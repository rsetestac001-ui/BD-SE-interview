"use client";

import { useState } from "react";
import Link from "next/link";
import { StatuteExplainer } from "@/components/statute-explainer";

type Choice = { text: string; next: string; good: boolean; feedback: string };
type Node = { title: string; situation: string; principle: string; law: string; choices: Choice[] };
type Scenario = { name: string; description: string; start: string; nodes: Record<string, Node>; officer: string; citizen: string };
const scenarios: Scenario[] = [
  {
    name: "危險樓宇：外牆石屎剝落", description: "市民投訴外牆有石屎跌落行人路，可能有即時危險。", start: "triage",
    nodes: {
      triage: { title: "接報後，先做乜？", situation: "現場有行人經過，未知外牆有幾危險。", principle: "先處理公眾安全風險，再揀合適法定權力；定期驗樓唔等於緊急危險處理。", law: "Cap.123 第26條及第28條（按事實核對適用條件）", choices: [
        { text: "評估即時風險、安排適當現場核實及安全措施", next: "severity", good: true, feedback: "先查風險係正確起點；下一步要區分一般危險同緊急危險。" },
        { text: "等 MBIS 下次選中呢幢樓先處理", next: "delay", good: false, feedback: "MBIS 係預防性制度，唔應代替眼前墮物危險處理。" },
        { text: "未核實事實就直接當成所有情況都適用同一命令", next: "wrongpower", good: false, feedback: "法定權力有門檻；要先核實危險性質、證據同緊急程度。" }
      ] },
      severity: { title: "現場發現有墮物風險", situation: "工程人員初步評估部分構件可能繼續墮下。", principle: "危險樓宇一般程序與緊急措施嘅法定條件唔同；現場事實決定路徑。", law: "Cap.123 第26條、第28條", choices: [
        { text: "按危險程度、緊急性及法定條件選擇程序", next: "followup", good: true, feedback: "正確：同時記錄判斷理據、現場資料及採取措施。" },
        { text: "一律用第30B條 MBIS 通知處理", next: "wrongpower", good: false, feedback: "MBIS 係另一個制度，唔係所有危險樓宇個案嘅通用執法權力。" }
      ] },
      followup: { title: "業主話修好咗", situation: "業主只提供一張修葺後相片。", principle: "結案唔只係收到回覆；要有充分證據證明危險已按適用要求消除。", law: "Cap.123 危險建築物相關條文及個別通知／命令", choices: [
        { text: "核對修葺範圍、證明及有需要時覆核現場", next: "success", good: true, feedback: "證據足夠、符合法定要求，先可按程序考慮結案。" },
        { text: "單憑一張相就當完成", next: "weakproof", good: false, feedback: "照片未必涵蓋全部危險構件，亦未必足以證明合規。" }
      ] },
      delay: { title: "後果：危險仍然存在", situation: "等候定期驗樓期間，未有充分處理即時風險。", principle: "風險優先次序錯誤會延誤保障公眾安全。", law: "Cap.123 危險建築物及緊急權力", choices: [{ text: "改為即時評估風險及核實現場", next: "severity", good: true, feedback: "補救方向正確：先處理現時危險。" }] },
      wrongpower: { title: "後果：法定權力可能用錯", situation: "未核實法定門檻就套用一個制度。", principle: "面試官想聽到你會根據事實揀權力，而唔係見到關鍵字就背 Section。", law: "Cap.123 第26、28、30B條各有不同目的", choices: [{ text: "重新核實風險、證據及適用條文", next: "severity", good: true, feedback: "重新選擇有法定依據嘅程序。" }] },
      weakproof: { title: "後果：結案證據不足", situation: "若未確認危險消除，可能留下持續風險。", principle: "追求結案數字唔應凌駕公眾安全及依法履職。", law: "按相關通知／命令及法定程序核對", choices: [{ text: "補充證據並按需要現場覆核", next: "success", good: true, feedback: "完成核實後才按程序考慮結案。" }] },
      success: { title: "完成：有理據地結案", situation: "已記錄危險評估、適用法定途徑及修葺核實結果。", principle: "完整證據鏈：接報 → 評估 → 選權力 → 跟進 → 核實。", law: "Cap.123 相關條文（按個案適用）", choices: [] }
    },
    officer: "我會先核實墮物風險同現場情況，按緊急程度及 Cap.123 適用條件決定處理權力；再監察危險消除，核對文件及必要現場覆核，記錄有理據嘅結案決定。",
    citizen: "見到石屎跌落街，政府第一步係防止有人受傷，跟住查清楚邊度危險，再依法要求處理。修好之後都要核實，唔係有張相就算。"
  },
  {
    name: "僭建物 UBW：天台搭建", description: "市民投訴住宅天台疑似有未經批准搭建物。", start: "identify",
    nodes: {
      identify: { title: "見到天台搭建物，第一步？", situation: "只有市民相片，未知有冇批准圖則或適用豁免。", principle: "唔可以見到搭建物就直接斷言違法；先查法定定義、批准紀錄及豁免。", law: "Cap.123 第14條、第24條；小型工程制度須另核對", choices: [
        { text: "核實批准紀錄、工程性質、適用豁免及風險", next: "evidence", good: true, feedback: "先確立事實及法律地位，先可以判斷是否 UBW。" },
        { text: "單憑相片立即定性為所有情況都違法", next: "premature", good: false, feedback: "缺少圖則、工程分類及豁免核對，結論過早。" }
      ] },
      evidence: { title: "初步資料顯示可能屬 UBW", situation: "搭建物未見相應批准紀錄，亦可能影響安全。", principle: "要同時考慮法定執法權力、風險及個案優先次序。", law: "Cap.123 第24條（相關命令權力）；危險情況另評估", choices: [
        { text: "評估證據及風險，按第24條等適用規定考慮跟進", next: "close", good: true, feedback: "正確。唔係所有疑似 UBW 都可跳過查證同程序。" },
        { text: "只因業主話冇問題就停止調查", next: "premature", good: false, feedback: "口頭保證唔可以取代法定及安全評估。" }
      ] },
      premature: { title: "後果：執法理據不足", situation: "證據未完整，可能錯誤定性或忽略風險。", principle: "依法行政要可核實、可解釋。", law: "Cap.123 第14、24條", choices: [{ text: "補查圖則、工程分類及安全風險", next: "evidence", good: true, feedback: "重新建立證據基礎。" }] },
      close: { title: "完成：有證據地決定跟進", situation: "已核實資料並按適用權力評估後續處理。", principle: "UBW 核心唔係見到就拆，而係合法性、風險及法定程序。", law: "Cap.123 第24條等", choices: [] }
    },
    officer: "我會先查核工程批准紀錄、是否受豁免或小型工程制度涵蓋，並評估結構及公眾安全風險；如屬違例建築工程，再根據第24條等適用權力及執法政策跟進。",
    citizen: "天台有搭建物唔代表一定犯法，要先查有冇批過、有冇符合豁免規定。如果真係違規，政府會按危險程度同法律程序跟進。"
  },
  {
    name: "MBIS／MWIS：收到通知但未做", description: "業主表示『樓齡夠就一定要驗？我未有錢請人』。", start: "notice",
    nodes: {
      notice: { title: "首先核對乜？", situation: "未知業主收到 MBIS 定 MWIS 法定通知。", principle: "樓齡門檻同收到法定通知係兩回事；MBIS 同 MWIS 涉及唔同人員及範圍。", law: "Cap.123 第30B、30C條", choices: [
        { text: "先查通知、樓宇／窗戶範圍、期限及責任人", next: "appoint", good: true, feedback: "正確。法定義務要按實際通知及適用條款核對。" },
        { text: "只睇樓齡就當已經逾期", next: "mixup", good: false, feedback: "樓齡係制度門檻之一，唔等於已收到通知或已逾期。" }
      ] },
      appoint: { title: "業主要搵邊類人？", situation: "確認已收到通知，業主問應委任誰。", principle: "驗樓與驗窗資格要求唔同。", law: "Cap.123 第30B、30C、30D條及 Cap.123P", choices: [
        { text: "MBIS 搵 RI；MWIS 搵符合規定嘅 QP", next: "comply", good: true, feedback: "正確。之後按通知及規例安排檢驗、必要維修及文件提交。" },
        { text: "任何裝修師傅都可簽法定檢驗報告", next: "mixup", good: false, feedback: "法定檢驗資格有明確規定。" }
      ] },
      comply: { title: "限期將到，但仍未完成", situation: "業主說正聯絡合資格人士，未有足夠文件。", principle: "要核對通知指定期限、已履行部分及適用跟進機制。", law: "Cap.123 第30B、30C條及相關規例", choices: [
        { text: "核實實際進度、原因及法定要求，按證據跟進", next: "finish", good: true, feedback: "正確。唔應只因口頭承諾就當完成。" },
        { text: "直接當法定通知自動失效", next: "mixup", good: false, feedback: "過期唔等於法定通知自動消失。" }
      ] },
      mixup: { title: "後果：混淆法定責任", situation: "可能錯誤告知業主，亦會影響監管決定。", principle: "分清樓齡、通知、資格、期限、檢驗及修葺。", law: "Cap.123 第30B、30C條", choices: [{ text: "重新核對通知及適用規定", next: "appoint", good: true, feedback: "按制度逐項確認。" }] },
      finish: { title: "完成：依法跟進遵從", situation: "已掌握通知、委任、期限及提交紀錄。", principle: "法定檢驗制度係預防性監管，而非單純交一份報告。", law: "Cap.123 第30B、30C條", choices: [] }
    },
    officer: "我會先確認係第30B定第30C條通知、適用範圍、送達及期限，再核對 RI 或 QP 委任、檢驗與維修文件。若未遵從，會按個案風險及法定權力跟進。",
    citizen: "樓舊唔代表今日就自動要驗；要睇政府有冇正式通知。收到信就按期限搵合資格人士檢查，有問題就修，唔好等過期先理。"
  }
];

export default function DecisionTreePage() {
  const [scenario, setScenario] = useState(0);
  const [nodeId, setNodeId] = useState(scenarios[0].start);
  const [history, setHistory] = useState<string[]>([]);
  const [last, setLast] = useState<Choice | null>(null);
  const [role, setRole] = useState<"officer" | "citizen">("officer");
  const [errors, setErrors] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const active = scenarios[scenario];
  const node = active.nodes[nodeId];
  function switchScenario(index: number) { setScenario(index); setNodeId(scenarios[index].start); setHistory([]); setLast(null); setErrors(0); setCorrect(0); setAttempts(0); }
  function choose(option: Choice) { setHistory(h => [...h, nodeId]); setNodeId(option.next); setLast(option); setAttempts(n => n + 1); if (option.good) setCorrect(n => n + 1); else setErrors(n => n + 1); }
  function back() { const prev = history[history.length - 1]; if (!prev) return; setNodeId(prev); setHistory(h => h.slice(0, -1)); setLast(null); }
  return (
    <article className="mx-auto max-w-3xl space-y-5">
      <header className="space-y-2"><p className="text-sm text-muted-foreground">BD Interview · 分支決策練習</p><h1 className="text-3xl font-semibold">執法決策樹</h1><p className="leading-7 text-muted-foreground">揀錯會進入「後果」分支，再學點補救。目標唔係背 Section，而係識判斷風險、證據、權力同程序。</p><Link className="text-sm underline underline-offset-4" href="/case-simulator">← 返回 Case Simulator</Link></header>
      <div className="grid gap-2 sm:grid-cols-3">{scenarios.map((s, i) => <button key={s.name} onClick={() => switchScenario(i)} aria-pressed={i === scenario} className={`rounded-xl border p-3 text-left text-sm ${i === scenario ? "border-primary bg-primary/10 font-semibold" : "hover:bg-muted"}`}>{s.name}</button>)}</div>
      <section className="rounded-xl border bg-card p-4 sm:p-6">
        <p className="text-sm text-muted-foreground">{active.description}</p>
        <div className="my-4 flex items-center justify-between text-xs text-muted-foreground"><span>已走 {history.length} 步</span><span>正確 {correct}/{attempts} · 錯誤分支 {errors} 次</span></div>
        <h2 className="text-xl font-semibold">{node.title}</h2><p className="my-3 leading-7">{node.situation}</p>
        <div className="space-y-2">{node.choices.map((choice, i) => <button key={i} onClick={() => choose(choice)} className="w-full rounded-xl border p-3 text-left leading-7 hover:bg-muted"><span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span>{choice.text}</button>)}</div>
        {node.choices.length === 0 && <div className="rounded-xl bg-muted p-4"><strong>✓ 本個案完成</strong><p className="mt-2 text-sm">決策準確率：{attempts ? Math.round(correct / attempts * 100) : 0}%（{correct}/{attempts}）。曾走入 {errors} 次錯誤分支。</p><p className="mt-2 text-sm">評分只計每次選擇是否走入合理分支，唔等於真實 BD 面試評分。</p></div>}
        {last && <div className={`mt-4 rounded-xl border p-3 text-sm leading-7 ${last.good ? "border-emerald-500/40" : "border-amber-500/40"}`} role="status"><strong>{last.good ? "✓ 上一步方向正確" : "⚠ 上一步有風險"}</strong><p>{last.feedback}</p></div>}
        <div className="mt-4 rounded-xl bg-muted p-4 text-sm leading-7"><p><strong>背後原理：</strong>{node.principle}</p><p className="mt-2"><strong>相關法例線索：</strong>{node.law}</p><a className="underline underline-offset-4" href="https://www.elegislation.gov.hk/hk/cap123" target="_blank" rel="noopener noreferrer">查閱 Cap.123 官方條文 ↗</a><StatuteExplainer references={node.law} /></div>
        <div className="mt-4 flex justify-between gap-2"><button disabled={!history.length} onClick={back} className="rounded-lg border px-4 py-2 disabled:opacity-40">← 上一步</button><button onClick={() => switchScenario(scenario)} className="rounded-lg border px-4 py-2">重新開始</button></div>
      </section>
      <section className="space-y-3 rounded-xl border p-4"><h2 className="text-lg font-semibold">面試答法</h2><div className="flex gap-2"><button onClick={() => setRole("officer")} aria-pressed={role === "officer"} className={`rounded-lg border px-3 py-2 ${role === "officer" ? "bg-primary text-primary-foreground" : ""}`}>BD Officer</button><button onClick={() => setRole("citizen")} aria-pressed={role === "citizen"} className={`rounded-lg border px-3 py-2 ${role === "citizen" ? "bg-primary text-primary-foreground" : ""}`}>普通市民</button></div><p className="rounded-lg bg-muted p-4 leading-8">{role === "officer" ? active.officer : active.citizen}</p></section>
      <p className="text-xs leading-6 text-muted-foreground">教學情境並非真實執法決定或法律意見；實際個案須按現行 Cap.123、相關附屬法例、BD 指引及具體事實核對。</p>
    </article>
  );
}
