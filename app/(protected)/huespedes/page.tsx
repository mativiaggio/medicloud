import MainTitle from "@/components/MainTitle";
import { GuestTable } from "@/components/tables/GuestTable";
import React from "react";

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-main-workspace-light dark:bg-main-workspace-dark px-4 sm:px-6 md:px-8 lg:px-10 py-5">
        <MainTitle
          title="Todos los huéspedes"
          subtitle="Lista de todos los huéspedes"
          containerClasses="!mt-0"
        />
        <GuestTable />
      </div>
    </>
  );
};

export default page;
