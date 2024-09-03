import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/appwrite/appwrite";
import { Guest } from "@/types/appwrite.types";
import { useParams } from "next/navigation";

interface AuthContextProps {
  auth: Guest | null;
  authLoading: Boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setUser] = useState<Guest | null>(null);
  const [authLoading, setUserLoading] = useState<Boolean>(true);
  const { userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.getAccount();
        setUser(response);
        setUserLoading(false);
      } catch (error) {
        console.error(error);
        setUserLoading(false);
      }
    };
    getUser();
  }, [userId]);

  return <AuthContext.Provider value={{ auth, authLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
