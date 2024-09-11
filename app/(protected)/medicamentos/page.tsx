import { MedicationTable } from "@/components/tables/MedicationsTable";
import React from "react";

import MainTitle from "@/components/MainTitle";

const page = () => {
  return (
    <>
      <MainTitle
        title="Medicamentos"
        subtitle="Visualiza, crea, edita, borra medicamentos."
        containerClasses="mt-0"
      />

      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="w-full flex flex-col">
          <MedicationTable />
        </div>
      </div>
    </>
  );
};

export default page;
