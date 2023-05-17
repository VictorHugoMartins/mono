export const API_POST_MANAGEMENT = {
  GET_ALL_GROUPED_OPTIONS: () => `/Posts/GetAllGroupedOptions`,
  BUILD: () => `/Posts/Build`,
  GET_ALL_GROUPED: (startdate?: string, enddate?: string, managementid?: string | number) => `/Posts/GetAllGrouped${startdate && enddate && !managementid ?
    `?StartDate=${startdate}&EndDate=${enddate}`
    :
    startdate && enddate && managementid ?
      `?StartDate=${startdate}&EndDate=${enddate}&ManagementId=${managementid}`
      :
      !startdate && !enddate && !enddate && managementid ?
        `?ManagementId=${managementid}` : ``}`,
  PREPARE: (token: string | number) => `/Posts/Prepare?token=${token}`,
  DELETE: () => `/Posts/Delete`,
  SAVE: () => `/Posts/Save`,
  EXPORT: (startdate?: string, enddate?: string, managementid?: string | number) => `/Posts/ExportList${startdate && enddate && !managementid ?
    `?StartDate=${startdate}&EndDate=${enddate}`
    :
    startdate && enddate && managementid ?
      `?StartDate=${startdate}&EndDate=${enddate}&ManagementId=${managementid}`
      :
      !startdate && !enddate && !enddate && managementid ?
        `?ManagementId=${managementid}` : ``}${managementid || enddate || startdate ? `&` : `?`}Options=`,
  GET_DASHBOARD: (managementid?: string | number, startdate?: string, enddate?: string) => `/Posts/GetDashboard${startdate && enddate && !managementid ?
    `?startDate=${startdate}&endDate=${enddate}`
    :
    startdate && enddate && managementid ?
      `?startDate=${startdate}&endDate=${enddate}&token=${managementid}`
      :
      !startdate && !enddate && managementid ?
        `?token=${managementid}` : ``}`,
}