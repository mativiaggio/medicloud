import AddGuestForm from "@/components/forms/AddGuestForm";
import MainTitle from "@/components/MainTitle";
import React from "react";

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-main-bg-light dark:bg-main-bg-dark px-4 sm:px-6 md:px-8 lg:px-10 py-5">
        <MainTitle
          title="Agrega un nuevo huésped👨‍⚕️"
          subtitle="Llena el formulario a continuación para agregar un nuevo huésped."
        />
        <AddGuestForm />
      </div>
    </>
  );
};

export default page;
