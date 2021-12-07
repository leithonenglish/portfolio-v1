import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import SectionHeader from "../SectionHeader";
import { DetailStructuredText } from "../text";
import ProjectItem from "./ProjectItem";

const Projects = () => {
  const data = useStaticQuery(graphql`
    query ProjectQuery {
      datoCmsProject {
        title
        description {
          value
        }
        items {
          id
          name
          description {
            value
          }
          repository
          website
          technologies {
            name
          }
        }
      }
    }
  `);
  const projectItems = data.datoCmsProject.items.map(
    ({ id, name, description, repository, website, technologies }) => {
      return {
        id,
        name,
        description,
        repository,
        website,
        technologies: technologies.map(({ name }) => name),
      };
    }
  );
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {projectItems.map((item) => (
          <ProjectItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
