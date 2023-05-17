export const API_SPRINTCOLLECTION = {
  BUILD: (token: string) => `/SprintCollection/Build?idSprint=${token}`,
  BUILDEDIT: (token: string,idSprintCollection?:string) => `/SprintCollection/Build?idSprint=${token}${idSprintCollection?`&idSprintCollection=${idSprintCollection}`:''}`,
  DELETE: () => `/SprintCollection/Delete`,
  GETALL: (token: string) => `/SprintCollection/GetAll?idSprint=${token}`,
  PREPARE: (token: string) => `/SprintCollection/Prepare?token=${token}`,
  SAVE: () => `/SprintCollection/Save`,
  EXPORTLIST: (token: string) => `/SprintCollection/ExportList?idSprint=${token}&options=`,
};
