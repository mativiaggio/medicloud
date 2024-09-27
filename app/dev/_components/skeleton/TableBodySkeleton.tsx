import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export const TableBodySkeleton = () => {
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
          <TableCell>
            <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export const TableCellSkeleton = () => {
  return (
    <>
      <TableCell>
        <Skeleton className="h-6 w-full bg-main-skeleton-light dark:bg-main-skeleton-dark" />
      </TableCell>
    </>
  );
};
