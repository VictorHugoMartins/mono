import { DataTableGroupedType } from "~/types/global/DataTableGroupedType";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { DataTableTabsRenderType } from "~/types/global/DataTableTabsRenderType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { GetRequest, PostRequest } from "~/utils/Requests/Requests";

async function getList(path: string) {
  let response: APIResponseType<DataTableRenderType> = {
    object: {} as DataTableRenderType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<DataTableRenderType>(path);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

async function getListPost(path: string) {
  let response: APIResponseType<DataTableRenderType> = {
    object: {} as DataTableRenderType,
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<DataTableRenderType>(path, {});

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

async function getGroupedList(path: string) {
  let response: APIResponseType<DataTableTabsRenderType> = {
    object: [] as DataTableTabsRenderType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<DataTableTabsRenderType>(`${path}`);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;
  return response;
}

async function getGroupedListPost(path: string) {
  let response: APIResponseType<DataTableTabsRenderType> = {
    object: [] as DataTableTabsRenderType,
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<DataTableTabsRenderType>(path, {});

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;
  return response;
}

async function itemDelete(path: string, param: string, value: number | string) {
  let response: APIResponseType<any> = {
    object: {},
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<any>(`${path}?${param}=${value}`, {});

  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

async function getGenericList(path: string) {
  let response: APIResponseType<DataTableGroupedType> = {
    object: {} as DataTableGroupedType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<DataTableGroupedType>(`${path}`);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;
  return response;
}

const listService = {
  itemDelete,
  getList,
  getListPost,
  getGroupedList,
  getGroupedListPost,
  getGenericList,
};

export default listService;
