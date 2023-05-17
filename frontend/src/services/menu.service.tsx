import { APIResponseType } from "~/types/global/RequestTypes";
import { GetRequest } from "~/utils/Requests/Requests";
import { RenderMenuType } from "~/types/global/RenderMenuType";
import { API_MENU } from "~/config/apiRoutes/menu";

async function getUserMenu(group) {
  let response: APIResponseType<RenderMenuType[]> = {
    object: {} as RenderMenuType[],
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<RenderMenuType[]>(
    API_MENU.GETMENU(group)
  );

  if (responseApi.success) {
    response.object = responseApi.object;
  }

  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

const menuService = {
  getUserMenu,
};

export default menuService;
