"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { UserRoundSearch } from "lucide-react";
import { Input } from "../ui/input";
import { handleClientScriptLoad } from "next/script";

const Searchbox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSearchbox = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div
        className={`clean-shadcn rounded-md bg-table-header-light dark:bg-table-header-dark flex lg:hidden ${
          isOpen ? "gap-4" : ""
        } items-center px-4`}>
        <Button className="p-0" onClick={toggleSearchbox}>
          <UserRoundSearch strokeWidth={2} />
        </Button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "w-60" : "w-0"
          }`}>
          <Input
            type="text"
            placeholder="Escriba su búsqueda aquí"
            className="clean-shadcn bg-transparent p-0 w-full max-w-xs"
            style={{ width: isOpen ? "100%" : "0" }}
          />
        </div>
      </div>
      <div
        className={`clean-shadcn rounded-md bg-table-header-light dark:bg-table-header-dark items-center px-4 gap-4 hidden lg:flex lg:w-full`}>
        <Button className="p-0">
          <UserRoundSearch />
        </Button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden w-full`}>
          <Input
            type="text"
            placeholder="Escriba su búsqueda aquí"
            className="clean-shadcn bg-transparent p-0 w-full"
          />
        </div>
      </div>
    </>
  );
};

export default Searchbox;
