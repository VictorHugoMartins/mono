import axios from "axios";
import GetAuthToken from "~/utils/AuthToken/GetAuthToken";
import { BASE_API_URL } from "../config/apiBase";

export function getAPIClient(ctx?: any, baseURL?: string) {
  const { token } = GetAuthToken(ctx);

  const api = axios.create({ baseURL: baseURL ?? BASE_API_URL });

  api.interceptors.request.use((config) => {
    return config;
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}