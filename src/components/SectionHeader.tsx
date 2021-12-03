import classNames from "classnames";
import React, { FC } from "react";

type SectionHeaderProps = {
  hideDivider?: boolean;
};

const SectionHeader: FC<
  SectionHeaderProps & React.HtmlHTMLAttributes<Element>
> = ({ hideDivider = false, children, className }) => {
  return (
    <div
      className={classNames(
        className,
        "flex items-center w-full mb-10 max-w-xl"
      )}
    >
      <h1 className="flex-shrink-0 text-almost-black dark:text-gray-200 text-3xl font-semibold">
        {children}
      </h1>
      {!hideDivider && (
        <span className="flex-auto ml-5 h-[1px] bg-gray-300 dark:bg-white/30"></span>
      )}
    </div>
  );
};

export default SectionHeader;
