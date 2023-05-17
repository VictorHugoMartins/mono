//Import config
import { GanttDataType } from "~/types/global/GanttTypes";
import { API_KANBAN } from "~/config/apiRoutes/kanban";

//Import types
import { APIResponseType } from "~/types/global/RequestTypes";

//Import utils
import { PostRequest } from "~/utils/Requests/Requests";

type KanBanListRequestType = {
  projectId: number[];
  usersId: number[];
  managementsId: number[];
  countItems: string;
}

type ForKanBanListRequestType = {
  projects: number[];
  users: number[];
  managementId: string;
  countItems: string;
}

async function getData(path: string, data?: KanBanListRequestType) {
  // console.log("a data do refresh kanban service: ", data);
  let response = {} as APIResponseType<GanttDataType>;

  const getList = await PostRequest<GanttDataType>(
    API_KANBAN.GETLISTKANBAN(), data || {
      managementsId: [],
      projectId: [],
      usersId: [],
      countItems: 50,
    }
  );

  if (getList.success) return getList.object;
  return response;
}

export function convertStringArrayToIntArray(array: string[]) {
  let _newArray = [];
  for (let i = 0; i < array.length; i++) {
    _newArray.push(parseInt(array[i]));
  }
  return _newArray;
}

async function getDataForKanban(path: string, data?: ForKanBanListRequestType) {
  // console.log("a data do refresh kanban service: ", data);
  let response = {} as APIResponseType<GanttDataType>;
  // console.log(data);
  let _data = {
    ...data,
    projects: Array.isArray(data.projects) ? data.projects : convertStringArrayToIntArray(data.projects),
    managementId: parseInt(data.managementId)
  }
  // console.log("a data formatada", _data);
  const getList = await PostRequest<GanttDataType>(
    API_KANBAN.GETLISTKANBAN(), _data || {
      managementsId: [],
      projectId: [],
      usersId: [],
      countItems: 50,
    }
  );

  if (getList.success) return getList.object;
  return response;
}

async function getDataForTicketsKanban(path: string, data?: ForKanBanListRequestType) {
  // console.log("a data do refresh kanban service: ", data);
  let response = {} as APIResponseType<GanttDataType>;
  // console.log(data);
  let _data = {
    ...data,
    projects: Array.isArray(data.projects) ? data.projects : convertStringArrayToIntArray(data.projects),
    managementId: parseInt(data.managementId)
  }
  // console.log("a data formatada", _data);
  const getList = await PostRequest<GanttDataType>(
    API_KANBAN.GETLISTTICKETSKANBAN(), _data || {
      managementsId: [],
      projectId: [],
      usersId: [],
      countItems: 50,
    }
  );

  if (getList.success) return getList.object;
  return response;
}

const kanbanService = {
  getData,
  getDataForKanban,
  getDataForTicketsKanban
};

export default kanbanService;
