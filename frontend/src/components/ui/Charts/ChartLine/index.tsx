import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import chartColors from "../Chart/chartColors.json";
import { ChartDataType } from "~/types/global/ChartTypes";
import useTheme from "~/hooks/useTheme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export type ChartLineProps = {
  area?: boolean;
  data: ChartDataType[];
  colors?: string[];
  hexColors?: boolean;
  group?: boolean;
  className?: string;
  minY?: number;
};

const ChartLine: React.FC<ChartLineProps> = ({
  area,
  colors,
  data,
  hexColors,
  className,
  group,
  minY,
}) => {
  const { theme } = useTheme();
  const fontColor = theme === "dark" ? "white" : "black";

  //define array of colors
  const defaultColors = colors || chartColors;

  const options: ChartOptions<"line"> = {

    scales: {

      yAxes: {
        min: minY ?? undefined,
        grid: {},
        ticks: {
          color: fontColor,
        },
      },
      xAxes: {
        grid: {},
        ticks: {
          color: fontColor,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: group || false,
        position: "top" as const,
      },
    },
  };

  //define chart params
  const config = {
    labels: data[0]?.values.map((item) => item.label),
    datasets: data.map((item, i) => {
      return {
        fill: area || false,
        label: group && item.group,
        data: item.values.map((item) => item.value),
        borderColor: hexColors
          ? item.color || defaultColors[i]
          : `rgba(${item.color || defaultColors[i]}, 1)`,
        backgroundColor: hexColors
          ? item.color || defaultColors[i]
          : `rgba(${item.color || defaultColors[i]}, 0.5)`,
      };
    }),
  };

  return <Line className={className} options={options} data={config} />;
};

export default ChartLine;
