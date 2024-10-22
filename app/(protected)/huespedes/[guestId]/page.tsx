"use client";
import GuestDashboard from "@/app/(protected)/huespedes/[guestId]/_components/GuestDashboard";
import { Error } from "@/components/alerts/Error";
import NameAndIcon from "@/components/guest/NameAndIcon";
import DashboardSkeleton from "@/components/skeleton/guest/DashboardSkeleton";
import { useGuest } from "@/context/GuestContext";
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
      <div className="min-h-screen">
      <DashboardBreadcrumbs guest={guest} guestLoading={guestLoading} />
      <NameAndIcon data={guest} />
        <GuestDashboard />
        </div>
    </>
  );
};
export default Page;
