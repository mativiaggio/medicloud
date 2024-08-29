import Footer from "@/components/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-main-bg-dark">
      {children}
      <Footer
        props={{
          bg: "bg-main-bg-dark",
          colorLight: "text-color-dark",
          colorDark: "text-color-dark",
        }}
      />
    </div>
  );
}
