"use client";
import { Error } from "@/components/alerts/Error";
import NameAndIcon from "@/components/guest/NameAndIcon";
import DashboardSkeleton from "@/components/skeleton/guest/DashboardSkeleton";
import { useGuest } from "@/context/GuestContext";
import EDBreadcrumbs from "../_components/EDBreadcrumbs";
import { SheetDemo } from "../_components/daily-evolution/DailyEvolutionInput";
import DailyEvolutionCard from "./_components/DailyEvolutionCard";

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
      <div className="flex w-full items-center justify-between">
        <NameAndIcon data={guest} />
        <SheetDemo />
      </div>
      {guest.daily_evolution.length > 0
        ? guest.daily_evolution.map((item) => (
            <DailyEvolutionCard key={item.$id} dailyEvolution={item} />
          ))
        : "El huésped no tiene asociado ningún medicamento."}
    </>
  );
};
export default Page;
