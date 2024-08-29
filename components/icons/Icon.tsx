import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface CustomProps {
  icon: string; // Name of the icon from the IconNames enum
  iconLightColor: string;
  iconDarkColor: string;
}

const Icon = ({ icon, iconLightColor, iconDarkColor }: CustomProps) => {
  const { theme } = useTheme();

  let defaultColor: string = "";
  if (theme === "dark") {
    defaultColor = iconLightColor;
  } else {
    defaultColor = iconDarkColor;
  }

  const [strokeColor, setStrokeColor] = useState(defaultColor);

  useEffect(() => {
    if (theme === "dark") {
      setStrokeColor(iconLightColor);
    } else {
      setStrokeColor(iconDarkColor);
    }
  }, [strokeColor, theme, iconDarkColor, iconLightColor]);

  switch (icon) {
    case "email":
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mail">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </>
      );
      break;

    case "lock":
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-lock">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </>
      );
      break;

    case "calendar":
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-calendar">
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
        </>
      );
      break;

    default:
      break;
  }
};

export default Icon;
