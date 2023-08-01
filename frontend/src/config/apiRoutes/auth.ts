import { BASE_API_URL } from "../apiBase";

export const API_AUTH = {
  CHANGE_PASSWORD: () => `${BASE_API_URL}/auth/change_password`,
  EDIT_USER: () => `${BASE_API_URL}/auth/edit_user`,
  REGISTER: () => `${BASE_API_URL}/auth/register`,
  FORGOTPASSWORD: () => `${BASE_API_URL}/auth/forgot_password`,
  LOGIN: () => `${BASE_API_URL}/auth/login`,
}