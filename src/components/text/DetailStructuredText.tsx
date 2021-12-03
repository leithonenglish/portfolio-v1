import React, { FC } from "react";
import { StructuredText } from "react-datocms";
import { Icon } from "@iconify/react";
import SectionDetail from "./SectionDetail";

type DetailStructuredTextProps = {
  data: any;
};

const DetailStructuredText: FC<DetailStructuredTextProps> = ({ data }) => {
  return (
    <StructuredText
      data={data}
      renderNode={(tag, meta, pieces) => {
        switch (tag) {
          case "p":
            return <SectionDetail key={meta.key}>{pieces}</SectionDetail>;
          case "strong":
            return (
              <strong
                key={meta.key}
                className="font-semibold text-blue-700 dark:text-blue-400"
              >
                {pieces}
              </strong>
            );
          case "em":
            return (
              <em key={meta.key} className="text-blue-700 dark:text-blue-400">
                {pieces}
              </em>
            );
          case "ol":
            return (
              <ol
                key={meta.key}
                className="grid grid-cols-[repeat(2,minmax(140px,200px))] gap-y-2 gap-x-5 mb-5 last:mb-0"
              >
                {pieces}
              </ol>
            );
          case "li":
            return (
              <li key={meta.key} className="flex items-center">
                <Icon
                  icon="bx:bx-right-arrow"
                  className="flex-shrink-0 text-xs text-blue-700 dark:text-blue-400"
                />
                <span className="font-light font-ibm-plex-mono text-sm text-almost-black dark:text-blue-200 ml-2">
                  {pieces.map((piece) => piece.props.children)}
                </span>
              </li>
            );
          default:
            return React.createElement(`${tag}`, null, pieces);
        }
      }}
    />
  );
};

export default DetailStructuredText;
