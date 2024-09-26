"use client";
import Footer from "@/components/footer/Footer";
import { useAuth } from "@/context/AuthProvider";
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
  const { user, loadingUser } = useAuth();
  const theme = useTheme();

  const spinnerColor = theme.theme === "light" ? "black" : "white";

  useEffect(() => {
    if (!loadingUser) {
      if (user) {
        router.replace("/inicio");
      }
    }
  }, [user, loadingUser, router]);

  if (loadingUser || (user && typeof window !== "undefined")) {
    return (
      <main className="fixed flex h-screen w-screen items-center justify-center bg-white dark:bg-main-bg-dark">
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
