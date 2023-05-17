export const API_FORMBUILD = {
  BUILD: () => `/FormBuild/Build`,
  DELETE: () => `/FormBuild/Delete`,
  GETALL: () => `/FormBuild/GetAll`,
  GETBYTOKEN: (token: string) => `/FormBuild/GetByToken?token=${token}`,
  PREPARE: (token: string) => `/FormBuild/Prepare?token=${token}`,
  SAVE: () => `/FormBuild/Save`,
  EXPORTLIST: () => `/FormBuild/ExportList?options=`,
};
