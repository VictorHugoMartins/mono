//Import config
import { API_HOME } from "~/config/apiRoutes/home";
import { API_KANBAN } from "~/config/apiRoutes/kanban";

//Import types
import { ChartObjectType } from "~/types/global/ChartTypes";
import { HomeDataCollaborator } from "~/types/global/HomePageType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectOptionsType } from "~/types/global/SelectObjectType";

//Import utils
import { GetRequest } from "~/utils/Requests/Requests";

async function getDataCollaborator(path: string) {
  let response: APIResponseType<HomeDataCollaborator> = {
    object: {} as HomeDataCollaborator,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<HomeDataCollaborator>(path);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

async function getTicketChartUser() {
  let response: APIResponseType<ChartObjectType> = {
    object: null as ChartObjectType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<ChartObjectType>(
    API_KANBAN.GETTICKETCHARTBYUSER()
  );

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

type ManagementSelectType = {
  dropDown: SelectOptionsType;
  isDropDownVisible: boolean;
};

async function getManagementSelect() {
  let response: ManagementSelectType = null;

  const responseApi = await GetRequest<ManagementSelectType>(
    API_KANBAN.GETMANAGEMENTSDROPDOWN()
  );

  if (responseApi.success) response = responseApi.object;

  return response;
}

export type HomeDataType = {
  chartGaugeBurnPointsSprints?: ChartObjectType;
  dataCollaborator?: HomeDataCollaborator;
  hoursByProject?: ChartObjectType;
  projectsByUserIn5Months?: SelectOptionsType;
  pointsAverageByProject?: ChartObjectType;
  lastProjectsAndItemsWorkingHours?: ChartObjectType;
};

async function prepareHome() {
  let response: HomeDataType = {
    chartGaugeBurnPointsSprints: null,
    dataCollaborator: null,
    hoursByProject: null,
    projectsByUserIn5Months: null,
    pointsAverageByProject: null,
    lastProjectsAndItemsWorkingHours: null,
  };

  const getDataCollaborator = await GetRequest<HomeDataCollaborator>(
    API_HOME.GETDATACOLLABORATOR()
  );
  if (getDataCollaborator.success)
    response.dataCollaborator = getDataCollaborator.object;

  return response;
}

async function prepareGeneralView() {
  let response: HomeDataType = {
    chartGaugeBurnPointsSprints: null,
    hoursByProject: null,
    projectsByUserIn5Months: null,
    pointsAverageByProject: null,
    lastProjectsAndItemsWorkingHours: null,
  };

  const getDataTickets = await GetRequest<any>(API_HOME.GETDATATICKETS());

  const getHoursByProject = await GetRequest<ChartObjectType>(
    API_HOME.GETHOURSBYPROJECT()
  );
  if (getHoursByProject.success)
    response.hoursByProject = getHoursByProject.object;

  const getChartGaugeBurnPointsSprints = await GetRequest<any>(
    API_HOME.GETCHARTGAUGEBURNPOINTSSPRINTS()
  );
  if (getChartGaugeBurnPointsSprints.success)
    response.chartGaugeBurnPointsSprints =
      getChartGaugeBurnPointsSprints.object;

  const getLastProjectsByUserIn5Months = await GetRequest<SelectOptionsType>(
    API_HOME.GETLASTPROJECTSBYUSERIN5MONTHS()
  );
  if (getLastProjectsByUserIn5Months.success) {
    response.projectsByUserIn5Months = getLastProjectsByUserIn5Months.object;
    if (getLastProjectsByUserIn5Months.object.length > 0) {
      let homeByProject = await prepareHomeByProject(
        getLastProjectsByUserIn5Months.object[0].value as string
      );

      response.pointsAverageByProject = homeByProject.pointsAverageByProject;
      response.lastProjectsAndItemsWorkingHours =
        homeByProject.lastProjectsAndItemsWorkingHours;
    }
  }
  return response;
}

type PrepareHomeByProjectType = {
  pointsAverageByProject?: ChartObjectType;
  lastProjectsAndItemsWorkingHours?: ChartObjectType;
};

async function prepareHomeByProject(projectId?: string) {
  let response: PrepareHomeByProjectType = {
    pointsAverageByProject: null,
    lastProjectsAndItemsWorkingHours: null,
  };

  const getPointsAverageByProject = await GetRequest<ChartObjectType>(
    API_HOME.GETPOINTSAVERAGEBYPROJECT(projectId)
  );
  if (getPointsAverageByProject.success)
    response.pointsAverageByProject = getPointsAverageByProject.object;

  const getLastProjectsAndItemsWorkingHours = await GetRequest<ChartObjectType>(
    API_HOME.GETLASTPROJECTSANDITEMSWORKINGHOURS(projectId)
  );
  if (getLastProjectsAndItemsWorkingHours.success)
    response.lastProjectsAndItemsWorkingHours =
      getLastProjectsAndItemsWorkingHours.object;

  return response;
}

const homeService = {
  getDataCollaborator,
  getManagementSelect,
  getTicketChartUser,
  prepareHome,
  prepareHomeByProject,
  prepareGeneralView
};

export default homeService;
