"use client";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MoonLoader } from "react-spinners";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { auth, authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !auth) {
      router.push("/ingresar");
    }
  }, [auth, authLoading, router]);

  if (authLoading || (!auth && typeof window !== "undefined")) {
    return (
      <main className="w-screen h-screen fixed flex items-center justify-center bg-main-bg-dark">
        <MoonLoader color={"rgba(255, 255, 255, 1)"} />
      </main>
    );
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer props={{ bg: "bg-white dark:bg-main-bg-dark" }} />
    </>
  );
}
