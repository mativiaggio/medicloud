import React from "react";
import { Button } from "../ui/button";
interface DinamicProps {
  title?: string;
  icon?: React.ReactNode;
}
const DinamicButton = ({ title, icon }: DinamicProps) => {
  return (
    <div
      className={`hover:shadow-xl transition duration-200 shadow-input clean-shadcn rounded-md bg-table-header-light dark:bg-table-header-dark flex items-center h-full`}>
      <Button className="px-4">
        {icon}
        {title}
      </Button>
    </div>
  );
};

export default DinamicButton;
