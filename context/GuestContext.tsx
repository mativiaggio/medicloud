import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/appwrite/appwrite";
import { Guest } from "@/types/appwrite.types";
import { useParams } from "next/navigation";
import { Query } from "appwrite";

interface GuestResponse {
  total: number;
  documents: Guest[];
}

interface GuestContextProps {
  guest: Guest | null;
  guestLoading: boolean;
  allGuests: GuestResponse | null;
  allGuestsLoading: boolean;
  activeGuests: GuestResponse | null;
  activeGuestsLoading: boolean;
}

const GuestContext = createContext<GuestContextProps | undefined>(undefined);

export const GuestProvider = ({ children }: { children: ReactNode }) => {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [guestLoading, setGuestLoading] = useState<boolean>(true);
  const { guestId } = useParams();

  // Get All Guests
  const [allGuests, setAllGuests] = useState<GuestResponse | null>(null);
  const [allGuestsLoading, setAllGuestsLoading] = useState<boolean>(true);

  // Get Active Guests
  const [activeGuests, setActiveGuests] = useState<GuestResponse | null>(null);
  const [activeGuestsLoading, setActiveGuestsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getGuest = async () => {
      try {
        const response = await api.guest.findById(guestId);
        setGuest(response);
      } catch (error) {
        console.error(error);
      } finally {
        setGuestLoading(false);
      }
    };
    if (guestId) {
      getGuest();
    }
  }, [guestId]);

  useEffect(() => {
    const getAllGuests = async () => {
      try {
        const response = await api.guest.getAll();
        setAllGuests(response);
      } catch (error) {
        console.error(error);
      } finally {
        setAllGuestsLoading(false);
      }
    };
    getAllGuests();
  }, []);

  useEffect(() => {
    const getActiveGuests = async () => {
      try {
        const response = await api.guest.getAll([
          Query.equal("status", ["active"]),
        ]);
        setActiveGuests(response);
      } catch (error) {
        console.error(error);
      } finally {
        setActiveGuestsLoading(false);
      }
    };
    getActiveGuests();
  }, []);

  return (
    <GuestContext.Provider
      value={{
        guest,
        guestLoading,
        allGuests,
        allGuestsLoading,
        activeGuests,
        activeGuestsLoading,
      }}>
      {children}
    </GuestContext.Provider>
  );
};

export const useGuest = () => {
  const context = useContext(GuestContext);
  if (context === undefined) {
    throw new Error("useGuest must be used within a GuestProvider");
  }
  return context;
};
