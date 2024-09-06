import MainTitle from "@/components/MainTitle";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import React from "react";

const GuestProgressNotes = () => {
  return (
    <div className="flex border border-main-border-light dark:border-main-border-dark bg-white dark:bg-main-bg-dark row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:border-white/[0.2] border-transparent flex-col space-y-4 h-full">
      <div className="flex w-full justify-between">
        <MainTitle title="Evolución diaria" containerClasses="!mt-0" titleClasses="!text-2xl" />
        <Button className="bg-main-bg-dark text-color-dark dark:bg-white dark:text-color-light rounded-full">Todas</Button>
      </div>

      {/* Notes */}
      <div className="hover:shadow-xl transition duration-200 rounded-xl border border-main-border-light dark:border-main-border-dark p-2 bg-[#f7f8fa] dark:bg-main-bg-dark">
        <h4 className="font-bold text-lg">Titulo de la nota</h4>
        <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <hr className="my-4" />
        <span className="bg-white dark:bg-main-border-dark flex items-center w-fit p-4 text-xs rounded-full gap-2">
          <Clock size={12} /> 06/09/2024 17:14hs
        </span>
      </div>
      <div className="hover:shadow-xl transition duration-200 rounded-xl border border-main-border-light dark:border-main-border-dark p-2 bg-[#f7f8fa] dark:bg-main-bg-dark">
        <h4 className="font-bold text-lg">Titulo de la nota</h4>
        <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <hr className="my-4" />
        <span className="bg-white dark:bg-main-border-dark flex items-center w-fit p-4 text-xs rounded-full gap-2">
          <Clock size={12} /> 06/09/2024 17:14hs
        </span>
      </div>
      <div className="hover:shadow-xl transition duration-200 rounded-xl border border-main-border-light dark:border-main-border-dark p-2 bg-[#f7f8fa] dark:bg-main-bg-dark">
        <h4 className="font-bold text-lg">Titulo de la nota</h4>
        <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <hr className="my-4" />
        <span className="bg-white dark:bg-main-border-dark flex items-center w-fit p-4 text-xs rounded-full gap-2">
          <Clock size={12} /> 06/09/2024 17:14hs
        </span>
      </div>
    </div>
  );
};

export default GuestProgressNotes;
