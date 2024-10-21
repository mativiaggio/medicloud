import { format } from "date-fns";
import { Activity, Heart, Thermometer, Wind } from "lucide-react";
import { useEffect, useState } from "react";

import LineSkeleton from "@/components/skeleton/LineSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/appwrite";
import { dateStringFormat } from "@/lib/utils";
import { Daily_Evolution } from "@/types/appwrite.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DailyEvolutionSkeletonCard from "./DailyEvolutionSkeletonCard";

interface User {
  name: string;
  email?: string;
}

export default function DailyEvolutionCard({
  dailyEvolution,
}: {
  dailyEvolution: Daily_Evolution;
}) {
  const [showComments, setShowComments] = useState(false);
  const [responsable, setResponsable] = useState<User | null>(null);
  const [responsableLoading, setResponsableLoading] = useState(true);

  const currentPath = usePathname();

  useEffect(() => {
    const fetchResponsable = async () => {
      try {
        const response = await api.users.findById(dailyEvolution.user_id);
        if (response) {
          setResponsable(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setResponsableLoading(false);
      }
    };

    fetchResponsable();
  }, [dailyEvolution.user_id]);

  const comments = dailyEvolution.daily_evolution_comments;
  for (let index = 0; index < comments.length; index++) {
    const element = comments[index];
  }

  return responsableLoading ? (
    <DailyEvolutionSkeletonCard />
  ) : (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex w-full items-center justify-between">
          {dateStringFormat(dailyEvolution.$createdAt)}
          <div>
            {responsable?.name ? (
              responsable.name
            ) : (
              <LineSkeleton height={25} width={200} />
            )}
          </div>
        </CardTitle>
        <CardDescription>
          {format(new Date(dailyEvolution.$createdAt), "PPP")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-4 !overflow-auto">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Frecuencia cardiaca: {dailyEvolution.heart_rate} bpm</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-blue-500" />
            <span>
              Frecuencia respiratoria: {dailyEvolution.respiratory_rate} bpm
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-500" />
            <span>Tensión arterial: {dailyEvolution.blood_pressure} mmHg</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-purple-500" />
            <span>Oximetría: {dailyEvolution.oximetry}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5 text-yellow-500" />
            <span>Temperatura: {dailyEvolution.temperature}°C</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Link href={`${currentPath}/${dailyEvolution.$id}`}>Ver más</Link>
      </CardFooter>
    </Card>
  );
}
