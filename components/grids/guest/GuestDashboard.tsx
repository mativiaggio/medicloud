import React from "react";
import GuestMedication from "./GuestMedication";
import { useGuest } from "@/context/GuestContext";
import { Error } from "@/components/alerts/Error";
import DashboardSkeleton from "@/components/skeleton/guest/DashboardSkeleton";

const GuestDashboard = () => {
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
      <div className="w-full h-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        <GuestMedication data={guest} />
      </div>
    </>
  );
};

export default GuestDashboard;
