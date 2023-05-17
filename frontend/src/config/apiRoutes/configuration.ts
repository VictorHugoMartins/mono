export const API_CONFIGURATION = {
  BUILD: () => `/Configuration/Build`,
  DELETE: () => `/Configuration/Delete`,
  GETALL: () => `/Configuration/GetAll`,
  GETBYTOKEN: (token: string) => `/Configuration/GetByToken?token=${token}`,
  PREPARE: (token: string) => `/Configuration/Prepare?token=${token}`,
  SAVE: () => `/Configuration/Save`,
  EXPORTLIST: () => `/Configuration/ExportList?options=`,
};
