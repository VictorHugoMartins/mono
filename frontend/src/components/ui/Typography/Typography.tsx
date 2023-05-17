import React from "react";

import style from "./typography.module.scss";
import { TypographyProps } from "./typography.interface";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import useTheme from "~/hooks/useTheme";

const Typography: React.FC<TypographyProps> = ({
  align,
  className = "",
  component,
  color,
  children,
  margin,
  themed,
}) => {
  const ComponentTag = `${component}` as keyof JSX.IntrinsicElements;

  let colorType = {
    styleColor:
      color !== "primary" && color !== "secondary" && color !== "danger"
        ? color
        : "",
    classColor:
      color === "primary" || color === "secondary" || color === "danger"
        ? color
        : "",
  };

  const { theme } = useTheme();
  let classList = [
    style.typographyStyle,
    style[`${component}`],
    style[`${colorType.classColor}`],
    margin?.top && style[`${margin.top}topMargin`],
    margin?.bottom && style[`${margin.bottom}bottomMargin`],
    margin?.left && style[`${margin.left}leftMargin`],
    margin?.right && style[`${margin.right}rightMargin`],
    themed && style[`theme${theme}`],
    className,
  ];

  return (
    <ComponentTag
      className={ClassJoin(classList)}
      style={{
        textAlign: align,
        color: colorType.styleColor,
      }}
    >
      {children}
    </ComponentTag>
  );
};

export default Typography;
