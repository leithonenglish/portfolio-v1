import React, { FC, HtmlHTMLAttributes } from "react";

export const logo: FC<HtmlHTMLAttributes<SVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    viewBox="0 0 154 182"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M13.5 13.2c-.3.7-.4 36.2-.3 78.8l.3 77.5h127v-27l-49.2-.3L42 142V12H28c-10.3 0-14.2.3-14.5 1.2z"
      fill="currentColor"
    />
    <path
      d="M62.2 25.1c-2.4 7.2-4 13.4-3.7 13.8.4.3 18.7.6 40.7.6 29.1 0 40.2-.3 40.9-1.1.5-.7.8-6.6.7-13.5l-.3-12.4-37-.2-37-.3-4.3 13.1zM66.5 79.2c-3.4 8.9-8.1 23.9-7.7 24.3.3.3 14.5.5 31.7.5 22.8 0 31.4-.3 32.3-1.2 1.3-1.3 1.7-20.2.6-23.2-.5-1.4-4-1.6-28.5-1.6-21.5 0-28.1.3-28.4 1.2z"
      fill="currentColor"
    />
  </svg>
);
