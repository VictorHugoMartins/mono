import React, { useEffect, useState } from "react";

import styles from "./ChartRender.module.scss";

import Chart from "../Chart";

import { CONSTANTS_MESSAGES_APIERROR } from "~/config/messages";

import chartService from "~/services/chart.service";

import Toast from "~/utils/Toast/Toast";

import { ChartObjectType } from "~/types/global/ChartTypes";
import Typography from "../../Typography/Typography";
import Flexbox from "../../Layout/Flexbox/Flexbox";

interface ChartRenderProps {
  getChartPath: string;
  isPost?: boolean;
}

const ChartRender: React.FC<ChartRenderProps> = ({ getChartPath, isPost }) => {
  const [_data, setData] = useState<ChartObjectType>(null);

  useEffect(() => {
    _getChart();
  }, [getChartPath]);

  async function _getChart() {
    let response = await chartService.getChart(getChartPath, isPost);

    if (response.success) {
      setData(response.object);
    } else {
      setData(null);
      Toast.error(response.message || CONSTANTS_MESSAGES_APIERROR);
    }
  }

  if (!_data) return <></>;
  return (
    <div className={styles.chartContainer}>
      {
        _data.data.length > 0 && _data.data[0].values.length>0?
        <Chart {..._data} />
        :
        <Flexbox styles={{minHeight:200,display:'flex',alignItems:'center',justifyContent:'center'}} >
          <Typography component="h4">Não há dados para exibir</Typography>
        </Flexbox>
      }
    </div>
  );
};

export default ChartRender;
