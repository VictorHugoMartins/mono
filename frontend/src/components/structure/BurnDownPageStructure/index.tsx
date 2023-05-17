import React, { useEffect, useRef, useState } from "react";

//Import components
import HeadTags from "~/components/ui/Navigation/HeadTags/HeadTags";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import Chart from "~/components/ui/Charts/Chart";
import Select from "~/components/ui/Inputs/Select";
import Button from "~/components/ui/Button/Button";
import ColumnContent from "~/components/ui/Layout/ColumnContent/ColumnContent";
import DataTableRender from "~/components/ui/DataTable/DataTableRender/DataTableRender";
import Label from "~/components/ui/Inputs/Label/Label";
import DataTable from "~/components/ui/DataTable/DataTable";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import { Modal } from "~/components/ui/Modal/Modal";
import RowWithValue from "~/components/ui/Layout/RowWithValuue/RowWithValue";
import SprintDetailsModal from "~/components/local/SprintDetailsModal";
import Tabs from "~/components/ui/Tabs";
import Typography from "~/components/ui/Typography/Typography";
import Separator from "~/components/ui/Separator";
import DataTableHeaderExportButton from "~/components/ui/DataTable/DataTableHeader/DataTableHeaderExportButton";

//Import config
import { CONSTANTS_MESSAGES_APIERROR } from "~/config/messages";
import { API_BURNDOWN } from "~/config/apiRoutes/burndown";

//Import utils
import Toast from "~/utils/Toast/Toast";

//Import service
import chartService, {
  PrepareBurnDownChartType,
} from "~/services/chart.service";

import style from "./burnDownPageStructure.module.scss";
import Card from "~/components/ui/Card";
import { Grid } from "~/components/ui/Layout/Grid";
import { GetRequest } from "~/utils/Requests/Requests";
import burndownService from "~/services/burndown.service";

interface BurnDownPageStructureProps {
  preparePath: string;
  title?: string;
  onTabChange?: (headerValue: number, bodyValue: number) => void;
  initialTab?: number;
  initialSprint?: number;
}

const BurnDownPageStructure: React.FC<BurnDownPageStructureProps> = ({
  preparePath,
  title,
  onTabChange,
  initialTab,
  initialSprint,
}) => {
  const [_prepareData, setPrepareData] = useState(null);
  const [_chartData, setChartData] = useState<PrepareBurnDownChartType>(null);

  const [_tabActive, SetTabActive] = useState(0);
  const [_projectActive, SetProjectActive] = useState(initialTab ?? null);
  const [_sprintActive, SetSprintActive] = useState(initialSprint ?? null);

  const [_visualizationActive, SetVisualizationActive] = useState(1);

  const [gaugeChartAverageSprint, setGaugeChartAverageSprint] =
    useState<any>(null);
  const [gaugeChartAverageProject, setGaugeChartAverageProject] =
    useState<any>(null);

  const printRef = useRef();

  useEffect(() => {
    _preparePage();
  }, []);

  useEffect(() => {
    if (_onTabChange && _prepareData) {
      _onTabChange(
        _prepareData.findIndex((item) => item.projectId === initialTab)
      );
    }
  }, [initialTab]);

  useEffect(() => {
    if (_prepareData && _projectActive) {
      let _tab = _prepareData.findIndex(
        (item) => item.projectId === _projectActive
      );
      SetTabActive(_tab);

      if (_sprintActive === -1) {
        SetSprintActive(_prepareData[_tab].sprints[0].value);
      }

      _onTabChange(_tab ?? 0);
    }
  }, [_prepareData, _projectActive]);

  async function _preparePage() {
    try {
      let response = await burndownService.getList(preparePath);
      if (response.object.length >= 0) {
        setPrepareData(response.object);

        let _projectIndex = initialTab
          ? response.object.findIndex((item) => item.projectId === initialTab)
          : 0;

        _onTabChange(_projectIndex, response.object);
      } else {
        setPrepareData(null);
      }
    } catch (error) {
      setPrepareData(null);
      Toast.error(error.message || CONSTANTS_MESSAGES_APIERROR);
    }
  }

  async function _getList(sprint: number) {
    try {
      let response = await chartService.getListForChartAndTable(
        API_BURNDOWN.BUILD(sprint)
      );
      setChartData(response.object);
    } catch (error) {
      setChartData(null);
      Toast.error(error.message || CONSTANTS_MESSAGES_APIERROR);
    }
  }

  async function _getBurnDownGaugesSprint(sprint: number) {
    try {
      const response = await GetRequest<any>(
        API_BURNDOWN.GET_SPRINT_AVERAGE(sprint)
      );
      if (response.success === true) {
        setGaugeChartAverageSprint(response.object);
      }
    } catch (error) {}
  }

  async function _getBurnDownGaugesProject(project: number) {
    try {
      const response = await GetRequest<any>(
        API_BURNDOWN.GET_PROJECT_AVERAGE(project)
      );
      if (response.success === true) {
        setGaugeChartAverageProject(response.object);
      }
    } catch (error) {}
  }

  function _onTabChange(i: number, prepareData?: any) {
    SetTabActive(i);

    let _data = _prepareData ?? prepareData;

    if (_data?.length > 0) {
      let _project = Number(_data[i].projectId);
      let _sprint =
        prepareData && initialSprint
          ? initialSprint
          : _data[i].sprints[0].value;

      if (onTabChange) onTabChange(_project, _sprint);
      _getBurnDownGaugesProject(_project);
      _onSprintChange(_project, _sprint);
    }
  }

  function _onSprintChange(project: number, i: number) {
    SetSprintActive(i);

    if (onTabChange) {
      onTabChange(project, i);
    }
    _getList(i);
    _getBurnDownGaugesSprint(i);
  }

  if (!_prepareData) return <PopupLoading show={!_prepareData} />;

  if (_prepareData?.length === 0)
    return (
      <>
        <Grid padding="xg">
          <Typography component="h1" themed>
            Não há dados!
          </Typography>
        </Grid>
      </>
    );

  return (
    <>
      {title && <HeadTags title={title} />}

      <Tabs
        active={_tabActive}
        setActive={(i) => {
          _onTabChange(i);
        }}
        tabsData={_prepareData?.map((item) => {
          return { label: item.project, value: item.projectId };
        })}
        horizontalScroll
        styleType="2"
        headerType
      />

      <Grid container padding="xg" spacing={"xg"}>
        {_prepareData && (
          <Grid container md={12} spacing={"xg"} align="flex-end">
            <Grid container md={6} spacing={"xg"}>
              <Grid md={6}>
                <Label text={"Sprint"} />
                <Select
                  name="sprint"
                  options={_prepareData[_tabActive]?.sprints}
                  value={_sprintActive}
                  onChange={(e) => {
                    _onSprintChange(
                      _prepareData[_tabActive].projectId,
                      parseInt(e)
                    );
                  }}
                />
              </Grid>
              <Grid md={6}>
                <Label text={"Visualização"} />
                <Select
                  name="visualizacao"
                  options={[
                    { label: "Gráfico", value: 1 },
                    { label: "Tabela", value: 2 },
                  ]}
                  value={_visualizationActive}
                  onChange={(e) => {
                    SetVisualizationActive(parseInt(e));
                  }}
                />
              </Grid>
            </Grid>

            <Grid container md={6} spacing={"xg"}>
              <Grid md={6}>
                <Modal
                  title="Detalhes"
                  openButton={<Button color="primary" text="Detalhes" />}
                >
                  <SprintDetailsModal
                    preparePath={API_BURNDOWN.GETDETAILS(_sprintActive)}
                  />
                </Modal>
              </Grid>
              <Grid md={6}>
                <DataTableHeaderExportButton
                  text={"Exportar"}
                  elementRef={printRef}
                  value={_sprintActive}
                  icon={"FaFileExport"}
                  exportPath={API_BURNDOWN.EXPORTLIST()}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        {_chartData && (
          <Grid container xs={12} md={12} spacing={"xg"}>
            <Grid lg={8} md={12} xs={12} height={"100%"}>
              {_visualizationActive === 1 ? (
                <Card heightContent={"100%"} title={"Andamento do projeto"}>
                  {_chartData?.dataChart ? (
                    <Flexbox
                      height={"100%"}
                      align="center"
                      justify="center"
                      width={"100%"}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                        ref={printRef}
                        className={style.chartContent}
                      >
                        <Chart {..._chartData?.dataChart} />
                      </div>
                    </Flexbox>
                  ) : (
                    <Typography component="p">
                      Ainda não houveram lançamentos nessa sprint!
                    </Typography>
                  )}
                </Card>
              ) : (
                <Card title={"Tabela de pontos"}>
                  <ColumnContent columnCount={3}>
                    <RowWithValue
                      title="Tamanho da sprint"
                      value={_chartData?.dataTable.sizeSprint}
                    />
                    <RowWithValue
                      title="Pontos adiantados"
                      value={_chartData?.dataTable.pointsAdvanced}
                    />
                    <RowWithValue
                      title="Pontos queimados"
                      value={_chartData?.dataTable.pointsBurned}
                    />
                  </ColumnContent>
                  <Separator />
                  <DataTable
                    columns={_chartData?.dataTable.tables.columns}
                    rows={_chartData?.dataTable.tables.rows}
                    paginator
                    rowsPerPage={5}
                  />
                </Card>
              )}
            </Grid>
            {gaugeChartAverageSprint && gaugeChartAverageProject && (
              <Grid container height={"100%"} lg={4} md={12} spacing={"xg"}>
                <Grid height={"100%"} xs={12} md={12}>
                  <Card
                    title={"Média de pontos da Sprint"}
                    alignContent="center"
                  >
                    <Flexbox height={"100%"} align={"center"}>
                      <Chart {...gaugeChartAverageSprint} />
                    </Flexbox>
                  </Card>
                </Grid>
                <Grid xs={12} md={12} height={"100%"} align={"center"}>
                  <Card
                    title={"Média de pontos do Projeto"}
                    alignContent="center"
                  >
                    <Flexbox height={"100%"} align={"center"}>
                      <Chart {...gaugeChartAverageProject} />
                    </Flexbox>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}

        {_chartData && (
          <Grid md={12}>
            <Card title={"Média de pontos por história"}>
              {_chartData?.chartAvgPoints ? (
                <Flexbox align="center" justify="center" width={"100%"}>
                  <div ref={printRef} className={style.chartContent}>
                    <Chart {..._chartData?.chartAvgPoints} />
                  </div>
                </Flexbox>
              ) : (
                <Typography component="p">
                  Você ainda não lançou pontos nessa sprint!
                </Typography>
              )}
            </Card>
          </Grid>
        )}

        {_chartData && _sprintActive && _sprintActive > 0 && (
          <Grid md={12}>
            <Card title={"Lista de Observações"}>
              <DataTableRender
                padding="zero"
                param="id"
                getListPath={API_BURNDOWN.GETOBSERVATIONS(_sprintActive)}
                removeCard
                hideButtons
              />
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default BurnDownPageStructure;
