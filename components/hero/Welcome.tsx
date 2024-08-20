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
      <h1 className="font-bold mb-0 text-3xl md:text-4xl">
        Hola, {user?.name} 👋
      </h1>
      <p className=" !text-main-subtitle-light dark:!text-main-subtitle-dark  font-semibold mt-0 mb-5 !text-sm lg:!text-base">
        Comienza a gestionar la organización.
      </p>
    </div>
  );
};

export default Welcome;
