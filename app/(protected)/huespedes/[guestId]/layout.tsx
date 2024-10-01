"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { GuestProvider } from "@/context/GuestContext";
import api from "@/lib/appwrite";
import { cn } from "@/lib/utils";
import { Guest } from "@/types/appwrite.types";
import {
  CalendarPlus,
  FileSpreadsheet,
  LayoutDashboard,
  Library,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [guestLoading, setGuestLoading] = useState<Boolean | true>(true);
  const { guestId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.guest.findById(guestId);
        setGuest(response);
        setGuestLoading(false);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [guestId]);

  const links = [
    {
      label: "Dashboard",
      href: `/huespedes/${guestId}`,
      icon: (
        <LayoutDashboard className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Planilla completa",
      href: `/huespedes/${guestId}/planilla`,
      icon: (
        <User className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Evolución diaria",
      href: `/huespedes/${guestId}/evolucion-diaria`,
      icon: (
        <CalendarPlus className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Estudios complementarios",
      href: `/huespedes/${guestId}/estudios-complementarios`,
      icon: (
        <Library className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Historia clínica",
      href: `/huespedes/${guestId}/historia-clinica`,
      icon: (
        <FileSpreadsheet className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <GuestProvider>
      <div
        className={cn(
          "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-none md:flex-row",
          "h-fit min-h-screen bg-white dark:bg-main-workspace-dark",
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <div className="flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div></div>
          </SidebarBody>
        </Sidebar>
        <Content>{children}</Content>
      </div>
    </GuestProvider>
  );
}

const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full flex-1 border-l border-main-border-light bg-white dark:border-main-border-dark dark:bg-main-bg-dark">
      <div className="flex h-full w-full flex-1 flex-col gap-2 bg-main-workspace-light p-2 dark:bg-main-workspace-dark md:p-10">
        {children}
      </div>
    </div>
  );
};
