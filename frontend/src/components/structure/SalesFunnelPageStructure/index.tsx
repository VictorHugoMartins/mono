import React, { useEffect, useState } from "react";

import Card from "~/components/ui/Card";
import ChartRender from "~/components/ui/Charts/ChartRender";
import FilterHeader from "./components/FilterHeader";
import { Grid } from "~/components/ui/Layout/Grid";

import { API_PROSPECT } from "~/config/apiRoutes/prospect";
import { useUserContext } from "~/context/global/UserContext";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import ListPageStructure from "../ListPageStructure";

interface Props {
  startDate: string;
  endDate: string;
}

const SalesFunnelPageStructure: React.FC<Props> = ({ startDate, endDate }) => {
  const { user } = useUserContext();

  let initialParam = {
    startDate: startDate,
    endDate: endDate,
    managementId: null,
    organizationId: "",
    userSellerId: "",
  };

  const [_params, setParams] = useState(initialParam);

  const chartPath = API_PROSPECT.SALESFUNNELCHART(
    _params.startDate,
    _params.endDate,
    _params.managementId,
    _params.organizationId,
    _params.userSellerId
  );

  const tablePath = API_PROSPECT.SALESFUNNELTABLE(
    _params.startDate,
    _params.endDate,
    _params.managementId,
    _params.organizationId,
    _params.userSellerId
  );

  return (
    <Grid container spacing="xg">
      <Grid xs={12}>
        <FilterHeader
          initialData={_params}
          onSubmit={(data) => {
            setParams(data);
          }}
          onReset={() => setParams(initialParam)}
        />
      </Grid>
      <Grid md={5}>
        <Card alignContent="center" padding="zero">
          <ChartRender getChartPath={chartPath} isPost />
        </Card>
      </Grid>
      <Grid md={7}>
        <ListPageStructure
          getListPath={tablePath}
          getListisPost
          padding="zero"
        />
      </Grid>
    </Grid>
  );
};

export default SalesFunnelPageStructure;
