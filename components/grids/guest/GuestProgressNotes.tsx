import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  Clock,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Guest } from "@/types/appwrite.types";

type Estado = "mejora" | "estable" | "empeora";

// Datos de ejemplo para los registros de evolución diaria
const evolucionDiaria: {
  id: number;
  titulo: string;
  contenido: string;
  fechaHora: string;
  estado: Estado; // Explicitly define estado type
  doctor: string;
  indicadores: {
    presionArterial: string;
    frecuenciaCardiaca: string;
    temperatura: string;
  };
}[] = [
  {
    id: 1,
    titulo: "Mejora en signos vitales",
    contenido:
      "El paciente muestra una mejora significativa en sus signos vitales. Presión arterial normalizada.",
    fechaHora: "2023-06-15 14:30",
    estado: "mejora",
    doctor: "Enf. María López",
    indicadores: {
      presionArterial: "120/80 mmHg",
      frecuenciaCardiaca: "72 bpm",
      temperatura: "36.5°C",
    },
  },
  {
    id: 2,
    titulo: "Cambio de medicación",
    contenido:
      "Se ha ajustado la dosis de medicamento X debido a efectos secundarios leves.",
    fechaHora: "2023-06-14 10:15",
    estado: "estable",
    doctor: "Dr. Carlos Rodríguez",
    indicadores: {
      presionArterial: "130/85 mmHg",
      frecuenciaCardiaca: "75 bpm",
      temperatura: "36.7°C",
    },
  },
  {
    id: 3,
    titulo: "Resultados de laboratorio",
    contenido:
      "Los resultados de laboratorio muestran una empeora en los niveles de glucosa en sangre.",
    fechaHora: "2023-06-13 16:45",
    estado: "empeora",
    doctor: "Enf. Ana Martínez",
    indicadores: {
      presionArterial: "125/82 mmHg",
      frecuenciaCardiaca: "70 bpm",
      temperatura: "36.6°C",
    },
  },
];

const estadoIcono: { [key in Estado]: JSX.Element } = {
  mejora: <ChevronUp className="text-green-500" />,
  estable: <Minus className="text-yellow-500" />,
  empeora: <ChevronDown className="text-red-500" />,
};

interface GuestProp {
  data: Guest;
}

export default function GuestProgressNotes({ data }: GuestProp) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="group/bento dark:border-main-border-dar col-span-1 rounded-xl border border-main-border-light border-transparent bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-main-bg-dark dark:shadow-none lg:col-span-3">
        <div className="guest-dashboard-container flex h-full flex-col gap-2 overflow-auto">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center text-2xl">
              <ClipboardList className="mr-2" />
              Evolución Diaria{" "}
              <div className="flex h-full items-end">
                <span className="pb-[0.20em] text-xs text-[#b1b1b1] pl-2">
                  (ultimos 3 registros)
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4 h-72 overflow-hidden p-0">
            <div className="guest-dashboard-container flex h-full flex-col gap-2 space-y-6 overflow-auto">
              {evolucionDiaria.map((registro) => (
                <Card
                  key={registro.id}
                  className={cn(
                    "border-l-4",
                    registro.estado === "mejora"
                      ? "border-green-500"
                      : registro.estado === "estable"
                        ? "border-yellow-500"
                        : "border-red-500",
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center text-xl">
                        {registro.titulo}
                        {estadoIcono[registro.estado]}{" "}
                      </CardTitle>
                      <Badge variant="outline" className="text-sm">
                        {registro.doctor}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">{registro.contenido}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-semibold">Presión Arterial</p>
                        <p>{registro.indicadores.presionArterial}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Frecuencia Cardíaca</p>
                        <p>{registro.indicadores.frecuenciaCardiaca}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Temperatura</p>
                        <p>{registro.indicadores.temperatura}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <Badge variant="secondary" className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {registro.fechaHora}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href={`/huespedes/${data?.$id}/evolucion-diaria`}>
              Ver todos los registros
            </Link>
          </CardFooter>
        </div>
      </div>
    </div>
  );
}
