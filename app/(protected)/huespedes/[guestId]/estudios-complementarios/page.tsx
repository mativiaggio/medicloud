"use client";
import { Error } from "@/components/alerts/Error";
import { useGuest } from "@/context/GuestContext";
import React from "react";
import NameAndIcon from "@/components/guest/NameAndIcon";
import DashboardSkeleton from "@/components/skeleton/guest/DashboardSkeleton";
import ECBreadcrumbs from "../_components/ECBreadcrumbs";

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
      <ECBreadcrumbs guest={guest} guestLoading={guestLoading} />
      <NameAndIcon data={guest} />
    </>
  );
};
export default Page;
