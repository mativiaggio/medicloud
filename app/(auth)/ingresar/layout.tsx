import Footer from "@/components/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-main-login">
      {children}
      <Footer props={{ bg: "bg-main-login" }} />
    </div>
  );
}
