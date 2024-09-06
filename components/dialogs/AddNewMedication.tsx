"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Form } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "../forms/CustomFormField";
import { MoonLoader } from "react-spinners";
import api from "@/appwrite/appwrite";
import { useState } from "react";

type OnSuccessCallback = () => void;

interface AddNewMedicationProps {
  className?: string;
  onSuccess?: OnSuccessCallback;
}

export function AddNewMedication({
  className,
  onSuccess,
}: AddNewMedicationProps) {
  const [submiting, setSubmiting] = useState<boolean | false>(false);
  const [open, setOpen] = useState(false);

  const MedicationFormValidation = z.object({
    name: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
  });

  const form = useForm<z.infer<typeof MedicationFormValidation>>({
    resolver: zodResolver(MedicationFormValidation),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof MedicationFormValidation>) {
    try {
      setSubmiting(true);
      const response = await api.medication.new(data);

      if (response) {
        setSubmiting(false);
        if (onSuccess) {
          onSuccess();
        }
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`hover:shadow-xl transition duration-200 shadow-input clean-shadcn rounded-md bg-table-header-light dark:bg-table-header-dark flex items-center h-full ${className}`}>
          <Button className="px-4">
            <Plus />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shad-dialog">
        <DialogHeader>
          <DialogTitle className="text-2xl">Nuevo medicamento</DialogTitle>
          <DialogDescription className="text-base">
            Completa todos los campos y agrega un nuevo medicamento.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="name"
              label="Nombre"
              labelCustomClasses="text-base"
              placeholder="Morfina"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent text-base"
              }
            />
            <DialogFooter className="flex items-center">
              <div className="mr-1">
                {submiting ? <MoonLoader size={20} color="#9ca3af" /> : ""}
              </div>
              <Button
                className="text-color-dark dark:text-color-light bg-button-bg-dark dark:bg-button-bg-light hover:bg-button-hover-dark dark:hover:bg-button-hover-light text-base"
                type="submit">
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
