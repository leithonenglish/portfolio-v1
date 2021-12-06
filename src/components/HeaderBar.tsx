import React, { useState, useContext, useMemo, useEffect, useRef } from "react";
import { Link } from "gatsby";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import lightBulbOn from "@iconify/icons-iconoir/light-bulb-on";
import lightBulbOff from "@iconify/icons-iconoir/light-bulb-off";
import lightBulb from "@iconify/icons-iconoir/light-bulb";
import classNames from "classnames";
import { MenuToggler } from "../components/elements";
import { ThemeContext } from "../provider/ThemeProvider";
import { logo as Logo } from "../assets/svg";

const modeSettings: { [key: string]: any } = {
  dark: { icon: lightBulbOff, color: "text-white/80" },
  light: { icon: lightBulbOn, color: "text-yellow-500" },
  system: { icon: lightBulb, color: "text-blue-500" },
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
  const [menuOpened, _setMenuOpened] = useState(false);
  const [menuInnerOpened, setMenuInnerOpened] = useState(false);
  const scrollPosRef = useRef(scrollPos);
  const setScrollPos = (pos: number) => {
    scrollPosRef.current = pos;
    _setScrollPos(pos);
  };
  const menuOpenedRef = useRef(menuOpened);
  const setMenuOpened = (opened: boolean) => {
    menuOpenedRef.current = opened;
    _setMenuOpened(opened);
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
  const onMenuToggled = (opened: boolean) => {
    if (!opened) {
      setMenuInnerOpened(false);
    } else {
      setMenuOpened(true);
    }
  };
  const onMenuInnerAnimated = (definition: any) => {
    if (definition.opacity === 0) {
      setMenuOpened(false);
    }
  };
  useEffect(() => {
    setScrollPos(window.scrollX);
    const onScroll = () => {
      const currentScrollPos = window.scrollY;
      if (headerElm.current !== null) {
        if (scrollPosRef.current > currentScrollPos || currentScrollPos <= 0) {
          headerElm.current.style.top = "0";
        } else {
          headerElm.current.style.top = `-${
            headerElm.current.clientHeight + 30
          }px`;
        }
      }
      setScrollPos(currentScrollPos);
    };
    const onPageResize = () => {
      if (window.innerWidth > 639 && menuOpenedRef.current) {
        setMenuOpened(false);
      }
    };
    window.addEventListener("resize", onPageResize);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onPageResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpened ? "hidden" : "unset";
  }, [menuOpened]);

  return (
    <div
      ref={headerElm}
      className={classNames(
        "z-50 fixed top-0 left-0 right-0 flex items-center justify-between h-20 px-5 sm:px-10 bg-gray-100/80 dark:bg-almost-black/80 backdrop-filter backdrop-blur-md transition-position-colors",
        { "shadow-lg": showShadow }
      )}
    >
      <Link to="/" className="relative z-50">
        <Logo className="h-8 text-blue-700 dark:text-blue-400" />
      </Link>
      <MenuToggler
        opened={menuOpened}
        className="relative z-50 sm:!hidden"
        onToggled={(opened) => onMenuToggled(opened)}
      />
      <div className="items-center hidden sm:flex">
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
      <AnimatePresence>
        {menuOpened && (
          <motion.div
            className="fixed z-40 top-0 right-0 left-0 h-screen bg-white/5 backdrop-filter backdrop-blur-3xl overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setMenuInnerOpened(true)}
          >
            <AnimatePresence>
              {menuInnerOpened && (
                <motion.aside
                  className="absolute top-0 right-0 h-screen w-[80%] bg-gray-300 dark:bg-almost-black transform"
                  initial={{ opacity: 0, x: "1000px" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "1000px" }}
                  transition={{ duration: 0.3 }}
                  onAnimationComplete={onMenuInnerAnimated}
                >
                  <div className="flex flex-col items-center justify-center w-full h-full py-10">
                    <nav className="flex flex-col items-center justify-center">
                      {links.map(({ title, url }) => (
                        <Link
                          key={`${title}-${url}`}
                          to={url}
                          className="text-almost-black dark:text-gray-200 text-xl font-extralight my-5 transition-colors hover:text-blue-700 dark:hover:text-blue-400"
                          onClick={() => setMenuInnerOpened(false)}
                        >
                          {title}
                        </Link>
                      ))}
                    </nav>
                    <button
                      key={theme}
                      className={classNames(
                        "text-4xl transform transition-transform-colors mt-10 hover:scale-125 active:scale-90",
                        modeSetting.color
                      )}
                      onClick={onModeChange}
                    >
                      <Icon icon={modeSetting.icon} />
                    </button>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderBar;
