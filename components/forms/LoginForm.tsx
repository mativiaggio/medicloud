// ("use client");
// import React from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";

// import { z } from "zod";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

// const LoginForm = () => {
//   return (
//     <>
//       <form action="" className="w-full max-w-sm">
//         <div className="grid w-full max-w-sm items-center gap-1.5 mb-[30px]">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             type="email"
//             id="email"
//             placeholder="Email"
//             className="border-main-2 placeholder:text-main-2 bg-transparent focus:!outline-main-2"
//           />
//         </div>
//         <div className="grid w-full max-w-sm items-center gap-1.5 mb-[30px]">
//           <Label htmlFor="password">Contraseña</Label>
//           <Input
//             type="password"
//             id="password"
//             placeholder="Contraseña"
//             className="border-main-2 placeholder:text-main-2 bg-transparent focus:!outline-main-2"
//           />
//         </div>
//         <div className="flex justify-between w-full max-w-sm">
//           <div className="flex items-center space-x-2 mb-[30px]">
//             <Checkbox id="terms" className="rounded-[4px] border-main-2" />
//             <label
//               htmlFor="terms"
//               className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//             >
//               Recordar mi email
//             </label>
//           </div>
//           <a
//             href="#"
//             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:underline"
//           >
//             Olvide mi contraseña
//           </a>
//         </div>
//         <Button className="bg-main-4 hover:bg-main-5 w-full max-w-sm">
//           Iniciar sesión
//         </Button>
//       </form>
//     </>
//   );
// };

// export default LoginForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
}

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Debe ser un correo electrónico válido.",
    })
    .min(2, {
      message: "El correo electrónico debe tener al menos 2 caracteres.",
    }),
});
const LoginForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
          fieldType={FormFieldType.INPUT}
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
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
