"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/context/AuthProvider";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { DevSidebar } from "./_components/navigation/DevSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [spinnerColor, setSpinnerColor] = useState<string | "">("");
  const router = useRouter();
  const theme = useTheme();
  const { user, loadingUser } = useAuth();

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

  console.log("user " + JSON.stringify(user));
  if (loadingUser) {
    return (
      <main className="fixed flex h-screen w-screen items-center justify-center bg-white dark:bg-main-bg-dark">
        <BarLoader color={spinnerColor} />
      </main>
    );
  } else {
    if (!user) {
      router.push("/ingresar");
    } else {
      return (
        <>
          <Navbar />
          <DevSidebar>{children}</DevSidebar>
          <Footer props={{ bg: "bg-white dark:bg-main-bg-dark" }} />
        </>
      );
    }
  }
}
