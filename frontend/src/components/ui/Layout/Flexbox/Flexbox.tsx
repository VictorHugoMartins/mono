import React from "react";

import style from "./flexbox.module.scss";
import { FlexboxProps } from "./flexbox.interface";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

const Flexbox: React.FC<FlexboxProps> = ({
  align = "flex-start",
  className = "",
  children,
  flexDirection,
  height,
  justify = "flex-start",
  wrap,
  margin,
  maxWidth,
  spacing,
  width,
  scroll,
  styles
}) => {
  let classList = [
    style.flexbox,
    wrap && style.wrap,
    scroll && style[`${scroll}Scroll`],
    margin?.top && style[`${margin.top}topMargin`],
    margin?.bottom && style[`${margin.bottom}bottomMargin`],
    margin?.left && style[`${margin.left}leftMargin`],
    margin?.right && style[`${margin.right}rightMargin`],
    spacing && style[`${spacing}Spacing`],
    className,
  ];

  return (
    <div
      className={ClassJoin(classList)}
      style={styles?styles:{
        alignItems: align,
        justifyContent: justify,
        flexDirection: flexDirection,
        height: height,
        maxWidth: maxWidth,
        width: width,
      }}
    >
      {children}
    </div>
  );
};

export default Flexbox;
