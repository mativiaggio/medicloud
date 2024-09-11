import { cn } from "@/lib/utils";
import React from "react";

interface WelcomeProps {
  title: string;
  subtitle?: string;
  containerClasses?: string;
  titleClasses?: string;
}

const MainTitle = ({ title, subtitle, containerClasses, titleClasses }: WelcomeProps) => {
  return (
    <div className={cn("prose my-12", containerClasses)}>
      <h1 className={cn("font-bold mb-0 text-3xl md:text-4xl", titleClasses)}>{title}</h1>
      {subtitle ? <p className=" !text-main-subtitle-light dark:!text-main-subtitle-dark  font-semibold mt-0 mb-5 !text-base">{subtitle}</p> : ""}
    </div>
  );
};

export default MainTitle;
