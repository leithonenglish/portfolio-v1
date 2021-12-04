import * as React from "react";
import { AboutMe, Contact, Experience, Intro } from "../components/home";

const IndexPage = () => {
  return (
    <div className="max-w-5xl mx-10 min-h-full">
      <Intro />
      <AboutMe />
      <Experience />
      <Contact />
    </div>
  );
};

export default IndexPage;
