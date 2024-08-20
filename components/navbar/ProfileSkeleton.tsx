import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-[40px] w-[40px] rounded-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[100px] bg-main-skeleton-light dark:bg-main-skeleton-dark" />
      </div>
    </div>
  );
}
