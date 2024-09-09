import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { AuthProvider } from "@/context/UserContext";
import type { Metadata } from "next";

// Define metadata for the page
export const metadata: Metadata = {
  title: "MediCloud por Hospice Madre Teresa",
  description: "La aplicación de gestion de huéspedes del Hospice Madre Teresa.",
  keywords: [
    "gestión médica",
    "software",
    "salud",
    "cuidado paliativo",
    "Hospice Madre Teresa",
    "MediCloud"
  ],
  authors: [{ name: "Hospice Madre Teresa" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://medicloud-hmt.vercel.app/",
    title: "MediCloud por Hospice Madre Teresa",
    description: "La aplicación de gestión médica segura y eficiente del Hospice Madre Teresa.",
    images: [
      {
        url: "https://hospicemadreteresa.org.ar/wp-content/uploads/2017/07/bg-frente-casa-hospice.jpg",
        width: 1200,
        height: 630,
        alt: "MediCloud por Hospice Madre Teresa",
      },
    ],
    siteName: "MediCloud",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediCloud por Hospice Madre Teresa",
    description: "La aplicación de gestión médica segura y eficiente del Hospice Madre Teresa.",
    images: ["https://hospicemadreteresa.org.ar/wp-content/uploads/2017/07/bg-frente-casa-hospice.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "1I5vN8XfzHo9awJVBZa30hiGiyayFTx9_EoB8QtzLsg",
  },
};

interface Props {
  children: React.ReactNode;
}

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const ProtectedLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased tracking-wider !text-base",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ProtectedLayout;
