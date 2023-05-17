//Import config
import { GanttDataType } from "~/types/global/GanttTypes";
import { API_GANTT } from "~/config/apiRoutes/gantt";

//Import types
import { HomeDataCollaborator } from "~/types/global/HomePageType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectObjectType } from "~/types/global/SelectObjectType";

//Import utils
import { GetRequest, PostRequest } from "~/utils/Requests/Requests";

async function getList(path: string) {
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

async function prepareManagements(token?: string) {
  ''
  let response: APIResponseType<SelectObjectType[]> = {
    object: {} as SelectObjectType[],
    success: false,
    message: "",
  };


  const responseApi = await GetRequest<SelectObjectType[]>(API_GANTT.PREPARE(token));

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

export type GanttRequestType = {
  projects: string[];
  users: string[];
  managementId: string[];
  countItems?: string;
}

async function getData(path: string, data?: GanttRequestType) {
  let response = {} as APIResponseType<GanttDataType>;

  const getList = await PostRequest<GanttDataType>(
    path, data || {
      managementId: [],
      projects: [],
      users: []
    }
  );

  if (getList.success) return getList;
  return response;
}

async function getUsersData(path: string, data?: GanttRequestType) {
  let response = {} as APIResponseType<GanttDataType>;

  const getList = await PostRequest<GanttDataType>(
    path, data || []
  );

  if (getList.success) return getList;
  return response;
}

const ganttService = {
  prepareManagements,
  getList,
  getData,
  getUsersData
};

export default ganttService;
