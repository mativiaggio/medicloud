"use client";
import Welcome from "@/components/hero/Welcome";
import { HomeGuestTable } from "@/components/tables/HomeGuestsTables";
import { useAuth } from "@/context/UserContext";
import api from "@/lib/appwrite";
import { Guest } from "@/types/appwrite.types";
import { useEffect, useState } from "react";

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
      {/* <div className="mb-5 flex flex-col gap-4 lg:flex-row">
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
