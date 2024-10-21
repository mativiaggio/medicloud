"use client";
import api from "@/appwrite/appwrite";
import { Error } from "@/components/alerts/Error";
import NameAndIcon from "@/components/guest/NameAndIcon";
import DashboardSkeleton from "@/components/skeleton/guest/DashboardSkeleton";
import { useGuest } from "@/context/GuestContext";
import { Daily_Evolution } from "@/types/appwrite.types";
import { Query } from "appwrite";
import { useCallback, useEffect, useState } from "react";
import EDBreadcrumbs from "../_components/EDBreadcrumbs";
import { DailyEvolutionInput } from "../_components/daily-evolution/DailyEvolutionInput";
import DailyEvolutionCard from "./_components/DailyEvolutionCard";

// Dashboard
const Page = () => {
  const { guest, guestLoading } = useGuest();
  const [dailyEvolutions, setDailyEvolutions] = useState<Daily_Evolution[]>([]);

  const updateDailyEvolutions = useCallback(async () => {
    try {
      const result = await api.daily_evolution.getAll([
        Query.orderDesc("$createdAt"),
      ]);
      setDailyEvolutions(result.documents);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (guest) {
      const sortedEvolutions = [...(guest.daily_evolution || [])].sort(
        (a, b) =>
          new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime(),
      );
      setDailyEvolutions(sortedEvolutions);
    }
  }, [guest]);

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
    <div>
      <EDBreadcrumbs guest={guest} guestLoading={guestLoading} />
      <div className="flex w-full items-center justify-between">
        <NameAndIcon data={guest} />
        <DailyEvolutionInput onSuccess={updateDailyEvolutions} />
      </div>
      <div className="grid w-full grid-cols-2 gap-3">
        {dailyEvolutions.length > 0
          ? dailyEvolutions.map((item) => (
              <DailyEvolutionCard key={item.$id} dailyEvolution={item} />
            ))
          : "El huésped no tiene asociado ninguna evolución diaria."}
      </div>
    </div>
  );
};

export default Page;
