"use client";
import Footer from "@/components/footer/Footer";
import { useAuth } from "@/context/UserContext";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { auth, authLoading } = useAuth();
  const theme = useTheme();

  const spinnerColor = theme.theme === "light" ? "black" : "white";

  useEffect(() => {
    if (!authLoading) {
      if (auth) {
        router.replace("/inicio");
      }
    }
  }, [auth, authLoading, router]);

  if (authLoading || (auth && typeof window !== "undefined")) {
    return (
      <main className="w-screen h-screen fixed flex items-center justify-center bg-white dark:bg-main-bg-dark">
        <BarLoader color={spinnerColor} />
      </main>
    );
  }
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
