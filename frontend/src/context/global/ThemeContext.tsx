import React, { useState, useEffect } from "react";
import { STORAGE_THEME } from "~/config/storage";

type ThemeType = "dark" | "light";

type ThemeDataType = {
  theme: ThemeType;
  changeTheme: (value: ThemeType) => void;
  setTheme: any;
};

export const ThemeContext = React.createContext({} as ThemeDataType);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>();

  useEffect(() => {
    initialization();
  }, []);

  useEffect(() => {
    if (theme) onThemeChange(theme);
  }, [theme]);

  function initialization() {
    const savedThemeLocal = window.localStorage.getItem(
      STORAGE_THEME
    ) as ThemeType;

    if (!!savedThemeLocal) changeTheme(savedThemeLocal);
    else changeTheme("light");
  }

  function changeBodyColor() {
    document.body.style.backgroundColor =
      theme === "dark" ? "#0A1A28" : "white";
  }

  function changeTheme(value: ThemeType) {
    if (!!value) setTheme(value);
  }

  function onThemeChange(value: ThemeType) {
    window.localStorage.setItem(STORAGE_THEME, value);
    changeBodyColor();
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
