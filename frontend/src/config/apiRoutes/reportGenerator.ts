export const API_REPORTGENERATOR = {
  BUILD: () => `/ReportGenerator/Build`,
  DELETE: () => `/ReportGenerator/Delete`,
  GETALLGROUPED: () => `/ReportGenerator/GetAllGrouped`,
  RENDERTABLE: (token: string) =>
    `/ReportGenerator/RenderTable?reportId=${token}`,
  RENDERREPORTS: (token: string) =>
    `/ReportGenerator/RenderReports?reportGenId=${token}`,
  PREPARE: (token: string) => `/ReportGenerator/Prepare?token=${token}`,
  SAVE: () => `/ReportGenerator/Save`,
  EXPORTLIST: () => `/ReportGenerator/ExportList?options=`,
  EXPORTLISTREPORT: (token: string) =>
    `/ReportGenerator/ExportListReport?reportGeneratorId=${token}&options=`,
};
