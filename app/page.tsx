"use client";
import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite.config";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch (error) {
        router.push("/ingresar");
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
      <div className="min-h-screen bg-main-bg-dark">
        <h1 className="text-4xl font-bold">👋Hola, {user.name}!</h1>
        <Button
          onClick={async () => {
            await account.deleteSession("current");
            router.push("/ingresar");
          }}>
          Logout
        </Button>
      </div>
      <Footer props={{ bg: "bg-main-bg-dark" }} />
    </>
  );
};

export default Page;
