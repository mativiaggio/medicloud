import api from "@/appwrite/appwrite";
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SheetClose } from "@/components/ui/sheet"; // Importa SheetClose
import { useAuth } from "@/context/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const DailyEvolutionFormValidation = z.object({
  user_id: z.string().min(1, "El campo 'user_id' no puede ser vacío."),
  guest_id: z.string().min(1, "El campo 'guest_id' no puede ser vacío."),
  heart_rate: z.string().min(1, "Este campo es obligatorio"),
  respiratory_rate: z.string().min(1, "Este campo es obligatorio"),
  blood_pressure: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(8, "Este campo es demasiado largo"),
  oximetry: z.string().min(1, "Este campo es obligatorio"),
  temperature: z.string().min(1, "Este campo es obligatorio"),
  guest: z.string().min(1, "Este campo es obligatorio"),
  content: z.string().max(510, "Este campo es obligatorio"),
});

type OnSuccessCallback = () => void;

interface AddNewDailyEvolutionProps {
  onSuccess?: OnSuccessCallback;
}

const DailyEvolutionForm = ({ onSuccess }: AddNewDailyEvolutionProps) => {
  const [submiting, setSubmiting] = useState<boolean>(false);
  const { guestId } = useParams();
  const { user } = useAuth();

  const guestIdString = Array.isArray(guestId) ? guestId[0] : guestId;
  const form = useForm<z.infer<typeof DailyEvolutionFormValidation>>({
    resolver: zodResolver(DailyEvolutionFormValidation),
    defaultValues: {
      user_id: user?.$id || "",
      guest_id: guestIdString || "",
      guest: guestIdString || "",
      heart_rate: "",
      respiratory_rate: "",
      blood_pressure: "",
      oximetry: "",
      temperature: "",
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof DailyEvolutionFormValidation>) {
    setSubmiting(true);
    try {
      const formattedData = {
        ...data,
        heart_rate: Number(data.heart_rate),
        respiratory_rate: Number(data.respiratory_rate),
        oximetry: Number(data.oximetry),
        temperature: Number(data.temperature),
      };

      await api.daily_evolution.new(formattedData);
      if (onSuccess) {
        onSuccess();
      }
      console.log(JSON.stringify(formattedData));
    } catch (error) {
      console.error("Error durante el envío del formulario:", error);
    } finally {
      setSubmiting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full pt-8">
          <span className="hidden">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="user_id"
              label="User ID"
              placeholder=""
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
          </span>
          <div className="grid grid-cols-2 gap-2">
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              name="heart_rate"
              label="Frecuencia cardíaca"
              placeholder=""
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              name="respiratory_rate"
              label="Frecuencia respiratoria"
              placeholder=""
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="blood_pressure"
              label="Tensión arterial"
              placeholder=""
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              name="oximetry"
              label="Oximetría"
              placeholder=""
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
          </div>
          <CustomFormField
            fieldType={FormFieldType.NUMBER}
            name="temperature"
            label="Temperatura"
            placeholder=""
            control={form.control}
            fieldCustomClasses={
              "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
            }
            inputCustomClasses={
              "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
            }
          />
          <span className="hidden">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="guest"
              label="Huésped"
              placeholder=""
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="guest_id"
              label="ID del Huésped"
              placeholder=""
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
          </span>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            name="content"
            label="Contenido"
            placeholder=""
            control={form.control}
            fieldCustomClasses={"bg-input-bg-light dark:bg-input-bg-dark"}
            inputCustomClasses={
              "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none focus:bg-transparent active:!bg-transparent !bg-transparent border border-main-2 !border-input-border-light dark:!border-input-border-dark"
            }
          />
          <Button
            className="mt-[30px] w-full bg-button-bg-dark text-color-dark hover:bg-button-hover-dark dark:bg-button-bg-light dark:text-color-light dark:hover:bg-button-hover-light"
            type="submit"
            disabled={submiting}
          >
            {submiting ? "Cargando..." : "Agregar"}
          </Button>
          <SheetClose asChild>
            <Button type="button" className="hidden" />
          </SheetClose>{" "}
          {/* Cierra el Sheet */}
        </form>
      </Form>
    </>
  );
};

export default DailyEvolutionForm;
