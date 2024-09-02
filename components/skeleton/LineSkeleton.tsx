import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

interface LineSkeletonProps {
  className?: string;
  height?: number;
  width?: number;
}

const LineSkeleton = ({ height, width, className }: LineSkeletonProps) => {
  return (
    <Skeleton
      className={cn(
        "ml-2 bg-main-skeleton-light dark:bg-main-skeleton-dark",
        className
      )}
      style={{
        width: width ? `${width}px` : "250px",
        height: height ? `${height}px` : "24px", // default height to 24px which is h-6 in Tailwind
      }}
    />
  );
};

export default LineSkeleton;
