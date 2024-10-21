"use client";
import { useTickets } from "@/context/TicketsProvider";
import { useParams } from "next/navigation";

const TicketBody = () => {
  const { ticketInfo } = useTickets();
  const { ticketId } = useParams();

  const info = JSON.stringify(ticketInfo);

  return <div>Ticket: {info}</div>;
};

export default TicketBody;
