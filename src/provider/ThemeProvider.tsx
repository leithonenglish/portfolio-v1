import React, { useState, useEffect } from "react";
export const ThemeContext = React.createContext({
  theme: "",
  isSystem: false,
  setTheme: (theme: string) => {},
});

const ThemeContextProvider = ({ children }) => {
  const [theme, _setTheme] = useState("dark");
  const [themes, setThemes] = useState<Set<string>>(new Set([theme]));
  const [isSystem, setIsSystem] = useState(false);
  const mqThemeListener = (event: MediaQueryListEvent) => {
    const isDark = event.matches;
    setTheme(isDark ? "dark" : "light");
  };
  const setTheme = (theme: string) => {
    let newTheme = theme;
    if (theme === "system") {
      newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setIsSystem(true);
    } else {
      newTheme = theme || "dark";
      setIsSystem(false);
    }
    _setTheme(newTheme);
  };
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setTheme(theme);
  }, []);
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (theme === "system") {
      darkThemeMq.addEventListener("change", mqThemeListener);
    } else {
      darkThemeMq.removeEventListener("change", mqThemeListener);
    }
    document.body.classList.remove(...Array.from(themes));
    document.body.classList.add(theme);
    setThemes((oldSet) => new Set(oldSet).add(theme));
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, isSystem, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
