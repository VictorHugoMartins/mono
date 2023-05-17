import React, { useEffect } from "react";
import { getStylesByField } from "~/utils/GetStyles";

import style from "./typography.module.scss";

interface TimeLineBarProps {
  data: { startDate: string, endDate: string };
  priorityStr: string;
  borderRadius?: boolean;
}
const TimeLineBar: React.FC<TimeLineBarProps> = ({
  data,
  priorityStr,
  borderRadius,
}) => {
  function _formatData(date) {
    return date.substring(8, 10) + "/" + date.substring(5, 7)
  }

  return (
    <div id={style.timeLineBar} style={{ borderRadius: borderRadius ? 16 : undefined }}>
      <caption style={getStylesByField("name", priorityStr, 0)}>
        {/* <div> */}
        {data?.startDate ? _formatData(data.startDate) : ""} - {data?.endDate ? _formatData(data.endDate) : ""}
        {/* </div> */}
      </caption>
    </div>
  );
};

export default TimeLineBar;
