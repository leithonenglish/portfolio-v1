import React, { FC } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import classNames from "classnames";

type SimpleButtonProps = {
  to?: string;
  target?: string;
  type?: "external-link" | "internal" | "button";
};

const SimpleButton: FC<SimpleButtonProps & React.HtmlHTMLAttributes<Element>> =
  (props) => {
    const location = useLocation();
    const isExternalURL = () => {
      const url = props.to;
      if (!!url) {
        const domain = (url) =>
          url.replace("http://", "").replace("https://", "").split("/")[0];
        return domain(location.pathname) !== domain(url);
      }
      return null;
    };
    const type =
      props.type || isExternalURL() === true
        ? "external-link"
        : isExternalURL() === false
        ? "internal"
        : "button";
    const styles = classNames(
      props.className,
      "text-blue-700 dark:text-blue-400 font-ibm-plex-mono border border-blue-700 dark:border-blue-400 py-3 px-8 rounded transition-colors hover:!bg-blue-700 hover:!border-blue-700 hover:!text-white"
    );
    const button =
      type === "button" ? (
        <button className={styles}>{props.children}</button>
      ) : type === "external-link" ? (
        <a href={props.to} target={props.target} className={styles}>
          {props.children}
        </a>
      ) : (
        <Link to={props.to} className={styles}>
          {props.children}
        </Link>
      );
    return button;
  };

export default SimpleButton;
