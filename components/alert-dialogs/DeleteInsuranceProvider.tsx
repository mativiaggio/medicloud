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
import { Trash } from "lucide-react";
import { InsuranceProviders } from "@/types/appwrite.types";
import api from "@/appwrite/appwrite";

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
        <Button className="flex items-center gap-2 text-red-700 hover:bg-red-700 hover:text-color-dark p-2 rounded-md transform transition-all cursor-pointer">
          <Trash size={18} /> Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-main-bg-dark text-color-light dark:text-color-dark rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>¡Cuidado!</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de eliminar un registro, una vez eliminado no será
            posible recuperarlo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-button-bg-dark dark:bg-button-bg-light text-color-dark dark:text-color-light">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-red-700 font-bold"
            onClick={deleteInsuranceProvider}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
