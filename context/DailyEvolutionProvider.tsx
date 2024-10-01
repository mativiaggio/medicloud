"use client";

import api from "@/lib/appwrite";
import { Daily_Evolution } from "@/types/appwrite.types";
import { useParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface DailyEvolutionContextProps {
  dailyEvolution: Daily_Evolution | null;
  loadingDailyEvolution: boolean;
  setDailyEvolution: (dailyEvolution: Daily_Evolution | null) => void;
}

// Crear el contexto
const DailyEvolutionContext = createContext<
  DailyEvolutionContextProps | undefined
>(undefined);

// Proveedor del contexto
export const DailyEvolutionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [dailyEvolution, setDailyEvolution] = useState<Daily_Evolution | null>(
    null,
  );
  const [loadingDailyEvolution, setLoadingDailyEvolution] =
    useState<boolean>(true);

  const { guestId } = useParams();

  useEffect(() => {
    const fetchDailyEvolution = async () => {
      try {
        const guestDailyEvolution =
          await api.dailyEvolution.findByGuestId(guestId);
        setDailyEvolution(guestDailyEvolution);
      } catch (error) {
        setDailyEvolution(null);
      } finally {
        setLoadingDailyEvolution(false);
      }
    };
    fetchDailyEvolution();
  }, [guestId]);

  return (
    <DailyEvolutionContext.Provider
      value={{
        dailyEvolution,
        loadingDailyEvolution,
        setDailyEvolution,
      }}
    >
      {children}
    </DailyEvolutionContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useDailyEvolution = () => {
  const context = useContext(DailyEvolutionContext);
  if (!context) {
    throw new Error(
      "useDailyEvolution debe usarse dentro de un DailyEvolutionProvider",
    );
  }
  return context;
};
