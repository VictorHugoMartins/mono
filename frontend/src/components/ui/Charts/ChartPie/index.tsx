import React from "react";
import { Pie } from "react-chartjs-2";
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

export type ChartPieProps = {
  data: ChartDataType[];
  colors?: string[];
  hexColors?: boolean;
  size?: number;
};

const ChartPie: React.FC<ChartPieProps> = ({
  colors,
  data,
  hexColors,
  size,
}) => {
  const fontColor = "black";

  //define array of colors
  const valuesColors = data[0]?.values.map((item) => {
    if (item.color) return item.color;
  });

  const defaultColors =
    valuesColors.join("").split("").length > 0 ? valuesColors : chartColors;

  //define chart params
  const config: ChartData<"pie", number[], string> = {
    labels: data[0].values.map((item) => `${item.label}`),
    datasets: data.map((item) => {
      return {
        data: item.values.map((item) => item.value as number),
        backgroundColor: defaultColors.map((item) =>
          hexColors ? item : `rgba(${item}, 0.8)`
        ),
        borderColor: defaultColors.map((item) =>
          hexColors ? item : `rgba(${item}, 1)`
        ),
        borderWidth: 1,
      };
    }),
  };

  return (
    <Pie
      data={config}
      height={size}
      options={{
        maintainAspectRatio: false,
        color: fontColor,
        responsive: true,
      }}
    />
  );
};

export default ChartPie;
