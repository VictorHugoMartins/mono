import React, { useContext, useEffect } from "react";
import { FaAdjust } from "react-icons/fa";
import { STORAGE_THEME } from "~/config/storage";
import { ThemeContext } from "../../../context/global/ThemeContext";
import Icon from "../Icon/Icon";

import style from "./themeSetter.module.scss";

export default function ThemeSetter() {
  const { theme, setTheme } = useContext(ThemeContext);

  function changeTheme() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  //determines if the user has a set theme
  function detectColorScheme() {
    var theme = "light"; //default to light

    //local storage is used to override OS theme settings
    if (localStorage.getItem(STORAGE_THEME)) {
      if (localStorage.getItem(STORAGE_THEME) === "dark") {
        var theme = "dark";
      }
    } else if (!window.matchMedia) {
      //matchMedia method not supported
      return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      //OS theme setting detected as dark
      var theme = "dark";
    }

    //dark theme preferred, set document with a `data-theme` attribute
    if (theme == "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    setTheme(theme);
  }

  useEffect(() => {
    detectColorScheme();
  }, []);

  return (
    <a className={style.themeSetter} onClick={changeTheme}>
      {theme === "dark" ? <Icon type="FaRegSun" /> : <Icon type="FaMoon" />}
      {theme === "dark" ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
    </a>
  );
}
