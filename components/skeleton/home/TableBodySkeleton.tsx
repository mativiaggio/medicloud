import React from "react";
import { TableBody, TableCell, TableRow } from "../../ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const TableBodySkeleton = () => {
  return (
    <>
      <TableBody>
        <TableRow key={1}>
          <TableCell>
            <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
          </TableCell>
        </TableRow>
      </TableBody>
      <TableBody>
        <TableRow key={2}>
          <TableCell>
            <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default TableBodySkeleton;
