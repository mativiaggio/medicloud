import MedCard from "@/components/cards/MedCard";
import { Guest, GuestMedications } from "@/types/appwrite.types";
import { PillBottle } from "lucide-react";
import React, { useCallback, useState } from "react";
import { AddNewGuestMedication } from "./AddNewMedication";

interface GuestProp {
  data: Guest;
}

const GuestMedication = ({ data }: GuestProp) => {
  const [guestMedications, setGuestMedications] = useState<GuestMedications[]>(
    data.guestMedications
  );

  const handleAddMedication = (newMedication: GuestMedications) => {
    setGuestMedications((prevMedications) => [
      ...prevMedications,
      newMedication,
    ]);
  };

  const handleDeleteMedication = (id: string) => {
    setGuestMedications((prevMedications) =>
      prevMedications.filter((medication) => medication.$id !== id)
    );
  };

  return (
    <div className="flex border border-main-border-light dark:border-main-border-dark bg-white dark:bg-main-bg-dark row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:border-white/[0.2] border-transparent justify-between flex-col space-y-4 h-72">
      <div className="guest-dashboard-container h-full overflow-auto flex flex-col gap-2">
        {guestMedications.length > 0
          ? guestMedications.map((medication) => (
              <MedCard
                key={medication.$id}
                data={medication}
                icon={<PillBottle />}
                title={medication.name}
                description={medication.description}
                onSuccess={() => handleDeleteMedication(medication.$id)}
              />
            ))
          : "El huésped no tiene asociado ningún medicamento."}
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="text-lg font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 flex justify-between items-center">
          Medicación
          <AddNewGuestMedication data={data} onSuccess={handleAddMedication} />
        </div>
        <div className="text-sm font-sans font-normal text-neutral-600 dark:text-neutral-300"></div>
      </div>
    </div>
  );
};

export default GuestMedication;
