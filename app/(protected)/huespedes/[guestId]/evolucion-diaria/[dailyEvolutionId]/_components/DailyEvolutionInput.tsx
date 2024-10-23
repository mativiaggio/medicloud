import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Daily_Evolution, Guest } from "@/types/appwrite.types";
import { Activity, Heart, Thermometer, Wind } from "lucide-react";
import CommentSection from "./CommentSection";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>Ficha técnica</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Frecuencia cardíaca
              </div>
            </TableCell>
            <TableCell>{dailyEvolution.heart_rate} bpm</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-500" />
                Frecuencia respiratoria
              </div>
            </TableCell>
            <TableCell>{dailyEvolution.respiratory_rate} rpm</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                Tensión arterial
              </div>
            </TableCell>
            <TableCell>{dailyEvolution.blood_pressure} mmHg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                Oximetría
              </div>
            </TableCell>
            <TableCell>{dailyEvolution.oximetry} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-yellow-500" />
                Temperatura
              </div>
            </TableCell>
            <TableCell>{dailyEvolution.temperature} °C</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="pt-4">
        <h1 className="text-base font-bold">Contenido escrito a mano</h1>
        <p>{dailyEvolution.content}</p>
      </div>
      <div className="pt-4">
        <h1 className="text-base font-bold">Comentarios</h1>
        <CommentSection
          dailyEvolution={dailyEvolution}
          dailyEvolutionLoading={dailyEvolutionLoading}
        />
      </div>
    </>
  );
};

export default DailyEvolutionInput;
