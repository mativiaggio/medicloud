import React from "react";

import MainTitle from "@/components/MainTitle";
import { InsuranceProvidersTable } from "@/components/tables/InsuranceProvidersTable";

const page = () => {
  return (
    <>
      <MainTitle
        title="Obras sociales"
        subtitle="Visualiza, crea, edita, borra obras sociales."
        containerClasses="mt-0"
      />

      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <div className="flex w-full flex-col">
          <InsuranceProvidersTable />
        </div>
      </div>
    </>
  );
};

export default page;
