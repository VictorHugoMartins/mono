export const API_PROJECT = {
  BUILD: () => `/Project/Build`,
  DELETE: () => `/Project/Delete`,
  // GETALL: () => `/Project/GetAll`,
  GETALLGROUPEDBYSTATUSATMANAGEMENT: (startDate: string, endDate: string) =>
    startDate && endDate
      ? `/Project/GetAllGroupedByStatusAtManagement?startDate=${startDate}&endDate=${endDate}&managementId=`
      : `/Project/GetAllGroupedByStatusAtManagement?managementId=`,
  GETALLGROUPED: (startDate?: string, endDate?: string) =>
    `${
      startDate && endDate
        ? `/Project/GetAllGroupedByManagement?startDate=${startDate}&endDate=${endDate}`
        : `/Project/GetAllGroupedByManagement`
    }`,
  PREPARE: (token: string) => `/Project/Prepare?token=${token}`,
  SAVE: () => `/Project/Save`,
  EXPORTLIST: () => `/Project/ExportList?options=`,
  EXPORTLISTCOMPLETE: (startDate?: string, endDate?: string) =>
    startDate && endDate
      ? `/Project/ExportXlsListComplete?startDate=${startDate}&endDate=${endDate}`
      : `/Project/ExportXlsListComplete`,
  MANAGEMENT_OPTIONS:() => `/Project/ManagementOptions`,
};
