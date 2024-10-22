import api from "@/appwrite/appwrite";
import LineSkeleton from "@/components/skeleton/LineSkeleton";
import { TableCell, TableRow } from "@/components/ui/table";
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
      <TableCell>{dateStringFormat(dailyEvolution.$createdAt)}</TableCell>
      <TableCell>
        {userName}
      </TableCell>
      <TableCell>{dailyEvolution.heart_rate} bpm</TableCell>
      <TableCell>{dailyEvolution.respiratory_rate} rpm</TableCell>
      <TableCell>{dailyEvolution.blood_pressure} mmHg</TableCell>
      <TableCell>{dailyEvolution.oximetry}%</TableCell>
      <TableCell>{dailyEvolution.temperature}°C</TableCell>
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
