import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCallback, useState } from "react";
import DailyEvolutionForm from "./DailyEvolutionForm";

type OnSuccessCallback = () => void;

interface AddNewDailyEvolutionProps {
  onSuccess?: OnSuccessCallback;
}

export function DailyEvolutionInput({ onSuccess }: AddNewDailyEvolutionProps) {
  const [open, setOpen] = useState(false); // Estado para controlar el Sheet

  const handleSuccess = useCallback(async () => {
    try {
      if (onSuccess) {
        onSuccess();
      }
      setOpen(false); // Cerrar el Sheet después de guardar el registro
    } catch (error) {
      console.error(error);
    }
  }, [onSuccess]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="!w-fit bg-main-bg-dark text-color-dark dark:bg-main-bg-light dark:text-color-light"
          onClick={() => setOpen(true)} // Abrir el Sheet
        >
          Nuevo registro
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full bg-main-workspace-light dark:bg-main-workspace-dark md:w-2/3">
        <SheetHeader>
          <SheetTitle>Nuevo registro</SheetTitle>
          <SheetClose asChild>
            <Button className="hidden" />
          </SheetClose>
        </SheetHeader>
        <DailyEvolutionForm onSuccess={handleSuccess} />
      </SheetContent>
    </Sheet>
  );
}
