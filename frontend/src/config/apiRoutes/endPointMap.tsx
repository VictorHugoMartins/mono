export const API_ENDPOINTMAP = {
  BUILD: () => `/EndPointMap/Build`,
  DELETE: () => `/EndPointMap/Delete`,
  GETALL: () => `/EndPointMap/GetAll`,
  GETBYTOKEN: (token: string) => `/EndPointMap/GetByToken?token=${token}`,
  PREPARE: (token: string) => `/EndPointMap/Prepare?token=${token}`,
  SAVE: () => `/EndPointMap/Save`,
  EXPORTLIST: () => `/EndPointMap/ExportList?options=`,
};
