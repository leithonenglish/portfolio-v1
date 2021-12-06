import { Icon } from "@iconify/react";
import React, { FC } from "react";

const Footer: FC = () => {
  const socials = [
    { icon: "eva:github-outline", url: "https://github.com/leithonenglish" },
    {
      icon: "eva:linkedin-outline",
      url: "https://www.linkedin.com/in/leithon-english-97ab8a35",
    },
    { icon: "fa:codepen", url: "#" },
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
        Inspired by <a href="https://brittanychiang.com/">Brittany Chiang</a>{" "}
        built by Me
      </h4>
    </div>
  );
};

export default Footer;
