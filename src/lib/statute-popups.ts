import popupData from "../../data/statute-popups.json";
import { provisionsFromLabel, sectionsFromLabel } from "./statute-parse";
import type { Basis } from "./types";

type Part = { title: string; summary: string };
type Section = { part: string; title: string; summary: string };
type Instrument = {
  name: string;
  parts: Record<string, Part>;
  sections: Partial<Record<string, Section>>;
};

const instruments: Partial<Record<string, Instrument>> = popupData;

export type CitationDetail = {
  cap: string;
  name: string;
  section: string;
  title: string;
  summary: string;
  part: Part;
  url: string;
};

type TextPiece = { text: string; citations?: CitationDetail[] };

const sectionToken = String.raw`\d+[A-Z]*(?:\s*[(（][0-9A-Za-z]+[)）])*`;
const subToken = String.raw`(?:[(（][0-9A-Za-z]+[)）]\s*)+`;
const referencePattern = new RegExp(
  `第\\s*${sectionToken}(?:\\s*[、，,及和與或]\\s*(?:${sectionToken}|${subToken}))*\\s*條|第\\s*\\d+[A-Z]*\\s*${subToken}[款段節]`,
  "g",
);

function basisCap(basis: Basis) {
  const cap = /^https:\/\/www\.elegislation\.gov\.hk\/hk\/cap(\d+[A-Z]?)(?:[/?#]|$)/i
    .exec(basis.url)?.[1].toLowerCase();
  return cap && instruments[cap] ? cap : undefined;
}

function namedCap(prefix: string) {
  const name = /《([^》]+)》\s*(?:[（(]第\s*\d+[A-Z]?\s*章[）)]\s*)?$/.exec(prefix)?.[1];
  return name ? Object.keys(instruments).find((cap) =>
    instruments[cap]?.name === name.replaceAll("(", "（").replaceAll(")", "）"),
  ) : undefined;
}

export function splitStatuteText(text: string, legalBasis: readonly Basis[]): TextPiece[] {
  const sources = legalBasis.flatMap((basis) => {
    const cap = basisCap(basis);
    return cap ? [{ cap, sections: sectionsFromLabel(basis.label), url: basis.url }] : [];
  });
  const pieces: TextPiece[] = [];
  let cursor = 0;

  for (const match of text.matchAll(referencePattern)) {
    const explicitCap = namedCap(text.slice(0, match.index));
    const refs = provisionsFromLabel(match[0].replace(/[款段節]$/, "條"));
    const sectionNumbers = [...new Set(refs.map((ref) => ref.section))];
    const citations = sectionNumbers.map((section) => {
      const matched = sources.filter((source) => source.sections.includes(section));
      const candidates = matched.length
        ? matched
        : sources.filter((source) => instruments[source.cap]?.sections[section]);
      const caps = new Set(candidates.map((source) => source.cap));
      const cap = explicitCap ?? (caps.size === 1 ? caps.values().next().value : undefined);
      const instrument = cap ? instruments[cap] : undefined;
      const detail = instrument?.sections[section];
      if (!cap || !instrument || !detail) return undefined;

      const directLink = matched.find((source) => source.cap === cap && source.sections.length === 1);
      return {
        cap: cap.toUpperCase(),
        name: instrument.name,
        section,
        title: detail.title,
        summary: detail.summary,
        part: instrument.parts[detail.part],
        url: directLink?.url ?? `https://www.elegislation.gov.hk/hk/cap${cap.toUpperCase()}`,
      };
    });

    if (!citations.length || citations.some((citation) => !citation)) continue;
    if (cursor < match.index) pieces.push({ text: text.slice(cursor, match.index) });
    pieces.push({ text: match[0], citations: citations.filter((citation) => citation !== undefined) });
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) pieces.push({ text: text.slice(cursor) });
  return pieces;
}
