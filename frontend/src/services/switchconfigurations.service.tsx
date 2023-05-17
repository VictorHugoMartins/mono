import { APIResponseType } from "~/types/global/RequestTypes";
import { PostRequest } from "~/utils/Requests/Requests";

async function changeSwitchSettings(tokenList: string[]) {
  let response: APIResponseType<{}> = {
    object: {},
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<{}>(
    `/SwitchConfigurations/ChangeSwitchSettings`,
    tokenList
  );

  if (responseApi.success) {
    response.object = responseApi.object;
  }

  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

const switchconfigurationsService = {
  changeSwitchSettings,
};

export default switchconfigurationsService;
