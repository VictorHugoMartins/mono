import { BASE_API_URL } from "../apiBase";

export const API_NAV = {
  PUBLICGETALL: () => `${BASE_API_URL}/nav/public_getall`,
  LIST: () => `${BASE_API_URL}/nav/list`,
  EXPORT: () => `${BASE_API_URL}/nav/export`,
  GETLOGSDETAILS: (token: string) => `${BASE_API_URL}/nav/getlogsdetails/${token}`,
  GETBYCITY: () => `${BASE_API_URL}/nav/getbycity`,
  GETBYID: () => `${BASE_API_URL}/nav/getbyid`,
  PREPAREFILTER: (token: string) => `${BASE_API_URL}/nav/preparefilter/${token}`,
  PREPARE: () => `${BASE_API_URL}/nav/prepare`,
  CHART: () => `${BASE_API_URL}/nav/chart`
}