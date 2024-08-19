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
      <h1 className="h1 font-bold">👋Hola, {user?.name}!</h1>
      <p className=" !text-main-subtitle-light dark:!text-main-subtitle-dark  font-semibold">
        Comienza a gestionar la organización.
      </p>
    </div>
  );
};

export default Welcome;
