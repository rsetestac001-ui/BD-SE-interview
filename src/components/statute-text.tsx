import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { splitStatuteText } from "@/lib/statute-popups";
import type { Basis } from "@/lib/types";

export function StatuteText({
  text,
  legalBasis,
  sourceUrl,
}: {
  text: string;
  legalBasis: readonly Basis[];
  sourceUrl?: string;
}) {
  const pieces = splitStatuteText(text, legalBasis);

  if (sourceUrl && !pieces.some((piece) => piece.citations)) {
    return (
      <a className="font-medium underline underline-offset-4" href={sourceUrl} target="_blank" rel="noreferrer">
        {text}
      </a>
    );
  }

  return pieces.map((piece, index) => piece.citations ? (
    <Dialog key={index}>
      <DialogTrigger
        type="button"
        className="inline cursor-pointer rounded-sm font-medium text-primary underline decoration-primary/60 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {piece.text}
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-md">
        <DialogTitle className="pr-8 leading-snug">{piece.text}</DialogTitle>
        <DialogDescription>條文同所屬部分嘅白話解釋</DialogDescription>
        {piece.citations.map((citation) => (
          <section key={`${citation.cap}-${citation.section}`} className="space-y-2 border-t pt-3 leading-relaxed">
            <h3 className="font-semibold">{citation.name}（第{citation.cap}章）第{citation.section}條</h3>
            <p><strong>{citation.title}。</strong> {citation.summary}</p>
            <div className="rounded-lg bg-muted p-3">
              <p className="font-semibold">{citation.part.title}</p>
              <p>{citation.part.summary}</p>
            </div>
            <a className="inline-block font-medium underline underline-offset-4" href={citation.url} target="_blank" rel="noreferrer">
              喺香港電子法例睇原文
            </a>
          </section>
        ))}
      </DialogContent>
    </Dialog>
  ) : piece.text);
}
