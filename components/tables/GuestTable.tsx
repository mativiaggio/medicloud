"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { Guest } from "@/types/appwrite.types";

import { Badge } from "@/components/ui/badge";
import { useGuest } from "@/context/GuestContext";
import { calculateAge, formatDateTime } from "@/lib/utils";
import { Calendar, Filter, PlusIcon, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CopyButton from "../buttons/CopyButton";
import DinamicButton from "../buttons/DinamicButton";
import TableBodySkeleton from "../skeleton/home/TableBodySkeleton";
import FilterDropdown from "./FilterDropdown";
import Searchbox from "./Searchbox";

export function GuestTable() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [guestsLoading, setGuestsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { allGuests, allGuestsLoading } = useGuest();
  const router = useRouter();

  useEffect(() => {
    if (!allGuestsLoading && allGuests) {
      setGuests(allGuests.documents);
      setGuestsLoading(false);
    }
  }, [allGuests, allGuestsLoading]);

  useEffect(() => {
    const results = guests.filter((guest) =>
      guest.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredGuests(results);
  }, [searchTerm, guests]);

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
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-4 !text-base lg:!text-lg">
        <FilterDropdown
          title="Todos los huéspedes"
          icon={<Filter strokeWidth={2} />}
        />
        <Searchbox onSearchChange={setSearchTerm} />
        <FilterDropdown
          title="Fecha de Ingreso"
          icon={<Calendar strokeWidth={2} />}
        />
        <span>
          <DinamicButton icon={<RefreshCcw strokeWidth={2} />} />
        </span>
        <Link href={"huespedes/agregar-huesped"}>
          <DinamicButton icon={<PlusIcon strokeWidth={2} />} />
        </Link>
      </div>
      <Table className="!z-0 text-nowrap !text-sm lg:!text-base">
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
            {filteredGuests.map((guest) => (
              <TableRow
                key={guest.$id}
                onDoubleClick={() => router.push(`/huespedes/${guest.$id}`)}
              >
                <TableCell>
                  <Link
                    className="hover:underline"
                    href={`huespedes/${guest.$id}`}
                  >
                    {guest.full_name}
                  </Link>
                </TableCell>
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
                <TableCell className="flex items-center">
                  {contactData(guest)}
                  <CopyButton data={contactData(guest)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
