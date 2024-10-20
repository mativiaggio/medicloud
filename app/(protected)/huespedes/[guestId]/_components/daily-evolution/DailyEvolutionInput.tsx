import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DailyEvolutionForm from "./DailyEvolutionForm";

export function DailyEvolutionInput() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="!w-fit bg-main-bg-dark text-color-dark hover:bg-color-dark dark:bg-main-bg-light dark:text-color-light dark:hover:bg-color-light"
        >
          Nuevo registro
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full bg-main-workspace-light dark:bg-main-workspace-dark md:w-2/3">
        <SheetHeader>
          <SheetTitle>Nuevo registro</SheetTitle>
          <SheetDescription>
            Asegurate de completar todos los campos obligatorios. Recuerda, una
            vez guardado el registro no podrá ser modificado.
          </SheetDescription>
        </SheetHeader>
        <DailyEvolutionForm />
      </SheetContent>
    </Sheet>
  );
}
