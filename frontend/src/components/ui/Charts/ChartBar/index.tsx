import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import chartColors from "../Chart/chartColors.json";
import { ChartDataType } from "~/types/global/ChartTypes";
import useTheme from "~/hooks/useTheme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type ChartBarProps = {
  data: ChartDataType[];
  colors?: string[];
  hexColors?: boolean;
  group?: boolean;
  orientation?: "vertical" | "horizontal";
  print?: boolean;
};

const ChartBar: React.FC<ChartBarProps> = ({
  colors,
  data,
  group,
  hexColors,
  orientation,
  print
}) => {
  const { theme } = useTheme();
  const fontColor = theme === "dark" ? "white" : "black";

  //define array of colors
  const defaultColors = colors || chartColors;

  const options: ChartOptions<"bar"> = {
    indexAxis: orientation === "horizontal" ? ("y" as const) : ("x" as const),
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      yAxes: {
        grid: {},
        ticks: {
          color: print === true ? 'black ':fontColor,
        },
      },
      xAxes: {
        grid: {},
        ticks: {
          color: print === true ? 'black ':fontColor,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: group || false,
        position: "right" as const,
        labels: {
          color: print === true ? 'black ':fontColor,
        },
      },
    },
  };

  //define chart params
  const config: ChartData<"bar", (string | number)[], string> = {
    labels: data[0]?.values.map((item) => item.label),

    datasets: data.map((item, i) => {
      return {
        label: group && item.group,
        data: item.values.map((item) => item.value),
        borderColor: hexColors
          ? item.color || defaultColors[i]
          : `rgba(${item.color || defaultColors[i]}, 1)`,
        backgroundColor: hexColors
          ? item.color || defaultColors[i]
          : `rgba(${item.color || defaultColors[i]}, 0.8)`,
      };
    }),
  };

  return <Bar options={options} data={config} />;
};

export default ChartBar;
