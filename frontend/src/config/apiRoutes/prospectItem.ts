export const API_PROSPECTITEM = {
  BUILD: () => `/ProspectItem/Build`,
  PREPARE: (token: string) => `/ProspectItem/Prepare?token=${token}`,
  DELETE: () => `/ProspectItem/Delete`,
  SAVE: () => `/ProspectItem/Save`,
  GETALL: (token:string) => `/ProspectItem/GetAll?ProspectId=${token}`,
  EXPORTLIST: () => `/Prospect/ExportList?options=`,
  LIST_NESTED_ITEMS:(token:string)=>`/ProspectItem/ListNestedItems?ProspectId=${token}`
};
