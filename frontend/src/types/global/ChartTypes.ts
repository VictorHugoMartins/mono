import { SelectObjectType } from "./SelectObjectType";

export type ChartObjectType = {
  type: ChartOptionsType;
  boxShadow?: boolean;
  data: ChartDataType[];
  group?: boolean;
  rangeMax?: number;
  rangeMin?: number;
  orientation?: ChartOrientationType;
};

export type ChartOptionsType = "area" | "line" | "bar" | "pie";
export type ChartOrientationType = "horizontal" | "vertical";

export type ChartDataType = {
  color?: string;
  group?: string;
  values: ChartValueType[];
};

export type ChartValueType = SelectObjectType & { color?: string };
