import React, { FC } from "react";

const SectionDetail: FC = ({ children }) => {
  return (
    <p className="text-almost-black dark:text-gray-100 text-lg font-extralight mb-5 last:mb-0">
      {children}
    </p>
  );
};

export default SectionDetail;
