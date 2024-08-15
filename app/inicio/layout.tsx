import type { Metadata } from "next";
import Footer from "@/components/footer/Footer";
import { NavigationMenuDemo } from "@/components/navbar/Navbar";

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
    <html lang="en">
      <body>
        <NavigationMenuDemo />
        {children}
        <Footer props={{ bg: "bg-main-bg-dark" }} />
      </body>
    </html>
  );
}
