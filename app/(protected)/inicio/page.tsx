"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import api from "@/appwrite/appwrite";
import Welcome from "@/components/hero/Welcome";

const Page = () => {
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await api.getAccount();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [router]);

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <MoonLoader color="rgba(255, 255, 255, 1)" />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-main-bg-light dark:bg-main-bg-dark px-10 py-5">
        <Welcome user={user} />
      </div>
    </>
  );
};

export default Page;
