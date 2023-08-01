import { BASE_API_URL } from "../apiBase";

export const API_NAV = {
  PUBLICGETALL: () => `${BASE_API_URL}/nav/public_getall`,
  GETALL: () => `${BASE_API_URL}/nav/getall`,
  EXPORT: () => `${BASE_API_URL}/nav/export`,
  GETBYCITY: () => `${BASE_API_URL}/nav/getbycity`,
  GETBYID: () => `${BASE_API_URL}/nav/getbyid`,
  PREPAREFILTER: (token: string) => `${BASE_API_URL}/nav/preparefilter?ss_id=${token}`,
  PREPARE: () => `${BASE_API_URL}/nav/prepare`,
  CHART: () => `${BASE_API_URL}/nav/chart`
}