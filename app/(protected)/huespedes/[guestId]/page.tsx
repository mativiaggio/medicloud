"use client";
import { Error } from "@/components/alerts/Error";
import MainTitle from "@/components/MainTitle";
import LineSkeleton from "@/components/skeleton/LineSkeleton";
import { useGuest } from "@/context/GuestContext";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { BentoGridDemo } from "@/components/grids/BentoGridDemo";
import { Check, Hourglass, X } from "lucide-react";

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
          <LineSkeleton height={40} width={400} />
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
            <Link href="/huespedes">Huéspedes</Link>
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
      {/* <MainTitle title={guest ? guest.full_name : ""} /> */}
      <div className="flex items-center gap-2">
        <MainTitle title={guest ? guest.full_name : ""} />
        {guest.status === "active" ? <Check size={38} color="#24ae7c" /> : ""}
        {guest.status === "inactive" ? <X size={38} color="#f37877" /> : ""}
        {guest.status === "pending" ? (
          <Hourglass className="animate-swing" size={38} color="#44a4ea" />
        ) : (
          ""
        )}
      </div>
      <BentoGridDemo />
    </>
  );
};
export default Page;
