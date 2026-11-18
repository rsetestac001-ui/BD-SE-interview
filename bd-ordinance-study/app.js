const page = document.querySelector("#page");
const dialog = document.querySelector("#reference-dialog");
const navigation = [...document.querySelectorAll("[data-route]")];
let current = "bo";
let selectedStep = 0;

const clauseNotes = {
  bo: {
    1: ["BO §14、§41", "§14 訂明一般工程的批准及同意關卡。§41 載有若干豁免及簡化安排的法例依據，適用時要逐項核對。"],
    2: ["BO §14、§16", "§14 訂立圖則批准及開工同意要求。§16 列出 BA 可以拒絕批准或同意的理由。"],
    3: ["BO §14、§17", "§14 講批准及同意。§17 配合條文表列項目，規定 BA 可施加哪些條件。"],
    4: ["BO §21", "控制新樓何時可以佔用。實務上要核對 OP／TOP、完工證明同修訂圖則。"],
    5: ["BO §24、§26、§26A、§30B、§30C", "違例工程、危險樓宇、勘測同強制檢驗各有法定路線。先辨認觸發點，再對應命令或通知。"]
  },
  mbis: {
    0: ["BO §30B｜強制驗樓", "賦權 BA 發通知，要求業主就指定部分安排訂明檢驗同所需修葺。"]
  },
  mwis: {
    0: ["BO §30C｜強制驗窗", "賦權 BA 發通知，要求業主就指定窗戶安排訂明檢驗同所需修葺。"],
    5: ["BO §40(1BD)｜不遵從驗窗通知", "係無合理辯解下不遵從驗窗通知嘅相關罪行條文。屋宇署表格頁另有 FPN1 定額罰款爭議表格。"]
  }
};

const drawings = {
  bo: '<path d="M23 157h163M47 157V69l42-31 44 31v88M133 157V102l28-20 24 20v55M89 38v119M47 69l42 27 44-27M133 102l28 20 24-20M161 82v75M61 102l15 10v16l-15-10zM103 112l16-10v16l-16 10zM26 177h160M28 171v12m158-12v12M30 69V157m-6-88h12m-12 88h12" />',
  mbis: '<path d="M24 157h157M42 157V44h100v113M42 76h100M42 107h100M67 44v113M115 44v113M78 157v-31h26v31M29 44h-9v113h9M20 75h8m-8 32h8M158 98l31 31" /><circle cx="139" cy="79" r="27" fill="#deeddf"/><path d="m130 79 6 6 12-14" />',
  mwis: '<rect x="30" y="30" width="140" height="129" rx="3" /><rect x="43" y="43" width="114" height="103" rx="2"/><path d="M100 43v103m0-103 45 14v75l-45 14m-57-51h57m32-9v12m-105 77h146m-143-6v12m140-12v12M65 63l-9 13m25-13-9 13" />'
};

function hero(course, route) {
  const picture = drawings[route];
  return `<section class="hero">
    <div><p class="eyebrow">${course.eyebrow}</p><h1>${course.title}</h1><p>${course.intro}</p></div>
    ${picture ? `<svg class="hero-art" viewBox="0 0 205 190" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${picture}</svg>` : ""}
  </section>`;
}

function heading(title, hint = "") {
  return `<div class="section-heading"><h2>${title}</h2>${hint ? `<p>${hint}</p>` : ""}</div>`;
}

function sources(keys, clause = null) {
  return `<div class="source-row">${keys.map(key =>
    `<button type="button" class="source-chip" data-reference="${key}"${key === "bo" && clause ? ' data-clause="true"' : ""}>${key === "bo" && clause ? clause[0] : references[key][0]} ↗</button>`
  ).join("")}</div>`;
}

function stepDetail(course, index) {
  const [label, title, explanation, principle, example, refs] = course.steps[index];
  const branch = current === "mbis" && index === 3 ? [5, 4] : current === "mwis" && index === 3 ? [4, 4] : null;
  return `<p class="eyebrow">${String(index + 1).padStart(2, "0")} / ${label}</p>
    <h3>${title}</h3><p>${explanation}</p>
    <div class="detail-grid">
      <div><div class="detail-label">背後原理</div><p>${principle}</p></div>
      <div><div class="detail-label">實務點用</div><p>${example}</p></div>
    </div>${branch ? `<div class="repair-branches" aria-label="修葺分流">
      <button type="button" class="source-chip" data-jump="${branch[0]}">毋須修葺 → 查看提交</button>
      <button type="button" class="source-chip" data-jump="${branch[1]}">${current === "mbis" ? "需要修葺 → 查看監督" : "需要修葺 → 查看修葺簽證"}</button>
    </div>` : ""}${sources(refs, clauseNotes[current]?.[index])}`;
}

function studyTable({ columns, rows, note, ref }) {
  return `<div class="table-wrap" tabindex="0" role="region" aria-label="${columns[0]}"><table>
    <thead><tr>${columns.map(column => `<th scope="col">${column}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(([label, ...cells]) => `<tr><th scope="row">${label}</th>${cells.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>${note ? `<p class="table-note">${note}</p>` : ""}${ref ? sources([ref]) : ""}`;
}

function practiceCard(item, index) {
  const [title, prompt, choices] = item;
  return `<details class="case-card"><summary>${title}</summary><div>
    <p>${prompt}</p>
    <div class="choice-set" role="group" aria-label="選擇答案">${choices.map((choice, choiceIndex) =>
      `<button class="choice" type="button" aria-pressed="false" data-case="${index}" data-choice="${choiceIndex}">${choice}</button>`
    ).join("")}</div>
    <p class="feedback" role="status"></p>
    <div class="answer" hidden></div>
  </div></details>`;
}

function renderCourse(course) {
  return `${hero(course, current)}
    <div class="metrics">${course.metrics.map(([metric, label]) => `<div class="metric"><strong>${metric}</strong><span>${label}</span></div>`).join("")}</div>
    <section aria-label="流程圖">
      ${heading(current === "bo" ? "樓宇一生點樣受規管？" : "由通知到遵從", "按步驟睇角色、判斷同文件")}
      <div class="flow" role="tablist" aria-label="流程步驟" style="--steps:${course.steps.length}">
        ${course.steps.map(([label], i) =>
          `<button class="step" id="step-${i}" type="button" role="tab" aria-selected="${i === selectedStep}" aria-controls="step-detail" tabindex="${i === selectedStep ? 0 : -1}" data-step="${i}"><span class="step-index">${String(i + 1).padStart(2, "0")}</span>${label}</button>`
        ).join("")}
      </div>
      <div class="detail" id="step-detail" role="tabpanel" tabindex="0" aria-labelledby="step-${selectedStep}">${stepDetail(course, selectedStep)}</div>
    </section>
    ${course.table ? `<section>${heading(course.table.heading)}${studyTable(course.table)}</section>` : ""}
    <section>${heading(course.extraTitle)}
      <div class="accordion">${course.extras.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("")}</div>
    </section>
    <section>${heading("情境練習", "作答後睇面試答法同市民版")}
      ${course.cases.map(practiceCard).join("")}
    </section>
    <div class="next"><a href="#${course.next[0]}">${course.next[1]} <span aria-hidden="true">→</span></a></div>`;
}

const comparison = {
  name:"驗樓／驗窗對照", eyebrow:"MBIS × MWIS", title:"驗樓／驗窗對照",
  intro:"見到一張通知，先認條號、睇範圍、對資格，再計時限。由同一幢樓嘅角度一次過比較兩套制度。"
};
function renderComparison() {
  return hero(comparison, "compare") + heading("一張表對清兩套制度") + studyTable({
    columns:["比較項目","MBIS 強制驗樓","MWIS 強制驗窗"],
    rows:[
      ["法定通知","BO §30B","BO §30C"],
      ["樓齡門檻","30 年或以上","10 年或以上"],
      ["住用樓宇例外","三層或以下","三層或以下"],
      ["範圍","通知指定公用部分、外牆、伸出物或招牌等","通知指定個別處所或公用部分窗戶"],
      ["檢驗及修葺監督","RI","QP"],
      ["誰做所需修葺","具相應資格的註冊承建商","具相應資格的註冊承建商，合資格 QP 可兼任"],
      ["通常期限｜公用","5 個月委任／9 個月驗／24 個月修","9 個月內委任、驗及完成所需修葺"],
      ["通常期限｜個別","3 個月委任／6 個月驗／12 個月修","6 個月內委任、驗及完成所需修葺"],
      ["指定表格","MBI3a（毋須修葺），或 MBI3 及 MBI4（需要修葺）","WI1（同一 QP 或毋須修葺），或 WI2 及 WI3（分開委任）"],
      ["完成後再發通知","同一部分，前次通知日期起最少 10 年","同一窗戶，前次通知日期起最少 5 年"]
    ], note:"時限由法定通知日期起計。再次發同一範圍嘅通知，要先符合上一份通知已獲遵從嘅前提。"
  }) + sources(["mbisTime","mwisOverview","mbisForms","mwisForms"]) +
    '<div class="next"><a href="#bo">返到 BO 框架 <span aria-hidden="true">→</span></a></div>';
}

function setRoute(moveFocus = false) {
  const hash = location.hash.slice(1);
  current = [...Object.keys(courses), "compare"].includes(hash) ? hash : "bo";
  selectedStep = 0;
  const course = courses[current] ?? comparison;
  document.querySelector("#crumb").textContent = course.name;
  document.title = `${course.title}｜BD 面試研習室`;
  for (const link of navigation) {
    if (link.dataset.route === current) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  page.innerHTML = current === "compare" ? renderComparison() : renderCourse(course);
  if (moveFocus) {
    window.scrollTo(0, 0);
    document.querySelector("#main").focus({ preventScroll:true });
  }
}

function activateStep(index, focus = false) {
  selectedStep = index;
  const buttons = [...page.querySelectorAll("[data-step]")];
  for (const [position, button] of buttons.entries()) {
    button.setAttribute("aria-selected", String(position === index));
    button.tabIndex = position === index ? 0 : -1;
  }
  const panel = document.querySelector("#step-detail");
  panel.innerHTML = stepDetail(courses[current], index);
  panel.setAttribute("aria-labelledby", `step-${index}`);
  if (focus) buttons[index].focus();
}

function showReferences(keys, clause = null) {
  document.querySelector("#reference-title").textContent = clause?.[0] ?? "官方依據";
  document.querySelector("#reference-content").innerHTML = keys.map(key => {
    const [title, context, url] = references[key];
    return `<div class="reference-item"><h3>${title}</h3><p>${clause?.[1] ?? context}</p><a href="${url}" target="_blank" rel="noopener noreferrer">開啟官方來源 ↗</a></div>`;
  }).join("");
  dialog.showModal();
}

page.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.reference) {
    showReferences([button.dataset.reference], button.dataset.clause ? clauseNotes[current]?.[selectedStep] : null);
    return;
  }
  if (button.dataset.jump !== undefined) {
    activateStep(Number(button.dataset.jump), true);
    return;
  }
  if (button.dataset.step !== undefined) {
    activateStep(Number(button.dataset.step));
    return;
  }
  if (button.dataset.case === undefined) return;
  const [, , choices, correctIndex, officer, publicAnswer] = courses[current].cases[Number(button.dataset.case)];
  const card = button.closest(".case-card");
  for (const option of card.querySelectorAll(".choice")) option.setAttribute("aria-pressed", String(option === button));
  card.querySelector(".feedback").textContent = Number(button.dataset.choice) === correctIndex
    ? "答啱。"
    : `正確做法係「${choices[correctIndex]}」。`;
  const answer = card.querySelector(".answer");
  answer.innerHTML = `<p><strong>BD 面試答法</strong>　${officer}</p><p><strong>對市民點講</strong>　${publicAnswer}</p>`;
  answer.hidden = false;
});

page.addEventListener("keydown", event => {
  if (!event.target.matches("[data-step]")) return;
  const count = courses[current].steps.length;
  const destinations = { ArrowRight:(selectedStep + 1) % count, ArrowLeft:(selectedStep + count - 1) % count, Home:0, End:count - 1 };
  if (!Object.hasOwn(destinations, event.key)) return;
  event.preventDefault();
  activateStep(destinations[event.key], true);
});

document.querySelector("#source-button").addEventListener("click", () => {
  showReferences(courses[current]?.refs ?? ["bo","regulation","mbisTime","mwisOverview","mbisForms","mwisForms"]);
});
document.querySelector(".skip").addEventListener("click", event => {
  event.preventDefault();
  document.querySelector("#main").focus();
});
window.addEventListener("hashchange", () => setRoute(true));
setRoute();
