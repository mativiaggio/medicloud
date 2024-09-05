import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MediCloud | Medicamentos",
  description: "Visualiza, crea, edita, elimina medicamentos.",
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
