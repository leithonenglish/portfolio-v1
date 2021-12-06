import * as React from "react";
import { AboutMe, Contact, Experience, Intro } from "../components/home";

const IndexPage = () => {
  return (
    <div className="max-w-5xl mx-auto pt-10 px-10 md:pt-0 md:px-12 min-h-full transition-position">
      <Intro />
      <AboutMe />
      <Experience />
      <Contact />
    </div>
  );
};

export default IndexPage;
