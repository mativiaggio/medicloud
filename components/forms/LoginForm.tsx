"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { login } from "@/lib/actions/user.actions";
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
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({
    email,
    password,
  }: z.infer<typeof UserFormValidation>) {
    try {
      const userData = { email, password };
      const user: any = await login(userData);
      if (user) {
        alert("User");
      }
    } catch (error) {
      console.log(error);
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
          inputCustomClasses={"placeholder:text-main-2"}
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
          inputCustomClasses={"placeholder:text-main-2"}
        />
        <Button
          className="bg-main-4 hover:bg-main-5 w-full max-w-sm mt-[30px]"
          type="submit">
          Iniciar sesión
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
