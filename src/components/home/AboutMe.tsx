import React, { FC } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { DetailStructuredText } from "../text";
import SectionHeader from "../SectionHeader";

const AboutMe: FC = () => {
  const data = useStaticQuery(graphql`
    query AboutMeQuery {
      datoCmsAboutme {
        title
        portraits {
          gatsbyImageData(placeholder: BLURRED, height: 260, width: 260)
        }
        description {
          value
        }
      }
    }
  `);
  return (
    <div id="aboutme" className="py-24">
      <SectionHeader>{data.datoCmsAboutme.title}</SectionHeader>
      <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-[auto,320px] md:gap-x-20">
        <div className="flex flex-col order-2 md:order-1">
          <DetailStructuredText data={data.datoCmsAboutme.description} />
        </div>
        <div className="pt-5 pb-10 md:pb-0 md:pt-10 order-1 md:order-2">
          <div className="group relative flex items-start justify-center">
            <div className="absolute z-20 w-52 h-52 md:w-[250px] md:h-[250px] border-2 border-blue-700 dark:border-blue-400 rounded transform top-1/2 -translate-y-1/2 rotate-45 transition-transform group-hover:rotate-90 group-hover:scale-[1.3] md:group-hover:scale-110"></div>
            <GatsbyImage
              image={data.datoCmsAboutme.portraits[0].gatsbyImageData}
              alt="ME"
              className="relative z-30 overflow-hidden rounded filter grayscale group-hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
