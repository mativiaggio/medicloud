import React from "react";
import { HeartPulse, UserRound, UserRoundX } from "lucide-react";
import clsx from "clsx";

interface HomeGuestCard {
  count: number;
  subtitle: string;
  type: string;
}

const HomeGuestCard = ({ count, subtitle, type }: HomeGuestCard) => {
  function getIcon(type: string) {
    let color: string = "";
    switch (type) {
      case "total":
        color = "text-card-total";
        break;
      case "active":
        color = "text-card-active";
        break;
      case "inactive":
        color = "text-card-inactive";
        break;
    }

    switch (type) {
      case "total":
        return <UserRound className={color} strokeWidth={2} />;
      case "active":
        return <HeartPulse className={color} strokeWidth={2} />;
      case "inactive":
        return <UserRoundX className={color} strokeWidth={2} />;
    }
  }

  function getCardBackground(type: string) {
    let color: string = "";
    switch (type) {
      case "total":
        color = "to-card-bg-total dark:to-card-bg-dark-total";
        break;
      case "active":
        color = "to-card-bg-active dark:to-card-bg-dark-active";
        break;
      case "inactive":
        color = "to-card-bg-inactive dark:to-card-bg-dark-inactive";
        break;
    }

    return color;
  }

  return (
    <div className="max-h-fit !overflow-hidden w-full rounded-2xl border border-[#e0e0e00a]">
      <div className="relative stat-card !p-0 !overflow-hidden rounded-xl h-fit">
        <div className={`bg-gradient-to-tl from-[#ffffff] dark:from-[#cceded00] ${getCardBackground(type)} z-[5] backdrop-blur-xl dark:backdrop-blur-2xl`}>
          <div className="bg-grid-pattern-light dark:bg-grid-pattern-dark stat-card flex !flex-row">
            <div className="flex !text-lg font-extrabold gap-2 items-center">
              {getIcon(type)}
              {count}
            </div>
            <div className="flex items-center">
              <p>{subtitle}</p>
            </div>
          </div>
        </div>
        <div
          className={clsx(" absolute h-[50px] w-[50px] rounded-full light:top-[0px] light:left-0 dark:bottom-[-10px] dark:left-5 animate-pulse", {
            "bg-card-total": type === "total",
            "bg-card-active": type === "active",
            "bg-card-inactive": type === "inactive",
          })}></div>
      </div>
    </div>
  );
};

export default HomeGuestCard;
