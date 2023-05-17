export interface BoxProps {
  children: React.ReactNode;
  align?: "flex-start" | "flex-end" | "center";
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  backgroundColor?: string;
  borderRadius?: number;
  boxShadow?: boolean;
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  height?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  padding?: number;
}
