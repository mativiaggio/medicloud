"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/AuthProvider";
import api from "@/lib/appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "./CustomFormField";

export enum FormFieldType {
  INPUT = "input",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
}

const UserFormValidation = z.object({
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

const LoginForm = () => {
  const [submiting, setSubmiting] = useState<boolean | false>(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof UserFormValidation>) {
    try {
      setSubmiting(true);
      const result = await api.auth.createSession(data);
      if (result) {
        const user = await api.auth.getCurrentSession();
        if (user) {
          setUser(user);
          router.push("/inicio");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmiting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          labelCustomClasses="text-color-light dark:text-color-dark"
          placeholder="prueba@mail.com"
          formItemCustomClasses="!mb-[30px]"
          control={form.control}
          fieldCustomClasses={
            "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
          }
          inputCustomClasses={
            "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none focus:bg-transparent active:bg-transparent"
          }
        />
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          name="password"
          label="Contraseña"
          labelCustomClasses="text-color-light dark:text-color-dark"
          placeholder="Contraseña"
          formItemCustomClasses="!mb-[30px]"
          control={form.control}
          fieldCustomClasses={
            "border border-main-2 !border-input-border-light dark:!border-input-border-dark bg-input-bg-light dark:bg-input-bg-dark"
          }
          inputCustomClasses={
            "text-color-light dark:text-color-dark placeholder:text-!placeholder-input-placeholder-light !rounded-none focus:bg-transparent active:bg-transparent"
          }
        />
        <Button
          className="mt-[30px] w-full bg-button-bg-dark text-color-dark hover:bg-button-hover-dark dark:bg-button-bg-light dark:text-color-light hover:dark:bg-button-hover-light"
          type="submit"
          disabled={submiting}
        >
          {submiting ? "Cargando..." : "Iniciar sesión"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
