import React from "react";

import style from "./label.module.scss";
import { LabelProps } from "./label.interface";
import useTheme from "~/hooks/useTheme";

const Label: React.FC<LabelProps> = ({ text, labelFor, required }) => {
  const { theme } = useTheme();

  return (
    <label className={`${style.label} ${style[`theme${theme}`]}`} htmlFor={labelFor}>
      {text}
      {required && <b> *</b>}
    </label>
  );
};

export default Label;
