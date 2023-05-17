export const API_SPRINT = {
  BUILD: () => `/Sprint/Build`,
  DELETE: () => `/Sprint/Delete`,
  GETALL: (token: string) => `/Sprint/GetAll?idProject=${token}`,
  GETALLGROUPED: () => `/Sprint/GetAllGrouped`,
  PREPARE: (token: string) => `/Sprint/Prepare?token=${token}`,
  SAVE: () => `/Sprint/Save`,
  EXPORTLIST: () => `/Sprint/ExportList?options=`,
  GETBYPROJECT: (token: string) => `/Sprint/GetSprintsByProjectIdToControl?idProject=${token}`,
};
