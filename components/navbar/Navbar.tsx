"use client";
import { useAuth } from "@/context/AuthProvider";
import { HeartPulse, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { ModeToggle } from "../theme_toggle/ThemeToggle";
import { Button } from "../ui/button";
import { Menu } from "../ui/navbar-menu";
import NavbarMenuButton from "./NavbarMenuButton";
import UserComponent from "./UserComponent";

const Navbar: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { user } = useAuth();

  const handleToggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleCloseNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <div className="relative z-10">
      <div className="flex h-fit max-h-[10vh] items-center justify-between border-b border-main-border-light bg-white px-4 py-2 dark:border-main-border-dark dark:bg-main-bg-dark sm:px-6 md:px-8 lg:px-10">
        <div className="flex w-1/6">
          <Link className="flex items-center justify-center" href="/inicio">
            <HeartPulse className="text-primary h-6 w-6" />
            <span className="text-primary ml-2 text-2xl font-bold">
              MediCloud
            </span>
          </Link>
        </div>
        <Menu setActive={setActive}>
          <div className="hidden w-full lg:flex">
            <ul className="flex items-center justify-between gap-6">
              <li>
                <Link href={"/inicio"}>Inicio</Link>
              </li>
              <li>
                <Link href={"/huespedes"}>Huéspedes</Link>
              </li>
              <li>
                <Link href={"/medicamentos"}>Medicamentos</Link>
              </li>
              <li>
                <Link href={"/obras-sociales"}>Obras Sociales</Link>
              </li>
              {user?.labels.includes("admin") ? (
                <li>
                  <Link href={"/admin"}>Admin</Link>
                </li>
              ) : (
                ""
              )}
              {user?.labels.includes("dev") ? (
                <li>
                  <Link href={"/dev/tickets"}>Devs</Link>
                </li>
              ) : (
                ""
              )}
              <li>
                <ModeToggle />
              </li>
            </ul>
          </div>
        </Menu>

        <div className="hidden w-1/6 lg:block">
          <UserComponent />
        </div>
        <div className="block lg:hidden">
          <Button onClick={handleToggleNavbar} className="px-0">
            <NavbarMenuButton />
          </Button>
        </div>
      </div>

      <div
        id="mobile-navbar"
        className={`fixed left-0 top-0 h-screen w-full transform transition-transform duration-150 ease-in-out lg:hidden ${
          isNavbarOpen
            ? "translate-x-0 overflow-hidden"
            : "-translate-x-full overflow-auto"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-navbar-title"
      >
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 dark:bg-main-bg-dark sm:ring-1 sm:ring-gray-900/10">
          <div className="flex h-fit max-h-[10vh] min-h-[57px] items-center justify-between px-0 py-2 sm:px-2 md:px-4 lg:px-6">
            <span className="-m-1.5 p-1.5">
              <span className="sr-only">MediCloud</span>
              <div>
                <Link className="flex items-center justify-center" href="#">
                  <HeartPulse className="text-primary h-6 w-6" />
                  <span className="text-primary ml-2 text-2xl font-bold">
                    MediCloud
                  </span>
                </Link>
              </div>
            </span>
            <button
              id="close-mobile-navbar"
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-[var(--main-text-light)] dark:text-[var(--main-text-dark)]"
              onClick={handleCloseNavbar}
            >
              <span className="sr-only">Close menu</span>
              <X color="red" />
            </button>
          </div>
          <div className="mt-6 flow-root text-[var(--main-text-light)] dark:text-[var(--main-text-dark)]">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="flex flex-col">
                <ul className="items-left mb-6 flex flex-col gap-6 text-2xl">
                  <li>
                    <Link onClick={() => handleCloseNavbar()} href={"/inicio"}>
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleCloseNavbar()}
                      href={"/huespedes"}
                    >
                      Huéspedes
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleCloseNavbar()}
                      href={"/medicamentos"}
                    >
                      Medicamentos
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleCloseNavbar()}
                      href={"/obras-sociales"}
                    >
                      Obras Sociales
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => handleCloseNavbar()} href={"/admin"}>
                      Admin
                    </Link>
                  </li>

                  {user?.labels.includes("dev") ? (
                    <li>
                      <Link href={"/dev/tickets"}>Devs</Link>
                    </li>
                  ) : (
                    ""
                  )}
                  <li>
                    <ModeToggle
                      buttonClasses="justify-start"
                      iconSize="h-[1.8rem] w-[1.8rem]"
                    />
                  </li>
                </ul>
              </div>
              <div className="block">
                <UserComponent size="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
