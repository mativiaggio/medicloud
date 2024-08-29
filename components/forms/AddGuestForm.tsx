"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { login } from "@/lib/actions/user.actions";
import api from "@/appwrite/appwrite";
import { GenderOptions } from "@/constants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

// export enum FormFieldType {
//   INPUT = "input",
//   PASSWORD = "password",
//   TEXTAREA = "textarea",
//   RADIO = "radio",
//   CHECKBOX = "checkbox",
//   PHONE_INPUT = "phoneInput",
//   DATE_PICKER = "datePicker",
//   SELECT = "select",
//   SKELETON = "skeleton",
// }

const GuestFormValidation = z.object({
  email: z
    .string()
    .email({
      message: "Debe ser un correo electrónico válido.",
    })
    .min(2, {
      message: "El correo electrónico debe tener al menos 2 caracteres.",
    }),
  password: z.string().min(1, {
    message: "La contraseña no puede estar vacía.",
  }),
});

const AddGuestForm = () => {
  const [submiting, setSubmiting] = useState<boolean | false>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof GuestFormValidation>>({
    resolver: zodResolver(GuestFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof GuestFormValidation>) {
    try {
      setSubmiting(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Nombre Completo"
          labelCustomClasses="text-color-light dark:text-color-dark"
          placeholder=""
          formItemCustomClasses="!mb-[30px]"
          control={form.control}
          fieldCustomClasses={
            "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
          }
          inputCustomClasses={
            "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
          }
        />
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Fecha de Nacimiento"
            labelCustomClasses="text-color-light dark:text-color-dark"
            placeholder="Selecciona la fecha de nacimiento"
            formItemCustomClasses="!mb-[30px] w-full"
            iconType="calendar"
            iconAlt="Calendar icon"
            iconLightColor={"#FFFFFF"}
            iconDarkColor={"#1a1d21"}
            control={form.control}
            fieldCustomClasses={
              "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
            }
            inputCustomClasses={
              "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
            }
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Género"
            labelCustomClasses="text-color-light dark:text-color-dark"
            placeholder=""
            formItemCustomClasses="!mb-[30px] w-full"
            control={form.control}
            fieldCustomClasses={
              "w-full border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
            }
            inputCustomClasses={
              "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
            }
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between w-fit"
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group !w-fit">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <Button
          className="text-color-dark dark:text-color-light bg-button-bg-dark dark:bg-button-bg-light hover:bg-button-hover-dark dark:hover:bg-button-hover-light w-full mt-[30px]"
          type="submit"
          disabled={submiting}>
          {submiting ? "Cargando..." : "Agregar"}
        </Button>
      </form>
    </Form>
  );
};

export default AddGuestForm;
