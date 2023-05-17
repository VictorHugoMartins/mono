import React from "react";

//Import assets
import styles from "./grid.module.scss";

//Import types
import { GridProps } from "./grid.interface";

//Import utils
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

const Grid: React.FC<GridProps> = ({
  container,
  children,
  height,
  selector,
  xs,
  sm,
  md,
  lg,
  xl,
  padding,
  spacing,
  spacingResponsive,
  align = "flex-start",
  justify = "flex-start",
}) => {
  let spacingResponsiveClass = !!spacingResponsive
    ? [
        spacingResponsive?.xs
          ? styles[`${spacingResponsive.xs}XsSpacing`]
          : styles[`pXsSpacing`],
        spacingResponsive?.sm
          ? styles[`${spacingResponsive.sm}SmSpacing`]
          : styles[`pSmSpacing`],
        spacingResponsive?.md
          ? styles[`${spacingResponsive.md}MdSpacing`]
          : styles[`xgMdSpacing`],
        spacingResponsive?.lg
          ? styles[`${spacingResponsive.lg}LgSpacing`]
          : styles[`xgLgSpacing`],
        spacingResponsive?.xl
          ? styles[`${spacingResponsive.xl}XlSpacing`]
          : styles[`xgXlSpacing`],
      ]
    : [];

  let classList = [
    styles.grid,
    container && styles.container,
    xs && styles[`gridXs${xs}`],
    sm && styles[`gridSm${sm}`],
    md && styles[`gridMd${md}`],
    lg && styles[`gridLg${lg}`],
    xl && styles[`gridXl${xl}`],
    spacing && !spacingResponsive && styles[`${spacing}Spacing`],
    ...spacingResponsiveClass,
    padding && styles[`${padding}Padding`],
  ];

  return (
    <div
      className={ClassJoin(classList)}
      style={{
        height: height,
        gridTemplateColumns: selector,
        alignItems: align,
        justifyContent: justify,
      }}
    >
      {children}
    </div>
  );
};

export { Grid };
