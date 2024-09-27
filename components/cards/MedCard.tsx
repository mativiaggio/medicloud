import api from "@/lib/appwrite";
import { GuestMedications } from "@/types/appwrite.types";
import { RefreshCcw, X } from "lucide-react";
import { ReactElement, useState } from "react";
import { Button } from "../ui/button";

type OnSuccessCallback = () => void;
interface MedsProps {
  data?: GuestMedications;
  icon?: ReactElement;
  title?: string;
  description?: string;
  onSuccess?: OnSuccessCallback;
}

const MedCard = ({ data, icon, title, description, onSuccess }: MedsProps) => {
  const [pending, setPending] = useState<boolean | false>(false);
  const deleteMedication = async () => {
    try {
      setPending(true);
      const result = await api.guest_medication.delete(data?.$id);
      if (result) {
        setPending(false);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full rounded-md border p-4">
      <div className="pr-4">{icon}</div>
      <div className="w-full">
        <h5 className="mb-1 font-medium leading-none tracking-tight">
          {title}
        </h5>
        <div className="text-sm [&_p]:leading-relaxed">{description}</div>
      </div>
      <div>
        <Button
          onClick={deleteMedication}
          className={`flex h-fit items-start rounded-full p-0 ${
            pending
              ? "text-color-light"
              : "text-red-700 hover:bg-red-700 hover:text-white"
          }`}
        >
          {pending ? (
            <RefreshCcw className="animate-spin" size={18} />
          ) : (
            <X size={18} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MedCard;
