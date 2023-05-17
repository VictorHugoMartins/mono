import { SpacingType } from "~/types/global/SpacingType";

export function HandleBorderRadius(
  borderRadius: number | SpacingType
): React.CSSProperties {
  if (!borderRadius) return {};
  if (typeof borderRadius === "number") return { borderRadius: borderRadius };
  else
    return {
      borderTopLeftRadius: borderRadius.top,
      borderTopRightRadius: borderRadius.bottom,
      borderBottomLeftRadius: borderRadius.left,
      borderBottomRightRadius: borderRadius.right,
    };
}
