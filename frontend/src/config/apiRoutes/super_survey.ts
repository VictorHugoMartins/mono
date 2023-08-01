import { BASE_API_URL } from "../apiBase";

export const API_SUPER_SURVEY = {
  SAVE: () => `${BASE_API_URL}/super_survey/save`,
  UPDATE: () => `${BASE_API_URL}/super_survey/update`,
  CONTINUE: () => `${BASE_API_URL}/super_survey/continue`,
  GETDATACOLUMNS: () => `${BASE_API_URL}/super_survey/get_data_columns?platform=`,
}