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
import { cn } from "@/lib/utils";

type OnSuccessCallback = () => void;

interface AddNewInsuranceProps {
  onSuccess?: OnSuccessCallback;
  className?: string;
}

export function AddNewInsurance({
  onSuccess,
  className,
}: AddNewInsuranceProps) {
  const [submiting, setSubmiting] = useState<boolean | false>(false);
  const [open, setOpen] = useState(false);

  const InsuranceFormValidation = z.object({
    name: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
  });

  const form = useForm<z.infer<typeof InsuranceFormValidation>>({
    resolver: zodResolver(InsuranceFormValidation),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof InsuranceFormValidation>) {
    try {
      setSubmiting(true);
      const response = await api.insuranceProvider.new(data);

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
        <Button
          className={cn(
            "hover:shadow-xl transition duration-200 shadow-input clean-shadcn rounded-md bg-table-header-light dark:bg-table-header-dark flex items-center h-full",
            className
          )}
          variant="default">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shad-dialog">
        <DialogHeader>
          <DialogTitle>Obra social</DialogTitle>
          <DialogDescription>
            Completa todos los campos y agrega una nueva obra social.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="name"
              label="Nombre"
              placeholder="Swiss Medical Medicina Privada"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
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
