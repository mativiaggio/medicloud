"use client";
import Link from "next/link";
import React, { useState } from "react";
import UserComponent from "./UserComponent";
import { ModeToggle } from "../theme_toggle/ThemeToggle";
import { Button } from "../ui/button";
import { X } from "lucide-react";
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
      <div className="flex justify-between items-center h-[10vh] px-4 sm:px-6 md:px-8 lg:px-10 bg-white dark:bg-main-bg-dark">
        <div>
          <h1 className="text-4xl text-main-4 font-bold pr-6 flex items-center">
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 512 512"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#2491d1">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <title>health-filled</title>
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd">
                  <g
                    id="add"
                    fill="#2491d1"
                    transform="translate(64.000000, 64.000000)">
                    <path
                      d="M128,154.368 L192,282.36945 L226.517333,213.333333 L356.735892,213.332557 C326.677773,271.159881 271.765809,335.16014 192,405.333333 C112.234191,335.16014 57.3222272,271.159881 27.2641079,213.332557 L98.5180584,213.333333 L128,154.368 Z M268.8,1.42108547e-14 C332.423203,1.42108547e-14 384,51.5767968 384,115.2 C384,132.924092 380.921643,151.412754 374.764929,170.665986 L247.850667,170.666667 L224,122.963883 L192,186.944 L128,58.9638831 L72.128,170.666667 L9.23507092,170.665986 C3.07835697,151.412754 1.42108547e-14,132.924092 1.42108547e-14,115.2 C1.42108547e-14,51.5767968 51.5767968,1.42108547e-14 115.2,1.42108547e-14 C144.712861,1.42108547e-14 171.633638,11.098031 192.016682,29.348444 C212.383272,11.091061 239.296408,1.42108547e-14 268.8,1.42108547e-14 Z"
                      id="Combined-Shape"></path>
                  </g>
                </g>
              </g>
            </svg>
            MediCloud
          </h1>
        </div>
        <Menu setActive={setActive}>
          <div className="hidden lg:flex">
            <ul className="flex gap-6 items-center">
              <li>
                <Link href={"/inicio"}>Inicio</Link>
              </li>
              <MenuItem setActive={setActive} active={active} item="Huéspedes">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/agregar-huesped">
                    Agregar huésped
                  </HoveredLink>
                  <HoveredLink href="/huespedes">Ver huéspedes</HoveredLink>
                </div>
              </MenuItem>
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
