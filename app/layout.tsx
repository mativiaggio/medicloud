import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { AuthProvider } from "@/context/UserContext";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "MediCloud por Hospice Madre Teresa",
  description: "La aplicación de gestion de huéspedes del Hospice Madre Teresa.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="1I5vN8XfzHo9awJVBZa30hiGiyayFTx9_EoB8QtzLsg" />
      </head>
      <body className={cn("min-h-screen font-sans antialiased  tracking-wider !text-base", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <>
            <AuthProvider>{children}</AuthProvider>
          </>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ProtectedLayout;
