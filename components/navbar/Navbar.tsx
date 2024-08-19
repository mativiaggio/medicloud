"use client";
import Link from "next/link";
import React, { useState } from "react";
import UserComponent from "./UserComponent";
import { ModeToggle } from "../theme_toggle/ThemeToggle";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleToggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleCloseNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center h-[10vh] px-4 sm:px-6 md:px-8 lg:px-10 bg-white dark:bg-main-bg-dark">
        <div>
          <h1 className="text-4xl text-main-4 font-bold pr-6">MediCloud</h1>
        </div>
        <div className="hidden lg:flex">
          <ul className="flex gap-6 items-center">
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
              <ModeToggle />
            </li>
          </ul>
        </div>
        <div className="hidden lg:block">
          <UserComponent />
        </div>
        <div className="block lg:hidden">
          <Button onClick={handleToggleNavbar} className="px-0">
            <Menu />
          </Button>
        </div>
      </div>

      <div
        id="mobile-navbar"
        className={`fixed lg:hidden top-0 left-0 w-full h-screen transition-transform duration-150 ease-in-out transform ${
          isNavbarOpen
            ? "translate-x-0 overflow-hidden"
            : "-translate-x-full overflow-auto"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-navbar-title">
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-main-bg-dark px-4 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between h-[10vh]">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">MediCloud</span>
              <div>
                <h1 className="text-4xl text-main-4 font-bold pr-6">
                  MediCloud
                </h1>
              </div>
            </a>
            <button
              id="close-mobile-navbar"
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-[var(--main-text-light)] dark:text-[var(--main-text-dark)]"
              onClick={handleCloseNavbar}>
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root text-[var(--main-text-light)] dark:text-[var(--main-text-dark)]">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* <div className="space-y-2 py-6">
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-sm lg:text-base font-medium leading-7 hover:bg-[var(--main-light-accent)] dark:hover:bg-[var(--main-dark-accent)]">
                  Inicio
                </Link>
                <Link
                  href="/productos"
                  className="-mx-3 block rounded-lg px-3 py-2 text-sm lg:text-base font-medium leading-7 hover:bg-[var(--main-light-accent)] dark:hover:bg-[var(--main-dark-accent)]">
                  Productos
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-sm lg:text-base font-medium leading-7 hover:bg-[var(--main-light-accent)] dark:hover:bg-[var(--main-dark-accent)]">
                  Sobre Nosotros
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-sm lg:text-base font-medium leading-7 hover:bg-[var(--main-light-accent)] dark:hover:bg-[var(--main-dark-accent)]">
                  Contactanos
                </Link>
                <Link
                  href="/carrito"
                  className="-mx-3 block rounded-lg px-3 py-2 text-sm lg:text-base font-medium leading-7 hover:bg-[var(--main-light-accent)] dark:hover:bg-[var(--main-dark-accent)]">
                  Carrito
                </Link>
              </div> */}

              <div className="flex flex-col">
                <ul className="flex flex-col gap-6 items-left mb-6">
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
                    <ModeToggle buttonClasses="justfiy-start" />
                  </li>
                </ul>
              </div>
              <div className="block">
                <UserComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
