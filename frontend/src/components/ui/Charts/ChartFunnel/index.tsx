import React from "react";
import dynamic from "next/dynamic";

//Import assets
import style from "./chartFunnel.module.scss";

//Import components
import chartColors from "../Chart/chartColors.json";

//Import utils
import { convertRgbaToHex } from "~/utils/ConvertColor";

//Import types
import { ChartDataType, ChartValueType } from "~/types/global/ChartTypes";

const JSCharting = dynamic(() => import("jscharting-react"), { ssr: false });

export type ChartFunnelProps = {
  data: ChartDataType[];
  colors?: string[];
  hexColors?: boolean;
  size?: number;
};

const ChartFunnel: React.FC<ChartFunnelProps> = ({
  data,
  colors,
  hexColors,
  size,
}) => {
  //define array of colors
  const defaultColors = colors || chartColors;

  const config = (chartValue: ChartValueType[]) => {
    return {
      type: "coneInverted",
      legend_visible: false,
      defaultSeries: {
        shape: {
          innerPadding: 2,
          padding: 0.1,
        },
        palette: defaultColors.map((item) =>
          hexColors ? item : convertRgbaToHex(item, true)
        ),
        defaultPoint: {
          label: {
            text: "<b>%yValue</b> %name (%percentOfSeries%)",
            placement: "outside",
            style_fontSize: "14px",
          },
        },
      },
      box: {
        fill: "transparent",
      },
      series: [
        {
          name: "value",
          points: chartValue.map((item) => {
            return { name: item.label, y: item.value };
          }),
        },
      ],
    };
  };

  const gaugeSize = {
    maxWidth: size ? `${size}px` : "450px",
    width: size ? `${size}px` : "450px",
    height: size ? `${size}px` : "400px",
  };

  return (
    <>
      {data.map((item) => {
        return (
          <div className={style.funnel} style={gaugeSize}>
            <JSCharting options={config(item.values)} />
          </div>
        );
      })}
    </>
  );
};

export default ChartFunnel;
