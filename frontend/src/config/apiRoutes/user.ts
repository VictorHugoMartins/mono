import { BASE_API_URL } from "../apiBase";

export const API_USER = {
  ACCEPT: () => `${BASE_API_URL}/users/accept`,
  DELETE: () => `${BASE_API_URL}/users/delete`,
  CHANGE_PERMISSION: () => `${BASE_API_URL}/users/change_permission`,
  GETALL: () => `${BASE_API_URL}/users/getall`,
}