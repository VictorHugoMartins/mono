import { API_WORKINGHOURS } from "~/config/apiRoutes/workingHours";
import { API_WORKINGHOURSMASS } from "~/config/apiRoutes/workingHoursMass";
import { API_WORKINGHOURSTICKET } from "~/config/apiRoutes/workingHoursTicket";
import { APIResponseType } from "~/types/global/RequestTypes";
import { GetRequest } from "~/utils/Requests/Requests";
import formService from "./form.service";

export type RemainingPointsType = {
  label: string;
  remainingPoints: number;
};

async function getRemainingPoints(projectItemId: string) {
  let response = [] as RemainingPointsType[];

  const responseApi = await GetRequest<RemainingPointsType[]>(
    API_WORKINGHOURS.GETREMAININGPOINTS(projectItemId)
  );

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

async function save(data: any, multiple?: boolean) {
  let response = {} as APIResponseType<any>;

  let _url = "";

  let _isTicket = data["projectItemId"].toString() === "-1";

  if (multiple) {
    if (_isTicket) _url = API_WORKINGHOURSTICKET.SAVEMASS();
    else _url = API_WORKINGHOURSMASS.SAVE();
  } else {
    if (_isTicket) _url = API_WORKINGHOURSTICKET.SAVE();
    else _url = API_WORKINGHOURS.SAVE();
  }

  const responseApi = await formService.submit(_url, data);

  response = responseApi;

  return response;
}

async function prepare(id: string) {
  let response = [] as RemainingPointsType[];

  const responseApi = await GetRequest<RemainingPointsType[]>(
    API_WORKINGHOURS.PREPARE(id)
  );

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

const workingHoursService = {
  getRemainingPoints,
  save,
  prepare
};

export default workingHoursService;
