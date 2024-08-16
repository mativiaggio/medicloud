import React from "react";

interface User {
  name: string;
}

interface WelcomeProps {
  user: User;
}

const Welcome = ({ user }: WelcomeProps) => {
  return (
    <>
      <h1 className="text-4xl font-bold">👋Hola, {user?.name}!</h1>
      <p className="text-xl text-main-subtitle-light dark:text-main-subtitle-dark  font-semibold">
        Comienza a gestionar la organización.
      </p>
    </>
  );
};

export default Welcome;
