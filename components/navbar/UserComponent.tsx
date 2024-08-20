import React from "react";
import api from "@/appwrite/appwrite";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import LogoutButton from "@/components/logout/LogoutButton";
import { COLORS } from "@/lib/constants/account.colors";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileSkeleton } from "./ProfileSkeleton";
import { Skeleton } from "../ui/skeleton";

interface User {
  name: string;
}

const UserComponent = () => {
  const [user, setUser] = useState<User | null>(null);
  const [initials, setInitials] = useState<string | "">("");
  const [accountColor, setAccountColor] = useState<string | "">("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await api.getAccount();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

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
        />
      </div>
    </>
  );
};

interface UserDropdown {
  user: User | null;
  accountColor: string;
  initials: string;
}

const UserDropdown = ({ user, accountColor, initials }: UserDropdown) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="clean-shadcn" asChild>
        <Button
          variant="outline"
          className="flex gap-2 mt-6 lg:mt-0 pl-0 lg:px-4">
          {user?.name ? (
            <UserCard
              user={user}
              accountColor={accountColor}
              initials={initials}
            />
          ) : (
            <ProfileSkeleton />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-main-bg-dark border-main-border-light dark:border-main-border-dark">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserCard = ({ user, accountColor, initials }: UserDropdown) => {
  return (
    <>
      <Avatar
        style={{ backgroundColor: accountColor }}
        className="flex justify-center items-center">
        <AvatarFallback className="text-white">{initials}</AvatarFallback>
      </Avatar>
      {user?.name}
    </>
  );
};

export default UserComponent;
