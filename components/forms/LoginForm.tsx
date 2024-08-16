"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { login } from "@/lib/actions/user.actions";
import api from "@/appwrite/appwrite";

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
      // const result = await login(data);
      const result = await api.createSession(data);

      if (result) {
        router.push("/inicio");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="Email"
          formItemCustomClasses="!mb-[30px]"
          iconType="email"
          iconAlt="Email icon"
          iconColor={"#013a63"}
          control={form.control}
          fieldCustomClasses={"border border-main-2"}
          inputCustomClasses={
            "placeholder:text-main-2 !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
          }
        />
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          name="password"
          label="Contraseña"
          placeholder="Contraseña"
          formItemCustomClasses="!mb-[30px]"
          iconType="lock"
          iconAlt="Password icon"
          iconColor={"#013a63"}
          control={form.control}
          fieldCustomClasses={"border border-main-2 placeholder:text-main-2"}
          inputCustomClasses={
            "placeholder:text-main-2 !rounded-none ml-2 focus:bg-transparent active:bg-transparent"
          }
        />
        <Button
          className="bg-main-4 hover:bg-main-5 w-full max-w-sm mt-[30px]"
          type="submit"
          disabled={submiting}>
          {submiting ? "Cargando..." : "Iniciar sesión"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
