import type { Metadata } from "next";
import { ReviewBoard } from "@/components/review-board";

export const metadata: Metadata = {
  title: "收藏與進度",
};

export default function ReviewPage() {
  return <ReviewBoard />;
}
