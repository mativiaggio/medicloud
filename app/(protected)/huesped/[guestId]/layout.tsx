"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { cn } from "@/lib/utils";
import {
  CalendarPlus,
  FileSpreadsheet,
  LayoutDashboard,
  Library,
} from "lucide-react";
import { useParams } from "next/navigation";
import api from "@/appwrite/appwrite";
import { Guest } from "@/types/appwrite.types";
import LineSkeleton from "@/components/skeleton/LineSkeleton";
import UserNameSekeleton from "@/components/skeleton/home/UserNameSekeleton";

interface ContentProps {
  children: ReactNode;
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-none flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
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
      <Content>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/inicio">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/huespedes">Huéspedes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {guestLoading ? (
                  <LineSkeleton height={16} width={100} />
                ) : (
                  guest?.full_name
                )}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {children}
      </Content>
    </div>
  );
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div className="flex flex-1 w-full">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-main-bg-dark bg-main-bg-light dark:bg-main-bg-dark flex flex-col gap-2 flex-1 w-full h-full">
        {children}
      </div>
    </div>
  );
};
