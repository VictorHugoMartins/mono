import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectObjectType } from "~/types/global/SelectObjectType";
import { GetRequest } from "~/utils/Requests/Requests";

export type PrepareBurnDownType = {
  projectId: number
  project: string;
  sprints: SelectObjectType[]
};

async function getList(path: string) {
  let response: APIResponseType<PrepareBurnDownType[]> = {
    object: {} as PrepareBurnDownType[],
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<PrepareBurnDownType[]>(path);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

const burndownService = {
  getList,
};

export default burndownService;
