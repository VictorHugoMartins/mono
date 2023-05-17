export type ChartRenderType = {
  type: "area" | "line" | "bar";
  layout?: "horizontal" | "vertical";
  xAxis?: string;
  yAxis?: string;
  data: any[];

  fields: string[];
  colors: string[];

  tooltip?: boolean;

  length? : number
}