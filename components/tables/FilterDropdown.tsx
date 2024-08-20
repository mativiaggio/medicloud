import React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Filter } from "lucide-react";
interface FilterDropdownProps {
  title: string;
  icon?: React.ReactNode;
}
const FilterDropdown = ({ title, icon }: FilterDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="clean-shadcn bg-table-header-light dark:bg-table-header-dark"
        asChild>
        <Button variant="outline" className="flex gap-4 py-6">
          {icon}
          <span className="hidden lg:block">{title}</span>
          <ChevronDown className="hidden lg:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-main-bg-dark border-main-border-light dark:border-main-border-dark">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <p>Opción 1</p>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <p>Opción 2</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
