import React, { useState, useContext, useMemo, useEffect, useRef } from "react";
import { Link } from "gatsby";
import { ThemeContext } from "gatsby-plugin-theme-switcher";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { logo as Logo } from "../assets/svg";

const HeaderBar = () => {
  const headerElm = useRef<HTMLDivElement>(null);
  const { theme, switchTheme } = useContext(ThemeContext);
  const [isDarkMode, setDarkMode] = useState(theme === "dark");
  const themeSelected = useMemo(
    () => (isDarkMode ? "dark" : "light"),
    [isDarkMode]
  );
  const [links] = useState([
    { title: "About", url: "/#aboutme" },
    { title: "Experience", url: "/#experience" },
    { title: "My Work", url: "/#mywork" },
    { title: "Contact", url: "/#contact" },
  ]);
  const [scrollPos, _setScrollPos] = useState(window.scrollY);
  const scrollPosRef = useRef(scrollPos);
  const setScrollPos = (pos: number) => {
    scrollPosRef.current = pos;
    _setScrollPos(pos);
  };
  const showShadow = useMemo(() => scrollPosRef.current > 80, [scrollPos]);
  useEffect(() => {
    const onScroll = () => {
      const currentScrollPos = window.scrollY;
      if (scrollPosRef.current > currentScrollPos) {
        headerElm.current.style.top = "0";
      } else {
        headerElm.current.style.top = `-${
          headerElm.current.clientHeight + 30
        }px`;
      }
      setScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    switchTheme(themeSelected);
  }, [isDarkMode]);

  const toggleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDarkMode(!isDarkMode);
  };
  return (
    <div
      ref={headerElm}
      className={classNames(
        "z-50 fixed top-0 left-0 right-0 flex items-center justify-between h-20 px-10 bg-gray-100/80 dark:bg-almost-black/80 backdrop-filter backdrop-blur-md transition-position-colors",
        { "shadow-lg": showShadow }
      )}
    >
      <Link to="/">
        <Logo className="h-8 text-blue-700 dark:text-blue-400" />
      </Link>
      <div className="flex items-center">
        {links.map(({ title, url }) => (
          <Link
            key={`${title}-${url}`}
            to={url}
            className="text-almost-black dark:text-gray-200 text-sm font-extralight px-5 transition-colors hover:text-blue-700 dark:hover:text-blue-400"
          >
            {title}
          </Link>
        ))}
        <button
          className={classNames(
            "relative flex items-center justify-between border rounded-full h-6 w-[50px] ml-5 transition-colors",
            !isDarkMode
              ? "border-yellow-500 bg-white"
              : "border-blue-400 bg-almost-black"
          )}
          onClick={toggleDarkMode}
        >
          {!isDarkMode ? (
            <Icon
              icon="majesticons:sun"
              className="text-yellow-500 absolute top-1/2 transform -translate-y-1/2 left-1"
            />
          ) : (
            <Icon
              icon="majesticons:moon"
              className="text-blue-400 absolute top-1/2 transform -translate-y-1/2 right-1"
            />
          )}
          <span
            className={classNames(
              "absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full transition-position-colors",
              !isDarkMode
                ? "bg-yellow-500 left-[29px]"
                : "bg-blue-400 left-1 right-auto"
            )}
          ></span>
        </button>
      </div>
    </div>
  );
};

export default HeaderBar;
