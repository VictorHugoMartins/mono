export const API_PROJECT_ITEM = {
  BUILD: () => `/ProjectItem/Build`,
  DELETE: () => `/ProjectItem/Delete`,
  GETALL: () => `/ProjectItem/GetAll`,
  GETALLGROUPEDBYPROJECT: () => `/ProjectItem/GetAllGroupedByProject`,
  GETALLGROUPEDBYPROJECTID: (token: string) => `/ProjectItem/GetAllGroupedByProjectId?projectId=${token}`,
  GETBYID: (token: string) => `/ProjectItem/GetById?token=${token}`,
  PREPARE: (token: string) => `/ProjectItem/Prepare?token=${token}`,
  SAVE: () => `/ProjectItem/Save`,
  EXPORTLIST: () => `/ProjectItem/ExportList?options=`,
};