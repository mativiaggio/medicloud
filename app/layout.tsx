"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { getSession } from "@/lib/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { MoonLoader } from "react-spinners";
import { useTheme } from "next-themes";

interface Props {
  children: React.ReactNode;
}

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const ProtectedLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  // const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);

  const { theme } = useTheme();

  const loaderColor = "rgba(255, 255, 255, 1)";

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (!session) {
          router.push("/ingresar");
          localStorage.clear();
        } else {
          if (pathname === "/") {
            router.push("/inicio");
          }
        }
        setLoading(false);
      } catch (error) {
        router.push("/ingresar");
        setLoading(false);
      }
    };

    checkSession();
  }, [router, pathname]);
  return (
    <>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen font-sans antialiased  tracking-wider !text-base",
            fontSans.variable
          )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            {loading ? (
              <>
                <main className="w-screen h-screen fixed flex items-center justify-center bg-main-bg-dark">
                  <MoonLoader color={loaderColor} />
                </main>
              </>
            ) : (
              <>{children}</>
            )}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default ProtectedLayout;
