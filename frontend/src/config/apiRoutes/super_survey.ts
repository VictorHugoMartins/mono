import { BASE_API_URL } from "../apiBase";

export const API_SUPER_SURVEY = {
  START: () => `${BASE_API_URL}/super_survey/start`,
  UPDATE: () => `${BASE_API_URL}/super_survey/update`,
  CONTINUE: () => `${BASE_API_URL}/super_survey/restart`,
  GETDATACOLUMNS: () => `${BASE_API_URL}/super_survey/get_data_columns/`,
}