"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/appwrite/appwrite";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await api.getAccount();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
