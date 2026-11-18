import type { Question } from "@/lib/types";

export function SpokenAnswer({
  text,
  roles,
  studyGuide,
}: {
  text: string;
  roles?: Question["roles"];
  studyGuide?: Question["studyGuide"];
}) {
  if (roles && roles.length > 0) {
    return (
      <div className="space-y-3">
        {studyGuide && (
          <>
            <div className="rounded-xl bg-primary/10 px-4 py-3 leading-7">
              <p className="text-sm font-medium">一句入腦</p>
              <p className="font-semibold">{studyGuide.takeaway}</p>
            </div>
            <p className="text-sm font-medium text-muted-foreground">30 秒口語答法</p>
          </>
        )}
        {roles.map((role) => (
          <section
            key={role.id}
            aria-label={role.heading}
            className="space-y-2 rounded-xl bg-background p-3 ring-1 ring-foreground/10"
          >
            <h3 className="text-base leading-7 font-semibold">{role.heading}</h3>
            <p className="leading-8 whitespace-pre-wrap">{role.answer}</p>
            <p className="leading-8 whitespace-pre-wrap rounded-lg bg-muted/60 px-3 py-2">
              <span className="font-medium">點解：</span>
              {role.why}
            </p>
          </section>
        ))}
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
        <span className="font-medium">點解：</span>
        {reason}
      </p>
    </div>
  );
}
