import React from "react";
import GuestMedication from "./GuestMedication";
import { useGuest } from "@/context/GuestContext";
import { Error } from "@/components/alerts/Error";
import DashboardSkeleton from "@/components/skeleton/guest/DashboardSkeleton";
import GuestProgressNotes from "./GuestProgressNotes";

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
      <div className="grid h-full w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-2">
        <div className="flex flex-col gap-4">
          <GuestMedication data={guest} />
          {/* <div></div> */}
          <GuestProgressNotes />
        </div>
        <div className="flex flex-col gap-4">
          <GuestProgressNotes data={guest} />
          <GuestMedication data={guest} />
        </div>
      </div>
    </>
  );
};

export default GuestDashboard;
