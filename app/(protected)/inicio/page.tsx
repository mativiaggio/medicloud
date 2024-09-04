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
import { useAuth } from "@/context/UserContext";

const Page = () => {
  const [userResponse, setUserResponse] = useState<any | null>(null);
  const [guestResponse, setGuestResponse] = useState<Guest | null>(null);
  const [loadingGuest, setLoadingGuest] = useState<boolean>(true);

  const { auth, authLoading } = useAuth();
  useEffect(() => {
    if (!authLoading && auth) {
      setUserResponse(auth);
    }
  }, [auth, authLoading]);

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
  }, []);

  const activeGuestsCount = guestResponse
    ? guestResponse.filter((guest: Guest) => guest.status === "active").length
    : 0;
  const inactiveGuestsCount = guestResponse
    ? guestResponse.filter((guest: Guest) => guest.status === "inactive").length
    : 0;
  const totalGuestsCount = guestResponse ? guestResponse.length : 0;

  return (
    <div>
      <Welcome user={userResponse} loading={authLoading} />
      {/* <div className="flex flex-col lg:flex-row gap-4 mb-5">
        <HomeGuestCard
          count={
            loadingGuest ? (
              <LineSkeleton width={15} height={28} className="bg-main-accent" />
            ) : (
              activeGuestsCount
            )
          }
          subtitle={"Total de huéspedes."}
          type={"total"}
        />
        <HomeGuestCard
          count={
            loadingGuest ? (
              <LineSkeleton
                width={15}
                height={28}
                className="bg-badge-bg-active-light dark:bg-badge-bg-active-dark"
              />
            ) : (
              activeGuestsCount
            )
          }
          subtitle={"Huéspedes activos."}
          type={"active"}
        />
        <HomeGuestCard
          count={
            loadingGuest ? (
              <LineSkeleton
                width={15}
                height={28}
                className="bg-badge-bg-inactive-light dark:bg-badge-bg-inactive-dark"
              />
            ) : (
              inactiveGuestsCount
            )
          }
          subtitle={"Huéspedes inactivos."}
          type={"inactive"}
        />
      </div> */}
      <HomeGuestTable />
    </div>
  );
};

export default Page;
