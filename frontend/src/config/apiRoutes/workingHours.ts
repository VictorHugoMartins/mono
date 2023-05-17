export const API_WORKINGHOURS = {
  FORMOPTIONS: () => `/WorkingHours/FormOptions`,
  FORMOPTIONSADM: () => `/WorkingHours/FormOptionsAdm`,
  GETREMAININGPOINTS: (token: string) =>
    `/WorkingHours/GetRemainingPoints?projectItemId=${token}`,
  DELETE: () => `/WorkingHours/Delete`,
  GETALL: (startDate: string, endDate: string) =>
    `/WorkingHours/GetAll?startDate=${startDate}&endDate=${endDate}`,
  GETALLTICKETS: (startDate: string, endDate: string) =>
    `/WorkingHours/GetAll?startDate=${startDate}&endDate=${endDate}`,
  GETALLADM: (startDate: string, endDate: string) =>
    `/WorkingHours/GetAllAdm?startDate=${startDate}&endDate=${endDate}`,
  PREPARE: (token: string) => `/WorkingHours/Prepare?token=${token}`,
  SAVE: () => `/WorkingHours/Save`,
  EXPORTLIST: (startDate: string, endDate: string) =>
    `/WorkingHours/ExportList?startDate=${startDate}&endDate=${endDate}&options=`,
  EXPORTLISTADM: (startDate: string, endDate: string) =>
    `/WorkingHours/ExportListAdm?startDate=${startDate}&endDate=${endDate}&options=`,
  GETOBSERVATIONS: (token: string) => `/WorkingHours/Observations?idSprint=${token}`,
};
