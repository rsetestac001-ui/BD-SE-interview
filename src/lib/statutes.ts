import catalogueJson from "../../data/statutes.json";
import { questions } from "./bank";
import {
  compareProvisionPaths,
  provisionKey,
  provisionLabel,
  provisionsFromLabel,
  sectionsFromLabel,
} from "./statute-parse";

export { sectionsFromLabel };
import type { Basis, Question } from "./types";

export type StatuteKind = "ordinance" | "guidance" | "vague";

export type CitingQuestion = {
  id: string;
  title: string;
};

export type StatuteCatalogueEntry = {
  officialTitle?: string;
  lead: string;
  points?: string[];
  terms?: string[];
  relations?: string;
  relatedIds?: string[];
};

export type SubProvisionRecord = {
  key: string;
  path: string[];
  label: string;
  count: number;
  questions: CitingQuestion[];
};

export type StatuteRecord = {
  id: string;
  kind: StatuteKind;
  count: number;
  share: number;
  rank: number | null;
  cap?: string;
  section?: string;
  instrumentTitle?: string;
  citation: string;
  heading: string;
  url?: string;
  labels: string[];
  notes: string[];
  questions: CitingQuestion[];
  subProvisions: SubProvisionRecord[];
};

type Instrument = {
  cap: string;
  title: string;
};

type Bucket = {
  id: string;
  kind: StatuteKind;
  cap?: string;
  section?: string;
  instrument?: Instrument;
  labels: Map<string, number>;
  notes: string[];
  urls: Map<string, number>;
  questions: Map<string, CitingQuestion>;
  subs: Map<string, { path: string[]; questions: Map<string, CitingQuestion> }>;
};

const catalogue = catalogueJson as Record<string, StatuteCatalogueEntry>;

export function statuteCatalogue(id: string) {
  return catalogue[id];
}

export function practiceHref(id: string) {
  return `/practice?id=${id}`;
}

export function buildStatuteReport(source: Question[] = questions) {
  const buckets = new Map<string, Bucket>();

  for (const question of source) {
    const seen = new Set<string>();
    const seenSubs = new Set<string>();
    for (const basis of question.legalBasis) {
      for (const hit of classifyBasis(basis)) {
        const bucket = buckets.get(hit.id) ?? emptyBucket(hit);
        if (!seen.has(hit.id)) {
          seen.add(hit.id);
          bucket.labels.set(basis.label, (bucket.labels.get(basis.label) ?? 0) + 1);
          if (basis.note && !bucket.notes.includes(basis.note)) bucket.notes.push(basis.note);
          if (basis.url) bucket.urls.set(basis.url, (bucket.urls.get(basis.url) ?? 0) + 1);
          bucket.questions.set(question.id, { id: question.id, title: question.title });
        }
        if (hit.kind === "ordinance" && hit.section) {
          for (const provision of provisionsFromLabel(basis.label)) {
            if (provision.section !== hit.section) continue;
            const subKey = `${hit.id}|${provisionKey(provision.path)}`;
            if (seenSubs.has(subKey)) continue;
            seenSubs.add(subKey);
            const sub =
              bucket.subs.get(provisionKey(provision.path)) ??
              { path: provision.path, questions: new Map<string, CitingQuestion>() };
            sub.questions.set(question.id, { id: question.id, title: question.title });
            bucket.subs.set(provisionKey(provision.path), sub);
          }
        }
        buckets.set(hit.id, bucket);
      }
    }
  }

  const total = source.length || 1;
  const records = [...buckets.values()].map((bucket) => toRecord(bucket, total));
  const ordinances = records
    .filter((item) => item.kind === "ordinance")
    .sort(compareOrdinances);
  assignRanks(ordinances);
  const guidance = records
    .filter((item) => item.kind === "guidance")
    .sort(compareCount);
  const vague = records
    .filter((item) => item.kind === "vague")
    .sort(compareCount);

  return {
    questionCount: source.length,
    statuteCount: ordinances.length,
    ordinances,
    guidance,
    vague,
    byId: new Map(records.map((item) => [item.id, item])),
  };
}

export function classifyBasis(basis: Basis): Array<{
  id: string;
  kind: StatuteKind;
  cap?: string;
  section?: string;
  instrument?: Instrument;
}> {
  const instrument = detectInstrument(basis.label, basis.url);
  if (!instrument) {
    return [
      {
        id: guidanceId(basis.url || basis.label),
        kind: "guidance",
      },
    ];
  }
  const sections = sectionsFromLabel(basis.label);
  if (sections.length === 0) {
    return [
      {
        id: `cap${instrument.cap.toLowerCase()}-unspecified`,
        kind: "vague",
        cap: instrument.cap,
        instrument,
      },
    ];
  }
  return sections.map((section) => ({
    id: `cap${instrument.cap.toLowerCase()}-s${section.toLowerCase()}`,
    kind: "ordinance" as const,
    cap: instrument.cap,
    section,
    instrument,
  }));
}

function detectInstrument(label: string, url: string): Instrument | null {
  const blob = `${label} ${url}`;
  if (/cap123A|第123A章|建築物\(管理\)規例|建築物（管理）規例/.test(blob)) {
    return { cap: "123A", title: "《建築物(管理)規例》" };
  }
  if (/cap123L|第123L章|建築物\(上訴\)規例|建築物（上訴）規例/.test(blob)) {
    return { cap: "123L", title: "《建築物(上訴)規例》" };
  }
  if (/cap123(?![A-Za-z])|《建築物條例》|第123章/.test(blob)) {
    return { cap: "123", title: "《建築物條例》" };
  }
  return null;
}

function guidanceId(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `src-${(hash >>> 0).toString(36)}`;
}

function emptyBucket(hit: {
  id: string;
  kind: StatuteKind;
  cap?: string;
  section?: string;
  instrument?: Instrument;
}): Bucket {
  return {
    id: hit.id,
    kind: hit.kind,
    cap: hit.cap,
    section: hit.section,
    instrument: hit.instrument,
    labels: new Map(),
    notes: [],
    urls: new Map(),
    questions: new Map(),
    subs: new Map(),
  };
}

function toRecord(bucket: Bucket, total: number): StatuteRecord {
  const note = statuteCatalogue(bucket.id);
  const labels = [...bucket.labels.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].length - b[0].length)
    .map(([label]) => label);
  const citation = bucket.instrument
    ? bucket.section
      ? `${bucket.instrument.title}（第${bucket.cap}章）第${bucket.section}條`
      : `${bucket.instrument.title}（第${bucket.cap}章）`
    : labels[0] ?? "其他出處";
  const heading =
    note?.officialTitle ??
    (bucket.kind === "vague"
      ? "未能從標籤識別具體條文"
      : bucket.kind === "guidance"
        ? guidanceHeading(labels)
        : bucket.instrument?.title ?? citation);
  return {
    id: bucket.id,
    kind: bucket.kind,
    count: bucket.questions.size,
    share: bucket.questions.size / total,
    rank: null,
    cap: bucket.cap,
    section: bucket.section,
    instrumentTitle: bucket.instrument?.title,
    citation,
    heading,
    url: preferredUrl(bucket.urls),
    labels,
    notes: bucket.notes,
    questions: [...bucket.questions.values()].sort((a, b) => a.id.localeCompare(b.id)),
    subProvisions: subProvisions(bucket),
  };
}

function subProvisions(bucket: Bucket): SubProvisionRecord[] {
  if (bucket.kind !== "ordinance" || !bucket.section) return [];
  return [...bucket.subs.values()]
    .map((sub) => ({
      key: provisionKey(sub.path) || "bare",
      path: sub.path,
      label: provisionLabel(bucket.section ?? "", sub.path),
      count: sub.questions.size,
      questions: [...sub.questions.values()].sort((a, b) => a.id.localeCompare(b.id)),
    }))
    .sort((a, b) => {
      if (a.path.length === 0) return b.path.length === 0 ? 0 : -1;
      if (b.path.length === 0) return 1;
      return compareProvisionPaths(a.path, b.path);
    });
}

function guidanceHeading(labels: string[]) {
  if (labels.length > 0 && labels.every((label) => label.startsWith("職位編號 50460"))) {
    return "職位編號 50460 職位廣告";
  }
  return labels[0] ?? "其他出處";
}

function preferredUrl(urls: Map<string, number>) {
  const ranked = [...urls.entries()].sort((a, b) => b[1] - a[1] || a[0].length - b[0].length);
  return ranked[0]?.[0];
}

function assignRanks(items: StatuteRecord[]) {
  let rank = 0;
  let previous = -1;
  items.forEach((item, index) => {
    if (item.count !== previous) {
      rank = index + 1;
      previous = item.count;
    }
    item.rank = rank;
  });
}

function compareOrdinances(a: StatuteRecord, b: StatuteRecord) {
  return (
    b.count - a.count ||
    (a.cap ?? "").localeCompare(b.cap ?? "") ||
    sectionOrder(a.section) - sectionOrder(b.section) ||
    (a.section ?? "").localeCompare(b.section ?? "")
  );
}

function compareCount(a: StatuteRecord, b: StatuteRecord) {
  return b.count - a.count || a.heading.localeCompare(b.heading, "zh-Hant");
}

function sectionOrder(section: string | undefined) {
  const match = /^(\d+)/.exec(section ?? "");
  return match ? Number(match[1]) : 0;
}

export function percentLabel(share: number) {
  return `${Math.round(share * 100)}%`;
}
