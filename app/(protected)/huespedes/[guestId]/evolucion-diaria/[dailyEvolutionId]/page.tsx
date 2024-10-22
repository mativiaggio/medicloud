"use client";
import { Error } from "@/components/alerts/Error";
import NameAndIcon from "@/components/guest/NameAndIcon";
import { useDailyEvolution } from "@/context/DailyEvolutionProvider";
import { useGuest } from "@/context/GuestContext";
import Breadcrumbs from "./_components/Breadcrumbs";
import DailyEvolutionInput from "./_components/DailyEvolutionInput";
import MainSkeleton from "./_components/MainSkeleton";

// Dashboard
const Page = () => {
  const { dailyEvolution, loadingDailyEvolution } = useDailyEvolution();
  const { guest, guestLoading } = useGuest();

  console.log("Daily Evolution", dailyEvolution);

  if (guestLoading) {
    return <MainSkeleton />;
  }

  if (!guest) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (!dailyEvolution) {
    return (
      <div>
        <MainSkeleton />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs guest={guest} guestLoading={guestLoading} />
      <div className="flex w-full items-center justify-between">
        <NameAndIcon data={guest} />
      </div>
      <DailyEvolutionInput
        guest={guest}
        guestLoading={guestLoading}
        dailyEvolution={dailyEvolution}
        dailyEvolutionLoading={loadingDailyEvolution}
      />
    </div>
  );
};

export default Page;
