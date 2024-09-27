import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import api from "@/lib/appwrite";
import { InsuranceProviders } from "@/types/appwrite.types";
import { Trash } from "lucide-react";

type OnSuccessCallback = () => void;

interface DeleteInsuranceProviderProps {
  insuranceProvider: InsuranceProviders;
  onSuccess?: OnSuccessCallback;
}

export function DeleteInsuranceProvider({
  insuranceProvider,
  onSuccess,
}: DeleteInsuranceProviderProps) {
  const deleteInsuranceProvider = async () => {
    try {
      const result = await api.insuranceProvider.delete(insuranceProvider.$id);

      if (result) {
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex transform cursor-pointer items-center gap-2 rounded-md p-2 text-red-700 transition-all hover:bg-red-700 hover:text-color-dark">
          <Trash size={18} /> Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg bg-white text-color-light dark:bg-main-bg-dark dark:text-color-dark">
        <AlertDialogHeader>
          <AlertDialogTitle>¡Cuidado!</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de eliminar un registro, una vez eliminado no será
            posible recuperarlo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-button-bg-dark text-color-dark dark:bg-button-bg-light dark:text-color-light">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="font-bold text-red-700"
            onClick={deleteInsuranceProvider}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
