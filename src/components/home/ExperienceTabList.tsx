import classNames from "classnames";
import React, { FC, MouseEvent, useEffect, useMemo, useState } from "react";
import { StructuredText } from "react-datocms";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

type ExperienceTabListProps = {
  jobs: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    company: {
      name: string;
      website: string;
    };
    achievements: any;
  }[];
};

const ExperienceTabList: FC<ExperienceTabListProps> = ({ jobs }) => {
  const [jobIndex, setJobIndex] = useState<number>(0);
  const [verticalTabMarkerPos, setVerticalTabMarkerPos] = useState<number>(0);
  const [verticalTabMarkerHeight, setVerticalTabMarkerHeight] =
    useState<number>(40);
  const onCompanyClick = (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    setJobIndex(index);
  };
  const achievementVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const selectectJob = useMemo(() => jobs[jobIndex], [jobIndex]);
  const isJobSelected = (index: number) => jobIndex === index;

  useEffect(() => {
    const tabs = document.getElementsByClassName("btn-tab");
    const tab = tabs.item(jobIndex) as HTMLButtonElement;
    setVerticalTabMarkerPos(tab.offsetTop);
    setVerticalTabMarkerHeight(tab.clientHeight);
  }, [jobIndex]);

  return (
    <div className="flex">
      <div className="flex-shrink-0 flex flex-col">
        <div className="relative flex flex-col border-l-2 border-l-gray-300 dark:border-l-gray-500">
          <div
            className="absolute w-[2px] left-[-2px] bg-blue-700 dark:bg-[#64c6ff] transition-position duration-300"
            style={{
              top: `${verticalTabMarkerPos}px`,
              height: `${verticalTabMarkerHeight}px`,
            }}
          ></div>
          {jobs.map(({ id, company }, index) => (
            <button
              key={id}
              className={classNames(
                "btn-tab flex justify-start text-[13px] font-ibm-plex-mono px-5 py-3 transition-colors duration-300 hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-400",
                isJobSelected(index)
                  ? "text-blue-700 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              )}
              onClick={(event) => onCompanyClick(event, index)}
            >
              {company.name}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={selectectJob.id}
          className="flex-auto flex flex-col pt-2 pl-10"
          animate="show"
          exit="hidden"
          variants={achievementVariants}
        >
          <div className="text-xl font-medium">
            <span className="text-almost-black dark:text-gray-200">
              {selectectJob.title}
            </span>{" "}
            <span className="text-gray-400 font-light">@</span>{" "}
            <a
              href={selectectJob.company.website}
              target="_blank"
              className="text-blue-700 dark:text-blue-400"
            >
              {selectectJob.company.name}
            </a>
          </div>
          <h3 className="text-almost-black dark:text-gray-400 font-ibm-plex-mono text-xs mt-1">
            {selectectJob.startDate} - {selectectJob.endDate || "Present"}
          </h3>
          <StructuredText
            data={selectectJob.achievements}
            renderNode={(tag, meta, pieces) => {
              switch (tag) {
                case "ol":
                  return (
                    <ol key={meta.key} className="mt-5 last:mb-0">
                      {pieces}
                    </ol>
                  );
                case "li":
                  return (
                    <li key={meta.key} className="flex items-start mb-3">
                      <Icon
                        icon="bx:bx-right-arrow"
                        className="flex-shrink-0 text-xs text-blue-700 dark:text-blue-400 mt-1"
                      />
                      <span className="font-light font-ibm-plex-mono text-sm text-almost-black dark:text-gray-400 ml-5">
                        {pieces.map((piece) => piece.props.children)}
                      </span>
                    </li>
                  );
                default:
                  return React.createElement(`${tag}`, null, pieces);
              }
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExperienceTabList;
