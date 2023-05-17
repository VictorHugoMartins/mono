export const API_USER = {
  CREATE: () => `/User/Create`,
  DELETE: (token: string) => `/User/Delete?token=${token}`,
  GETALL: () => `/User/GetAll`,
  GETALLGROUPEDBYROLE: () => `/User/GetAllGroupedByRole`,
  GETALLBYSELECT: () => `/User/GetAllBySelect`,
  FORMOPTIONS: () => `/User/FormOptions`,
  PREPARE: (token: string) => `/User/Prepare?token=${token}`,
  UPDATE: () => `/User/Update`,
  EXPORTLIST: () => `/User/ExportList?options=`,
};
