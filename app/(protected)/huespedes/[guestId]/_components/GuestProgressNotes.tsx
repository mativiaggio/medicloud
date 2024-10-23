
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/appwrite";
import { Daily_Evolution, Guest } from "@/types/appwrite.types";
import { Query } from "appwrite";
import {
  Activity,
  Heart,
  Info,
  NotepadText,
  Thermometer,
  Wind,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GuestProp {
  data: Guest;
}

const GuestProgressNotes = ({ data }: GuestProp) => {
  const router = useRouter();
  const { guestId } = useParams();
  const [dailyEvolution, setDailyEvolution] = useState<Daily_Evolution[]>([]);

  useEffect(() => {
    const fetchDailyEvolution = async () => {
      try {
        const guestDailyEvolution =
          (await api.dailyEvolution.findByGuestId(
            guestId,
            Query.orderDesc("$createdAt"),
            Query.limit(3),
          )) || [];
        setDailyEvolution(guestDailyEvolution.documents);
      } catch (error) {
        console.error("Error fetching daily evolution:", error);
      }
    };

    fetchDailyEvolution();
  }, [guestId]);

  const records = dailyEvolution;

  return (
    <>
      <div className="group/bento shadow-input row-span-1 flex h-fit flex-col justify-between space-y-4 rounded-xl border border-main-border-light border-transparent bg-white p-4 transition duration-200 hover:shadow-xl dark:border-main-border-dark dark:border-white/[0.2] dark:bg-main-bg-dark dark:shadow-none">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <h1 className="flex items-center gap-2 text-lg font-bold">
            <NotepadText /> <Link href={`/huespedes/${guestId}/evolucion-diaria`}>Evolución diaria</Link>
          </h1>
        </div>

        <Table className="bg-main-workspace-light dark:bg-main-workspace-dark">
          <TableHeader>
            <TableRow>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Heart className="!h-5 !w-5 text-red-500" /> Frecuencia
                  cardíaca
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Wind className="!h-5 !w-5 text-blue-500" /> Frecuencia
                  respiratoria
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Activity className="!h-5 !w-5 text-green-500" /> Tensión
                  arterial
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Activity className="!h-5 !w-5 text-purple-500" /> Oximetría
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Thermometer className="!h-5 !w-5 text-yellow-500" />{" "}
                  Temperatura
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(records) && records.length > 0 ? (
              records.map((record, index) => (
                <TableRow
                  key={index}
                  onDoubleClick={() =>
                    router.push(
                      `/huespedes/${guestId}/evolucion-diaria/${record.$id}`,
                    )
                  }
                >
                  <TableCell>{record.heart_rate} bpm</TableCell>
                  <TableCell>{record.respiratory_rate} rpm</TableCell>
                  <TableCell>{record.blood_pressure} mmHg</TableCell>
                  <TableCell>{record.oximetry}%</TableCell>
                  <TableCell>{record.temperature}°C</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>El huésped no tiene asociado ninguna evolución diaria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <p className="flex items-center gap-2 text-xs text-gray-400">
          <Info className="h-3 w-3" /> Ultimos 3 registros
        </p>
      </div>
    </>
  );
};

export default GuestProgressNotes;
