import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

import chartColors from "../Chart/chartColors.json";

import { ChartDataType } from "~/types/global/ChartTypes";

ChartJS.register(ArcElement, Tooltip, Legend);

export type ChartDoughnutProps = {
  data: ChartDataType[];
  colors?: string[];
  hexColors?: boolean;
  size?: number;
};

const ChartDoughnut: React.FC<ChartDoughnutProps> = ({
  data,
  hexColors,
  size,
}) => {
  //define array of colors
  const valuesColors = data[0]?.values.map((item) => {
    if (item.color) return item.color;
  });

  const defaultColors =
    valuesColors.join("").split("").length > 0 ? valuesColors : chartColors;

  //define chart params
  const config: ChartData<"doughnut", number[], string> = {
    labels: data[0].values.map((item) => `${item.label}`),
    datasets: data.map((item) => {
      return {
        data: item.values.map((item) => item.value as number),
        backgroundColor: defaultColors.map((item) =>
          hexColors ? item : `rgba(${item}, 0.2)`
        ),
        borderColor: defaultColors.map((item) =>
          hexColors ? item : `rgba(${item}, 1)`
        ),
        borderWidth: 1,
      };
    }),
  };

  return (
    <Doughnut
      data={config}
      height={size}
      options={{ maintainAspectRatio: false }}
    />
  );
};

export default ChartDoughnut;
