"use client";

import { PageSkeleton } from "@/components/cards/skeletons";

export default function Loading() {
  return (
    <div className="max-w-screen-lg mx-auto min-h-screen px-6 py-8">
      <PageSkeleton />
    </div>
  );
}
