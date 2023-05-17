export const API_REPORT = {
  BUILD: () => `/Report/Build`,
  DELETE: () => `/Report/Delete`,
  GETALL: () => `/Report/GetAll`,
  GETALLGROUPED: () => `/Report/GetAllGrouped`,
  RENDERTABLE: (token: string) => `/Report/RenderTable?reportId=${token}`,
  PREPARE: (token: string) => `/Report/Prepare?token=${token}`,
  SAVE: () => `/Report/Save`,
  EXPORTLIST: () => `/Report/ExportList?options=`,
};