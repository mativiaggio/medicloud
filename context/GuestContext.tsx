import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/appwrite/appwrite";
import { Guest } from "@/types/appwrite.types";
import { useParams } from "next/navigation";

interface GuestContextProps {
  guest: Guest | null;
  guestLoading: Boolean;
}

const GuestContext = createContext<GuestContextProps | undefined>(undefined);

export const GuestProvider = ({ children }: { children: ReactNode }) => {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [guestLoading, setGuestLoading] = useState<Boolean>(true);
  const { guestId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.guest.findById(guestId);
        setGuest(response);
        setGuestLoading(false);
      } catch (error) {
        console.error(error);
        setGuestLoading(false);
      }
    };
    getUser();
  }, [guestId]);

  return <GuestContext.Provider value={{ guest, guestLoading }}>{children}</GuestContext.Provider>;
};

export const useGuest = () => {
  const context = useContext(GuestContext);
  if (context === undefined) {
    throw new Error("useGuest must be used within a GuestProvider");
  }
  return context;
};
