export const API_MANAGEMENT = {
  BUILD: () => `/Management/Build`,
  PREPARE: (token: string) => `/Management/Prepare?token=${token}`,
  DELETE: () => `/Management/Delete`,
  SAVE: () => `/Management/Save`,
  GETALL: () => `/Management/GetAll`,
  GETTOSELECTOBJECT: () => `/Management/GetToSelectObject`,
  SETMANAGEMENTUSER: () => `/Management/SetManagementUser`,
  EXPORTLIST: () => `/Management/ExportList?options=`,
};
