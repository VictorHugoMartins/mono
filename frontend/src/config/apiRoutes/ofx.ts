export const API_OFX = {
  BUILD: () => `/OFX/Build`,
  DELETE: () => `/OFX/Delete`,
  GETALL: () => `/OFX/GetAllRenderingBoth`,
  GETBYTOKEN: (token: string) => `/OFX/GetOFX?OFXListId=${token}`,
  UPDATEOFXTRANSACTIONCLASSIFY: () => `/OFX/UpdateOFXTransactionClassify`,
  PREPARE: (token: string) => `/OFX/Prepare?token=${token}`,
  SAVE: () => `/OFX/Save`,
  GETOFX: () => `/OFX/GetOFX`,
  GENERATEDAYGRAPH: (token: string) => `/OFX/GenerateDayGraph?OFXListId=${token}`,
  GENERATECLASSGRAPH: (token: string) => `/OFX/GenerateClassGraph?OFXListId=${token}`,
  EXPORTLISTOFXS: () => `/OFX/ExportListOfxs?options=`,
  EXPORTLISTTRANSACTIONS: (token: string) => `/OFX/ExportListTransactions?OFXListId=${token}&options=`,
};
