import timelinesJson from "../../data/answer-timelines.json";

type Timeline = {
  kind: "sequence" | "explanation";
  steps: { label: string; text: string }[];
};

const timelines = timelinesJson as Partial<Record<string, Timeline>>;

export function AnswerTimeline({ questionId }: { questionId: string }) {
  const timeline = timelines[questionId];
  if (!timeline) return null;

  return (
    <details className="rounded-xl bg-muted/40 px-4 py-3">
      <summary className="cursor-pointer font-medium">
        {timeline.kind === "sequence" ? "睇時間軸答法" : "睇時間軸答法 · 按答題順序"}
      </summary>
      <ol className="mt-4 ml-3 space-y-4 border-l border-primary/30 pl-5" role="list">
        {timeline.steps.map((step, index) => (
          <li key={step.label} className="relative leading-7">
            <span
              aria-hidden="true"
              className="absolute -left-8 top-0 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
            >
              {index + 1}
            </span>
            <p className="font-semibold">{step.label}</p>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </details>
  );
}
