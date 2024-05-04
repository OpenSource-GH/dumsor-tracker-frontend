import React from "react";
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#E4E7EC]/50 dark:bg-white/20",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
