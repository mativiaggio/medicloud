"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import api from "@/appwrite/appwrite";
import Welcome from "@/components/hero/Welcome";
import { useTheme } from "next-themes";
import { HomeGuestTable } from "@/components/tables/HomeGuestsTables";
import HomeGuestCard from "@/components/cards/HomeGuestCard";

const Page = () => {
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();
  const { theme } = useTheme();

  const loaderColor =
    theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)";

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
        <MoonLoader color={loaderColor} />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-main-bg-light dark:bg-main-bg-dark px-10 py-5">
        <Welcome user={user} />
        <div className="flex flex-col lg:flex-row gap-4 mb-5">
          <HomeGuestCard
            count={2}
            subtitle={"Total de huéspedes en el mes corriente."}
            type={"total"}
          />
          <HomeGuestCard
            count={1}
            subtitle={"Total de huéspedes activos en el mes corriente."}
            type={"active"}
          />
          <HomeGuestCard
            count={1}
            subtitle={"Total de huéspedes inactivos en el mes corriente."}
            type={"inactive"}
          />
        </div>
        <HomeGuestTable />
      </div>
    </>
  );
};

export default Page;
