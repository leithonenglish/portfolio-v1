import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Icon } from "@iconify/react";
import SimpleButton from "../elements/SimpleButton";
import SectionHeader from "../SectionHeader";
import { DetailStructuredText } from "../text";

const Contact = () => {
  const data = useStaticQuery(graphql`
    query ContactQuery {
      datoCmsContact {
        title
        description {
          value
        }
        buttonText
      }
    }
  `);
  return (
    <div
      id="contact"
      className="flex flex-col items-center justify-center w-full py-24"
    >
      <SectionHeader hideDivider className="justify-center">
        {data.datoCmsContact.title}
      </SectionHeader>
      <div className="max-w-lg mx-auto mb-12 text-center">
        <DetailStructuredText data={data.datoCmsContact.description} />
      </div>
      <SimpleButton
        to="mailto:leithon.english@gmail.com"
        className="flex items-center"
      >
        <Icon icon="fa-regular:paper-plane" className="text-xl mr-3" />
        {data.datoCmsContact.buttonText}
      </SimpleButton>
    </div>
  );
};

export default Contact;
