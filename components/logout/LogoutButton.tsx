"use client";
import api from "@/appwrite/appwrite";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={async () => {
          await api.deleteCurrentSession();
          router.push("/ingresar");
        }}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
