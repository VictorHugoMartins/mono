import React from "react";
import dynamic from "next/dynamic";

import { ChartDataType } from "~/types/global/ChartTypes";

import style from "./chartGauge.module.scss";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import Typography from "../../Typography/Typography";

// import JSCharting from "jscharting-react";
const JSCharting = dynamic(() => import("jscharting-react"), { ssr: false });

export type ChartGaugeProps = {
  boxShadow?: boolean;
  data: ChartDataType[];
  colors?: string[];
  hexColors?: boolean;
  group?: boolean;
  ticks?: number[];
  rangeMax?: number;
  rangeMin?: number;
  size?: number;
};

const ChartGauge: React.FC<ChartGaugeProps> = ({
  boxShadow,
  data,
  rangeMax,
  rangeMin,
  size,
  ticks,
}) => {
  const fontColor = "black";

  const config = (itemValue: number) => {
    return {
      legend: {
        visible: false,
      },
      defaultTooltip: {
        enabled: false,
      },
      defaultBox: {
        boxVisible: false,
      },
      xAxis: {
        spacingPercentage: 0.4,
      },
      yAxis: {
        scale: {
          range: [rangeMin || 0, rangeMax || itemValue],
        },
        defaultTick: {
          padding: 10,
          enabled: !ticks,
        },
        customTicks: [rangeMin || 0, ...ticks, rangeMax || itemValue],
        line: {
          width: 10,
          breaks: {},
          color: "smartPalette:pal1",
        },
      },
      defaultSeries: {
        type: "gauge column roundcaps",
        shape: {
          label: {
            text: "%max",
            align: "center",
            verticalAlign: "middle",
            style: {
              fontSize: 20,
              color: fontColor,
            },
          },
        },
      },
      box: {
        fill: "transparent",
      },
      series: [
        {
          type: "column roundcaps",
          palette: {
            id: "pal1",
            pointValue: "%yValue",
            // colors: ["#f2495c", "#73bf69"],
            ranges: [
              { value: 0, color: "#f2495c" },
              { value: [1, 2], color: "#73bf69" },
            ],
          },
          points: [["x", [0, itemValue]]],
        },
      ],
    };
  };

  const gaugeSize = {
    maxWidth: size ? `${size}px` : "200px",
    width: size ? `${size}px` : "200px",
    height: size ? `${size}px` : "200px",
  };

  return (
    <div className={style.gaugeGroup}>
      {data?.map((item) =>
        item.values?.map((chartItem) => (
          <div
            className={ClassJoin([
              style.gaugeCard,
              boxShadow && style.boxShadow,
            ])}
          >
            <Typography component="h4">{chartItem.label}</Typography>
            <div style={gaugeSize} className={style.gaugeItem}>
              <JSCharting options={config(Number(chartItem.value))} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChartGauge;
