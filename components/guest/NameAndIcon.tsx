import React from "react";
import MainTitle from "../MainTitle";
import { Check, Hourglass, X } from "lucide-react";
import { Guest } from "@/types/appwrite.types";

interface GuestProps {
  data: Guest;
}

const NameAndIcon = ({ data }: GuestProps) => {
  const guest = data;
  return (
    <div className="flex items-center gap-2">
      <MainTitle title={guest ? guest.full_name : ""} />
      {guest.status === "active" ? <Check size={38} color="#24ae7c" /> : ""}
      {guest.status === "inactive" ? <X size={38} color="#f37877" /> : ""}
      {guest.status === "pending" ? (
        <Hourglass className="animate-swing" size={38} color="#44a4ea" />
      ) : (
        ""
      )}
    </div>
  );
};

export default NameAndIcon;
