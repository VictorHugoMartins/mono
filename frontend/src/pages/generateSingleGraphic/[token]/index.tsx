import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

//Import components
import Chart from "~/components/ui/Charts/Chart";
import Loading from "~/components/ui/Loading/Loading";
import Typography from "~/components/ui/Typography/Typography";

//Import services
import chartService from "~/services/generateChart.service";

//Import types
import { ChartObjectType } from "~/types/global/ChartTypes";

//Import utils
import Toast from "~/utils/Toast/Toast";

const GenerateChart: React.FC = () => {
  const { query } = useRouter();
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState<ChartObjectType>(null);

  async function _getChartData() {
    const response = await chartService.getGenerateChart(
      `/ReportGenerator/RenderSingleGraphic?token=${query.token}`
    );

    if (response.success === true) {
      setChartData(response.object);
    } else {
      Toast.error(response.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (query.token) {
      _getChartData();
    }
  }, [query.token]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "13%",
      }}
    >
      {loading ? (
        <Loading type="spin" size={25} theme={"primary"} />
      ) : chartData ? (
        <Chart {...chartData} />
      ) : (
        <Typography component="h3">
          Ocorreu um erro ao buscar os dados
        </Typography>
      )}
    </div>
  );
};

export default GenerateChart;
