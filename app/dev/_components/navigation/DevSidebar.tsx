"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ArrowLeftToLine, ListTodo, Users } from "lucide-react";
import { useState } from "react";

export function DevSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    {
      label: "Tickets",
      href: "/dev/tickets",
      icon: (
        <ListTodo className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Members",
      href: "/dev/members",
      icon: (
        <Users className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Back",
      href: "/",
      icon: (
        <ArrowLeftToLine className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden md:flex-row",
        "h-screen",
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
        </SidebarBody>
      </Sidebar>
      <Dashboard>{children}</Dashboard>
    </div>
  );
}

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full bg-main-workspace-light p-4 dark:bg-main-workspace-dark">
        {children}
      </div>
    </>
  );
};
