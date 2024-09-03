import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

interface ErrorProps {
  title?: string;
  message?: string;
}

export function Error({ title, message }: ErrorProps) {
  return (
    <div className="w-fit">
      <Alert variant="destructive">
        <TriangleAlert color="#c1121f" className="h-8 w-8" />
        <AlertTitle className="text-2xl !pl-10">{title || "Error Inesperado"}</AlertTitle>
        <AlertDescription className="!pl-10">
          {message || (
            <>
              No pudimos encontrar el registro solicitado en nuestra base de datos.
              <br />
              Si estás seguro de que el registro existe, por favor contacta al administrador para obtener ayuda.
            </>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
