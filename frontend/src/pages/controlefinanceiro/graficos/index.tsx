import React, { useEffect } from "react";
import { GetServerSideProps } from "next";

import privateroute from "~/routes/private.route";
import ofxService from "~/services/ofx.service";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { Grid } from "~/components/ui/Layout/Grid";
import ChartRender from "~/components/ui/Charts/ChartRender";
import { API_OFX } from "~/config/apiRoutes/ofx";
import Separator from "~/components/ui/Separator";
import Typography from "~/components/ui/Typography/Typography";

interface FinanceChatsProps {
  ofxListId: string;
}

const FinanceChats: React.FC<FinanceChatsProps> = ({ ofxListId }) => {
  useEffect(() => {
    getCharts();
  }, []);

  async function getCharts() {
    let response = await ofxService.getCharts(ofxListId);
  }
  return (
    <PrivatePageStructure title="Graficos">
      <Separator />
      <Grid container>
        <Grid md={4}>
          <Typography component="h3">Em relação a classificação</Typography>
          <ChartRender getChartPath={API_OFX.GENERATECLASSGRAPH(ofxListId)} />
        </Grid>
        <Grid md={4}>
          <Typography component="h3">Em relação ao dia</Typography>
          <ChartRender getChartPath={API_OFX.GENERATEDAYGRAPH(ofxListId)} />
        </Grid>
      </Grid>
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { OFXListId } = ctx.query;

  if (!OFXListId) {
    return {
      notFound: true,
    };
  }

  return { props: { ofxListId: OFXListId } };
};

export default privateroute(FinanceChats);
