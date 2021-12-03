import * as React from "react";
import { Helmet } from "react-helmet";
import HeaderBar from "../HeaderBar";

const MainLayout: React.FC = ({ children }) => {
  return (
    <div id="wrapper">
      <Helmet title="Leithon English" />
      <HeaderBar />
      <main className="h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
