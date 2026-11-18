import { Suspense } from "react";
import { PracticeSession } from "@/components/practice-session";
import { questions, topics } from "@/lib/bank";

type Query = {
  topic?: string | string[];
  mode?: string | string[];
  id?: string | string[];
  round?: string | string[];
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function PracticePage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return (
    <Suspense fallback={<PracticeFallback />}>
      <PracticeLoader searchParams={searchParams} />
    </Suspense>
  );
}

async function PracticeLoader({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  return (
    <PracticeSession
      questions={questions}
      topics={topics}
      initialTopic={first(query.topic)}
      initialMode={first(query.mode)}
      initialId={first(query.id)}
      initialRound={first(query.round)}
    />
  );
}

function PracticeFallback() {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="h-8 w-2/3 rounded bg-muted" />
      <div className="h-40 rounded-xl bg-muted" />
    </div>
  );
}
