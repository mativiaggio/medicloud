"use client";
import { Error } from "@/components/alerts/Error";
import { useGuest } from "@/context/GuestContext";
import React from "react";
import NameAndIcon from "@/components/guest/NameAndIcon";
import DashboardSkeleton from "@/components/skeleton/guest/DashboardSkeleton";
import GuestDashboard from "@/components/grids/guest/GuestDashboard";
import DashboardBreadcrumbs from "./_components/DashboardBreadcrumbs";

// Dashboard
const Page = () => {
  const { guest, guestLoading } = useGuest();

  if (guestLoading) {
    return <DashboardSkeleton />;
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
      <DashboardBreadcrumbs guest={guest} guestLoading={guestLoading} />
      <NameAndIcon data={guest} />
      <GuestDashboard />
    </>
  );
};
export default Page;
