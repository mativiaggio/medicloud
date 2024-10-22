"use client";
import { Error } from "@/components/alerts/Error";
import NameAndIcon from "@/components/guest/NameAndIcon";
import DashboardSkeleton from "@/components/skeleton/guest/DashboardSkeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGuest } from "@/context/GuestContext";
import api from "@/lib/appwrite";
import { Daily_Evolution } from "@/types/appwrite.types";
import { Query } from "appwrite";
import {
  Activity,
  Calendar,
  Heart,
  Thermometer,
  User2,
  Wind,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import EDBreadcrumbs from "../_components/EDBreadcrumbs";
import DailyEvolutionDataTable from "./_components/DailyEvolutionDataTable";
import { DailyEvolutionInput } from "./_components/DailyEvolutionInput";

// Dashboard
const Page = () => {
  const { guest, guestLoading } = useGuest();
  const [dailyEvolutions, setDailyEvolutions] = useState<Daily_Evolution[]>([]);
  const { guestId } = useParams();

  const updateDailyEvolutions = useCallback(async () => {
    try {
      const result = await api.dailyEvolution.getAll([
        Query.orderDesc("$createdAt"),
        Query.equal("guest_id", guestId),
      ]);
      setDailyEvolutions(result.documents);
    } catch (error) {
      console.error(error);
    }
  }, [guestId]);

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
      <div className="flex flex-col lg:flex-row w-full lg:items-center lg:justify-between pb-2">
        <NameAndIcon data={guest} />
        <DailyEvolutionInput onSuccess={updateDailyEvolutions} />
      </div>
      <div className="grid w-full">
        <Table>
          <TableCaption>Todos los registros de evolutción diaria.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Calendar /> Fecha
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <User2 /> Usuario
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Heart className="h-5 w-5 text-red-500" /> Frecuencia cardíaca
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Wind className="h-5 w-5 text-blue-500" /> Frecuencia
                  respiratoria
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Activity className="h-5 w-5 text-green-500" /> Tensión
                  arterial
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Activity className="h-5 w-5 text-purple-500" /> Oximetría
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Thermometer className="h-5 w-5 text-yellow-500" />{" "}
                  Temperatura
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dailyEvolutions.length > 0 ? (
              dailyEvolutions.map((item) => (
                <DailyEvolutionDataTable key={item.$id} dailyEvolution={item} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  El huésped no tiene asociado ninguna evolución diaria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
