import React, { FC, useMemo, useContext, HtmlHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import sunIcon from "@iconify/icons-akar-icons/sun";
import paintDropHalfTwotone from "@iconify/icons-line-md/paint-drop-half-twotone";
import moonIcon from "@iconify/icons-ci/moon";
import { ThemeContext } from "../provider/ThemeProvider";
import classNames from "classnames";

const modeSettings: { [key: string]: any } = {
  dark: { icon: moonIcon },
  light: { icon: sunIcon },
  system: { icon: paintDropHalfTwotone },
};

const ThemeSwitcher: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const { theme, isSystem, setTheme } = useContext(ThemeContext);
  const modeSetting = useMemo(
    () => (isSystem ? modeSettings["system"] : modeSettings[theme]),
    [isSystem, theme]
  );
  const onModeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const mode = isSystem ? "light" : theme === "light" ? "dark" : "system";
    setTheme(mode);
  };
  return (
    <button
      key={theme}
      className={classNames(
        className,
        "flex items-center justify-center text-2xl text-gray-500 dark:text-gray-400 bg-gray-300/60 sm:bg-gray-200 dark:!bg-white/5 border-2 border-gray-300/50 dark:border-[#2c2c2c] w-10 h-10 rounded-md overflow-hidden transition-colors hover:!border-blue-500 hover:!text-blue-500"
      )}
      onClick={onModeChange}
    >
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={isSystem ? "system" : theme}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
        >
          <Icon icon={modeSetting.icon} />
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeSwitcher;
