import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LineSkeleton from "@/components/skeleton/LineSkeleton";

const DashboardSkeleton = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <LineSkeleton height={14} width={80} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <LineSkeleton height={14} width={80} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <LineSkeleton height={14} width={80} />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="prose my-12">
        <LineSkeleton height={40} width={400} />
      </div>
    </>
  );
};

export default DashboardSkeleton;
