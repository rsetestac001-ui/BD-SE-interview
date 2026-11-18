"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { newPracticeRound, randomPracticePath } from "@/lib/practice-random";

export function RandomPracticeLink(props: Omit<ComponentProps<typeof Link>, "href" | "onNavigate">) {
  const router = useRouter();

  return (
    <Link
      {...props}
      href={randomPracticePath}
      prefetch={false}
      onNavigate={(event) => {
        event.preventDefault();
        router.push(`${randomPracticePath}&round=${newPracticeRound()}`);
      }}
    />
  );
}
