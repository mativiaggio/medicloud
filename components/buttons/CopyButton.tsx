"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";

interface Copy {
  data: string;
}

const CopyButton = ({ data }: Copy) => {
  const [copied, setCopied] = useState<boolean>(false);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        console.log("Copied to clipboard:", text);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      },
      (err) => {
        console.error("Failed to copy:", err);
      }
    );
  }
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="ml-2 border-none"
              onClick={() => copyToClipboard(data)}
              variant="outline"
              size="sm">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-white dark:bg-main-bg-dark text-color-light dark:text-color-dark border-main-border-light dark:border-main-border-dark">
            <p>Copiar al portapapeles</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CopyButton;
