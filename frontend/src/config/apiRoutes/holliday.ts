export const API_HOLLIDAY = {
  BUILD: () => `/Holiday/Build`,
  DELETE: () => `/Holiday/Delete`,
  GETALL: () => `/Holiday/GetAll`,
  GETBYID: (token: string) => `/Holiday/GetById?token=${token}`,
  GROUPED: () => `/Holiday/Grouped`,
  PREPARE: (token: string) => `/Holiday/Prepare?token=${token}`,
  SAVE: () => `/Holiday/Save`,
  EXPORTLIST: () => `/Holiday/ExportList?options=`,
};
  