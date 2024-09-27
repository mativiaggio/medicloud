"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import api from "@/lib/appwrite";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  return (
    <Button
      className="flex w-full items-center gap-2 bg-button-bg-dark text-color-dark hover:bg-button-hover-dark dark:bg-button-bg-light dark:text-color-light hover:dark:bg-button-hover-light"
      onClick={async () => {
        const logout = await api.auth.deleteCurrentSession();
        if (logout) {
          setUser(null);
          router.replace("/");
        }
      }}
    >
      Cerrar sesión
      <LogOut size={16} />
    </Button>
  );
};

export default LogoutButton;
