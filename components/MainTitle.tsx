import React from "react";

interface WelcomeProps {
  title: string;
  subtitle?: string;
  containerClasses?: string;
}

const MainTitle = ({ title, subtitle, containerClasses }: WelcomeProps) => {
  return (
    <div className={`prose my-12 ${containerClasses}`}>
      <h1 className="font-bold mb-0 text-3xl md:text-4xl">{title}</h1>
      {subtitle ? (
        <p className=" !text-main-subtitle-light dark:!text-main-subtitle-dark  font-semibold mt-0 mb-5 !text-base">
          {subtitle}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default MainTitle;
