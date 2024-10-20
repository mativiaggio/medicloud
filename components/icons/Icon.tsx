import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
            className="lucide lucide-mail"
          >
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
            className="lucide lucide-lock"
          >
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
            className="lucide lucide-calendar"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
        </>
      );
      break;

    case "phone":
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
            className="lucide lucide-phone"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </>
      );
      break;

    case "square-activity":
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
            className="lucide lucide-square-activity"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M17 12h-2l-2 5-2-10-2 5H7" />
          </svg>
        </>
      );
      break;

    case "info":
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
            className="lucide lucide-info"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </>
      );
      break;

    case "religion":
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
            className="lucide lucide-church"
          >
            <path d="M10 9h4" />
            <path d="M12 7v5" />
            <path d="M14 22v-4a2 2 0 0 0-4 0v4" />
            <path d="M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22" />
            <path d="m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7" />
          </svg>
        </>
      );
      break;

    case "bed":
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
            className="lucide lucide-bed"
          >
            <path d="M2 4v16" />
            <path d="M2 8h18a2 2 0 0 1 2 2v10" />
            <path d="M2 17h20" />
            <path d="M6 8v9" />
          </svg>
        </>
      );
      break;

    case "surgery":
      return (
        <>
          <p className={`text-[${strokeColor}]`}>Cirugía:</p>
        </>
      );
      break;

    case "rt":
      return (
        <>
          <p className={`text-[${strokeColor}]`}>RT:</p>
        </>
      );
      break;

    case "qt":
      return (
        <>
          <p className={`text-[${strokeColor}]`}>QT:</p>
        </>
      );
      break;

    case "ht":
      return (
        <>
          <p className={`text-[${strokeColor}]`}>HT:</p>
        </>
      );
      break;

    case "guest_status":
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
            className="lucide lucide-file-user"
          >
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M15 18a3 3 0 1 0-6 0" />
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
            <circle cx="12" cy="13" r="2" />
          </svg>
        </>
      );

    default:
      break;
  }
};

export default Icon;
