import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "@/appwrite/appwrite";
import { InsuranceProviders } from "@/types/appwrite.types";
import { useParams } from "next/navigation";
import { Query } from "appwrite";

interface InsuranceProvidersResponse {
  total: number;
  documents: InsuranceProviders[];
}

interface InsuranceProvidersContextProps {
  InsuranceProvider: InsuranceProviders | null;
  InsuranceProviderLoading: boolean;
  allInsuranceProviders: InsuranceProvidersResponse | null;
  allInsuranceProvidersLoading: boolean;
}

const InsuranceProviderContext = createContext<
  InsuranceProvidersContextProps | undefined
>(undefined);

export const MainInsuranceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [InsuranceProvider, setInsuranceProvider] =
    useState<InsuranceProviders | null>(null);
  const [InsuranceProviderLoading, setInsuranceProviderLoading] =
    useState<boolean>(true);
  const { insuranceProviderId } = useParams();

  // Get All Medications
  const [allInsuranceProviders, setAllInsuranceProviders] =
    useState<InsuranceProvidersResponse | null>(null);
  const [allInsuranceProvidersLoading, setAllInsuranceProvidersLoading] =
    useState<boolean>(true);

  useEffect(() => {
    const getInsuranceProvider = async () => {
      try {
        const response = await api.InsuranceProvider.findById(
          insuranceProviderId
        );
        setInsuranceProvider(response);
      } catch (error) {
        console.error(error);
      } finally {
        setInsuranceProviderLoading(false);
      }
    };
    if (insuranceProviderId) {
      getInsuranceProvider();
    }
  }, [insuranceProviderId]);

  useEffect(() => {
    const getAllInsuranceProviders = async () => {
      try {
        const response = await api.insuranceProvider.getAll();
        setAllInsuranceProviders(response);
      } catch (error) {
        console.error(error);
      } finally {
        setAllInsuranceProvidersLoading(false);
      }
    };
    getAllInsuranceProviders();
  }, []);

  return (
    <InsuranceProviderContext.Provider
      value={{
        InsuranceProvider,
        InsuranceProviderLoading,
        allInsuranceProviders,
        allInsuranceProvidersLoading,
      }}>
      {children}
    </InsuranceProviderContext.Provider>
  );
};

export const useInsuranceProvider = () => {
  const context = useContext(InsuranceProviderContext);
  if (context === undefined) {
    throw new Error(
      "useInsuranceProvider must be used within a MainInsuranceProvider"
    );
  }
  return context;
};
