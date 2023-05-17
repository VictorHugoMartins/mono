import { CSSProperties } from 'react';
import { AlignType, JustifyType } from "~/types/global/LayoutTypes";
import {
  SpacingPatternObjectType,
  SpacingPatternType,
} from "~/types/global/SpacingType";

export interface FlexboxProps {
  className?: string;
  children: React.ReactNode;
  align?: AlignType;
  justify?: JustifyType;
  flexDirection?: "row" | "column";
  spacing?: SpacingPatternType;
  margin?: SpacingPatternObjectType;
  maxWidth?: number | string;
  scroll?: "horizontal" | "vertical";
  wrap?: boolean;
  width?: number | string;
  height?: number | string;
  styles?:CSSProperties;
}
