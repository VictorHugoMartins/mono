import { BASE_API_URL } from "../apiBase";

export const API_USER = {
  ACCEPT: () => `${BASE_API_URL}/users/accept`,
  CHANGE_PERMISSION: () => `${BASE_API_URL}/users/change_permission`,
  DELETE: () => `${BASE_API_URL}/users/delete`,
  LIST: () => `${BASE_API_URL}/users/list`,
}