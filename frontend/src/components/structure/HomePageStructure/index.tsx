import React, { useEffect, useState } from "react";

//Import assets
import styles from "./homePageStructure.module.scss";

//Import components
import Card from "~/components/ui/Card";
import CardHome from "./components/CardHome";
import Chart from "~/components/ui/Charts/Chart";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import HeadTags from "~/components/ui/Navigation/HeadTags/HeadTags";
import HomeChartsByProject from "./components/HomeChartsByProject";
import HomeSectionTitle from "./components/HomeSectionTitle";
import { Grid } from "~/components/ui/Layout/Grid";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import RoadMapDateHeaderFilters from "~/components/local/RoadMapHeaderFilters";
import Tabs from "~/components/ui/Tabs";
import Typography from "~/components/ui/Typography/Typography";
import WorkingHoursKanBan from "~/components/structure/HomePageStructure/components/WorkingHoursKanBan";

//Import config
import { API_WORKINGHOURS } from "~/config/apiRoutes/workingHours";

//Import services
import homeService, { HomeDataType } from "~/services/home.service";
import kanbanService from "~/services/kanban.service";

//Import types
import { HomePageProps } from "./homePageStructure.interface";
import MultiDoubleTextInput from "~/components/ui/Inputs/MultiDoubleTextInput";

const HomePageStructure: React.FC<HomePageProps> = ({ onTabChange, view }) => {
  const [_tabActive, setTabActive] = useState(view);
  const _tabsData = [
    { label: "Início", value: 0 },
    { label: "Kanban", value: 1 },
    { label: "Tickets", value: 2 },
    { label: "Visão geral", value: 3 },
  ];

  useEffect(() => {
    if (view !== null) setTabActive(view);
  }, [view]);

  const [_data, setData] = useState<HomeDataType>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function _getData() {
    setLoading(true);
    let response = await homeService.prepareHome();

    if (response) setData(response);
    setLoading(false);
  }

  async function _filterHomeByProject(id: string) {
    setLoading(true);
    let response = await homeService.prepareHomeByProject(id);

    if (response) {
      setData({ ..._data, ...response });
    }

    setLoading(false);
  }

  useEffect(() => {
    _getData();
  }, []);

  useEffect(() => {
    _onTabChange(_tabActive);
  }, [_tabActive]);

  async function _getOverviewData() {
    const response = (await homeService.prepareGeneralView()) as HomeDataType;
    if (response) {
      setData((data) => {
        return {
          ...data,
          ...response,
        };
      });
    }
  }

  function _onTabChange(headerValue: number) {
    if (onTabChange) onTabChange(headerValue);
  }

  useEffect(() => {
    if (_tabActive === 3) {
      _getData();
      _getOverviewData();
    }
  }, [_tabActive]);

  function WorkingHoursData() {
    return (
      <>
        {_data.dataCollaborator?.cards && (
          <>
            <Grid container md={12} spacing={"g"}>
              <Grid container md={12} spacing={"g"}>
                <Grid height={"100%"} md={4}>
                  <CardHome
                    className={styles.mounthCard}
                    icon={"FaCalendarAlt"}
                    title={_data.dataCollaborator.cards.mounthCard.title}
                    value={_data.dataCollaborator.cards.mounthCard.value}
                  />
                </Grid>

                <Grid height={"100%"} md={4}>
                  <CardHome
                    className={styles.yearCard}
                    icon={"FaCalculator"}
                    title={_data.dataCollaborator.cards.yearCard.title}
                    value={_data.dataCollaborator.cards.yearCard.value}
                  />
                </Grid>

                <Grid height={"100%"} md={4}>
                  <CardHome
                    className={styles.todayHours}
                    icon={"FaDatabase"}
                    title={_data.dataCollaborator.cards.todayHours.title}
                    value={_data.dataCollaborator.cards.todayHours.value}
                  />
                </Grid>
              </Grid>

              {_data.dataCollaborator?.chartHoursData.data[0].values ? (
                <Grid>
                  <Card title={"Gráfico de Horas"}>
                    {_data.dataCollaborator?.chartHoursData.data[0].values ? (
                      <Flexbox
                        flexDirection="column"
                        align="center"
                        justify="center"
                        width={"100%"}
                        height={"auto"}
                      >
                        <Flexbox className={styles.hoursChart}>
                          <Chart {..._data.dataCollaborator.chartHoursData} minY={0} />
                        </Flexbox>
                      </Flexbox>
                    ) : (
                      <Typography component="p">
                        Você ainda não lançou horas nesse mês!
                      </Typography>
                    )}
                  </Card>
                </Grid>
              ) : (
                <Typography component="p">
                  Você ainda não lançou horas nesse mês!
                </Typography>
              )}
            </Grid>
          </>
        )}
      </>
    );
  }

  if (!_data) return <PopupLoading show={true} />;
  return (
    <>
      <HeadTags title="Home" />
      <PopupLoading show={loading} />

      <Tabs
        active={_tabActive}
        setActive={(i) => setTabActive(i)}
        tabsData={_tabsData}
        horizontalScroll
        styleType="3"
        headerType
      />

      <Grid container spacing={"g"} padding={"xg"}>
        <Grid container spacingResponsive={{ sm: "p", md: "xg" }}>
          {_tabActive === 0 && <WorkingHoursData />}

          {_tabActive === 1 && (
            <WorkingHoursKanBan
              headerRender={
                <RoadMapDateHeaderFilters
                  getList={kanbanService.getDataForKanban}
                  forKanban
                />
              }
              enddate=""
              startdate=""
              filterPath={API_WORKINGHOURS.GETALL}
            />
          )}

          {_tabActive === 2 && (
            <>
              <Grid md={12}>
                <WorkingHoursKanBan
                  headerRender={
                    <RoadMapDateHeaderFilters
                      getList={kanbanService.getDataForTicketsKanban}
                      forKanban
                    />
                  }
                  enddate=""
                  startdate=""
                  filterPath={API_WORKINGHOURS.GETALLTICKETS}
                  forTickets
                />
              </Grid>
            </>
          )}

          {_tabActive === 3 && (
            <>
              {_data.chartGaugeBurnPointsSprints ? (
                <>
                  <Grid container xs={12} md={12} spacing={"xg"}>
                    <Grid xs={12}>
                      <HomeSectionTitle text="Visão geral dos últimos 6 meses" />
                    </Grid>
                    <Grid xs={12} md={_data.hoursByProject ? 3 : 12}>
                      <Card title={"Média de pontos"} alignContent="center">
                        <Chart {..._data.chartGaugeBurnPointsSprints} />
                      </Card>
                    </Grid>
                    {_data.hoursByProject && (
                      <Grid xs={12} md={9}>
                        <Card title={"Horas lançadas por projeto"}>
                          <Chart {..._data.hoursByProject} />
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                  <Grid xs={12} md={12}>
                    <Card title={"Pontos médios por Sprints"}>
                      {_data.dataCollaborator?.chartSprintsAverage.data[0]
                        .values ? (
                        <Chart
                          {..._data.dataCollaborator.chartSprintsAverage}
                        />
                      ) : (
                        <Typography component="p">
                          Você ainda não lançou pontos em nenhuma sprint
                        </Typography>
                      )}
                    </Card>
                  </Grid>

                  <HomeChartsByProject
                    lastProjectsAndItemsWorkingHours={
                      _data.lastProjectsAndItemsWorkingHours
                    }
                    pointsAverageByProject={_data.pointsAverageByProject}
                    projectsByUserIn5Months={_data.projectsByUserIn5Months}
                    onChange={_filterHomeByProject}
                  />
                </>
              ) : (
                <>{/* <PopupLoading show={true}/> */}</>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default HomePageStructure;
