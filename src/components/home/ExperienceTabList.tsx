import classNames from "classnames";
import React, { FC, MouseEvent, useEffect, useMemo, useState } from "react";
import { StructuredText } from "react-datocms";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "../../hooks";

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

type TabMarkerStyle = {
  top?: string | number;
  bottom?: string | number;
  left: string | number;
  height: string | number;
  width: string | number;
};

const ExperienceTabList: FC<ExperienceTabListProps> = ({ jobs }) => {
  const isWide = useMediaQuery("(min-width: 768px)");
  const [jobIndex, setJobIndex] = useState<number>(0);
  const [tabMarkerStyle, setTabMarkerStyle] = useState<TabMarkerStyle>();
  const onCompanyClick = (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    setJobIndex(index);
  };
  const achievementVariants = {
    hidden: {
      opacity: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "afterChildren",
      },
    },
  };
  const selectectJob = useMemo(() => jobs[jobIndex], [jobIndex]);
  const isJobSelected = (index: number) => jobIndex === index;
  const updateTabIndicator = () => {
    const tabs = document.getElementsByClassName("btn-tab");
    const tab = tabs.item(jobIndex) as HTMLButtonElement;
    if (isWide) {
      setTabMarkerStyle({
        left: "-2px",
        width: "2px",
        top: `${tab.offsetTop}px`,
        height: `${tab.clientHeight}px`,
      });
    } else {
      setTabMarkerStyle({
        bottom: "-2px",
        height: "2px",
        left: `${tab.offsetLeft}px`,
        width: `${tab.clientWidth}px`,
      });
    }
  };

  useEffect(() => {
    updateTabIndicator();
  }, [isWide]);

  useEffect(() => {
    updateTabIndicator();
  }, [jobIndex]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-shrink-0 flex flex-row overflow-x-scroll overflow-y-visible md:overflow-visible md:flex-col">
        <div className="relative flex flex-row border-b-2 min-w-full mb-5 md:mb-0 md:min-w-0 md:flex-col md:border-b-0 md:border-l-2 border-gray-300 dark:border-gray-500">
          <div
            className="absolute z-10 bg-blue-700 dark:bg-[#64c6ff] transition-position-dimension duration-300"
            style={tabMarkerStyle}
          ></div>
          {jobs.map(({ id, company }, index) => (
            <button
              key={id}
              className={classNames(
                "btn-tab flex justify-start text-[13px] font-ibm-plex-mono whitespace-nowrap px-5 py-3 transition-colors duration-300 hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-400",
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
          className="flex-auto flex flex-col md:pt-2 md:pl-10"
          animate="show"
          exit="hidden"
          transition={{ duration: 0.3 }}
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
