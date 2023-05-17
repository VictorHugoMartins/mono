import React, { useEffect, useState } from "react";

// External libraries and components
import { ViewMode } from "gantt-task-react";

//Import components
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import Tabs from "~/components/ui/Tabs";
import { Grid } from "~/components/ui/Layout/Grid";
import GanttView from "~/components/ui/GanttView";
import RoadMapHeader from "~/components/local/RoadMap/RoadMapHeader";
import { CreatePathExternalButtonType } from "~/components/ui/DataTable/DataTableHeader/dataTableHeader.interface";
import RoadMapDateHeaderFilters from "~/components/local/RoadMapHeaderFilters";
import DashboardHeaderFilters from "~/components/local/RoadMapHeaderFilters/RoadMapHeaderFilters";
import Typography from "~/components/ui/Typography/Typography";
import PrivatePageStructure from "../PrivatePageStructure/PrivatePageStructure";
import { ViewSwitcher } from "~/components/ui/GanttView/ViewSwitcher";
import CalendarRender from "~/components/local/CalendarRender";

// Import types
import { GanttDataType } from "../../../types/global/GanttTypes";
import { GenericComponentType } from "~/types/global/GenericComponentType";
import { APIResponseType } from "~/types/global/RequestTypes";

// Import utils
import { CALENDAR_EVENTS } from "~/config/apiRoutes/events";
import ganttService from "~/services/gantt.service";
import { API_GANTT } from "~/config/apiRoutes/gantt";

interface RoadMapPageStructureProps {
  headerRender?: GenericComponentType;
  headerButtons?: GenericComponentType;
  title?: string;
  createPath?: string | CreatePathExternalButtonType[];
  createButtonText?: string;
  exportPath?: string;
  exportButtonText?: string;
  reloadList?: () => Promise<void>;
  startdate: string;
  enddate: string;
  view: number;
  onTabChange?: (headerValue: number) => void;
}
export interface DateTimeState {
  startdate: Date;
  enddate: Date;
}
const RoadMapPageStructure: React.FC<RoadMapPageStructureProps> = ({
  title,
  createButtonText,
  createPath,
  exportButtonText,
  exportPath,
  startdate,
  enddate,
  view,
  onTabChange
}) => {
  const [_tabActive, SetTabActive] = useState(view);
  let _tabsData = [
    { label: "Gantt", value: 0 },
    { label: "Calendário", value: 1 },
    { label: "Dashboard", value: 2 },
  ];

  useEffect(() => {
    if (view !== null) SetTabActive(view)
  }, [view])

  useEffect(() => {
    _onTabChange(_tabActive);
  }, [_tabActive]);

  function _onTabChange(headerValue: number) {
    if (onTabChange) onTabChange(headerValue);
  }

  const [_data, setData] = useState<APIResponseType<GanttDataType>>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function _getData() {
    setLoading(true);
    let response = await ganttService.getData(API_GANTT.GETGANTTPROJECTANDTASKS());
    if (response) {
      setData(response);
    }
    setLoading(false);
  }

  async function _getDataAsync() {
    setLoading(true);
    let response = await ganttService.getUsersData(API_GANTT.GETGANTTPROJECTANDTASKSTODASHBOARDASYNC());
    if (response) setData(response);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(false);
    if (_tabActive === 0) _getData();
    else if (_tabActive === 2) _getDataAsync();
  }, [_tabActive]);
  function _setList(data: APIResponseType<GanttDataType>) {
    setData(data);
  }
  const [date, setDate] = useState<DateTimeState>({
    startdate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate() - 15
    ),
    enddate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 30
    ),
  });
  useEffect(() => {
    const data = localStorage.getItem('@ActiveTabRoadmap')
    // console.log('valor no data', data);
  }, [])
  const [_filtersData, setFiltersData] = useState({
    managementId: [],
    projects: [],
    users: [],
  });

  let noGanttData =
    _tabActive !== 1 &&
    _data?.object?.users?.length === 0 &&
    _data?.object?.data?.length === 0;

  const [ganttView, setGanttView] = useState<ViewMode>(ViewMode.Year);
  const [isChecked, setIsChecked] = useState(true);

  if (loading) return <PopupLoading show={loading} />;
  return (
    <>
      <PrivatePageStructure
        title={title}
        headerRender={
          <>
            <Tabs
              active={_tabActive}
              setActive={(i) => SetTabActive(i)}
              tabsData={_tabsData}
              horizontalScroll
              styleType="2"
              headerType
            />

            {_tabActive !== 1 && <Grid container spacing={"g"} padding={"g"}>
              <RoadMapHeader
                createButtonText={createButtonText}
                createPath={createPath}
                exportButtonText={exportButtonText}
                exportPath={exportPath}
                headerRender={
                  _tabActive === 2 ? (
                    <DashboardHeaderFilters
                      enddate={enddate}
                      startdate={startdate}
                      getList={ganttService.getData}
                      path={API_GANTT.GETGANTTPROJECTANDTASKSTODASHBOARDASYNC()}
                      setFiltersData={setFiltersData}
                    />
                  ) : (
                    <RoadMapDateHeaderFilters
                      enddate={enddate}
                      startdate={startdate}
                      getList={ganttService.getData}
                      path={""}
                    />
                  )
                }
                reloadList={_tabActive === 0 ? _getData : _getDataAsync}
                setList={_setList}
                activTab={_tabActive}
                endDate={date.enddate.toISOString()}
                startDate={date.startdate.toISOString()}
                setDate={setDate}
              />
            </Grid>
            }
          </>}
        preContentRender={
          _tabActive !== 1 && <ViewSwitcher
            onViewModeChange={(viewMode: ViewMode) => setGanttView(viewMode)}
            onViewListChange={setIsChecked}
            isChecked={isChecked}
            activeView={ganttView}
          />
        }
        noPadding
        fixedHeader
        cardTop={_tabActive !== 1}
      >
        <Grid
          container
          spacing={"g"}
          padding={"g"}
        >
          <Grid md={12}>
            <PopupLoading show={loading} />
            {noGanttData ? (
              <Typography component="h4">Sem dados</Typography>
            ) : (
              _data?.object && (
                <>
                  {_tabActive === 0 && !loading && (
                    <GanttView
                      data={_data.object}

                      externalIsChecked={isChecked}
                      externalViewSwitcher
                      externalView={ganttView}
                    />
                  )}
                  {_tabActive === 2 && !loading && (
                    <GanttView
                      data={_data.object}
                      getChildrenPath={API_GANTT.GETGANTTPROJECTANDTASKS()}
                      filtersData={_filtersData}

                      externalIsChecked={isChecked}
                      externalViewSwitcher
                      externalView={ganttView}
                    />
                  )}
                </>
              )
            )}
            {_tabActive === 1 && !loading && (
              <CalendarRender
                tabView={_tabActive}
                deletePathCalendar={CALENDAR_EVENTS.DELET()}
                endDateCalendar={date.enddate.toISOString()}
                startDateCalendar={date.startdate.toISOString()}
                getAllEvents={CALENDAR_EVENTS.GET_ALL()}
                getFilteredEvents={CALENDAR_EVENTS.GET_ALL_FILTERED()}
                preparePathCalendar={CALENDAR_EVENTS.PREPARE()}
                submitPathCalendar={CALENDAR_EVENTS.SAVE()}
                getUrlSaveCalendar={CALENDAR_EVENTS.GET_URL_SAVE()}
                buildFormCalendar={CALENDAR_EVENTS.BUILD()}
                detailsEventsPath={CALENDAR_EVENTS.EVENT_DETAILS()}
                calendarRedirectAdd={
                  "/projetos/roadmap/adicionar-evento"
                }
                calendarRedirectEdit={
                  "/projetos/roadmap/editar-evento"
                }
              />
            )}
          </Grid>
        </Grid>
      </PrivatePageStructure>
    </>
  );
};

export default RoadMapPageStructure;
