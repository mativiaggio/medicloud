import React from "react";
import api from "@/appwrite/appwrite";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LogoutButton from "@/components/logout/LogoutButton";
import { COLORS } from "@/lib/constants/account.colors";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ProfileSkeleton } from "./ProfileSkeleton";
import { useAuth } from "@/context/UserContext";

interface UserComponentProps {
  size?: string;
}
interface User {
  name: string;
  email?: string;
}

const UserComponent = ({ size }: UserComponentProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [initials, setInitials] = useState<string | "">("");
  const [accountColor, setAccountColor] = useState<string | "">("");
  const { auth, authLoading } = useAuth();

  //   useEffect(() => {
  //     const getUser = async () => {
  //       try {
  //         const user = ;
  //         setUser(user);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     getUser();
  //   }, []);

  useEffect(() => {
    if (!authLoading && auth) {
      setUser(auth);
    }
  }, [auth, authLoading]);

  useEffect(() => {
    const getUserInitials = () => {
      try {
        if (user?.name) {
          const res: string =
            user.name
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
  }, [user]);

  return (
    <>
      <div className="flex justify-start lg:justify-center items-center">
        <UserDropdown
          user={user}
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
          className="flex gap-2 mt-6 lg:mt-0 pl-0 lg:px-4 !pr-0">
          <UserCard
            user={user}
            accountColor={accountColor}
            initials={initials}
            size={size}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-main-bg-dark border-main-border-light dark:border-main-border-dark">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuItem>
          <span className="text-xs">{user?.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-main-border-light dark:bg-main-border-dark" />
        <DropdownMenuGroup>
          <DropdownMenuItem className={"w-full"}>
            <LogoutButton />
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
        className={`flex justify-center items-center ${size ? "p-6" : ""}`}>
        <AvatarFallback className={`text-white ${size ? size : ""}`}>
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* <span className={size ? size : ""}>{user?.name}</span> */}
    </>
  );
};

export default UserComponent;
