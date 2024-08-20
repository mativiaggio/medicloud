"use client";

import Login from "@/components/login/Login";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import api from "@/appwrite/appwrite";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await api.getAccount();
        router.push("/inicio");
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [router]);

  return (
    <div className="flex h-screen max-h-screen">
      <Login />
    </div>
  );
};

export default Page;
