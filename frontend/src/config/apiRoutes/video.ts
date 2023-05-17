export const API_VIDEO = {
  BUILD: () => `/Video/Build`,
  DELETE: () => `/Video/Delete`,
  GETALL: () => `/Video/GetAll`,
  GETALLGROUPED: () => `/Video/GetAllGrouped`,
  PREPARE: (token: string) => `/Video/Prepare?token=${token}`,
  SAVE: () => `/Video/Save`,
  EXPORTLIST: () => `/Video/ExportList?options=`,
};
