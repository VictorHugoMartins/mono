import React from "react";

import ChartBar, { ChartBarProps } from "../ChartBar";
import ChartDoughnut, { ChartDoughnutProps } from "../ChartDoughnut";
import ChartFunnel, { ChartFunnelProps } from "../ChartFunnel";
import ChartGauge, { ChartGaugeProps } from "../ChartGauge";
import ChartLine, { ChartLineProps } from "../ChartLine";
import ChartPie, { ChartPieProps } from "../ChartPie";

type ChartProps =
  | ({ type: "area" } & ChartLineProps)
  | ({ type: "bar" } & ChartBarProps)
  | ({ type: "doughnut" } & ChartDoughnutProps)
  | ({ type: "funnel" } & ChartFunnelProps)
  | ({ type: "gauge" } & ChartGaugeProps)
  | ({ type: "line" } & ChartLineProps)
  | ({ type: "pie" } & ChartPieProps);

const Chart: React.FC<ChartProps> = (props) => {
  if (props.type === "area") return <ChartLine area={true} {...props} />;
  if (props.type === "bar") return <ChartBar {...props} />;
  if (props.type === "doughnut") return <ChartDoughnut {...props} />;
  if (props.type === "funnel") return <ChartFunnel {...props} />;
  if (props.type === "gauge") return <ChartGauge {...props} />;
  if (props.type === "line") return <ChartLine {...props} />;
  if (props.type === "pie") return <ChartPie {...props} />;
};

export default Chart;
