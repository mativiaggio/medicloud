"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/appwrite/appwrite";
import Welcome from "@/components/hero/Welcome";
import { useTheme } from "next-themes";
import { HomeGuestTable } from "@/components/tables/HomeGuestsTables";
import HomeGuestCard from "@/components/cards/HomeGuestCard";

const Page = () => {
  const [userResponse, setUserResponse] = useState<any | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await api.getAccount();
        setUserResponse(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingUser(false);
      }
    };

    getUser();
  }, [router]);

  return (
    <div className="min-h-screen bg-main-bg-light dark:bg-main-bg-dark px-4 sm:px-6 md:px-8 lg:px-10 py-5">
      <Welcome user={userResponse} loading={loadingUser} />
      <div className="flex flex-col lg:flex-row gap-4 mb-5">
        <HomeGuestCard
          count={2}
          subtitle={"Total de huéspedes."}
          type={"total"}
        />
        <HomeGuestCard
          count={1}
          subtitle={"Huéspedes activos."}
          type={"active"}
        />
        <HomeGuestCard
          count={1}
          subtitle={"Huéspedes inactivos."}
          type={"inactive"}
        />
      </div>
      <HomeGuestTable />
    </div>
  );
};

export default Page;
