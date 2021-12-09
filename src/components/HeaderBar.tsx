import React, { useState, useMemo, useEffect, useRef, MouseEvent } from "react";
import { Link } from "gatsby";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { MenuToggler } from "../components/elements";
import { logo as Logo } from "../assets/svg";
import ThemeSwitcher from "./ThemeChanger";

const HeaderBar = () => {
  const headerElm = useRef<HTMLDivElement>(null);
  const [links] = useState([
    { title: "About", url: "/#aboutme" },
    { title: "Experience", url: "/#experience" },
    { title: "Projects", url: "/#projects" },
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
  const onMenuAnimated = (definition: any) => {
    console.log(definition);
    const isOpened = definition.opacity !== 0;
    setMenuInnerOpened(isOpened);
  };
  const onMenuOverlayClicked = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuInnerOpened(false);
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
        "z-50 fixed top-0 left-0 right-0 flex items-center justify-between h-20 px-5 sm:px-10 bg-gray-100/80 dark:bg-almost-black/80 backdrop-filter backdrop-blur-md transition-position-colors duration-500",
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
            className="text-almost-black dark:text-gray-200 font-extralight px-5 transition-colors hover:text-blue-700 dark:hover:text-blue-400"
          >
            {title}
          </Link>
        ))}
        <ThemeSwitcher className="ml-10" />
      </div>
      <AnimatePresence>
        {menuOpened && (
          <motion.div
            className="fixed z-30 top-0 right-0 left-0 h-screen bg-white/5 backdrop-filter backdrop-blur-3xl overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={onMenuAnimated}
            onClick={onMenuOverlayClicked}
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {menuInnerOpened && (
          <motion.aside
            className="fixed z-40 top-0 right-0 h-screen w-[80%] bg-gray-200 dark:bg-almost-black transform transition-colors duration-500"
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
                    onClick={() => {
                      setMenuInnerOpened(false);
                    }}
                  >
                    {title}
                  </Link>
                ))}
              </nav>
              <ThemeSwitcher className="mt-10" />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderBar;
