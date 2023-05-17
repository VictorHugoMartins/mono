export const API_ARTICLE = {
  BUILD: () => `/Article/Build`,
  DELETE: () => `/Article/Delete`,
  PREPARE: (token: string) => `/Article/Prepare?token=${token}`,
  SAVE: () => `/Article/Save`,
  EXPORTLIST: () => `/Article/ExportList?options=`,
  GETALLGROUPED: () => `/Article/GetAllGrouped`,
};
