"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/appwrite/appwrite";
import Welcome from "@/components/hero/Welcome";
import { useTheme } from "next-themes";
import { HomeGuestTable } from "@/components/tables/HomeGuestsTables";
import HomeGuestCard from "@/components/cards/HomeGuestCard";
import { Guest } from "@/types/appwrite.types";
import LineSkeleton from "@/components/skeleton/LineSkeleton";

const Page = () => {
  const [userResponse, setUserResponse] = useState<any | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const [guestResponse, setGuestResponse] = useState<Guest | null>(null);
  const [loadingGuest, setLoadingGuest] = useState<boolean>(true);

  const router = useRouter();

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

  useEffect(() => {
    const getGuests = async () => {
      try {
        const response = await api.guest.getAll();
        setGuestResponse(response.documents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingGuest(false);
      }
    };

    getGuests();
  }, []); // Lista de dependencias vacía para evitar el bucle infinito

  const activeGuestsCount = guestResponse ? guestResponse.filter((guest: Guest) => guest.status === "active").length : 0;
  const inactiveGuestsCount = guestResponse ? guestResponse.filter((guest: Guest) => guest.status === "inactive").length : 0;
  const totalGuestsCount = guestResponse ? guestResponse.length : 0;

  return (
    <div className="min-h-screen bg-main-workspace-light dark:bg-main-workspace-dark px-4 sm:px-6 md:px-8 lg:px-10 py-5">
      <Welcome user={userResponse} loading={loadingUser} />
      <div className="flex flex-col lg:flex-row gap-4 mb-5">
        <HomeGuestCard count={loadingGuest ? <LineSkeleton width={15} height={28} className="bg-main-accent" /> : activeGuestsCount} subtitle={"Total de huéspedes."} type={"total"} />
        <HomeGuestCard count={loadingGuest ? <LineSkeleton width={15} height={28} className="bg-badge-bg-active-light dark:bg-badge-bg-active-dark" /> : activeGuestsCount} subtitle={"Huéspedes activos."} type={"active"} />
        <HomeGuestCard count={loadingGuest ? <LineSkeleton width={15} height={28} className="bg-badge-bg-inactive-light dark:bg-badge-bg-inactive-dark" /> : inactiveGuestsCount} subtitle={"Huéspedes inactivos."} type={"inactive"} />
      </div>
      <HomeGuestTable />
    </div>
  );
};

export default Page;
