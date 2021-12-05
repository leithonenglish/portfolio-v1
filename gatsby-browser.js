import * as React from "react";
import { MainLayout } from "./src/components/layout";
import ThemeContextProvider from "./src/provider/ThemeProvider";
import "./src/styles/global.css";

export const wrapPageElement = ({ element, props }) => {
  return <MainLayout {...props}>{element}</MainLayout>;
};

export const wrapRootElement = ({ element }) => {
  return <ThemeContextProvider>{element}</ThemeContextProvider>;
};
