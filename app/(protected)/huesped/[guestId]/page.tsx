"use client";
import { Error } from "@/components/alerts/Error";
import MainTitle from "@/components/MainTitle";
import LineSkeleton from "@/components/skeleton/LineSkeleton";
import { useGuest } from "@/context/GuestContext";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { BentoGridDemo } from "@/components/grids/BentoGridDemo";

// Dashboard
const Page = () => {
  const { guest, guestLoading } = useGuest();

  if (guestLoading) {
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
          <LineSkeleton height={36} width={200} />
        </div>
      </>
    );
  }

  if (!guest) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/inicio">Inicio</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/huesped">Huéspedes</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {guestLoading ? (
                <LineSkeleton height={16} width={100} />
              ) : (
                guest?.full_name
              )}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <MainTitle title={guest ? guest.full_name : ""} />
      <BentoGridDemo />
    </>
  );
};
export default Page;
