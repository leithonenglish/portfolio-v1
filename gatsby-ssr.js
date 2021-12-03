import * as React from "react";
import { MainLayout } from "./src/components/layout";
import "./src/styles/global.css";

const wrapPageElement = ({ element, props }) => {
  return <MainLayout {...props}>{element}</MainLayout>;
};

export { wrapPageElement };
