"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/appwrite/appwrite";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

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

  return (
    <>
      <Navbar />
      {children}
      <Footer props={{ bg: "bg-white dark:bg-main-bg-dark" }} />
    </>
  );
}
