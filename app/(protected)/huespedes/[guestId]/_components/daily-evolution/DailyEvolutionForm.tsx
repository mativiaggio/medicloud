import CustomFormField, {
  FormFieldType,
} from "@/components/forms/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const DailyEvolutionFormValidation = z.object({
  daily_evolution_comments: z.string().optional(),
  user_id: z.string().min(1, "El campo 'user_id' no puede ser vacío."),
  heart_rate: z
    .number()
    .min(0, "La frecuencia cardíaca debe ser mayor a 0.")
    .max(300, "La frecuencia cardíaca debe ser menor a 300."),
  respiratory_rate: z
    .number()
    .min(0, "La frecuencia respiratoria debe ser mayor a 0.")
    .max(100, "La frecuencia respiratoria debe ser menor a 100."),
  blood_pressure: z
    .string()
    .max(8, "La tensión arterial no debe tener mas de 8 caracteres."),
  oximetry: z
    .number()
    .min(0, "La oximetría debe ser mayor a 0")
    .max(100, "La oximetría debe ser menor a 100."),
  temperature: z
    .number()
    .min(0, "La temperatura debe ser mayor a 0")
    .max(80, "La temperatura no debe ser mayor a 80."),
  guest: z.string(),
  content: z
    .string()
    .max(510, "El contenido no debe tener una lonitud mayor a 510 caracteres."),
});

const DailyEvolutionForm = () => {
  const [submiting, setSubmiting] = useState<boolean | false>(false);

  const form = useForm<z.infer<typeof DailyEvolutionFormValidation>>({
    resolver: zodResolver(DailyEvolutionFormValidation),
    defaultValues: {
      daily_evolution_comments: "",
      user_id: "",
      guest: "",
    },
  });

  async function onSubmit(data: z.infer<typeof DailyEvolutionFormValidation>) {
    setSubmiting(true);
    try {
      // Manually cast string inputs to numbers
      const formattedData = {
        ...data,
        heart_rate: Number(data.heart_rate),
        respiratory_rate: Number(data.respiratory_rate),
        oximetry: Number(data.oximetry),
        temperature: Number(data.temperature),
      };

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <section>
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              name="heart_rate"
              label="Frecuencia cardíaca"
              placeholder="98"
              control={form.control}
              fieldCustomClasses={
                "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
              }
              inputCustomClasses={
                "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
              }
            />
          </section>
          <Button
            className="mt-[30px] w-full bg-button-bg-dark text-color-dark hover:bg-button-hover-dark dark:bg-button-bg-light dark:text-color-light dark:hover:bg-button-hover-light"
            type="submit"
            disabled={submiting}
          >
            {submiting ? "Cargando..." : "Agregar"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default DailyEvolutionForm;
