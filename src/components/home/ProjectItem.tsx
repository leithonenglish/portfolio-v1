import { Icon } from "@iconify/react";
import React, { FC, HtmlHTMLAttributes, ReactHTMLElement } from "react";
import { StructuredText } from "react-datocms";

type ProjectItemProps = {
  data: {
    name: string;
    description: any;
    repository: string;
    website?: string;
    technologies: string[];
  };
};

const ProjectItem: FC<ProjectItemProps> = ({
  data: { name, description, repository, website, technologies },
}) => {
  const repoIcon = repository.includes("github")
    ? "eva:github-outline"
    : "ant-design:gitlab-outlined";
  return (
    <div className="flex flex-col p-8 bg-gray-200/60 dark:bg-blue-900/20 rounded-md shadow transform transition-colors">
      <div className="flex items-center justify-between mb-5">
        <Icon
          icon="carbon:folder"
          className="text-blue-800 dark:text-blue-500 text-[2.5rem]"
        />
        <div className="flex items-center justify-center">
          <a
            href={repository}
            target="_blank"
            className="text-gray-600 dark:text-gray-300 text-2xl transition-colors hover:text-blue-700 dark:hover:text-blue-500"
          >
            <Icon icon={repoIcon} />
          </a>
          {!!website && (
            <a
              href={website}
              target="_blank"
              className="text-gray-600 dark:text-gray-300 text-2xl ml-2 transition-colors hover:text-blue-700 dark:hover:text-blue-500"
            >
              <Icon icon="akar-icons:globe" />
            </a>
          )}
        </div>
      </div>
      <h1 className="text-xl font-semibold text-almost-black dark:text-blue-100 mb-3">
        {name}
      </h1>
      <div className="flex-auto">
        <StructuredText
          data={description}
          renderNode={(tag, meta, pieces) => {
            switch (tag) {
              case "p":
                return (
                  <p
                    key={tag.key + meta.key}
                    className="text-almost-black dark:text-gray-300 font-light"
                  >
                    {pieces}
                  </p>
                );
              case "a":
                return (
                  <a
                    key={tag + meta.key}
                    href={meta.href}
                    target="_blank"
                    className="relative inline-block group text-blue-900 dark:text-blue-500"
                  >
                    <span className="absolute left-0 bottom-[-2px] bg-blue-500 h-[2px] w-0 transition-dimension group-hover:w-full"></span>
                    {pieces}
                  </a>
                );
              default:
                return React.createElement(
                  `${tag}`,
                  { key: tag + meta.key },
                  pieces
                );
            }
          }}
        />
      </div>
      <div className="flex flex-wrap items-center mt-10">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="flex-shrink-0 mr-4 text-xs text-almost-black dark:text-gray-300 leading-5 font-ibm-plex-mono last:mr-0"
          >
            {technology}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectItem;
