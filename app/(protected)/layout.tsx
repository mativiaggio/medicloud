"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/context/AuthProvider";
import { GuestProvider } from "@/context/GuestContext";
import { MainInsuranceProvider } from "@/context/InsuranceProvidersContext";
import { MedicationProvider } from "@/context/MedicationsContext";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [user, setUser] = useState<any | null>(null);
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
          <GuestProvider>
            <MedicationProvider>
              <MainInsuranceProvider>
                <Navbar />
                {children}

                <Footer props={{ bg: "bg-white dark:bg-main-bg-dark" }} />
              </MainInsuranceProvider>
            </MedicationProvider>
          </GuestProvider>
        </>
      );
    }
  }
}
