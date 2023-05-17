import React from "react";
import { SpacingPatternType } from "~/types/global/SpacingType";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import { GapPatternObjectType } from "../Grid/grid.interface";

import styles from "./gridGroup.module.scss";

interface GridGroupProps {
  height?: string;
  width: string;
  spacing?: SpacingPatternType;
  spacingResponsive?: GapPatternObjectType;
}

const GridGroup: React.FC<GridGroupProps> = ({
  children,
  height,
  width,
  spacing,
  spacingResponsive,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return <>{React.cloneElement(child, {})}</>;
    }
    return child;
  });

  let classList = [
    styles.grid,
    spacing && styles[`${spacing}Spacing`],
    spacingResponsive?.xs && styles[`${spacingResponsive.xs}XsSpacing`],
    spacingResponsive?.sm && styles[`${spacingResponsive.sm}SmSpacing`],
    spacingResponsive?.md && styles[`${spacingResponsive.md}MdSpacing`],
    spacingResponsive?.lg && styles[`${spacingResponsive.lg}LgSpacing`],
    spacingResponsive?.xl && styles[`${spacingResponsive.xl}XlSpacing`],
  ];

  return (
    <div
      className={ClassJoin(classList)}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${width}, 1fr))`,
        gridAutoRows: height,
      }}
    >
      {childrenWithProps}
    </div>
  );
};

export default GridGroup;
