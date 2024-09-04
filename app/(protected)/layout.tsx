"use client";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { AuthProvider, useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { GuestProvider } from "@/context/GuestContext";
import api from "@/appwrite/appwrite";
import { useTheme } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<any | null>(null);
  const [spinnerColor, setSpinnerColor] = useState<string | "">("");
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const getSpinnerColor = () => {
      try {
        if (theme.theme === "light") {
          setSpinnerColor("black");
        } else {
          setSpinnerColor("white");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSpinnerColor();
  }, [theme]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await api.getAccount();
        setUser(user);
      } catch (error) {
        console.error(error);
        router.replace("/ingresar");
      }
    };
    getUser();
  }, [router]);

  if (!user) {
    return (
      <main className="w-screen h-screen fixed flex items-center justify-center bg-white dark:bg-main-bg-dark">
        <BarLoader color={spinnerColor} />
      </main>
    );
  }

  return (
    <>
      <AuthProvider>
        <GuestProvider>
          <Navbar />
          {children}

          <Footer props={{ bg: "bg-white dark:bg-main-bg-dark" }} />
        </GuestProvider>
      </AuthProvider>
    </>
  );
}
