const page = document.querySelector("#page");
const referenceTemplate = document.querySelector("#reference-dialog").cloneNode(true);
const primaryReferenceWindow = createReferenceWindow(document.querySelector("#reference-dialog"));
const linkedReferenceWindows = new Map();
const navigation = [...document.querySelectorAll("[data-route]")];
let referenceWindowSerial = 0;
let referenceWindowLayer = 20;
let current = "bo";
let selectedStep = 0;
const favoritesStorageKey = "bd-ordinance-study:favorites:v1";
let favorites = readFavorites();
let favoritesStorageError = false;

function boText(value) {
  if (current !== "bo" && current !== "favorites") return value;
  return value
    .replace(/\bPart\s+(\d+[A-Z]*)\b/g, "第 $1 部")
    .replace(/\bSchedule\s+(\d+)\b/g, "附表 $1")
    .replace(/§\s*(\d+[A-Za-z]*(?:\([\da-zA-Z]+\))*)(?:[–-](\([\da-zA-Z]+\)))?/g,
      (_, section, end) => end ? `第 ${section} 至 ${end} 條` : `第 ${section} 條`)
    .replace(/條[–-]第/g, "條至第");
}

function readFavorites() {
  try {
    const entries = JSON.parse(localStorage.getItem(favoritesStorageKey) ?? "[]");
    return new Map(entries.filter(([key, entry]) => entry &&
      Object.hasOwn(boPlainProvisions, entry.section) &&
      typeof entry.path === "string" && key === entry.section + entry.path &&
      typeof entry.saved === "boolean" && typeof entry.note === "string"));
  } catch {
    return new Map();
  }
}

function persistFavorites() {
  try {
    localStorage.setItem(favoritesStorageKey, JSON.stringify([...favorites]));
    favoritesStorageError = false;
  } catch {
    favoritesStorageError = true;
  }
}

function favoriteLabel(section, path) {
  return boText(section + path.replace(" 至 ", "–"));
}

function favoriteTitle(section, path) {
  const headings = boProvisionHeadings[section];
  return (path ? headings?.[path.replace(" 至 ", "-")] : typeof headings === "string" && headings) ||
    boPlainProvisions[section][1];
}

function renderFavoriteButton(section, path = "") {
  const key = section + path;
  return `<button type="button" class="favorite-heart" data-favorite-key="${escapeText(key)}" data-favorite-section="${escapeText(section)}" data-favorite-path="${escapeText(path)}" aria-label="收藏 ${escapeText(favoriteLabel(section, path))}" aria-pressed="${Boolean(favorites.get(key)?.saved)}"></button>`;
}

function renderFavorites() {
  const entries = [...favorites].filter(([, entry]) => entry.saved).reverse();
  return `<section class="favorites" aria-labelledby="favorites-title">
    <h1 id="favorites-title" tabindex="-1">收藏</h1>
    <p class="favorites-intro">收藏同備註會儲喺目前呢個瀏覽器。備註會自動儲存。</p>
    <p class="favorites-status" role="status">${favoritesStorageError ? "暫時儲存唔到。重新載入前，請先複製備註。" : ""}</p>
    ${entries.length ? `<ul class="favorites-list">${entries.map(([key, { section, path, note }]) => `<li class="favorite-entry">
      <div class="favorite-entry-head">
        <div><p class="favorite-pinpoint">${escapeText(favoriteLabel(section, path))}</p>
        <h2>${escapeText(favoriteTitle(section, path))}</h2></div>
        ${renderFavoriteButton(section, path)}
      </div>
      <button type="button" class="source-chip" data-favorite-open="${escapeText(key)}" aria-haspopup="dialog">睇返條文</button>
      <label class="favorite-note">備註<textarea rows="3" data-favorite-note="${escapeText(key)}" placeholder="例如：呢款同第 17 條點樣一齊睇？">
${escapeText(note)}</textarea></label>
    </li>`).join("")}</ul>` : `<div class="favorite-entry"><p>暫時未有收藏。開任何條文，撳款項旁邊嘅愛心，就會喺呢度見到。</p><a href="#bo">去 BO 條文</a></div>`}
  </section>`;
}

function syncFavoriteHearts() {
  for (const heart of document.querySelectorAll("[data-favorite-key]")) {
    heart.setAttribute("aria-pressed", String(Boolean(favorites.get(heart.dataset.favoriteKey)?.saved)));
  }
}

const clauseNotes = {
  bo: {
    0: ["BO §2、§38", "§2 係法例嘅字典。§38 係訂立 Regulations（規例）嘅權力來源之一。"],
    1: ["BO §4、§9", "Part 1 入面，§4 講請邊位註冊專業人士同佢有咩責任。§9 講點委任 Registered Contractor（註冊承建商）同佢要負責咩。"],
    2: ["BO §14、§14AA、§41", "Part 2 嘅 §14 講一般工程點攞批圖同開工同意，§14AA 講按簡化規定開工嘅 Minor Works（小型工程）。Part 5 嘅 §41 講邊啲情況有法定豁免。"],
    3: ["BO §14、§16、§17", "呢三條屬於 Part 2（樓宇管制）。§14 講要攞咩批准同同意，§16 講幾時可以拒絕，§17 講可以加咩條件。"],
    4: ["BO §21、§25", "§21 講新樓幾時可以用，一般要先攞 Occupation Permit (OP，入伙紙) 或 Temporary Occupation Permit (TOP，臨時入伙紙)。§25 講用途有重大改變時要跟嘅要求。"],
    5: ["BO §24、§26、§26A、§40", "§24 處理違建。有危險樓宇或要調查樓宇狀況，查 §26 或 §26A。§40 係 Part 4（罪行）入面列出罪行同罰則嘅條文。"],
    6: ["BO §41、§42、§44", "Part 5 嘅 §41 講法定豁免，§42 講 Building Authority（建築事務監督）嘅豁免權力。Part 6 嘅 §44 講就可上訴決定提出 Appeal（上訴）。"]
  },
  mbis: {
    0: ["BO §30B｜MBIS（強制驗樓）", "呢條畀 Building Authority (BA，建築事務監督) 發 Statutory Notice（法定通知），叫業主驗指定部分，有需要就按規定修理。"]
  },
  mwis: {
    0: ["BO §30C｜MWIS（強制驗窗）", "呢條畀 Building Authority (BA，建築事務監督) 發 Statutory Notice（法定通知），叫業主驗指定窗戶，有需要就按規定修理。"],
    5: ["BO §40(1BD)｜冇跟驗窗通知", "呢條講冇合理原因唔跟驗窗通知嘅罪行。如果想就 Fixed Penalty（定額罰款）提出爭議，可以到屋宇署表格頁搵 FPN1（爭議罰款表格）。"]
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
    <div><p class="eyebrow">${boText(course.eyebrow)}</p><h1>${course.title}</h1><p>${boText(course.intro)}</p></div>
    ${picture ? `<svg class="hero-art" viewBox="0 0 205 190" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${picture}</svg>` : ""}
  </section>`;
}

function heading(title, hint = "") {
  return `<div class="section-heading"><h2>${title}</h2>${hint ? `<p>${hint}</p>` : ""}</div>`;
}

function sources(keys, clause = null) {
  return `<div class="source-row">${keys.map(key =>
    `<button type="button" class="source-chip" data-reference="${key}"${key === "bo" && clause ? ' data-clause="true"' : ""}>${boText(key === "bo" && clause ? clause[0] : references[key][0])} ↗</button>`
  ).join("")}</div>`;
}

function stepDetail(course, index) {
  const [label, title, explanation, principle, example, refs] = course.steps[index];
  const branch = current === "mbis" && index === 3 ? [5, 4] : current === "mwis" && index === 3 ? [4, 4] : null;
  return `<p class="eyebrow">${String(index + 1).padStart(2, "0")} / ${label}</p>
    <h3>${boText(title)}</h3><p>${boText(explanation)}</p>
    <div class="detail-grid">
      <div><div class="detail-label">點解要咁做？</div><p>${boText(principle)}</p></div>
      <div><div class="detail-label">遇到呢個情況點做？</div><p>${boText(example)}</p></div>
    </div>${branch ? `<div class="repair-branches" aria-label="修理同交表">
      <button type="button" class="source-chip" data-jump="${branch[0]}">唔使整 → 睇點交表</button>
      <button type="button" class="source-chip" data-jump="${branch[1]}">${current === "mbis" ? "要整 → 睇邊個跟" : "要整 → 睇邊個簽表"}</button>
    </div>` : ""}${sources(refs, clauseNotes[current]?.[index])}`;
}

function studyTable({ columns, rows, note, ref, rowRanges }) {
  return `<div class="table-wrap" tabindex="0" role="region" aria-label="${columns[0]}"><table>
    <thead><tr>${columns.map(column => `<th scope="col">${column}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(([label, ...cells], rowIndex) => {
      const range = rowRanges?.[label.split("（")[0]];
      return `<tr><th scope="row">${boText(label)}${range ? `<span class="section-range">${range}</span>` : ""}</th>${columns.slice(1).map((_, columnIndex) => {
      const cell = cells[columnIndex];
      if (Array.isArray(cell)) {
        return `<td><div class="framework-highlights">${cell.map(clause => `<button type="button" class="source-chip" data-framework-clause="${clause}" aria-haspopup="dialog"><strong>${boText(clause)}</strong> ${boHighlights[clause][0]}</button>`).join("")}</div></td>`;
      }
      if (cell && typeof cell === "object") {
        const total = cell.groups.reduce((count, [, sections]) => count + sections.length, 0);
        return `<td><p class="section-summary">${boText(cell.summary)}</p><button type="button" class="source-chip" data-framework-row="${rowIndex}" aria-haspopup="dialog">${cell.action ?? `睇 ${total} 條`}</button></td>`;
      }
      return `<td>${boText(cell ?? "")}</td>`;
    }).join("")}</tr>`;
    }).join("")}</tbody>
  </table></div>${note ? `<p class="table-note">${note}</p>` : ""}${ref ? sources([ref]) : ""}`;
}

function practiceCard(item, index) {
  const [title, prompt, choices] = item;
  return `<details class="case-card"><summary>${boText(title)}</summary><div>
    <p>${boText(prompt)}</p>
    <div class="choice-set" role="group" aria-label="選擇答案">${choices.map((choice, choiceIndex) =>
      `<button class="choice" type="button" aria-pressed="false" data-case="${index}" data-choice="${choiceIndex}">${boText(choice)}</button>`
    ).join("")}</div>
    <p class="feedback" role="status"></p>
    <div class="answer" hidden></div>
  </div></details>`;
}

function flowClauseGroups(clauses) {
  const groups = new Map();
  for (const clause of clauses) {
    const [location] = courses.bo.framework.rows.find(([, , highlights, details]) =>
      highlights.includes(clause) || details?.groups.some(([, entries]) =>
        entries.some(([section]) => section === clause))
    );
    if (!groups.has(location)) groups.set(location, []);
    groups.get(location).push(clause);
  }
  return Array.from(groups);
}

function renderBoFlowchart() {
  const node = (key) => {
    const [title, clauses] = boFlow[key];
    const labels = flowClauseGroups(clauses).map(([location, articles]) =>
      `<small><b>${boText(location.split("（")[0])}</b> › ${articles.map(boText).join("、")}</small>`
    ).join("");
    return `<button type="button" class="bo-flow-node" data-bo-flow="${key}" aria-haspopup="dialog">
      <strong>${title}</strong>${labels}
    </button>`;
  };
  const arrow = '<span class="bo-flow-arrow" aria-hidden="true">↓</span>';
  return `<section class="bo-flowchart" aria-label="BO 框架流程圖">
    ${heading("BO 框架流程圖", "撳任何一格，睇條文重點")}
    <div class="bo-flow-board">
      <div class="bo-flow-intro">
        <p><strong>點解要查工程？</strong> 例如想拆幅牆，第一個問題係可唔可以直接開工。先搞清楚工程做啲咩，再按條例分辨要入則、可以行小型工程程序，定有法定豁免。呢個判斷先決定要唔要搵人、交咩文件同幾時開得工。</p>
        <p>搵條文時由大到細。例如 <strong>第 123 章 › 第 2 部（樓宇管制） › 第 14 條</strong>。第 1、2、2A 條係第 1 部之前嘅開頭條文。</p>
      </div>
      <div class="bo-flow-main" role="group" aria-label="由確認工程到完工">
        ${node("opening")}${arrow}
        ${node("definition")}${arrow}
        ${node("choose")}${arrow}
        <div class="bo-flow-fork" role="group" aria-label="三種開工程序">
          ${["standard", "minor", "exempt"].map(key => `<div>${node(key)}</div>`).join("")}
        </div>
        ${arrow}${node("people")}${arrow}${node("complete")}
      </div>
      <div class="bo-flow-lookup">
        <h3>工程出事或收到決定，查邊度？</h3>
        <div class="bo-flow-grid">
          ${["orders", "procedure", "offences", "appeals"].map(node).join("")}
        </div>
        <h3>遇到放寬、舊例或過渡個案</h3>
        <div class="bo-flow-grid">
          ${["modification", "transitional", "saving", "minorTransition"].map(node).join("")}
        </div>
      </div>
    </div>
  </section>`;
}

function renderCourse(course) {
  return `${hero(course, current)}
    <div class="metrics">${course.metrics.map(([metric, label]) => `<div class="metric"><strong>${boText(metric)}</strong><span>${boText(label)}</span></div>`).join("")}</div>
    ${course.framework ? `${renderBoFlowchart()}<section class="framework">${heading(course.framework.heading)}${studyTable(course.framework)}${renderProvisionIndex(course.framework)}</section>` : ""}
    <section aria-label="流程圖">
      ${heading(current === "bo" ? "由睇例到落手做" : "由收到通知到做完", "撳每一步，睇邊個做、點解要做")}
      <div class="flow" role="tablist" aria-label="流程步驟" style="--steps:${course.steps.length}">
        ${course.steps.map(([label], i) =>
          `<button class="step" id="step-${i}" type="button" role="tab" aria-selected="${i === selectedStep}" aria-controls="step-detail" tabindex="${i === selectedStep ? 0 : -1}" data-step="${i}"><span class="step-index">${String(i + 1).padStart(2, "0")}</span>${label}</button>`
        ).join("")}
      </div>
      <div class="detail" id="step-detail" role="tabpanel" tabindex="0" aria-labelledby="step-${selectedStep}">${stepDetail(course, selectedStep)}</div>
    </section>
    ${course.table ? `<section>${heading(course.table.heading)}${studyTable(course.table)}</section>` : ""}
    <section>${heading(course.extraTitle)}
      <div class="accordion">${course.extras.map(([question, answer]) => `<details><summary>${boText(question)}</summary><p>${boText(answer)}</p></details>`).join("")}</div>
    </section>
    <section>${heading("試答面試題", "揀答案之後睇面試同對市民點講")}
      ${course.cases.map(practiceCard).join("")}
    </section>
    ${course.next ? `<div class="next"><a href="#${course.next[0]}">${course.next[1]} <span aria-hidden="true">→</span></a></div>` : ""}`;
}

const comparison = {
  name:"驗樓／驗窗對照", eyebrow:"MBIS × MWIS", title:"驗樓／驗窗對照",
  intro:"同一幢樓可以收到兩張信。一張叫你驗樓，一張叫你驗窗。用下面張表對清楚每張信要搵邊個、做啲咩同幾時做完。"
};
function renderComparison() {
  return hero(comparison, "compare") + heading("一張表對清兩套制度") + studyTable({
    columns:["要睇咩","MBIS（強制驗樓）","MWIS（強制驗窗）"],
    rows:[
      ["Statutory Notice（法定通知）","BO（建築物條例）§30B","BO（建築物條例）§30C"],
      ["樓有幾舊先適用？","30 年或以上","10 年或以上"],
      ["邊類住用樓除外？","三層或以下","三層或以下"],
      ["驗邊度？","通知寫明嘅公用部分、外牆、伸出物或招牌等","通知寫明嘅單位窗或大廈公用窗"],
      ["邊個驗同睇住修？","RI（註冊檢驗人員）","QP（合資格人士）"],
      ["邊個落手整？","RC（合資格嘅註冊承建商）","RC（合資格嘅註冊承建商）。QP 有所需承建商資格可以兼做"],
      ["公用部分通常有幾耐？","5 個月搵人／9 個月驗完／24 個月整完（如需要）","9 個月內搵人、驗完同整好（如需要）"],
      ["個別處所通常有幾耐？","3 個月搵人／6 個月驗完／12 個月整完（如需要）","6 個月內搵人、驗完同整好（如需要）"],
      ["用邊張表？","MBI3a（唔使整）或 MBI3 同 MBI4（要整）","WI1（同一 QP 或唔使整）或 WI2 同 WI3（分開搵兩位 QP）"],
      ["做完後，隔幾耐先可再發？","同一部分，由上一次通知日期起最少 10 年","同一扇窗，由上一次通知日期起最少 5 年"]
    ], note:"由通知上面嘅日期開始計。要再發同一範圍嘅通知，要先跟妥上一份。"
  }) + sources(["mbisTime","mwisOverview","mbisForms","mwisForms"]) +
    '<div class="next"><a href="#bo">返到 BO 框架 <span aria-hidden="true">→</span></a></div>';
}

function setRoute(moveFocus = false) {
  primaryReferenceWindow.dialog.close();
  for (const { dialog } of linkedReferenceWindows.values()) {
    dialog.close();
    dialog.remove();
  }
  linkedReferenceWindows.clear();
  const hash = location.hash.slice(1);
  current = [...Object.keys(courses), "compare", "favorites"].includes(hash) ? hash : "bo";
  selectedStep = 0;
  const course = courses[current] ?? comparison;
  document.querySelector("#crumb").textContent = current === "favorites" ? "收藏" : course.name;
  document.title = `${current === "favorites" ? "收藏" : course.title}｜BD 面試研習室`;
  for (const link of navigation) {
    if (link.dataset.route === current) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  page.innerHTML = current === "favorites" ? renderFavorites()
    : current === "compare" ? renderComparison() : renderCourse(course);
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

function escapeText(value) {
  const entities = { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" };
  return value.replace(/[&<>"']/g, character => entities[character]);
}

function createReferenceWindow(dialog) {
  const dialogHead = dialog.querySelector(".dialog-head");
  const referenceTitle = dialog.querySelector(".dialog-title");
  const referenceContent = dialog.querySelector(".dialog-body");
  const quizButton = dialog.querySelector(".dialog-quiz-button");
  const referenceOrigin = document.createElement("div");
  referenceOrigin.className = "reference-origin";
  referenceOrigin.hidden = true;
  referenceContent.before(referenceOrigin);
  let dialogDrag;
  let quizState;
  let origin;

  function raise() {
    if (dialog.classList.contains("floating")) dialog.style.zIndex = ++referenceWindowLayer;
  }

  function positionBeside(parent) {
    const width = document.documentElement.clientWidth;
    const right = width - parent.right - 24;
    const left = parent.left - 24;
    if (Math.max(right, left) >= 320) {
      const useRight = right >= left;
      const available = useRight ? right : left;
      dialog.style.width = `min(550px, ${available}px)`;
      const childWidth = dialog.getBoundingClientRect().width;
      moveDialog(useRight ? parent.right + 12 : parent.left - childWidth - 12, parent.top);
    } else {
      dialog.style.width = "min(550px, calc(100% - 36px))";
      dialog.style.maxHeight = "min(65dvh, 620px)";
      moveDialog(parent.left + 18, parent.top + 58);
    }
  }

  function jumpToSubsection(number, scope = referenceContent) {
    const branches = [...scope.querySelectorAll("[data-provision-path]")];
    let target;
    while (number && !target) {
      target = branches.find(node => node.dataset.provisionPath === number);
      number = number.slice(0, Math.max(0, number.lastIndexOf("(")));
    }
    if (!target) return;
    target.closest(".clause-more").open = true;
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
    referenceContent.scrollTop += target.getBoundingClientRect().top - referenceContent.getBoundingClientRect().top - 10;
  }

  dialog.addEventListener("pointerdown", raise);
  dialog.addEventListener("focusin", raise);
  referenceOrigin.addEventListener("click", event => {
    if (event.target.closest("[data-reference-parent]")) {
      if (!returnToOrigin()) referenceOrigin.hidden = true;
    }
  });

  function setOrigin(next) {
    origin = next;
    referenceOrigin.hidden = !origin;
    referenceOrigin.replaceChildren();
    if (!origin) return;
    const back = document.createElement("button");
    back.type = "button";
    back.className = "source-chip";
    back.dataset.referenceParent = "";
    back.textContent = `← 返回 ${origin.label}`;
    referenceOrigin.append(back);
    if (origin.sentence) {
      const quote = document.createElement("p");
      quote.textContent = origin.sentence;
      referenceOrigin.append(quote);
    }
    keepDialogInView();
  }

  function captureOrigin(trigger) {
    const section = trigger.closest("[data-quiz-provision]")?.dataset.quizProvision ??
      trigger.closest(".occupation-guide")?.nextElementSibling?.dataset.quizProvision;
    const paragraph = trigger.closest("p, li, h4, strong");
    let sentence = "";
    if (paragraph) {
      const before = document.createRange();
      before.selectNodeContents(paragraph);
      before.setEndBefore(trigger);
      const after = document.createRange();
      after.selectNodeContents(paragraph);
      after.setStartAfter(trigger);
      const trim = text => text.replace(/\s+/g, " ").trim();
      const lead = trim(before.toString()).split(/[。！？]/).at(-1);
      const rest = trim(after.toString()).split(/(?<=[。！？])/)[0];
      sentence = `「${lead.length > 40 ? "…" + lead.slice(-40) : lead}${trigger.textContent}${rest.length > 45 ? rest.slice(0, 45) + "…" : rest}」`;
    }
    const path = trigger.closest("[data-provision-path]")?.dataset.provisionPath;
    return { controller, trigger, scrollTop: referenceContent.scrollTop,
      label: section ? boText(section + (path && /^(?:\([\dA-Za-z]+\))+$/.test(path) ? path : "")) : referenceTitle.textContent,
      sentence };
  }

  function restoreOrigin({ trigger, scrollTop }) {
    if (!dialog.open || !referenceContent.contains(trigger)) return false;
    raise();
    referenceContent.scrollTop = scrollTop;
    trigger.focus({ preventScroll: true });
    return true;
  }

  function returnToOrigin() {
    return origin?.controller.restoreOrigin(origin);
  }

  function showReferences(keys, clause = null) {
    if (dialog.open) dialog.close();
    quizButton.hidden = true;
    quizButton.setAttribute("aria-expanded", "false");
    quizState = undefined;
    setOrigin();
    dialog.classList.remove("floating");
    dialog.style.left = "";
    dialog.style.top = "";
    referenceTitle.textContent = boText(clause?.[0] ?? "官方依據");
    referenceContent.innerHTML = keys.map(key => {
      const [title, context, url] = references[key];
      return `<div class="reference-item"><h3>${boText(title)}</h3><p>${boText(clause?.[1] ?? context)}</p><a href="${url}" target="_blank" rel="noopener noreferrer">開啟官方來源 ↗</a></div>`;
    }).join("");
    dialog.showModal();
  }

  function showFrameworkDialog(title, content, ref = "bo", parent) {
    if (dialog.open && !dialog.classList.contains("floating")) dialog.close();
    if (!dialog.open) {
      dialog.style.left = "";
      dialog.style.top = "";
    }
    dialog.classList.add("floating");
    referenceTitle.textContent = boText(title);
    setOrigin();
    referenceContent.innerHTML = content +
      `<div class="source-row"><a href="${references[ref][2]}" target="_blank" rel="noopener noreferrer">睇 Cap. 123 官方條文 ↗</a></div>`;
    const keys = [...new Set([...referenceContent.querySelectorAll("[data-quiz-provision]")].map(node => node.dataset.quizProvision))];
    quizState = undefined;
    quizButton.hidden = keys.length === 0;
    quizButton.setAttribute("aria-expanded", "false");
    if (keys.length) {
      const panel = document.createElement("section");
      panel.id = quizButton.getAttribute("aria-controls");
      panel.className = "reference-quiz";
      panel.hidden = true;
      panel.setAttribute("aria-label", "條文小測試");
      referenceContent.prepend(panel);
      quizState = { panel, keys, key: keys[0] };
      startProvisionQuiz();
    }
    if (!dialog.open) dialog.show();
    if (parent) positionBeside(parent.dialog.getBoundingClientRect());
    raise();
    referenceContent.scrollTop = 0;
    keepDialogInView();
  }

  function moveDialog(left, top) {
    const { width, height } = dialog.getBoundingClientRect();
    const viewport = document.documentElement;
    const clamp = (value, limit) => Math.max(8, Math.min(value, limit - 8));
    dialog.style.left = `${clamp(left, viewport.clientWidth - width)}px`;
    dialog.style.top = `${clamp(top, viewport.clientHeight - height)}px`;
  }

  function keepDialogInView() {
    if (!dialog.open || !dialog.classList.contains("floating") || !dialog.style.left) return;
    const { left, top } = dialog.getBoundingClientRect();
    moveDialog(left, top);
  }

  dialogHead.addEventListener("pointerdown", event => {
    if (!dialog.classList.contains("floating") || !event.isPrimary || event.button !== 0 || event.target.closest("button")) return;
    const { left, top } = dialog.getBoundingClientRect();
    dialogDrag = { id: event.pointerId, x: event.clientX - left, y: event.clientY - top };
    dialogHead.setPointerCapture(event.pointerId);
  });
  dialogHead.addEventListener("pointermove", event => {
    if (dialogDrag?.id !== event.pointerId || !dialog.open) return;
    moveDialog(event.clientX - dialogDrag.x, event.clientY - dialogDrag.y);
  });
  dialogHead.addEventListener("lostpointercapture", () => { dialogDrag = null; });
  dialog.addEventListener("keydown", event => {
    if (event.key === "Escape" && dialog.classList.contains("floating")) dialog.close();
  });
  referenceContent.addEventListener("toggle", keepDialogInView, true);


  function startProvisionQuiz() {
    quizState.index = 0;
    quizState.correct = 0;
    quizState.selected = undefined;
  }

  function renderProvisionQuiz() {
    const { panel, keys, key, index, correct, selected } = quizState;
    const questions = boQuizQuestions[key];
    const picker = keys.length > 1 ? `<label class="quiz-picker">揀條文 <select data-quiz-select>${keys.map(clause =>
      `<option value="${escapeText(clause)}"${clause === key ? " selected" : ""}>${escapeText(boText(clause))}</option>`
    ).join("")}</select></label>` : "";
    if (index >= questions.length) {
      panel.innerHTML = `${picker}<h3 tabindex="-1" data-quiz-focus>答啱 ${correct}／${questions.length} 題</h3>
        <button type="button" class="source-chip" data-quiz-action="retry">再做一次</button>`;
      return;
    }
    const [prompt, answer, wrongA, wrongB, explanation, pinpoint] = questions[index];
    if (!quizState.options) {
      quizState.options = [answer, wrongA, wrongB];
      for (let i = quizState.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizState.options[i], quizState.options[j]] = [quizState.options[j], quizState.options[i]];
      }
    }
    const complete = selected !== undefined;
    const source = `${references.bo[2]}?xpid=${encodeURIComponent(boPlainProvisions[key][3])}`;
    const display = value => escapeText(boText(value));
    panel.innerHTML = `${picker}<p class="quiz-count">第 ${index + 1}／${questions.length} 題 · ${display(key)}</p>
      <h3 tabindex="-1" data-quiz-focus>${display(prompt)}</h3>
      <div class="quiz-options">${quizState.options.map((option, i) => {
        const status = complete ? option === answer ? "right" : selected === i ? "wrong" : "" : "";
        return `<button type="button" data-quiz-option="${i}"${complete ? " disabled" : ""}${status ? ` class="${status}"` : ""}>${display(option)}${status ? `<small>${status === "right" ? "正確答案" : "你揀咗呢項"}</small>` : ""}</button>`;
      }).join("")}</div>
      ${complete ? `<div class="quiz-result" role="status" tabindex="-1" data-quiz-feedback><strong>${quizState.options[selected] === answer ? "答啱" : "答錯咗"}</strong>
      <p>${renderProvisionText(explanation)}</p><a href="${source}" target="_blank" rel="noopener noreferrer">對照 ${display(key)}${pinpoint ? ` ${display(pinpoint)}` : ""}原文 ↗</a></div>
      <button type="button" class="source-chip" data-quiz-action="next">${index + 1 === questions.length ? "睇結果" : "下一題"}</button>` : ""}`;
  }

  quizButton.addEventListener("click", () => {
    const { panel } = quizState;
    panel.hidden = !panel.hidden;
    quizButton.setAttribute("aria-expanded", String(!panel.hidden));
    if (!panel.hidden) {
      renderProvisionQuiz();
      referenceContent.scrollTop = 0;
      panel.querySelector("[data-quiz-focus]").focus({ preventScroll: true });
    }
    keepDialogInView();
  });

  referenceContent.addEventListener("change", event => {
    if (!event.target.matches("[data-quiz-select]")) return;
    quizState.key = event.target.value;
    startProvisionQuiz();
    quizState.options = undefined;
    renderProvisionQuiz();
    quizState.panel.querySelector("[data-quiz-focus]").focus();
  });

  referenceContent.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button || !quizState?.panel.contains(button)) return;
    if (button.dataset.quizOption !== undefined) {
      if (quizState.selected !== undefined) return;
      quizState.selected = Number(button.dataset.quizOption);
      if (quizState.options[quizState.selected] === boQuizQuestions[quizState.key][quizState.index][1]) quizState.correct++;
      renderProvisionQuiz();
      quizState.panel.querySelector("[data-quiz-feedback]").focus();
      keepDialogInView();
      return;
    }
    if (button.dataset.quizAction === "retry") startProvisionQuiz();
    else if (button.dataset.quizAction === "next") {
      quizState.index++;
      quizState.selected = undefined;
    } else return;
    quizState.options = undefined;
    renderProvisionQuiz();
    quizState.panel.querySelector("[data-quiz-focus]").focus();
    keepDialogInView();
  });

  referenceContent.addEventListener("click", event => {
    const cross = event.target.closest("[data-reference-clause]");
    if (cross) {
      openLinkedProvision(cross.dataset.referenceClause, controller, cross);
      return;
    }
    const jump = event.target.closest("[data-occupation-jump]");
    if (jump) jumpToSubsection(jump.dataset.occupationJump, jump.closest(".occupation-guide").parentElement);
  });

  const controller = {
    dialog, keepDialogInView, showReferences, showFrameworkDialog, jumpToSubsection,
    captureOrigin, restoreOrigin, setOrigin, returnToOrigin,
    hasProvision: clause => quizState?.keys.length === 1 && quizState.keys[0] === clause,
    focus() { raise(); referenceTitle.focus({ preventScroll: true }); }
  };
  return controller;
}

function showFrameworkDialog(title, content, ref) {
  primaryReferenceWindow.showFrameworkDialog(title, content, ref);
}

function openProvision(clause, referenceWindow = primaryReferenceWindow) {
  const [, title, english] = boPlainProvisions[clause];
  const heading = [clause, title].filter(Boolean).join("｜");
  referenceWindow.showFrameworkDialog(heading, `${english ? `<p class="bo-provision-source">${escapeText(english)}</p>` : ""}${expandClause(clause, true)}`, "bo", referenceWindow.parent);
}

function openLinkedProvision(reference, parent, trigger) {
  const [clause] = reference.match(/^§[0-9]+[A-Z]*|^Schedule [0-9]+/);
  const subsection = reference.slice(clause.length).match(/^(?:\([\dA-Za-z]+\))+/)?.[0];
  const existing = parent.hasProvision(clause) ? parent
    : primaryReferenceWindow.hasProvision(clause) && primaryReferenceWindow.dialog.open ? primaryReferenceWindow
    : linkedReferenceWindows.get(clause);
  if (existing?.dialog.open) {
    if (existing !== parent) existing.setOrigin(parent.captureOrigin(trigger));
    existing.focus();
    if (subsection) existing.jumpToSubsection(subsection);
    return;
  }
  const origin = parent.captureOrigin(trigger);
  const dialog = referenceTemplate.cloneNode(true);
  const id = `linked-reference-${++referenceWindowSerial}`;
  dialog.id = id;
  dialog.setAttribute("aria-labelledby", `${id}-title`);
  dialog.querySelector(".dialog-title").id = `${id}-title`;
  const quizButton = dialog.querySelector(".dialog-quiz-button");
  quizButton.removeAttribute("id");
  quizButton.setAttribute("aria-controls", `${id}-quiz`);
  dialog.querySelector(".dialog-body").removeAttribute("id");
  document.body.append(dialog);
  const referenceWindow = createReferenceWindow(dialog);
  referenceWindow.parent = parent;
  linkedReferenceWindows.set(clause, referenceWindow);
  dialog.addEventListener("close", () => {
    if (linkedReferenceWindows.get(clause) === referenceWindow) linkedReferenceWindows.delete(clause);
    dialog.remove();
    referenceWindow.returnToOrigin();
  });
  openProvision(clause, referenceWindow);
  referenceWindow.setOrigin(origin);
  referenceWindow.focus();
  if (subsection) referenceWindow.jumpToSubsection(subsection);
}

window.addEventListener("resize", () => {
  primaryReferenceWindow.keepDialogInView();
  for (const referenceWindow of linkedReferenceWindows.values()) referenceWindow.keepDialogInView();
});

function renderProvisionIndex(framework) {
  const groups = new Map();
  for (const [clause, provision] of Object.entries(boPlainProvisions)) {
    const [part, title] = provision;
    const group = clause.startsWith("Schedule") ? "附表" : part ? `Part ${part}` : "開頭條文";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(`<li><button type="button" class="source-chip" data-bo-provision="${escapeText(clause)}" aria-haspopup="dialog"><strong>${boText(clause)}</strong> ${escapeText(title)}</button></li>`);
  }
  return `<details class="bo-provision-index"><summary>逐款查閱全部條文</summary>
    ${Array.from(groups, ([group, buttons]) => {
      const [label] = framework.rows.find(([name]) => name.split("（")[0] === group);
      return `<details><summary>${boText(label)}</summary><ul>${buttons.join("")}</ul></details>`;
    }).join("")}</details>`;
}

const provisionEmphasis = /(?<reference>第\s*\d+[A-Z]*(?:\s*\([\dA-Za-z]+\))*\s*條|附表\s*\d+)|(?<term>\b[A-Z][A-Za-z]+(?:[ -]+[A-Za-z]+){0,8}\s*（[^（）\n]{1,24}）|\b[A-Z]{2,5}\s*（[^（）\n]{1,24}）)|(?<time>(?:\d+(?:\.\d+)?|[一二兩三四五六七八九十百]+)\s*(?:(?:個\s*)?月|日|年|星期|小時)(?:\s*(?:之?內|屆滿|期滿|前|後))?(?![\d年月日]))|(?<rule>唔可以|唔准|唔需要|不得|不准|毋須|無須|無需|必須|要先|須先|須在|須於|須由|須向|須按|須以|須將|要喺|要由|要向|要按|除非|除外|但書|例外)/gu;

function renderReferenceButton(clause, label) {
  return `<button type="button" class="reference-cross" aria-haspopup="dialog" data-reference-clause="${escapeText(clause)}">${escapeText(label)}</button>`;
}

function renderInlineReference(label, prefix) {
  // Distinguish Cap. 123 references from references to another ordinance or regulation.
  const scope = prefix.split(/[。；！？\n]/).at(-1);
  const qualifiers = [...scope.matchAll(/《([^》]+)》|(?:第\s*(\d+[A-Z]*)\s*章)|本條例|呢條例|本例|(?:上述|該|有關)條例/g)];
  const last = qualifiers.at(-1);
  const previous = qualifiers.at(-2);
  if (last && (last[2] ? last[2] !== "123" || /附屬法例|規例/.test(scope.slice(last.index)) ||
      (previous?.[1] && previous[1] !== "建築物條例") :
      last[1] ? last[1] !== "建築物條例" : !/^(?:本條例|呢條例|本例)$/.test(last[0]))) return escapeText(label);
  const reference = label.startsWith("第")
    ? "§" + label.replace(/[第條\s]/g, "")
    : "Schedule " + label.replace(/[^0-9]/g, "");
  const root = reference.split("(")[0];
  return Object.hasOwn(boPlainProvisions, root) ? renderReferenceButton(reference, label) : escapeText(label);
}

function renderProvisionText(text) {
  const value = boText(text);
  let html = "";
  let offset = 0;
  for (const match of value.matchAll(provisionEmphasis)) {
    const kind = match.groups.term ? "term" : match.groups.time ? "time" : "rule";
    html += escapeText(value.slice(offset, match.index));
    html += match.groups.reference
      ? renderInlineReference(match[0], value.slice(0, match.index))
      : `<mark class="provision-mark provision-mark--${kind}">${escapeText(match[0])}</mark>`;
    offset = match.index + match[0].length;
  }
  return html + escapeText(value.slice(offset));
}

function renderProvisionTree(entries, headings, section) {
  const root = { items: [], children: new Map() };
  for (const { label, title, text } of entries) {
    const [number, qualifier = ""] = label.split("｜");
    const [prefix] = number.match(/^(?:\([\dA-Za-z]+\))*/);
    const tail = number.slice(prefix.length).trim();
    const path = prefix.match(/\([\dA-Za-z]+\)/g) ?? [];
    let description = title || qualifier;
    if (/^-\([\dA-Za-z]+\)$/.test(tail)) {
      path[path.length - 1] += ` 至 ${tail.slice(1)}`;
    } else {
      const group = tail || (["續文", "但書"].includes(qualifier) ? "" : qualifier);
      if (group) {
        const markers = group.match(/(?:\([\dA-Za-z]+\))+$/)?.[0] ?? "";
        path.push(group.slice(0, group.length - markers.length).trim(), ...(markers.match(/\([\dA-Za-z]+\)/g) ?? []));
        if (!tail) description = title;
      }
    }
    let node = root;
    for (const number of path) {
      if (!node.children.has(number)) {
        const child = { number, items: [], children: new Map() };
        node.children.set(number, child);
        node.items.push(child);
      }
      node = node.children.get(number);
    }
    node.items.push({ text, description });
  }
  const renderItems = (items, depth, parentPath = "") => items.map(item => {
    if (!item.items) {
      return `<li class="provision-copy">${item.description ? `<strong>${renderProvisionText(item.description)}</strong>` : ""}<p>${renderProvisionText(item.text)}</p></li>`;
    }
    const isSubsection = depth === 0 && /^\(\d/.test(item.number);
    const label = isSubsection ? `第 ${item.number} 款` : item.number;
    const heading = isSubsection ? headings?.[item.number.replace(" 至 ", "-")] : "";
    const path = parentPath + item.number;
    const number = `<div class="provision-number">${escapeText(label)}</div>`;
    const caption = isSubsection ? `<div class="provision-caption">${number}${renderFavoriteButton(section, path)}</div>` : number;
    return `<li class="provision-branch" data-provision-path="${escapeText(path)}">${caption}${heading ? renderProvisionHeading(heading) : ""}<ol role="list">${renderItems(item.items, depth + 1, path)}</ol></li>`;
  }).join("");
  const introduction = typeof headings === "string"
    ? `<li class="provision-caption">${renderProvisionHeading(headings)}${renderFavoriteButton(section)}</li>` : "";
  return `<ol class="provision-tree" role="list">${introduction}${renderItems(root.items, 0)}</ol>`;
}

function renderProvisionHeading(heading) {
  return `<p class="provision-heading">${escapeText(heading)}</p>`;
}

function renderOccupationGuide() {
  return `<section class="occupation-guide" aria-label="第 21 條入伙許可速讀">
    <h3>睇懂入伙紙嘅 14 日同 60 日</h3>
    <p>先搵出 <strong>14 日從邊日起計</strong>。OP 係入伙紙，TOP 係臨時入伙紙。</p>
    <div class="occupation-paths">
      <section class="occupation-path">
        <h4>一般情況 <span>第 (7) 款</span></h4>
        <ol>
          <li>當局收到用適當指明表格交嘅 OP／TOP 申請</li>
          <li><strong>由收到申請嗰日起計 14 日</strong></li>
        </ol>
      </section>
      <section class="occupation-path">
        <h4>${renderReferenceButton("§17", "第 17 條")}要求交表現檢討 <span>第 (8) 款</span></h4>
        <ol>
          <li>當局收到所要求嘅表現檢討</li>
          <li>如果你喺之後 60 日內交 OP／TOP 申請，<strong>當作第 60 日先收到申請</strong></li>
          <li><strong>由呢個當作收到申請嘅日子起計 14 日</strong></li>
        </ol>
      </section>
    </div>
    <p class="occupation-result"><strong>14 日屆滿會點？</strong> 如果當局未向業主送達列明理由嘅書面拒絕通知，許可證就視為已批。</p>
    <p>例如當局收到表現檢討後第 20 日，你就交咗申請。要等到第 60 日，先開始計嗰 14 日。</p>
    <p class="occupation-refusal"><strong>表現檢討同拒發有咩關係？</strong> 當局可以按第 (6)(f) 段睇報告有冇交代同證明兩樣嘢：施工檢查同監測夠唔夠、岩土設計假設仲成唔成立。交代或理據不足，可以拒發。</p>
    <div class="occupation-links" aria-label="跳到相關款項">
      <button type="button" class="source-chip" data-occupation-jump="(6)">睇 (6) 拒發理由</button>
      <button type="button" class="source-chip" data-occupation-jump="(7)">睇 (7) 14 日規則</button>
      <button type="button" class="source-chip" data-occupation-jump="(8)">睇 (8) 60 日規則</button>
    </div>
  </section>`;
}

function expandClause(clause, open = false) {
  const root = clause.match(/^§\d+[A-Z]*/)?.[0] ?? clause;
  const [, , , anchor, notes] = boPlainProvisions[root];
  const selected = clause.slice(root.length);
  const range = selected.match(/^\((\d+)\)[–-]\((\d+)\)$/);
  const prefixes = range
    ? Array.from({ length: Number(range[2]) - Number(range[1]) + 1 }, (_, i) => `(${Number(range[1]) + i})`)
    : selected.split("、").map(value => value.replace(/^§\d+[A-Z]*/, ""));
  const include = label => !selected || prefixes.some(prefix => label.startsWith(prefix));
  const headings = boProvisionHeadings[root];
  const details = root === "§21"
    ? boSection21Explanations.map(([heading, text]) => {
      const [label, title] = heading.slice(root.length).split("｜");
      return {
        label: title === "續文" ? `${label}｜續文` : label,
        title: headings[label] && title !== "續文" ? "" : title,
        text
      };
    })
    : notes.map(([label, text]) => ({ label, text }));
  const source = `${references.bo[2]}?xpid=${encodeURIComponent(anchor)}`;
  const mode = root === "§21" ? "逐款白話解釋" : "逐款讀本 · 由中文原文轉成較口語嘅寫法，可對照官方原文";
  return `${clause === "§21" ? renderOccupationGuide() : ""}<details class="clause-more" data-quiz-provision="${escapeText(root)}"${open ? " open" : ""}><summary aria-label="詳細解釋 ${escapeText(boText(clause))}"><span class="expand-label">展開</span><span class="collapse-label">收起</span></summary>
    <p class="bo-provision-source">${mode} · 法例版本 ${boSourceVersion} · <a href="${source}" target="_blank" rel="noopener noreferrer">睇官方原文 ↗</a></p>
    <ul class="provision-legend" aria-label="重點標記"><li class="provision-mark--rule">要求／例外</li><li class="provision-mark--time">時間／限期</li><li class="provision-mark--term">專業詞</li></ul>
    ${renderProvisionTree(details.filter(({ label }) => include(label)), headings, root)}</details>`;
}

function renderFlowClauses(clauses) {
  return flowClauseGroups(clauses).map(([location, articles]) => {
    const rows = articles.map(clause => {
      const [label, meaning = boFlowClauseNotes[clause]] = boFlowClauseLabels[clause] ?? boHighlights[clause];
      return `<div><dt><span>${boText(clause)}</span> ${label}</dt><dd>${renderProvisionText(meaning)}${expandClause(clause)}</dd></div>`;
    }).join("");
    return `<section class="bo-flow-clause-group"><h3>${boText(location)}</h3><dl class="bo-clause-breakdown">${rows}</dl></section>`;
  }).join("");
}

function showFrameworkSections(rowIndex) {
  const details = courses[current].framework.rows[rowIndex].at(-1);
  const content = details.groups.map(([group, sections]) =>
    `<section class="reference-item"><h3>${group}</h3><dl class="section-list">${sections.map(([section, meaning]) =>
      `<dt>${boText(section)}</dt><dd>${renderProvisionText(meaning)}${expandClause(section)}</dd>`).join("")}</dl></section>`
  ).join("") + (details.note ? `<p class="table-note">${boText(details.note)}</p>` : "");
  showFrameworkDialog(details.title, content, details.ref);
}

document.addEventListener("click", event => {
  const heart = event.target.closest("[data-favorite-key]");
  if (!heart) return;
  const { favoriteKey: key, favoriteSection: section, favoritePath: path } = heart.dataset;
  favorites = readFavoritesOrKeep();
  const previous = favorites.get(key);
  const saved = !previous?.saved;
  const note = previous?.note ?? "";
  if (saved || note) favorites.set(key, { section, path, saved, note });
  else favorites.delete(key);
  persistFavorites();
  if (current === "favorites") {
    const removedFromList = page.contains(heart);
    page.innerHTML = renderFavorites();
    if (removedFromList) document.querySelector("#favorites-title").focus({ preventScroll: true });
  }
  syncFavoriteHearts();
  if (favoritesStorageError && !page.contains(heart)) heart.title = "暫時儲存唔到，收藏只會保留到離開呢頁為止";
});

function readFavoritesOrKeep() {
  return favoritesStorageError ? favorites : readFavorites();
}

page.addEventListener("input", event => {
  const key = event.target.dataset.favoriteNote;
  if (!key) return;
  favorites = readFavoritesOrKeep();
  const entry = favorites.get(key);
  if (!entry) return;
  favorites.set(key, { ...entry, note: event.target.value });
  persistFavorites();
  page.querySelector(".favorites-status").textContent = favoritesStorageError ? "備註暫時儲存唔到，離開前請先複製。" : "";
});

window.addEventListener("storage", event => {
  if (event.key !== favoritesStorageKey && event.key !== null) return;
  favorites = readFavoritesOrKeep();
  if (current === "favorites" && !document.activeElement.matches("[data-favorite-note]")) {
    page.innerHTML = renderFavorites();
  }
  syncFavoriteHearts();
});

page.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.favoriteOpen) {
    const entry = favorites.get(button.dataset.favoriteOpen);
    if (!entry) return;
    openProvision(entry.section);
    if (entry.path) primaryReferenceWindow.jumpToSubsection(entry.path);
    return;
  }
  if (button.dataset.boProvision) {
    openProvision(button.dataset.boProvision);
    return;
  }
  if (button.dataset.boFlow) {
    const [title, clauses] = boFlow[button.dataset.boFlow];
    showFrameworkDialog(title, renderFlowClauses(clauses));
    return;
  }
  if (button.dataset.frameworkClause) {
    const clause = button.dataset.frameworkClause;
    const [label, meaning] = boHighlights[clause];
    const [part] = courses.bo.framework.rows.find(([, , clauses]) => clauses.includes(clause));
    showFrameworkDialog(`${clause}｜${label}`, `<section class="reference-item"><p class="detail-label">${boText(part)}</p><p>${renderProvisionText(meaning)}</p>${expandClause(clause)}</section>`);
    return;
  }
  if (button.dataset.frameworkRow !== undefined) {
    showFrameworkSections(Number(button.dataset.frameworkRow));
    return;
  }
  if (button.dataset.reference) {
    if (current === "bo" && button.dataset.clause) {
      const [title] = clauseNotes.bo[selectedStep];
      showFrameworkDialog(title, renderFlowClauses(title.match(/§[0-9]+[A-Z]*/g)));
      return;
    }
    primaryReferenceWindow.showReferences([button.dataset.reference], button.dataset.clause ? clauseNotes[current]?.[selectedStep] : null);
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
    : `正確做法係「${boText(choices[correctIndex])}」。`;
  const answer = card.querySelector(".answer");
  answer.innerHTML = `<p><strong>BD 面試答法</strong>　${boText(officer)}</p><p><strong>對市民點講</strong>　${boText(publicAnswer)}</p>`;
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
  primaryReferenceWindow.showReferences(courses[current]?.refs ?? ["bo","regulation","mbisTime","mwisOverview","mbisForms","mwisForms"]);
});
document.querySelector(".skip").addEventListener("click", event => {
  event.preventDefault();
  document.querySelector("#main").focus();
});
window.addEventListener("hashchange", () => setRoute(true));
setRoute();
