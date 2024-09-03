"use client";
import Link from "next/link";
import React, { useState } from "react";
import UserComponent from "./UserComponent";
import { ModeToggle } from "../theme_toggle/ThemeToggle";
import { Button } from "../ui/button";
import { HeartPulse, X } from "lucide-react";
import { Menu, HoveredLink, MenuItem, ProductItem } from "../ui/navbar-menu";
import NavbarMenuButton from "./NavbarMenuButton";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const handleToggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleCloseNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <div className="z-10 relative">
      <div className="flex justify-between items-center h-fit max-h-[10vh] px-4 sm:px-6 md:px-8 lg:px-10 py-2 bg-white dark:bg-main-bg-dark border-b border-main-border-light dark:border-main-border-dark">
        <div>
        <Link className="flex items-center justify-center" href="#">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">MediCloud</span>
        </Link>
        </div>
        <Menu setActive={setActive}>
          <div className="hidden lg:flex">
            <ul className="flex gap-6 items-center">
              <li>
                <Link href={"/inicio"}>Inicio</Link>
              </li>
              <MenuItem setActive={setActive} active={active} item="Huéspedes">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/agregar-huesped">Agregar huésped</HoveredLink>
                  <HoveredLink href="/huespedes">Ver huéspedes</HoveredLink>
                </div>
              </MenuItem>
              <li>
                <Link href={"/farmacia"}>Farmacia</Link>
              </li>
              <li>
                <Link href={"/obras-sociales"}>Obras Sociales</Link>
              </li>
              <li>
                <Link href={"/admin"}>Admin</Link>
              </li>
              <li>
                <ModeToggle />
              </li>
            </ul>
          </div>
        </Menu>

        <div className="hidden lg:block">
          <UserComponent />
        </div>
        <div className="block lg:hidden">
          <Button onClick={handleToggleNavbar} className="px-0">
            <NavbarMenuButton />
          </Button>
        </div>
      </div>

      <div id="mobile-navbar" className={`fixed lg:hidden top-0 left-0 w-full h-screen transition-transform duration-150 ease-in-out transform ${isNavbarOpen ? "translate-x-0 overflow-hidden" : "-translate-x-full overflow-auto"}`} role="dialog" aria-modal="true" aria-labelledby="mobile-navbar-title">
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-main-bg-dark px-4 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between h-[10vh]">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">MediCloud</span>
              <div>
                <h1 className="text-4xl text-main-4 font-bold pr-6">MediCloud</h1>
              </div>
            </a>
            <button id="close-mobile-navbar" type="button" className="-m-2.5 rounded-md p-2.5 text-[var(--main-text-light)] dark:text-[var(--main-text-dark)]" onClick={handleCloseNavbar}>
              <span className="sr-only">Close menu</span>
              <X color="red" />
            </button>
          </div>
          <div className="mt-6 flow-root text-[var(--main-text-light)] dark:text-[var(--main-text-dark)]">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="flex flex-col">
                <ul className="flex flex-col gap-6 items-left mb-6 text-2xl">
                  <li>
                    <Link href={"/"}>Inicio</Link>
                  </li>
                  <li>
                    <Link href={"/huespedes"}>Huéspedes</Link>
                  </li>
                  <li>
                    <Link href={"/obras-sociales"}>Obras Sociales</Link>
                  </li>
                  <li>
                    <Link href={"/admin"}>Admin</Link>
                  </li>
                  <li>
                    <ModeToggle buttonClasses="justify-start" iconSize="h-[1.8rem] w-[1.8rem]" />
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
