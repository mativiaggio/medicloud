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
import api from "@/lib/appwrite";
import { InsuranceProviders } from "@/types/appwrite.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { z } from "zod";
import CustomFormField, { FormFieldType } from "../forms/CustomFormField";
import { Form } from "../ui/form";

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
    data: z.infer<typeof InsuranceProviderFormValidation>,
  ) {
    try {
      setSubmiting(true);
      const response = await api.insuranceProvider.update(
        insuranceProvider.$id,
        data,
      );

      if (response) {
        setSubmiting(false);
        if (onSuccess) {
          onSuccess();
        }
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleDialogClose(openState: boolean) {
    if (!openState) {
      form.reset();
    }
    setOpen(openState);
  }

  useEffect(() => {
    if (open) {
      form.reset({
        name: insuranceProvider.name,
        private: insuranceProvider.private,
      });
    }
  }, [insuranceProvider, open, form]);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <div className="flex transform cursor-pointer items-center gap-2 rounded-md p-2 transition-all hover:bg-main-bg-dark hover:text-color-dark dark:hover:bg-main-bg-light dark:hover:text-color-light">
          <Pencil size={18} /> Editar
        </div>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar obra social</DialogTitle>
          <DialogDescription className="text-base">
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
                className="bg-button-bg-dark text-color-dark hover:bg-button-hover-dark dark:bg-button-bg-light dark:text-color-light dark:hover:bg-button-hover-light"
                type="submit"
              >
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
