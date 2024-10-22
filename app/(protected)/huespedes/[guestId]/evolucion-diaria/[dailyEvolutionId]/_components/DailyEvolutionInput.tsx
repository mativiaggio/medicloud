import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Daily_Evolution, Guest } from "@/types/appwrite.types";
import { Activity, Heart, Thermometer, Wind } from "lucide-react";

interface InputProps {
  guest: Guest;
  guestLoading: boolean;
  dailyEvolution: Daily_Evolution;
  dailyEvolutionLoading: boolean;
}

const DailyEvolutionInput = ({
  guest,
  guestLoading,
  dailyEvolution,
  dailyEvolutionLoading,
}: InputProps) => {
  return (
    <>
      <div className="flex w-full items-center gap-2 pb-2">
        <Card className="w-1/3 border-none bg-red-500">
          <CardHeader className="!p-3">
            <CardTitle className="flex justify-center gap-2 text-xl">
              <Heart className="h-15 w-15 text-white" />
              Frecuencia cardíaca
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="!p-3">
            <p className="text-center text-lg font-bold">
              {dailyEvolution.heart_rate} bpm
            </p>
          </CardContent>
        </Card>

        <Card className="w-1/3 border-none bg-blue-500">
          <CardHeader className="!p-3">
            <CardTitle className="flex justify-center gap-2 text-xl">
              <Wind className="h-15 w-15 text-white" /> Frecuencia respiratoria
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="!p-3">
            <p className="text-center text-lg font-bold">
              {dailyEvolution.respiratory_rate} rpm
            </p>
          </CardContent>
        </Card>

        <Card className="w-1/3 border-none bg-green-500">
          <CardHeader className="!p-3">
            <CardTitle className="flex justify-center gap-2 text-xl">
              <Activity className="h-5 w-5 text-white" /> Tensión arterial
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="!p-3">
            <p className="text-center text-lg font-bold">
              {dailyEvolution.blood_pressure} mmHg
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-full items-center gap-2">
        <Card className="w-1/2 border-none bg-purple-500">
          <CardHeader className="!p-3">
            <CardTitle className="flex justify-center gap-2 text-xl">
              <Activity className="h-5 w-5 text-white" /> Oximetría
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="!p-3">
            <p className="text-center text-lg font-bold">
              {dailyEvolution.oximetry}%
            </p>
          </CardContent>
        </Card>

        <Card className="w-1/2 border-none bg-yellow-500">
          <CardHeader className="!p-3">
            <CardTitle className="flex justify-center gap-2 text-xl">
              <Thermometer className="h-15 w-15 text-white" /> Temperatura
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="!p-3">
            <p className="text-center text-lg font-bold">
              {dailyEvolution.temperature} °C
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DailyEvolutionInput;
