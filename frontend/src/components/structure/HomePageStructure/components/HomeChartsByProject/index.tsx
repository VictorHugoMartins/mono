import React, { useEffect } from "react";
import Card from "~/components/ui/Card";
import Chart from "~/components/ui/Charts/Chart";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import { Grid } from "~/components/ui/Layout/Grid";
import Typography from "~/components/ui/Typography/Typography";
import { ChartObjectType } from "~/types/global/ChartTypes";
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import HomeSectionTitle from "../HomeSectionTitle";
import HomeSelect from "../HomeSelect";

interface HomeChartsByProjectProps {
  lastProjectsAndItemsWorkingHours?: ChartObjectType;
  pointsAverageByProject?: ChartObjectType;
  projectsByUserIn5Months?: SelectOptionsType;
  onChange: (id: string) => void;
}

const HomeChartsByProject: React.FC<HomeChartsByProjectProps> = ({
  lastProjectsAndItemsWorkingHours,
  pointsAverageByProject,
  projectsByUserIn5Months,
  onChange,
}) => {
  if (!lastProjectsAndItemsWorkingHours && !pointsAverageByProject && (projectsByUserIn5Months.length === 0)) return (
    <Grid xs={12}>
      <Card title={"Visão geral por projeto"}>
        Você ainda não lançou horas em nenhum projeto!
      </Card>
    </Grid>
  )

  useEffect(()=>{
    if(projectsByUserIn5Months){
      onChange(`${projectsByUserIn5Months[0].value}`);
    }
  },[projectsByUserIn5Months])

  return (
    <Grid container xs={12} spacing={"xg"}>
      <Grid xs={12}>
        <Flexbox align="center" justify="space-between">
          <HomeSectionTitle text="Visão geral por projeto" />
          <HomeSelect
            label="Projetos"
            options={projectsByUserIn5Months}
            onChange={onChange}
          />
        </Flexbox>
      </Grid>
      {lastProjectsAndItemsWorkingHours && (
        <Grid xs={12}>
          <Card title={"Média de horas por tarefa"} alignContent="center">
            <Chart {...lastProjectsAndItemsWorkingHours} size={400} />
          </Card>
        </Grid>
      )}
      {pointsAverageByProject && (
        <Grid xs={12}>
          <Chart {...pointsAverageByProject} boxShadow />
        </Grid>
      )}
      {!lastProjectsAndItemsWorkingHours && !pointsAverageByProject && (
        <Grid xs={12}>
          <Card>
            <Typography component="p">Você não lançou horas nesse projeto nos últimos 6 meses!</Typography>
          </Card>
        </Grid>
      )}

    </Grid>
  );
};

export default HomeChartsByProject;
