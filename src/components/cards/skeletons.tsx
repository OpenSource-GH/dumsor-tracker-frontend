import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-[250px] rounded-full" />
      <Skeleton className="h-6 w-[350px] rounded-full" />
      <div className="py-6">
        <Skeleton className="h-6 w-full rounded-full" />
      </div>
      <div>
        <Skeleton className="h-6 w-full rounded-full" />
      </div>
      <div className="w-full h-full border-l-2 border-dashed">
        <div className="ml-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
