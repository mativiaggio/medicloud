import React from "react";
import UserNameSekeleton from "../skeleton/home/UserNameSekeleton";

interface User {
  name: string;
}

interface WelcomeProps {
  user: User | null; // User can be null initially
  loading: boolean; // Add loading prop
}

const Welcome = ({ user, loading }: WelcomeProps) => {
  return (
    <div className="prose mb-12">
      <h1 className="font-bold mb-0 text-3xl md:text-4xl flex items-baseline">
        Hola, {loading ? <UserNameSekeleton /> : user?.name || "Invitado"} 👋
      </h1>
      <p className=" !text-main-subtitle-light dark:!text-main-subtitle-dark  font-semibold mt-0 !text-base">
        Comienza a gestionar la organización.
      </p>
    </div>
  );
};

export default Welcome;
