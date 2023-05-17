import React from "react";

import style from "./box.module.scss";
import { BoxProps } from "./box.interface";
import useTheme from "~/hooks/useTheme";

const Box: React.FC<BoxProps> = ({
  align = "flex-start",
  backgroundColor,
  borderRadius,
  boxShadow,
  children,
  flexDirection,
  justify = "flex-start",
  height = "unset",
  maxWidth,
  padding,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${style.box} ${style[`theme${theme}`]} ${
        maxWidth && style[`boxMaxWidth${maxWidth}`]
      } ${boxShadow && style.boxShadow}`}
      style={{
        alignItems: align,
        // backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        flexDirection: flexDirection,
        justifyContent: justify,
        height: height,
        padding: padding,
      }}
    >
      {children}
    </div>
  );
};

export default Box;
