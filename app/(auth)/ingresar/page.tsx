// "use client";

// import Login from "@/components/login/Login";
// import React, { useEffect, useState } from "react";
// import { MoonLoader } from "react-spinners";
// import { useRouter } from "next/navigation";
// import api from "@/appwrite/appwrite";

// const Page = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const user = await api.getAccount();
//         router.push("/inicio");
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getUser();
//   }, [router]);

//   return (
//     <div className="flex h-screen max-h-screen">
//       <Login />
//     </div>
//   );
// };

// export default Page;

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppleIcon, HeartPulse, Mail } from "lucide-react";
import LoginForm from "@/components/forms/LoginForm";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-main-bg-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-main-border-light dark:border-main-border-dark">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <HeartPulse size={42} />
          </div>
          <CardTitle className="text-2xl text-center">
            Ingresa a MediCloud
          </CardTitle>
          <CardDescription className="text-center">
            por Hospice Madre Teresa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-primary hover:text-primary/80">
                Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-center text-muted-foreground">
            Al iniciar sesión, aceptas nuestros{" "}
            <a href="#" className="underline hover:text-primary">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="underline hover:text-primary">
              Política de Privacidad.
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
