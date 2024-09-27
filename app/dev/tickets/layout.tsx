import { TicketsProvider } from "@/context/TicketsProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TicketsProvider> {children}</TicketsProvider>
    </>
  );
}
