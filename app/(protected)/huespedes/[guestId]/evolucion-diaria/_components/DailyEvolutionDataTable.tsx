
import LineSkeleton from "@/components/skeleton/LineSkeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import api from "@/lib/appwrite";
import { dateStringFormat } from "@/lib/utils";
import { Daily_Evolution } from "@/types/appwrite.types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DailyEvolutionDataTable = ({
  dailyEvolution,
}: {
  dailyEvolution: Daily_Evolution;
}) => {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const { guestId } = useParams();

  const getUser = async (user_id: string) => {
    try {
      const result = await api.user.findById(user_id);
      setUserName(result.documents[0].name);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUserName("Desconocido");
    }
  };

  useEffect(() => {
    getUser(dailyEvolution.user_id);
  }, [dailyEvolution.user_id]);
  return (

    userName && (
    <TableRow onDoubleClick={() => router.push(`/huespedes/${guestId}/evolucion-diaria/${dailyEvolution.$id}`)}>
      <TableCell className="whitespace-nowrap">{dateStringFormat(dailyEvolution.$createdAt)}</TableCell>
      <TableCell className="whitespace-nowrap">
        {userName}
      </TableCell>
      <TableCell className="whitespace-nowrap">{dailyEvolution.heart_rate} bpm</TableCell>
      <TableCell className="whitespace-nowrap">{dailyEvolution.respiratory_rate} rpm</TableCell>
      <TableCell className="whitespace-nowrap">{dailyEvolution.blood_pressure} mmHg</TableCell>
      <TableCell className="whitespace-nowrap">{dailyEvolution.oximetry}%</TableCell>
      <TableCell className="whitespace-nowrap">{dailyEvolution.temperature}°C</TableCell>
    </TableRow>
    ) || (
      <TableRow>
        <TableCell><LineSkeleton height={14} width={100} /></TableCell>
        <TableCell><LineSkeleton height={14} width={100} /></TableCell>
        <TableCell><LineSkeleton height={14} width={100} /></TableCell>
        <TableCell><LineSkeleton height={14} width={100} /></TableCell>
        <TableCell><LineSkeleton height={14} width={100} /></TableCell>
        <TableCell><LineSkeleton height={14} width={100} /></TableCell>
        <TableCell><LineSkeleton height={14} width={100} /></TableCell>
      </TableRow>
    )

  );
};

export default DailyEvolutionDataTable;
