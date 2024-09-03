"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { GuestProvider, useGuest } from "@/context/GuestContext";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  CalendarPlus,
  FileSpreadsheet,
  LayoutDashboard,
  Library,
} from "lucide-react";
import LineSkeleton from "@/components/skeleton/LineSkeleton";
import { useParams } from "next/navigation";
import api from "@/appwrite/appwrite";
import { Guest } from "@/types/appwrite.types";

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
      href: `/huesped/${guestId}`,
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Evolución diaria",
      href: `/huesped/${guestId}/evolucion-diaria`,
      icon: (
        <CalendarPlus className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Estudios complementarios",
      href: `/huesped/${guestId}/estudios-complementarios`,
      icon: (
        <Library className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Historia clínica",
      href: `/huesped/${guestId}/historia-clinica`,
      icon: (
        <FileSpreadsheet className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
      ),
    },
  ];

  return (
    <GuestProvider>
      <div
        className={cn(
          "rounded-none flex flex-col md:flex-row  w-full flex-1 mx-auto overflow-hidden",
          "min-h-screen h-fit"
        )}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
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
    <div className="flex flex-1 w-full bg-white dark:bg-main-bg-dark">
      <div className="p-2 md:p-10 rounded-tl-2xl bg-main-workspace-light dark:bg-main-workspace-dark flex flex-col gap-2 flex-1 w-full h-full">
        {children}
      </div>
    </div>
  );
};
