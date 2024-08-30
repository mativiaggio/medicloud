import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div className="prose mb-4">
      <h2 className="font-bold mb-0 text-xl md:text-2xl">{title}</h2>
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

export default SectionTitle;
