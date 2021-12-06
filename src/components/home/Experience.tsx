import React, { FC } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import SectionHeader from "../SectionHeader";
import ExperienceTabList from "./ExperienceTabList";
import { DetailStructuredText } from "../text";
import { SimpleButton } from "../elements";

const Experience: FC = () => {
  const data = useStaticQuery(graphql`
    query ExperienceQuery {
      datoCmsExperience {
        title
        description {
          value
        }
        image {
          gatsbyImageData(placeholder: BLURRED, width: 350)
        }
        jobs {
          id
          companyName
          companyWebsite
          current
          endDate(formatString: "MMMM YYYY")
          startDate(formatString: "MMMM YYYY")
          workDetails {
            value
          }
          jobTitle
        }
        resumeButtonText
        resumeMessage {
          value
        }
      }
    }
  `);
  const jobs = data.datoCmsExperience.jobs.map((job: any) => {
    const {
      id,
      companyFullName,
      companyName,
      companyWebsite,
      endDate,
      startDate,
      workDetails,
      jobTitle,
    } = job;
    return {
      id,
      title: jobTitle,
      endDate,
      startDate,
      company: {
        name: companyName,
        fullName: companyFullName,
        website: companyWebsite,
      },
      achievements: workDetails,
    };
  });
  return (
    <div id="experience" className="py-24 min-h-[45rem]">
      <SectionHeader>{data.datoCmsExperience.title}</SectionHeader>
      <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-[65%,auto] gap-x-10">
        <div className="flex flex-col order-2 md:order-1">
          <DetailStructuredText data={data.datoCmsExperience.description} />
          <ExperienceTabList jobs={jobs} />
        </div>
        <div className="flex items-start order-1 mx-auto w-52 mb-10 md:w-auto md:order-2 md:mb-0">
          <div className="relative mt-10">
            <svg
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="100%"
              className="absolute -left-10 -top-10 -right-10 -bottom-10 ml-10"
            >
              <path
                id="blob"
                d="M461.5,289.5Q454,329,443.5,373Q433,417,391.5,433.5Q350,450,309.5,451Q269,452,230,454.5Q191,457,158.5,435.5Q126,414,84.5,396Q43,378,35.5,335Q28,292,17.5,248.5Q7,205,24,163Q41,121,81,100Q121,79,155.5,59Q190,39,231.5,21Q273,3,316,16.5Q359,30,389.5,62.5Q420,95,440.5,131.5Q461,168,465,209Q469,250,461.5,289.5Z"
                className="text-blue-500 dark:text-gray-200 transition-colors fill-current"
              ></path>
            </svg>
            <GatsbyImage
              image={data.datoCmsExperience.image.gatsbyImageData}
              alt="Experience"
              className="relative z-30 overflow-hidden rounded"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-center mt-10 mx-auto max-w-lg">
        <DetailStructuredText data={data.datoCmsExperience.resumeMessage} />
        <SimpleButton to="Resume.pdf" type="external-link" target="_blank">
          {data.datoCmsExperience.resumeButtonText}
        </SimpleButton>
      </div>
    </div>
  );
};

export default Experience;
