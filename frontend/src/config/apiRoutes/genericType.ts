export const API_GENERICTYPE = {
  BUILD: () => `/GenericType/Build`,
  DELETE: () => `/GenericType/Delete`,
  GETALL: () => `/GenericType/GetAll`,
  GETBYID: (token: string) => `/GenericType/GetById?token=${token}`,
  GROUPED: () => `/GenericType/Grouped`,
  PREPARE: (token: string) => `/GenericType/Prepare?token=${token}`,
  SAVE: () => `/GenericType/Save`,
  EXPORTLIST: () => `/GenericType/ExportList?options=`,
};
