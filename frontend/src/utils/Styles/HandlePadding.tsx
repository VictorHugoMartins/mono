import { SpacingType } from "~/types/global/SpacingType";

export function HandlePadding(
  padding: number | SpacingType
): React.CSSProperties {
  if (!padding) return {};
  if (typeof padding === "number") return { padding: padding };
  else
    return {
      paddingTop: padding.top,
      paddingBottom: padding.bottom,
      paddingLeft: padding.left,
      paddingRight: padding.right,
    };
}
