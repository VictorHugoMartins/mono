export const API_ORGANIZATION = {
    BUILD: () => `/Organization/Build`,
    DELETE: () => `/Organization/Delete`,
    GETALL: () => `/Organization/GetAll`,
    GETBYID: (token:string) =>  `/Organization/GetById?token=${token}`,
    PREPARE: (token: string) => `/Organization/Prepare?token=${token}`,
    SAVE: () => `/Organization/Save`,
    EXPORTLIST: () => `/Organization/ExportList?options=`,
};
  