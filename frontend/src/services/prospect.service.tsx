import { API_PROSPECT } from "~/config/apiRoutes/prospect";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectObjectType, SelectOptionsType } from "~/types/global/SelectObjectType";
import { GetRequest } from "~/utils/Requests/Requests";

type PrepareSalesFunnelResponseType = {
  organizations: SelectOptionsType;
  sellers: SelectOptionsType;
};

async function prepareSalesFunnel(managementId: string) {
  let response = null as PrepareSalesFunnelResponseType;

  const responseApi = await GetRequest<PrepareSalesFunnelResponseType>(
    API_PROSPECT.PREPARESALESFUNNEL(managementId)
  );

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

async function getAllGroupedOptions(){
  let response: APIResponseType<SelectObjectType[]> = {
    object:[],
    success:false,
    message:''
  }

  const responseApi = await GetRequest(API_PROSPECT.GETALLGROUPEDOPTIONS());
  response.success = responseApi.success,
  response.message = responseApi.message
  response.object = responseApi.object as SelectObjectType[]

  return response;
}

const prospectService = {
  prepareSalesFunnel,
  getAllGroupedOptions,
};

export default prospectService;
