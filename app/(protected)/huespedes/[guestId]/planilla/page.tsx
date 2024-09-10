"use client";
import { Error } from "@/components/alerts/Error";
import { useGuest } from "@/context/GuestContext";
import React from "react";
import NameAndIcon from "@/components/guest/NameAndIcon";
import DashboardSkeleton from "@/components/skeleton/guest/DashboardSkeleton";
import PlanillaBreadcrumbs from "../_components/PlanillaBreadcrumbs copy";
import ViewGuestForm from "@/components/forms/ViewGuestForm";

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
      <PlanillaBreadcrumbs guest={guest} guestLoading={guestLoading} />
      <NameAndIcon data={guest} />
      <ViewGuestForm />
    </>
  );
};
export default Page;
