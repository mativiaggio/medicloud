// crea un layout con ts
import { DailyEvolutionProvider } from "@/context/DailyEvolutionProvider";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DailyEvolutionProvider>{children}</DailyEvolutionProvider>
    </div>
  );
}
