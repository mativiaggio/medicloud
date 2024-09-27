"use client";
import Welcome from "@/components/hero/Welcome";
import { HomeGuestTable } from "@/components/tables/HomeGuestsTables";
import { useAuth } from "@/context/AuthProvider";
import api from "@/lib/appwrite";
import { Guest } from "@/types/appwrite.types";
import { useEffect, useState } from "react";

const Page = () => {
  const [userResponse, setUserResponse] = useState<any | null>(null);
  const [guestResponse, setGuestResponse] = useState<Guest | null>(null);
  const [loadingGuest, setLoadingGuest] = useState<boolean>(true);

  const { user, loadingUser } = useAuth();
  useEffect(() => {
    if (!loadingUser && user) {
      setUserResponse(user);
    }
  }, [user, loadingUser]);

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
      <Welcome user={userResponse} loading={loadingUser} />
      <HomeGuestTable />
    </div>
  );
};

export default Page;
