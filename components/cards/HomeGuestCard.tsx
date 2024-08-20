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
        return <UserRound className={color} strokeWidth={2.75} />;
      case "active":
        return <HeartPulse className={color} strokeWidth={2.75} />;
      case "inactive":
        return <UserRoundX className={color} strokeWidth={2.75} />;
    }
  }
  return (
    <div className="max-h-fit !overflow-hidden w-full rounded-2xl">
      <div className="relative stat-card !p-0 !overflow-hidden rounded-xl h-fit">
        <div className="bg-gradient-to-tl from-[#e0f7fa00] to-[#ffffff] dark:from-[#cceded00] dark:to-[#d7eded2c] stat-card z-10 backdrop-blur-xl dark:backdrop-blur-2xl">
          <div className="flex text-xl font-bold gap-2">
            {/* <UserRound
              className={clsx({
                "text-card-total": type === "total",
                "text-card-active": type === "active",
                "text-card-inactive": type === "inactive",
              })}
              strokeWidth={2.75}
            /> */}

            {getIcon(type)}
            {count}
          </div>
          <div>
            <p>{subtitle}</p>
          </div>
        </div>
        <div
          className={clsx(
            " absolute h-[50px] w-[50px] rounded-full bottom-[-10px] left-5",
            {
              "bg-card-total": type === "total",
              "bg-card-active": type === "active",
              "bg-card-inactive": type === "inactive",
            }
          )}></div>
      </div>
    </div>
  );
};

export default HomeGuestCard;
