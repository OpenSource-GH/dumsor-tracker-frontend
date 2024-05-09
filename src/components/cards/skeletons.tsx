import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-[250px] rounded-lg" />
      <Skeleton className="h-6 w-[350px] rounded-lg" />
      <div className="py-6">
        <Skeleton className="h-7 w-full rounded-lg" />
      </div>
      <div className="w-full h-full border-l-2 border-dashed">
        <div className="ml-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
