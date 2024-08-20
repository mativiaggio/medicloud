import api from "@/appwrite/appwrite";
import { Query } from "appwrite";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Guest } from "@/types/appwrite.types";

import { calculateAge, formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import CopyButton from "../buttons/CopyButton";
import TableBodySkeleton from "../skeleton/home/TableBodySkeleton";

export function HomeGuestTable() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestsLoading, setGuestsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const guests = await api.getAllGuestsDocuments([
          // Query.equal("status", ["active"]),
        ]);

        setGuests(guests.documents);
        setGuestsLoading(false);
        console.log(guests);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  function contactData(guest: Guest) {
    if (guest.contact_email !== "") {
      return guest.contact_email;
    } else {
      return guest.contact_phone;
    }
  }

  function badgeValue(guest: Guest) {
    let value: string = "";
    switch (guest.status) {
      case "active":
        value = "Activo";
        break;
      case "inactive":
        value = "Inactivo";
        break;
      case "pending":
        value = "Pendiente";
        break;
    }

    return value;
  }

  function badgeColors(guest: Guest) {
    let colors: string = "";
    switch (guest.status) {
      case "active":
        colors =
          "bg-badge-bg-active-light text-badge-text-active-light dark:bg-badge-bg-active-dark dark:text-badge-text-active-light";
        break;
      case "inactive":
        colors =
          "bg-badge-bg-inactive-light text-badge-text-inactive-light dark:bg-badge-bg-inactive-dark dark:text-badge-text-inactive-light";
        break;
      case "pending":
        colors =
          "bg-badge-bg-pending-light text-badge-text-pending-light dark:bg-badge-bg-pending-dark dark:text-badge-text-pending-light";
        break;
    }

    return colors;
  }

  return (
    <Table className="text-nowrap !z-0 !text-xs md:!text-sm lg:!text-base">
      {/* <TableCaption>Lista de huéspedes.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Huésped</TableHead>
          <TableHead>Edad</TableHead>
          <TableHead>Fecha de ingreso</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Contacto</TableHead>
        </TableRow>
      </TableHeader>
      {guestsLoading ? (
        <TableBodySkeleton />
      ) : (
        <TableBody>
          {guests.map((guest) => (
            <TableRow key={guest.guest_id}>
              <TableCell>{guest.full_name}</TableCell>
              <TableCell>
                {calculateAge(String(guest.birthdate))} años
              </TableCell>
              <TableCell>
                {String(formatDateTime(guest.admission_date).dateOnly)}
              </TableCell>
              <TableCell>
                <Badge className={`${badgeColors(guest)}`}>
                  {badgeValue(guest)}
                </Badge>
              </TableCell>
              <TableCell className="text-table-contact-light dark:text-table-contact-dark font-bold flex items-center">
                {contactData(guest)}
                <CopyButton data={contactData(guest)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
