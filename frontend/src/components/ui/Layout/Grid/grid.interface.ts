import { AlignType, JustifyType } from "~/types/global/LayoutTypes";
import { SpacingPatternType } from "~/types/global/SpacingType";

export interface GridProps {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  selector?: string | number;
  container?: boolean;
  align?: AlignType;
  justify?: JustifyType;
  spacing?: SpacingPatternType;
  spacingResponsive?: GapPatternObjectType;
  padding?: SpacingPatternType;
  children: React.ReactNode;
  height?: string | number;
}

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type GapPatternObjectType = {
  xs?: SpacingPatternType;
  sm?: SpacingPatternType;
  md?: SpacingPatternType;
  lg?: SpacingPatternType;
  xl?: SpacingPatternType;
};
