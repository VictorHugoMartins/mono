import { BASE_API_URL } from "../apiBase";

export const API_SYSTEM = {
  UPDATELOCATIONS: (token: string) => `${BASE_API_URL}/system/update_locations/${token}`,
}