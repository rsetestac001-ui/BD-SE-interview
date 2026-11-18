import timelinesJson from "../../data/answer-timelines.json";

import { StatuteText } from "@/components/statute-text";
import type { Basis } from "@/lib/types";

type TimelineStep = { label: string; text: string };

type Timeline = {
  kind: "sequence" | "explanation";
  steps: TimelineStep[];
  citizenSteps?: TimelineStep[];
};

const timelines = timelinesJson as Partial<Record<string, Timeline>>;

export function AnswerTimeline({ questionId, legalBasis }: { questionId: string; legalBasis: readonly Basis[] }) {
  const timeline = timelines[questionId];
  if (!timeline) return null;

  return (
    <details className="rounded-xl bg-muted/40 px-4 py-3">
      <summary className="cursor-pointer font-medium">
        {timeline.kind === "sequence" ? "睇時間軸答法" : "睇時間軸答法 · 按答題順序"}
      </summary>
      {timeline.citizenSteps ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <section className="min-w-0 rounded-lg bg-background p-3" aria-label="屋宇署人員">
            <h3 className="font-semibold">屋宇署人員</h3>
            <TimelineSteps steps={timeline.steps} legalBasis={legalBasis} />
          </section>
          <section className="min-w-0 rounded-lg bg-background p-3" aria-label="普通市民">
            <h3 className="font-semibold">普通市民</h3>
            <TimelineSteps steps={timeline.citizenSteps} legalBasis={legalBasis} />
          </section>
        </div>
      ) : (
        <TimelineSteps steps={timeline.steps} legalBasis={legalBasis} />
      )}
    </details>
  );
}

function TimelineSteps({ steps, legalBasis }: { steps: TimelineStep[]; legalBasis: readonly Basis[] }) {
  return (
    <ol className="mt-4 ml-3 space-y-4 border-l border-primary/30 pl-5" role="list">
      {steps.map((step, index) => (
        <li key={step.label} className="relative leading-7">
          <span
            aria-hidden="true"
            className="absolute -left-8 top-0 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
          >
            {index + 1}
          </span>
          <p className="font-semibold"><StatuteText text={step.label} legalBasis={legalBasis} /></p>
          <p><StatuteText text={step.text} legalBasis={legalBasis} /></p>
        </li>
      ))}
    </ol>
  );
}
