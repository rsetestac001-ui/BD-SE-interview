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
        <SpokenAnswer key={question.id} question={question} />
      ) : (
        <Button type="button" className="h-11" onClick={() => setOpen(true)}>
          睇答案
        </Button>
      )}
      <Link href={`/practice?id=${question.id}`} className="inline-block text-sm underline underline-offset-4">
        去練習頁答呢題
      </Link>
    </div>
  );
}
