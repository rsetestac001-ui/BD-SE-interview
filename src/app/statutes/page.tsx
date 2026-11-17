import type { Metadata } from "next";
import { Suspense } from "react";
import { StatuteStudy } from "@/components/statute-study";

export const metadata: Metadata = {
  title: "法例",
  description: "這本題庫引用法例的次數，以及每一條的溫習詳情。次數不是屋宇署的官方面試頻率。",
};

type Query = {
  tab?: string | string[];
  id?: string | string[];
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function StatutesPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return (
    <Suspense fallback={<StatuteFallback />}>
      <StatutesLoader searchParams={searchParams} />
    </Suspense>
  );
}

async function StatutesLoader({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  const tab = first(query.tab) === "detail" ? "detail" : "stats";
  return <StatuteStudy tab={tab} id={first(query.id)} />;
}

function StatuteFallback() {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="h-8 w-40 rounded bg-muted" />
      <div className="h-48 rounded-xl bg-muted" />
    </div>
  );
}
