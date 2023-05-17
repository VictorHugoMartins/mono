import { API_ACCOUNT } from "~/config/apiRoutes/account";
import { API_MANAGEMENT } from "~/config/apiRoutes/management";
import { API_PROSPECT } from "~/config/apiRoutes/prospect";
import { UserInfoType } from "~/types/api/UserInfoType";
import { FileObjectType } from "~/types/global/FileObjectType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectObjectType, SelectOptionsType } from "~/types/global/SelectObjectType";
import { GetRequest, PostRequest } from "~/utils/Requests/Requests";

async function setManagementUser(token: string | number) {
  let response: APIResponseType<any> = {
    object: {},
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<any>(
    API_MANAGEMENT.SETMANAGEMENTUSER(),
    { token: token }
  );

  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}



const managementService = {
  setManagementUser,
};

export default managementService;
