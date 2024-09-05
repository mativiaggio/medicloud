"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { UserRoundSearch } from "lucide-react";
import { Input } from "../ui/input";

interface SearchboxProps {
  onSearchChange: (searchTerm: string) => void;
}

const Searchbox: React.FC<SearchboxProps> = ({ onSearchChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleSearchbox = () => {
    setIsOpen((prev) => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <>
      {/* <div
        className={`hover:!shadow-xl !transition !duration-200 !shadow-input rounded-md bg-table-header-light dark:bg-table-header-dark flex lg:hidden ${
          isOpen ? "gap-4" : ""
        } items-center px-4`}>
        <Button className="p-0" onClick={toggleSearchbox}>
          <UserRoundSearch strokeWidth={2} />
        </Button>
        <div
          className={`hover:shadow-xl transition duration-200 shadow-input ease-in-out overflow-hidden ${
            isOpen ? "w-60" : "w-0"
          }`}>
          <Input
            type="text"
            placeholder="Escriba su búsqueda aquí"
            className="clean-shadcn bg-transparent p-0 w-full max-w-xs"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div> */}
      <div
        className={`clean-shadcn rounded-md bg-table-header-light dark:bg-table-header-dark items-center px-4 gap-4 flex w-full`}>
        <Button className="p-0">
          <UserRoundSearch />
        </Button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden w-full`}>
          <Input
            type="text"
            placeholder="Escriba su búsqueda aquí"
            className="clean-shadcn bg-transparent p-0 w-full"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default Searchbox;
