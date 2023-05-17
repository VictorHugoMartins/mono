export const API_HOME = {
  GETDATACOLLABORATOR: () => `/Home/GetDataCollaborator`,
  GETDATATICKETS: () => `/Home/GetDataTickets`,
  GETCHARTGAUGEBURNPOINTSSPRINTS: () => `/Home/GetChartGaugeBurnPointsSprints`,
  GETHOURSBYPROJECT: () => `/Home/GetHoursByProject`,
  GETPOINTSAVERAGEBYPROJECT: (token: string) =>
    `/Home/GetPointsAverageByProject?projectId=${token}`,
  GETLASTPROJECTSANDITEMSWORKINGHOURS: (token: string) =>
    `/Home/GetLastProjectsAndItemsWorkingHours?projectId=${token}`,
  GETLASTPROJECTSBYUSERIN5MONTHS: () => `/Home/GetLastProjectsByUserIn5Months`,
};
