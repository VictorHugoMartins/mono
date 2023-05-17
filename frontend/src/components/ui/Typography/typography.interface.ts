import {
  SpacingPatternObjectType,
  SpacingType,
} from "~/types/global/SpacingType";

export interface TypographyProps {
  align?: "start" | "center" | "end";
  className?: string;
  component: TypographyComponentType;
  color?: "primary" | "secondary" | "danger" | string;
  margin?: TypographyMarginType;
  children?: React.ReactNode;
  themed?: boolean;
}

export type TypographyComponentType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "caption"
  | "span";

type TypographyMarginType = SpacingPatternObjectType;
