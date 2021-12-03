import React, { FC } from "react";
import { Link } from "gatsby";
import SimpleButton from "../elements/SimpleButton";

const Intro: FC = () => {
  return (
    <div className="flex flex-col justify-center h-full">
      <div>
        <h4 className="text-blue-700 dark:text-blue-400 font-ibm-plex-mono mb-4">
          Hey, my name is
        </h4>
        <h1 className="dark:text-gray-200 text-6xl font-semibold mb-4 transition-colors">
          Leithon English.
        </h1>
        <h1 className="flex items-center text-gray-600 dark:text-blue-100 text-6xl font-semibold mb-4 transition-colors">
          I love making cool stuff with{" "}
          <span className="float-left flex flex-col overflow-y-hidden h-[60px] ml-3">
            <span className="text-yellow-400">JS</span>
            <span className="text-blue-500">TS</span>
            <span className="text-pink-500">CSS</span>
            <span className="text-green-400">HTML</span>
            <span>code.</span>
          </span>
        </h1>
        <p className="dark:text-gray-200 text-lg font-extralight w-1/2 mb-16">
          Front-end engineering is my passion but I love combining it with a
          backend technoloy. Creating applications that are functional yet fun
          for clients is a personal joy of mine.
        </p>
        <SimpleButton to="/#aboutme">Get to know me!</SimpleButton>
      </div>
    </div>
  );
};

export default Intro;
