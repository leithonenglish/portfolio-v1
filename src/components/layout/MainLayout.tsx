import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "../Footer";
import HeaderBar from "../HeaderBar";

const MainLayout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Helmet title="Leithon English" />
      <HeaderBar />
      <main className="h-full">{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
