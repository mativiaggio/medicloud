"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, HeartPulse } from "lucide-react";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

export default function Component() {
  return (
    <div className="min-h-screen bg-white dark:bg-main-bg-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-main-border-light dark:border-main-border-dark">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <HeartPulse size={42} />
          </div>
          <CardTitle className="text-2xl text-center">Ingresa a MediCloud</CardTitle>
          <CardDescription className="text-center">por Hospice Madre Teresa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="#" className="font-semibold text-primary hover:text-primary/80 hover:underline">
                Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="text-sm">
              <Link href="/" className="font-semibold text-primary hover:text-primary/80 hover:underline flex items-center">
                <ArrowLeft size={18} />
                Volver
              </Link>
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
