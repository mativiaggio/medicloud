import type { Metadata } from "next";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "MediCloud",
  description:
    "La aplicación de gestion de pacientes del Hospice Madre Teresa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer props={{ bg: "bg-white dark:bg-main-bg-dark" }} />
    </>
  );
}
