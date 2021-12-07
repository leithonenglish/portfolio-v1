import classNames from "classnames";
import React, { FC } from "react";

type SectionHeaderProps = {
  hideDivider?: boolean;
  size?: "regular" | "medium" | "large";
};

const SectionHeader: FC<
  SectionHeaderProps & React.HtmlHTMLAttributes<Element>
> = ({ hideDivider = false, size = "regular", children, className }) => {
  return (
    <div
      className={classNames(
        className,
        "flex items-center w-full mb-10 max-w-xl"
      )}
    >
      <h1
        className={classNames(
          "flex-shrink-0 text-almost-black dark:text-gray-200 font-semibold",
          size === "regular"
            ? "text-3xl"
            : size === "medium"
            ? "text-5xl"
            : "text-7xl"
        )}
      >
        {children}
      </h1>
      {!hideDivider && (
        <span className="flex-auto ml-5 h-[1px] bg-gray-300 dark:bg-white/30"></span>
      )}
    </div>
  );
};

export default SectionHeader;
