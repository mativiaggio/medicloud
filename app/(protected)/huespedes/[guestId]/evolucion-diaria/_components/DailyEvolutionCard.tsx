import { format } from "date-fns";
import {
  Activity,
  FileText,
  Heart,
  MessageSquare,
  Thermometer,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/appwrite";
import { dateStringFormat } from "@/lib/utils";
import { Daily_Evolution } from "@/types/appwrite.types";

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
  const [responsableLoading, setResponsableLoading] = useState(false);

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
    console.log(element);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex w-full items-center justify-between">
          {dateStringFormat(dailyEvolution.$createdAt)}
          <div>{responsable?.name ? responsable.name : ""}</div>
        </CardTitle>
        <CardDescription>
          {format(new Date(dailyEvolution.$createdAt), "PPP")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-4">
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
        <Separator className="my-4" />
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-500" />
            <span className="font-semibold">Contenido:</span>
          </div>
          <p className="text-sm text-gray-700">{dailyEvolution.content}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Button
          variant="outline"
          onClick={() => setShowComments(!showComments)}
          className="mb-2"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
