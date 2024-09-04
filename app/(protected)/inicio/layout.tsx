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
      <div className="min-h-screen bg-main-workspace-light dark:bg-main-workspace-dark px-4 sm:px-6 md:px-8 lg:px-10 py-5">
        {children}
      </div>
    </>
  );
}
