"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";

import { useInsuranceProvider } from "@/context/InsuranceProvidersContext";
import api from "@/lib/appwrite";
import { InsuranceProviders } from "@/types/appwrite.types";
import { Query } from "appwrite";
import { useRouter } from "next/navigation";
import { DeleteInsuranceProvider } from "../alert-dialogs/DeleteInsuranceProvider";
import { AddNewInsurance } from "../dialogs/AddNewInsurance";
import { EditInsuranceProvider } from "../dialogs/EditInsuranceProvider";
import TableBodySkeleton from "../skeleton/home/TableBodySkeleton";
import Searchbox from "./Searchbox";

export function InsuranceProvidersTable() {
  const [insuranceProviders, setInsuranceProviders] = useState<
    InsuranceProviders[]
  >([]);
  const [filteredInsuranceProviders, setFilteredInsuranceProviders] = useState<
    InsuranceProviders[]
  >([]);
  const [insuranceProvidersLoading, setInsuranceProvidersLoading] =
    useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { allInsuranceProviders, allInsuranceProvidersLoading } =
    useInsuranceProvider();
  const router = useRouter();

  useEffect(() => {
    if (!allInsuranceProvidersLoading && allInsuranceProviders) {
      const sortedInsuranceProviders = allInsuranceProviders.documents.sort(
        (a, b) => a.name.localeCompare(b.name),
      );
      setInsuranceProviders(sortedInsuranceProviders);
      setInsuranceProvidersLoading(false);
    }
  }, [allInsuranceProviders, allInsuranceProvidersLoading]);

  useEffect(() => {
    const results = insuranceProviders.filter((insuranceProvider) =>
      insuranceProvider.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredInsuranceProviders(results);
  }, [searchTerm, insuranceProviders]);

  const updateInsuranceProviders = useCallback(async () => {
    try {
      const result = await api.insuranceProvider.getAll([
        Query.orderAsc("name"),
      ]);
      setInsuranceProviders(result.documents);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-4 !text-base lg:!text-lg">
        <Searchbox onSearchChange={setSearchTerm} />
        <span>
          <AddNewInsurance
            className="shadow-input transition duration-200 hover:shadow-xl"
            onSuccess={updateInsuranceProviders}
          />
        </span>
      </div>
      <Table className="!z-0 text-nowrap !text-sm lg:!text-base">
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        {insuranceProvidersLoading ? (
          <TableBodySkeleton />
        ) : (
          <TableBody>
            {filteredInsuranceProviders.map((insuranceProvider) => (
              <TableRow key={insuranceProvider.$id}>
                <TableCell className="w-[90%]">
                  {insuranceProvider.name}
                </TableCell>
                <TableCell>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <EditInsuranceProvider
                        insuranceProvider={insuranceProvider}
                        onSuccess={updateInsuranceProviders}
                      />
                    </span>
                    <span>
                      <DeleteInsuranceProvider
                        insuranceProvider={insuranceProvider}
                        onSuccess={updateInsuranceProviders}
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
