import { X } from "lucide-react";
import React, { ReactElement } from "react";
import { Button } from "../ui/button";
interface MedsProps {
  icon?: ReactElement;
  title?: string;
  description?: string;
}

const MedCard = ({ icon, title, description }: MedsProps) => {
  return (
    <div className="w-full flex rounded-md border p-4">
      <div className="pr-4">{icon}</div>
      <div className="w-full">
        <h5 className="mb-1 font-medium leading-none tracking-tight">
          {title}
        </h5>
        <div className="text-sm [&_p]:leading-relaxed">{description}</div>
      </div>
      <div>
        <Button className="rounded-full p-0 flex items-start h-fit text-red-700 hover:bg-red-700 hover:text-white">
          <X size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MedCard;
