export type SpacingType = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SpacingPatternType = "zero" | "pp" | "p" | "m" | "g" | "xg" | "xxg";

export type SpacingPatternObjectType = {
  top?: SpacingPatternType;
  bottom?: SpacingPatternType;
  left?: SpacingPatternType;
  right?: SpacingPatternType;
};
