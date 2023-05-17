import { ThemeColorsType } from "~/types/global/ThemeColorsType";
import { SpacingType } from "~/types/global/SpacingType";
import { IconTypes } from "../Icon/icon.interface";

export interface ButtonProps {
  backgroundColor?: string;
  color?: ButtonColor;
  href?: string;
  icon?: IconTypes;
  noPadding?: boolean;
  radius?: string | number;
  loading?: boolean;
  padding?: number | ButtonPadding;
  text?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type ButtonColor = ThemeColorsType;
export type ButtonPadding = SpacingType;
