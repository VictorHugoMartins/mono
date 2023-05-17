import { API_NOTIFICATION } from "~/config/apiRoutes/notification";
import { APIResponseType } from "~/types/global/RequestTypes";
import { GetRequest, PostRequest } from "~/utils/Requests/Requests";
import { getNotificationAPIClient } from "./axios";

async function setVisualized(token: string) {
  // console.log("notificacao visualizada", token);

  let response = {} as APIResponseType<any>;

  const responseApi = await PostRequest<any>(API_NOTIFICATION.SETVISUALIZED(token), null, null, null, getNotificationAPIClient());

  if (responseApi.success) {
    response.success = responseApi.success;
    response.object = responseApi.object;
  }
  response.message = responseApi.message;

  return response;
}

const notificationService = {
  setVisualized,
};

export default notificationService;
