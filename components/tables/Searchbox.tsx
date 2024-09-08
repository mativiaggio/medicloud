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
      <div
        className={`clean-shadcn rounded-md bg-table-header-light dark:bg-table-header-dark items-center px-4 gap-4 flex w-full`}>
        <Button className="p-0 py-6">
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
