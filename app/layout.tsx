"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { getSession } from "@/lib/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
            "min-h-screen font-sans antialiased  tracking-wider",
            fontSans.variable
          )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            {loading ? (
              <>
                <main className="w-screen h-screen fixed flex items-center justify-center"></main>
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
