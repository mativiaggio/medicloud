import AddGuestForm from "@/components/forms/AddGuestForm";
import MainTitle from "@/components/MainTitle";
import { SidebarDemo } from "@/components/sidebar/Sidebar";
import React from "react";

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-main-bg-light dark:bg-main-bg-dark px-0">
        <MainTitle title="Dashboard del huésped" />
      </div>
    </>
  );
};

export default page;
