"use client";

import { account } from "@/lib/appwrite.config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InicioPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Añadir un pequeño retraso
        const session = await account.get();
        if (session.$id) {
          router.push("/inicio");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error during session check:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div>
      {/* Contenido de la página de inicio */}
      <h1>Bienvenido a la página de inicio</h1>
    </div>
  );
}
