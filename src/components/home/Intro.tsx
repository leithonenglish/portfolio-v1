import React, { FC, useEffect, useMemo, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { motion, AnimatePresence } from "framer-motion";
import SimpleButton from "../elements/SimpleButton";
import { DetailStructuredText } from "../text";

const Intro: FC = () => {
  const data = useStaticQuery(graphql`
    query IntroQuery {
      datoCmsIntroduction {
        firstLine
        secondLine
        thirdLine
        codeItems {
          text
          color {
            hex
          }
        }
        description {
          value
        }
        buttonText
      }
    }
  `);
  const codeTexts = data.datoCmsIntroduction.codeItems.map(
    ({ text, color: { hex } }) => ({ text, color: hex })
  );
  const [codeTextIndex, setCodeTextIndex] = useState(0);
  const codeText = useMemo(
    () => (codeTexts.length > 0 ? codeTexts[codeTextIndex] : null),
    [codeTextIndex]
  );

  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCodeTextIndex((index) => index + 1);
    }, 1000);
    setIntervalId(id);
  }, []);

  useEffect(() => {
    if (codeTextIndex === codeTexts.length - 1) {
      clearInterval(intervalId);
    }
  }, [codeTextIndex]);
  return (
    <div className="flex flex-col items-start justify-center min-h-screen">
      <h4 className="text-blue-700 dark:text-blue-400 font-ibm-plex-mono mb-4">
        {data.datoCmsIntroduction.firstLine}
      </h4>
      <h1 className="dark:text-gray-200 text-4xl sm:text-6xl font-semibold mb-4 transition-colors">
        {data.datoCmsIntroduction.secondLine}
      </h1>
      <p className="text-gray-600 dark:text-blue-100 text-4xl sm:text-6xl font-semibold mb-4 transition-colors">
        I love making cool stuff with
        {codeText && (
          <AnimatePresence exitBeforeEnter>
            <motion.span
              key={codeText.text + codeText.color}
              className="ml-2"
              style={{ color: codeText.color }}
              initial={{
                opacity: 0,
              }}
              exit={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              {codeText.text}
            </motion.span>
          </AnimatePresence>
        )}
      </p>
      <div className="max-w-lg mb-16">
        <DetailStructuredText data={data.datoCmsIntroduction.description} />
      </div>
      <SimpleButton to="/#aboutme">Get to know me!</SimpleButton>
    </div>
  );
};

export default Intro;
