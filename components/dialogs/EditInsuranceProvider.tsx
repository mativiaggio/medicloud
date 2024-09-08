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
import { Pencil, Plus } from "lucide-react";
import { Form } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "../forms/CustomFormField";
import { MoonLoader } from "react-spinners";
import api from "@/appwrite/appwrite";
import { useState } from "react";
import { InsuranceProviders } from "@/types/appwrite.types";

type OnSuccessCallback = () => void;

interface EditInsuranceProviderProps {
  insuranceProvider: InsuranceProviders;
  onSuccess?: OnSuccessCallback;
}

export function EditInsuranceProvider({
  insuranceProvider,
  onSuccess,
}: EditInsuranceProviderProps) {
  const [submiting, setSubmiting] = useState<boolean | false>(false);
  const [open, setOpen] = useState(false);

  const InsuranceProviderFormValidation = z.object({
    name: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    private: z.boolean(),
  });

  const form = useForm<z.infer<typeof InsuranceProviderFormValidation>>({
    resolver: zodResolver(InsuranceProviderFormValidation),
    defaultValues: {
      name: insuranceProvider.name,
      private: insuranceProvider.private,
    },
  });

  async function onSubmit(
    data: z.infer<typeof InsuranceProviderFormValidation>
  ) {
    try {
      setSubmiting(true);
      const response = await api.insuranceProvider.update(
        insuranceProvider.$id,
        data
      );

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
        <div className="flex items-center gap-2 hover:bg-main-bg-dark hover:text-color-dark dark:hover:bg-main-bg-light dark:hover:text-color-light p-2 rounded-md transform transition-all cursor-pointer">
          <Pencil size={18} /> Editar
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shad-dialog">
        <DialogHeader>
          <DialogTitle>Editar obra social</DialogTitle>
          <DialogDescription>
            Completa todos los campos y edita la obra social.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="name"
              label="Nombre"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              name="private"
              label="Institucion privada"
              control={form.control}
            />
            <DialogFooter className="flex items-center">
              <div className="mr-1">
                {submiting ? <MoonLoader size={20} color="#9ca3af" /> : ""}
              </div>
              <Button
                className="text-color-dark dark:text-color-light bg-button-bg-dark dark:bg-button-bg-light hover:bg-button-hover-dark dark:hover:bg-button-hover-light"
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
