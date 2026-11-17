export type ProvisionRef = {
  section: string;
  path: string[];
};

const SEPARATORS = new Set(["及", "、", "，", ",", "和", "與", "或"]);

const ROMAN: Record<string, number> = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
  viii: 8,
  ix: 9,
  x: 10,
  xi: 11,
  xii: 12,
  xiii: 13,
  xiv: 14,
  xv: 15,
  xvi: 16,
  xvii: 17,
  xviii: 18,
  xix: 19,
  xx: 20,
};

export function sectionsFromLabel(label: string) {
  const found: string[] = [];
  const normalized = label.replace(/（/g, "(").replace(/）/g, ")");
  const pattern = /第([^條]{1,160})條/g;
  for (const match of normalized.matchAll(pattern)) {
    const body = match[1].replace(/\s+/g, "").replace(/標題/g, "");
    let index = 0;
    while (index < body.length) {
      const section = /^(\d+[A-Z]*)/.exec(body.slice(index));
      if (section) {
        const id = section[1];
        if (!found.includes(id)) found.push(id);
        index += id.length;
        continue;
      }
      if (body[index] === "(") {
        const end = body.indexOf(")", index);
        if (end < 0) break;
        index = end + 1;
        continue;
      }
      const mark = body[index];
      if (mark === "及" || mark === "、" || mark === "，" || mark === "和" || mark === "與") {
        index += 1;
        continue;
      }
      break;
    }
  }
  return found;
}

export function provisionsFromLabel(label: string): ProvisionRef[] {
  const found: ProvisionRef[] = [];
  const normalized = label.replace(/（/g, "(").replace(/）/g, ")");
  const pattern = /第([^條]{1,160})條/g;
  for (const match of normalized.matchAll(pattern)) {
    const body = match[1].replace(/\s+/g, "").replace(/標題/g, "");
    let index = 0;
    let currentSection: string | null = null;
    let currentPath: string[] = [];
    while (index < body.length) {
      if (SEPARATORS.has(body[index])) {
        index += 1;
        continue;
      }
      const section = /^(\d+[A-Z]*)/.exec(body.slice(index));
      let sectionId: string | null = currentSection;
      let consumedSection = false;
      if (section) {
        sectionId = section[1];
        currentSection = sectionId;
        index += sectionId.length;
        consumedSection = true;
      }
      const groups: string[] = [];
      while (body[index] === "(") {
        const end = body.indexOf(")", index);
        if (end < 0) break;
        const inner = body.slice(index + 1, end);
        if (!inner) break;
        groups.push(inner);
        index = end + 1;
      }
      if (!sectionId || (!consumedSection && groups.length === 0)) break;
      const path = consumedSection ? groups : continuedPath(currentPath, groups);
      currentPath = path;
      const key = `${sectionId}|${path.join("/")}`;
      if (!found.some((item) => `${item.section}|${item.path.join("/")}` === key)) {
        found.push({ section: sectionId, path: [...path] });
      }
    }
  }
  return found;
}

function markKind(token: string): "subsection" | "roman" | "paragraph" {
  if (/^\d+[A-Z]*$/.test(token)) return "subsection";
  if (token.length > 1 && ROMAN[token.toLowerCase()]) return "roman";
  return "paragraph";
}

function continuedPath(previous: string[], groups: string[]) {
  const kind = markKind(groups[0]);
  if (kind === "subsection") return groups;
  const prefix: string[] = [];
  for (const token of previous) {
    if (markKind(token) !== "subsection") break;
    prefix.push(token);
  }
  if (kind === "roman" && previous.length > prefix.length) {
    prefix.push(previous[prefix.length]);
  }
  return [...prefix, ...groups];
}

export function provisionKey(path: string[]) {
  return path.join("/");
}

export function provisionLabel(section: string, path: string[]) {
  if (path.length === 0) return "整條／未指明款";
  return `第${section}${path.map((part) => `(${part})`).join("")}條`;
}

function compareLetters(a: string, b: string) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

function compareToken(a: string, b: string, depth: number) {
  const pattern = /^(\d+)([A-Za-z]*)$/;
  const left = pattern.exec(a);
  const right = pattern.exec(b);
  if (left && right) {
    const difference = Number(left[1]) - Number(right[1]);
    if (difference !== 0) return difference;
    return compareLetters(left[2], right[2]);
  }
  if (depth >= 2) {
    const leftRoman = ROMAN[a.toLowerCase()];
    const rightRoman = ROMAN[b.toLowerCase()];
    if (leftRoman && rightRoman) return leftRoman - rightRoman;
  }
  return compareLetters(a, b);
}

export function compareProvisionPaths(a: string[], b: string[]) {
  const length = Math.min(a.length, b.length);
  for (let index = 0; index < length; index += 1) {
    const difference = compareToken(a[index], b[index], index);
    if (difference !== 0) return difference;
  }
  return a.length - b.length;
}
