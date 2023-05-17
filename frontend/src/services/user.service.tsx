import { API_USER } from "~/config/apiRoutes/user";
import { CreateUserType, FormUserType } from "~/types/api/UserTypes";
import { GetRequest } from "~/utils/Requests/Requests";
import formService from "./form.service";

async function create(data: CreateUserType) {
  const response = await formService.submit(API_USER.CREATE(), data);

  return response;
}

async function prepare(token?: string) {
  let response = {} as FormUserType;

  const responseApi = await GetRequest<FormUserType>(API_USER.PREPARE(token));

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

const userService = {
  create,
  prepare,
};

export default userService;
