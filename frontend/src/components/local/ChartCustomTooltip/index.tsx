import React, { useEffect } from "react";

import style from "./chartCustomTooltip.module.scss";

export interface ChartCustomTooltipProps {
  active?: any;
  payload?: any;
  label?: string;
}

export const ChartCustomTooltip: React.FC<ChartCustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className={style.customTooltip}>
        <strong>{label}</strong>
        {payload?.map((item) => (
          <p key={item.dataKey}>
            <strong style={{ color: item.color }}> {item.dataKey}: </strong>{" "}
            {item.value && typeof item.value === "number"
              ? item.value.toFixed(2)
              : item.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};
