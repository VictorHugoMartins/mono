import React from "react";

import Chart from "../../Charts/Chart";
import { Grid } from "../../Layout/Grid";

import { ChartObjectType } from "~/types/global/ChartTypes";
import Card from "../../Card";

interface ReportChartsProps {
  data: ChartObjectType[];
}

const ReportCharts: React.FC<ReportChartsProps> = ({ data }) => {
  return (
    <Grid container spacing={"xg"}>
      {data.map((item: ChartObjectType, index: number) => (
        <Grid sm={12} md={6} key={`report-${index}`}>
          <Card>
            <div style={{ height: "100%", width: "100%" }}>
              <Chart {...item} />
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportCharts;
