import * as React from "react";
import { SimpleButton } from "../components/elements";

const NotFoundPage = () => {
  return (
    <div className="max-w-5xl mx-auto pt-10 px-10 md:pt-0 md:px-12 min-h-full transition-position">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h4 className="font-light text-almost-black dark:text-blue-300">
          Woah there! Looks like you made a wrong turn.
        </h4>
        <h1 className="text-[12rem] text-blue-700 dark:text-blue-300 font-ibm-plex-mono font-bold">
          404
        </h1>
        <SimpleButton type="internal" to="/">
          Let's go home
        </SimpleButton>
      </div>
    </div>
  );
};

export default NotFoundPage;
