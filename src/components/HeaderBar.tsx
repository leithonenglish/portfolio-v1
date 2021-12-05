import React, { useState, useContext, useMemo, useEffect, useRef } from "react";
import { Link } from "gatsby";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { ThemeContext } from "../provider/ThemeProvider";
import { logo as Logo } from "../assets/svg";

const modeSettings = {
  dark: { icon: "iconoir:light-bulb-off", color: "text-white/80" },
  light: { icon: "iconoir:light-bulb-on", color: "text-yellow-500" },
  system: { icon: "iconoir:light-bulb", color: "text-blue-500" },
};

const HeaderBar = () => {
  const headerElm = useRef<HTMLDivElement>(null);
  const { theme, isSystem, setTheme } = useContext(ThemeContext);
  const [links] = useState([
    { title: "About", url: "/#aboutme" },
    { title: "Experience", url: "/#experience" },
    { title: "My Work", url: "/#mywork" },
    { title: "Contact", url: "/#contact" },
  ]);
  const [scrollPos, _setScrollPos] = useState(0);
  const scrollPosRef = useRef(scrollPos);
  const setScrollPos = (pos: number) => {
    scrollPosRef.current = pos;
    _setScrollPos(pos);
  };
  const showShadow = useMemo(() => scrollPosRef.current > 80, [scrollPos]);
  const modeSetting = useMemo(
    () => (isSystem ? modeSettings["system"] : modeSettings[theme]),
    [isSystem, theme]
  );
  const onModeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const mode = isSystem ? "light" : theme === "light" ? "dark" : "system";
    setTheme(mode);
  };
  useEffect(() => {
    setScrollPos(window.scrollX);
    const onScroll = () => {
      const currentScrollPos = window.scrollY;
      if (scrollPosRef.current > currentScrollPos || currentScrollPos <= 0) {
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
          key={theme}
          className={classNames(
            "text-2xl transform transition-transform-colors hover:scale-125 active:scale-90",
            modeSetting.color
          )}
          onClick={onModeChange}
        >
          <Icon icon={modeSetting.icon} />
        </button>
      </div>
    </div>
  );
};

export default HeaderBar;
