"use client";

import api from "@/lib/appwrite";
import { Tickets } from "@/types/appwrite.types";
import { useParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TicketsContextProps {
  allTickets: Tickets | null;
  loadingTickets: boolean;
  ticketInfo: Tickets | null;
  loadingTicket: boolean;
}

// Crear el contexto
const TicketsContext = createContext<TicketsContextProps | undefined>(
  undefined,
);

// Proveedor del contexto
export const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const [allTickets, setTickets] = useState<Tickets | null>(null);
  const [loadingTickets, setLoadingTickets] = useState<boolean>(true);

  const [ticketInfo, setTicketInfo] = useState<Tickets | null>(null);
  const [loadingTicket, setLoadingTicket] = useState<boolean>(true);
  const { ticketId } = useParams();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await api.tickets.getAll();
        setTickets(tickets);
      } catch (error) {
        setTickets(null);
        console.error(error);
      } finally {
        setLoadingTickets(false);
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await api.tickets.findById(ticketId);
        setTicketInfo(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTicket(false);
      }
    };
    if (ticketId) {
      getTicket();
    }
  }, [ticketId]);

  return (
    <TicketsContext.Provider
      value={{ allTickets, loadingTickets, ticketInfo, loadingTicket }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error("useTickets debe usarse dentro de un TicketsProvider");
  }
  return context;
};
