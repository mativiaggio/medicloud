import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UserNameSekeleton = () => {
  return (
    <Skeleton className="ml-2 h-6 w-[250px] bg-main-skeleton-light dark:bg-main-skeleton-dark" />
  );
};

export default UserNameSekeleton;
