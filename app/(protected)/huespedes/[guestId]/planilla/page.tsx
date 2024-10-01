"use client";
import { Error } from "@/components/alerts/Error";
import ViewGuestForm from "@/components/forms/view-guest-form/ViewGuestForm";
import NameAndIcon from "@/components/guest/NameAndIcon";
import DashboardSkeleton from "@/components/skeleton/guest/DashboardSkeleton";
import { useGuest } from "@/context/GuestContext";
import PlanillaBreadcrumbs from "../_components/PlanillaBreadcrumbs copy";

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
