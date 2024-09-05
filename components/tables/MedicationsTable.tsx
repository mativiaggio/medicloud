"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Medication } from "@/types/appwrite.types";
import TableBodySkeleton from "../skeleton/home/TableBodySkeleton";
import Searchbox from "./Searchbox";
import { useMedication } from "@/context/MedicationsContext";
import { useRouter } from "next/navigation";
import { AddNewMedication } from "../dialogs/AddNewMedication";
import api from "@/appwrite/appwrite";
import { Query } from "appwrite";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { EditMedication } from "../dialogs/EditMedication";
import { DeleteMedication } from "../alert-dialogs/DeleteMedication";

export function MedicationTable() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [filteredMedications, setFilteredMedications] = useState<Medication[]>(
    []
  );
  const [medicationsLoading, setMedicationsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { allMedications, allMedicationsLoading } = useMedication();
  const router = useRouter();

  useEffect(() => {
    if (!allMedicationsLoading && allMedications) {
      const sortedMedications = allMedications.documents.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setMedications(sortedMedications);
      setMedicationsLoading(false);
    }
  }, [allMedications, allMedicationsLoading]);

  useEffect(() => {
    const results = medications.filter((medication) =>
      medication.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedications(results);
  }, [searchTerm, medications]);

  const updateMedications = useCallback(async () => {
    try {
      const result = await api.medication.getAll([Query.orderAsc("name")]);
      setMedications(result.documents);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex gap-4 !text-base lg:!text-lg">
        <Searchbox onSearchChange={setSearchTerm} />
        <span>
          <AddNewMedication onSuccess={updateMedications} />
        </span>
      </div>
      <Table className="text-nowrap !z-0 !text-sm lg:!text-base">
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        {medicationsLoading ? (
          <TableBodySkeleton />
        ) : (
          <TableBody>
            {filteredMedications.map((medication) => (
              <TableRow className="cursor-pointer" key={medication.$id}>
                <TableCell className="w-[90%]">{medication.name}</TableCell>
                <TableCell>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <EditMedication
                        medication={medication}
                        onSuccess={updateMedications}
                      />
                    </span>
                    <span>
                      <DeleteMedication
                        medication={medication}
                        onSuccess={updateMedications}
                      />
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
