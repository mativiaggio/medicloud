import LogoutButton from "@/components/logout/LogoutButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthProvider";
import { COLORS } from "@/lib/constants/account.colors";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserComponentProps {
  size?: string;
}
interface User {
  name: string;
  email?: string;
}

const UserComponent = ({ size }: UserComponentProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [initials, setInitials] = useState<string | "">("");
  const [accountColor, setAccountColor] = useState<string | "">("");
  const { user, loadingUser } = useAuth();

  //   useEffect(() => {
  //     const getUser = async () => {
  //       try {
  //         const user = ;
  //         setUserData(user);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     getUser();
  //   }, []);

  useEffect(() => {
    if (!loadingUser && user) {
      setUserData(user);
    }
  }, [user, loadingUser]);

  useEffect(() => {
    const getUserInitials = () => {
      try {
        if (userData?.name) {
          const res: string =
            userData.name
              .split(" ")
              .map((palabra) => palabra.charAt(0).toUpperCase())
              .join("") ?? "";
          setInitials(res);

          let hash = 0;
          for (let i = 0; i < res.length; i++) {
            hash = res.charCodeAt(i) + ((hash << 5) - hash);
          }

          const colorIndex = Math.abs(hash) % COLORS.length;
          setAccountColor(COLORS[colorIndex]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserInitials();
  }, [userData]);

  return (
    <>
      <div className="flex items-center justify-start lg:justify-center">
        <UserDropdown
          user={userData}
          accountColor={accountColor}
          initials={initials}
          size={size}
        />
      </div>
    </>
  );
};

interface UserDropdown {
  user: User | null;
  accountColor: string;
  initials: string;
  size?: string;
}

const UserDropdown = ({ user, accountColor, initials, size }: UserDropdown) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="clean-shadcn" asChild>
        <Button
          variant="outline"
          className="mt-6 flex gap-2 !pr-0 pl-0 lg:mt-0 lg:px-4"
        >
          <UserCard
            user={user}
            accountColor={accountColor}
            initials={initials}
            size={size}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-main-border-light bg-white dark:border-main-border-dark dark:bg-main-bg-dark">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuItem>
          <span className="text-xs">{user?.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-main-border-light dark:bg-main-border-dark" />
        <DropdownMenuGroup>
          <DropdownMenuItem className={"w-full"}>
            <LogoutButton />
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"flex w-full justify-center text-[11px] hover:underline"}
          >
            <Link href={"/"}>Pagina principal</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserCard = ({ user, accountColor, initials, size }: UserDropdown) => {
  return (
    <>
      <Avatar
        style={{ backgroundColor: accountColor }}
        className={`flex items-center justify-center ${size ? "p-6" : ""}`}
      >
        <AvatarFallback className={`text-white ${size ? size : ""}`}>
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* <span className={size ? size : ""}>{user?.name}</span> */}
    </>
  );
};

export default UserComponent;
