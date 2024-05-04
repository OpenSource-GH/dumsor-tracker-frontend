"use client";

import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="w-full h-[80vh] grid place-content-center">
      <Loader width="60" height="60" color="orange" />
    </div>
  );
}
