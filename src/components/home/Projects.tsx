import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import SectionHeader from "../SectionHeader";
import { DetailStructuredText } from "../text";

const Projects = () => {
  const data = useStaticQuery(graphql`
    query ProjectQuery {
      datoCmsProject {
        title
        description {
          value
        }
      }
    }
  `);
  return (
    <div
      id="projects"
      className="flex flex-col items-center justify-center w-full py-24"
    >
      <SectionHeader hideDivider size="medium" className="justify-center">
        {data.datoCmsProject.title}
      </SectionHeader>
      <div className="max-w-lg mx-auto mb-12 text-center">
        <DetailStructuredText data={data.datoCmsProject.description} />
      </div>
    </div>
  );
};

export default Projects;
