import type { RolePerspective } from "@/lib/types";

export function SpokenAnswer({
  text,
  roles,
}: {
  text: string;
  roles?: RolePerspective[];
}) {
  if (roles && roles.length > 0) {
    return (
      <div className="space-y-3">
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
