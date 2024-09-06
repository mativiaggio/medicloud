"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronsDown, Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/appwrite/appwrite";
import React, { useCallback, useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useMedication } from "@/context/MedicationsContext";
import { Guest, GuestMedications, Medication } from "@/types/appwrite.types";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { AddNewMedication } from "../../dialogs/AddNewMedication";
import { MoonLoader } from "react-spinners";
import { Query } from "appwrite";

// Esquema de validación utilizando Zod
const medicationSchema = z.object({
  name: z.string().min(1, "Selecciona el medicamento"),
  description: z.string().min(1, "La descripción es requerida"),
  guest: z.string().min(1, "Ocurrió un error y no se reconoce al huésped."),
});

type MedicationFormValues = z.infer<typeof medicationSchema>;

type OnSuccessCallback = () => void;

interface AddNewMedicationProps {
  data: Guest | null;
  onSuccess: (newMedication: GuestMedications) => void;
}

export function AddNewGuestMedication({
  data,
  onSuccess,
}: AddNewMedicationProps) {
  const [open, setOpen] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const { allMedications, allMedicationsLoading } = useMedication();
  const [selectedMedication, setSelectedMedication] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [submiting, setSubmiting] = useState<boolean | false>(false);

  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: "",
      description: "",
      guest: data?.$id || "",
    },
  });

  useEffect(() => {
    if (!allMedicationsLoading && allMedications) {
      const sortedMedications = allMedications.documents.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setMedications(sortedMedications);
    }
  }, [allMedications, allMedicationsLoading]);

  async function addMedication(formData: MedicationFormValues) {
    try {
      setSubmiting(true);
      const response = await api.guest_medication.new(formData);
      if (response && onSuccess) {
        setSubmiting(false);
        onSuccess(response);
      }
      setOpen(false);
      form.reset();
      setSelectedMedication("");
    } catch (error) {
      console.error(error);
    }
  }

  const updateMedications = useCallback(async () => {
    try {
      const result = await api.medication.getAll([Query.orderAsc("name")]);
      setMedications(result.documents);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          form.reset();
          setSelectedMedication("");
        }
      }}>
      <DialogTrigger asChild>
        <div className="hover:rotate-180 transition duration-200 shadow-input clean-shadcn rounded-md bg-table-header-light dark:bg-table-header-dark flex items-center h-full">
          <Button className="px-4">
            <Plus />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shad-dialog rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Nuevo medicamento</DialogTitle>
          <DialogDescription className="text-base">
            Selecciona el medicamento que deseas agregar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={popoverOpen}
                className="w-full justify-between text-base">
                {selectedMedication
                  ? medications.find(
                      (medication) => medication.name === selectedMedication
                    )?.name
                  : "Selecciona un medicamento..."}
                <ChevronsDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[400px] w-full p-0 bg-white dark:bg-main-bg-dark">
              <Command>
                <CommandInput
                  placeholder="Buscar medicamento..."
                  className="h-9 text-base"
                />
                <CommandList>
                  <CommandEmpty>No se encontraron medicamentos.</CommandEmpty>
                  <CommandGroup>
                    {medications.map((medication) => (
                      <CommandItem
                        className="cursor-pointer text-base"
                        key={medication.$id}
                        id={medication.$id}
                        value={medication.name}
                        onSelect={(currentValue) => {
                          setSelectedMedication(currentValue);
                          form.setValue("name", currentValue);
                          setPopoverOpen(false);
                        }}>
                        {medication.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <AddNewMedication
            className="!bg-main-bg-dark !text-color-dark dark:!bg-white dark:!text-color-light"
            onSuccess={updateMedications}
          />
        </div>
        {/* Formulario para capturar los datos del medicamento */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addMedication)}>
            <div className="my-4">
              <Input
                placeholder="Descripción del medicamento"
                className="mb-2 text-base"
                {...form.register("description")}
              />
            </div>
            <span className="flex justify-end items-center">
              <div className="mr-1">
                {submiting ? <MoonLoader size={20} color="#9ca3af" /> : ""}
              </div>
              <Button
                type="submit"
                className="bg-main-bg-dark text-color-dark dark:bg-white dark:text-color-light">
                Agregar
              </Button>
            </span>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
