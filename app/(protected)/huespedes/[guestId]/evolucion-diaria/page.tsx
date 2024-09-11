"use client";
import { Error } from "@/components/alerts/Error";
import { useGuest } from "@/context/GuestContext";
import React from "react";
import NameAndIcon from "@/components/guest/NameAndIcon";
import DashboardSkeleton from "@/components/skeleton/guest/DashboardSkeleton";
import EDBreadcrumbs from "../_components/EDBreadcrumbs";

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
      <EDBreadcrumbs guest={guest} guestLoading={guestLoading} />
      <NameAndIcon data={guest} />
    </>
  );
};
export default Page;
