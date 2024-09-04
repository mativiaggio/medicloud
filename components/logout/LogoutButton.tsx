"use client";
import api from "@/appwrite/appwrite";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const router = useRouter();
  return (
    <Button
      className="w-full text-color-dark dark:text-color-light bg-button-bg-dark hover:bg-button-hover-dark dark:bg-button-bg-light hover:dark:bg-button-hover-light flex items-center gap-2"
      onClick={async () => {
        const logout = await api.deleteCurrentSession();
        if (logout) {
          router.replace("/");
        }
      }}>
      Cerrar sesión
      <LogOut size={16} />
    </Button>
  );
};

export default LogoutButton;
