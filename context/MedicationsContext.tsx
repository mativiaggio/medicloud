import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/appwrite/appwrite";
import { Medication } from "@/types/appwrite.types";
import { useParams } from "next/navigation";
import { Query } from "appwrite";

interface MedicationResponse {
  total: number;
  documents: Medication[];
}

interface MedicationContextProps {
  medication: Medication | null;
  medicationLoading: boolean;
  allMedications: MedicationResponse | null;
  allMedicationsLoading: boolean;
}

const MedicationContext = createContext<MedicationContextProps | undefined>(
  undefined
);

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const [medication, setMedication] = useState<Medication | null>(null);
  const [medicationLoading, setMedicationLoading] = useState<boolean>(true);
  const { medicationId } = useParams();

  // Get All Medications
  const [allMedications, setAllMedications] =
    useState<MedicationResponse | null>(null);
  const [allMedicationsLoading, setAllMedicationsLoading] =
    useState<boolean>(true);

  useEffect(() => {
    const getMedication = async () => {
      try {
        const response = await api.medication.findById(medicationId);
        setMedication(response);
      } catch (error) {
        console.error(error);
      } finally {
        setMedicationLoading(false);
      }
    };
    if (medicationId) {
      getMedication();
    }
  }, [medicationId]);

  useEffect(() => {
    const getAllMedications = async () => {
      try {
        const response = await api.medication.getAll();
        setAllMedications(response);
      } catch (error) {
        console.error(error);
      } finally {
        setAllMedicationsLoading(false);
      }
    };
    getAllMedications();
  }, []);

  return (
    <MedicationContext.Provider
      value={{
        medication,
        medicationLoading,
        allMedications,
        allMedicationsLoading,
      }}>
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedication = () => {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error("useMedication must be used within a MedicationProvider");
  }
  return context;
};
