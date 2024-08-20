import React from "react";

interface User {
  name: string;
}

interface WelcomeProps {
  user: User;
}

const Welcome = ({ user }: WelcomeProps) => {
  return (
    <div className="prose">
      <h1 className="font-bold mb-0 text-xl md:text-3xl lg:text-4xl text-nowrap">
        Hola, {user?.name} 👋
      </h1>
      <p className=" !text-main-subtitle-light dark:!text-main-subtitle-dark  font-semibold mt-0 mb-5 text-nowrap text-xs md:text-sm">
        Comienza a gestionar la organización.
      </p>
    </div>
  );
};

export default Welcome;
