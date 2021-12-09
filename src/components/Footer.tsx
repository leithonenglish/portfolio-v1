import { Icon } from "@iconify/react";
import React, { FC } from "react";

const Footer: FC = () => {
  const socials = [
    { icon: "eva:github-outline", url: "https://github.com/leithonenglish" },
    {
      icon: "eva:linkedin-outline",
      url: "https://www.linkedin.com/in/leithon-english-97ab8a35",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center py-16 px-5 md:px-10">
      <div className="flex items-center justify-evenly mb-5">
        {socials.map(({ url, icon }, index) => (
          <a
            key={url + index}
            href={url}
            target="_blank"
            className="text-almost-black dark:text-gray-400 text-2xl mx-2 transition-colors hover:text-blue-700 dark:hover:text-blue-400"
          >
            <Icon icon={icon} className="fill-current" />
          </a>
        ))}
      </div>
      <h4 className="text-almost-black text-center dark:text-gray-400 text-xs font-thin font-ibm-plex-mono">
        Inspired by{" "}
        <a
          href="https://brittanychiang.com/"
          className="relative text-blue-700 dark:text-blue-500 inline-block group"
        >
          <span className="absolute left-0 bottom-[-2px] bg-blue-500 h-[2px] w-0 transition-dimension group-hover:w-full"></span>
          Brittany Chiang
        </a>{" "}
        built by{" "}
        <b className="font-bold text-blue-700 dark:text-blue-200">Me</b>
      </h4>
    </div>
  );
};

export default Footer;
