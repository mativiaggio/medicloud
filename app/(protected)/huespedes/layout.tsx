import type { Metadata } from "next";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "MediCloud | Huéspedes",
  description: "Visualiza, crea, edita, elimina huéspedes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
