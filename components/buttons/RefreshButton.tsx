import React from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";

const RefreshButton = () => {
  return (
    <div>
      <Button className="aspect-square">
        <RefreshCcw size={16} />
      </Button>
    </div>
  );
};

export default RefreshButton;
