import { API_KANBAN } from "~/config/apiRoutes/kanban";
import { API_TICKET } from "~/config/apiRoutes/ticket";
import { API_USER } from "~/config/apiRoutes/user";
import { ChartObjectType } from "~/types/global/ChartTypes";
import { FileObjectType } from "~/types/global/FileObjectType";
import { TicketCardType } from "~/types/global/ListType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import { CTXServerSideType } from "~/types/global/ServerSideTypes";
import { GetRequest, PostRequest } from "~/utils/Requests/Requests";

type NestedListType = {
  chart: ChartObjectType;
  lists: TicketCardType[];
};

async function getNestedList(ctx?: CTXServerSideType) {
  let response = {
    chart: null,
    lists: [],
  } as NestedListType;

  const responseApi = await GetRequest<NestedListType>(
    API_TICKET.GETNESTEDLIST(),
    ctx
  );

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

async function getStatusList(ctx?: CTXServerSideType) {
  let response = [] as SelectOptionsType;

  const responseApi = await GetRequest<SelectOptionsType>(
    API_TICKET.GETLISTSTATUS(),
    ctx
  );

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

async function getUserList(ctx?: CTXServerSideType) {
  let response = [] as SelectOptionsType;

  const responseApi = await GetRequest<SelectOptionsType>(
    API_USER.GETALLBYSELECT(),
    ctx
  );

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

async function getUserToAssociate(ctx?: CTXServerSideType) {
  let response = [] as SelectOptionsType;

  const responseApi = await GetRequest<SelectOptionsType>(
    `/Ticket/PrepareAssociateUserToTicket`,
    ctx
  );

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

async function finishTicket(ticketId: string) {
  let response = {
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<any>(API_TICKET.FINISHEDOPENED(), {
    ticketId: ticketId,
  });

  if (responseApi.success) {
    response.success = responseApi.success;
  }
  response.message = responseApi.message;

  return response;
}

async function associateUserToTicket(obj: {}) {
  let response = {
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<any>(API_TICKET.ASSOCIATEUSERTOTICKET(), obj);

  if (responseApi.success) {
    response.success = responseApi.success;
  }
  response.message = responseApi.message;

  return response;
}

async function getWorkingHoursKanban(data: { managementId: number, countItems: number, projects: [], users: [] }) {
  let response: APIResponseType<any> = {
    object: {},
    success: false,
    message: "",
    errors: null,
  };

  const responseApi = await PostRequest<any>(API_KANBAN.GETLISTKANBAN(),
    data || {
      managementId: 0, // Informar o id de uma gerência, para o mind principalmente
      countItems: 0 // Informar um int para falar a quantidade de lançamentos de horas que serão buscados no banco, por padrão serão buscados 50
    }
  );

  if (responseApi.success) {
    response.success = responseApi.success;
  }
  response.message = responseApi.message;
  response.errors = responseApi.errors;
  response.object = responseApi.object;

  return response;
}

async function getTicketsWorkingHoursKanban(data: { managementId: number, countItems: number, projects: string[], users: string[] }) {
  let response: APIResponseType<any> = {
    object: {},
    success: false,
    message: "",
    errors: null,
  };

  const responseApi = await PostRequest<any>(API_KANBAN.GETLISTTICKETSKANBAN(),
    data || {
      managementId: 0, // Informar o id de uma gerência, para o mind principalmente
      countItems: 0, // Informar um int para falar a quantidade de lançamentos de horas que serão buscados no banco, por padrão serão buscados 50
      projects: []
    }
  );

  if (responseApi.success) {
    response.success = responseApi.success;
  }
  response.message = responseApi.message;
  response.errors = responseApi.errors;
  response.object = responseApi.object;

  return response;
}

export type TicketDetailType = {
  createdAt: string;
  description: string;
  finishedAt: string;
  galleryFiles: FileObjectType[];
  hasPermissionFinished: boolean;
  id: number;
  isFinished: boolean;
  mainFile: FileObjectType;
  management: string;
  project: string;
  status: string;
  title: string;
  updatedAt: string;
  user: string;
};

async function getTicketDetail(ticketId: string) {
  let response: TicketDetailType = null;

  const responseApi = await GetRequest<any>(API_TICKET.PREPARE(ticketId));

  if (responseApi.success) {
    response = {
      createdAt: responseApi.object["createdAtStr"] || "",
      description: responseApi.object["description"] || "",
      finishedAt: responseApi.object["finishedAtStr"] || "",
      galleryFiles:
        (responseApi.object["galleryFiles"] as FileObjectType[]) || null,
      hasPermissionFinished:
        (responseApi.object["hasPermissionFinished"] as boolean) || false,
      id: responseApi.object["id"] || "",
      isFinished: responseApi.object["isFinished"] || "",
      mainFile: (responseApi.object["mainFile"] as FileObjectType) || null,
      management: responseApi.object["managementStr"] || "",
      project: responseApi.object["projectStr"] || "",
      status: responseApi.object["statusStr"] || "",
      title: responseApi.object["title"] || "",
      updatedAt: responseApi.object["updatedAtStr"] || "",
      user: responseApi.object["userStr"] || "",
    };
  }

  return response;
}

const ticketService = {
  finishTicket,
  getNestedList,
  getUserList,
  getStatusList,
  getTicketDetail,
  associateUserToTicket,
  getWorkingHoursKanban,
  getUserToAssociate,
  getTicketsWorkingHoursKanban
};

export default ticketService;
