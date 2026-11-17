"use client";

import { useState } from "react";
import Link from "next/link";
import { SpokenAnswer } from "@/components/spoken-answer";
import { Button } from "@/components/ui/button";
import type { Question } from "@/lib/types";

export function RevealAnswer({ question }: { question: Question }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3">
      {open ? (
        <div className="space-y-3">
          <SpokenAnswer text={question.modelAnswer} />
          <div>
            <h4 className="font-medium">容易講錯</h4>
            <ul className="mt-1 list-disc space-y-1 pl-5 leading-7 text-muted-foreground">
              {question.pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <ul className="space-y-2 text-sm leading-6">
            {question.legalBasis.map((basis) => (
              <li key={basis.label + basis.url}>
                <a className="underline underline-offset-4" href={basis.url}>
                  {basis.label}
                </a>
                <p className="text-muted-foreground">{basis.note}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Button type="button" className="h-11" onClick={() => setOpen(true)}>
          揭示示範答法
        </Button>
      )}
      <Link href={`/practice?id=${question.id}`} className="inline-block text-sm underline underline-offset-4">
        在練習頁打開這題
      </Link>
    </div>
  );
}
