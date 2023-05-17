import { API_POST_MANAGEMENT } from "~/config/apiRoutes/posts";
import { ChartRenderType } from "~/types/global/ChartRenderType";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectObjectType } from "~/types/global/SelectObjectType";
import { GetRequest, PostRequest } from "~/utils/Requests/Requests";

async function getAllGroupedOptions() {
  let response: APIResponseType<SelectObjectType[]> = {
    object: {} as SelectObjectType[],
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<SelectObjectType[]>(
    API_POST_MANAGEMENT.GET_ALL_GROUPED_OPTIONS(), {}
  );

  if (responseApi.success) {
    response.object = responseApi.object;
  }

  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

export type PostsDashboardType = {
  table: DataTableRenderType;
  charts: {
    title: string,
    chart: ChartRenderType
  }[];
}

async function getDashboard(managementId: string, startDate?: string, endDate?: string) {
  let response: APIResponseType<PostsDashboardType> = {
    object: {} as PostsDashboardType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<any>(API_POST_MANAGEMENT.GET_DASHBOARD(managementId, startDate, endDate));

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

export const postManagementService = {
  getAllGroupedOptions,
  getDashboard
};