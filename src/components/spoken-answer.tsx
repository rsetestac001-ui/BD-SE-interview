import { AnswerTimeline } from "@/components/answer-timeline";
import type { Question } from "@/lib/types";

export function SpokenAnswer({ question }: { question: Question }) {
  const { keyPoint, modelAnswer, roles, studyGuide } = question;

  return (
    <div className="space-y-3">
      <div className="rounded-xl border-l-4 border-primary bg-primary/10 px-4 py-3 leading-7">
        <p className="text-sm font-medium">一句入腦 · 面試可以咁答</p>
        <p><strong>{keyPoint}</strong></p>
      </div>
      <AnswerTimeline questionId={question.id} />
      <details className="rounded-xl bg-muted/40 px-4 py-3">
        <summary className="cursor-pointer font-medium">睇完整答法同原因</summary>
        <div className="mt-3 space-y-3">
          {roles?.length ? (
            roles.map((role) => (
              <section
                key={role.id}
                aria-label={role.heading}
                className="space-y-2 rounded-xl bg-background p-3 ring-1 ring-foreground/10"
              >
                <h3 className="text-base leading-7 font-semibold">{role.heading}</h3>
                <p className="leading-8 whitespace-pre-wrap">{role.answer}</p>
                <p className="leading-8 whitespace-pre-wrap rounded-lg bg-muted/60 px-3 py-2">
                  <strong>點解：</strong>
                  {role.why}
                </p>
              </section>
            ))
          ) : (
            <AnswerText text={modelAnswer} />
          )}
        </div>
      </details>
      <details className="rounded-xl bg-muted/40 px-4 py-3">
        <summary className="cursor-pointer font-medium">睇出處同容易講錯嘅位</summary>
        <div className="mt-3 space-y-3">
          <ul className="space-y-2 leading-7">
            {question.legalBasis.map((basis) => (
              <li key={basis.url + basis.label}>
                <a
                  className="font-medium underline underline-offset-4"
                  href={basis.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {basis.label}
                </a>
                <p className="text-muted-foreground">{basis.note}</p>
              </li>
            ))}
          </ul>
          {question.pitfalls.length > 0 && (
            <div>
              <p className="font-medium">容易講錯</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 leading-7">
                {question.pitfalls.map((pitfall) => <li key={pitfall}>{pitfall}</li>)}
              </ul>
            </div>
          )}
        </div>
      </details>
      {studyGuide && (
        <div className="space-y-2 rounded-xl bg-muted/60 px-4 py-3 leading-7">
          <h3 className="font-semibold">面試追問</h3>
          <p>{studyGuide.followUp}</p>
          <details>
            <summary className="cursor-pointer font-medium underline underline-offset-4">睇追問答法</summary>
            <p className="mt-2">{studyGuide.followUpAnswer}</p>
          </details>
        </div>
      )}
    </div>
  );
}

function AnswerText({ text }: { text: string }) {
  const marker = "\n\n點解：";
  const splitAt = text.indexOf(marker);
  if (splitAt < 0) {
    return <p className="leading-8 whitespace-pre-wrap">{text}</p>;
  }
  const spoken = text.slice(0, splitAt);
  const reason = text.slice(splitAt + marker.length);
  return (
    <div className="space-y-3 leading-8">
      <p className="whitespace-pre-wrap">{spoken}</p>
      <p className="whitespace-pre-wrap rounded-lg bg-muted/60 px-3 py-2">
        <strong>點解：</strong>
        {reason}
      </p>
    </div>
  );
}
