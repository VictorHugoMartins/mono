export const API_TICKET = {
  ASSOCIATEUSERTOTICKET: () => `/Ticket/AssociateUserToTicket`,
  BUILD: () => `/Ticket/Build`,
  DELETE: () => `/Ticket/Delete`,
  GETALL: () => `/Ticket/GetAll`,
  GETALLGROUPEDOPTIONS: () => `/Ticket/GetAllGroupedOptions`,
  GETALLGROUPED: (startDate: string, endDate: string) =>
    `/Ticket/GetAllGrouped?startDate=${startDate}&endDate=${endDate}`,
  GETALLGROUPEDBYSTATUS: (startDate: string, endDate: string) =>
    `/Ticket/GetAllGroupedByStatus?startDate=${startDate}&endDate=${endDate}&projectId=`,
  GETALLGROUPEDBYSTATUSTOTICKETCONTROLSCREEN: (startDate: string, endDate: string) =>
    `/Ticket/GetAllGroupedByStatusToTicketControlScreen?startDate=${startDate}&endDate=${endDate}&projectId=`,
  GETUSERTICKETSTABLEGROUPED: () => `/Ticket/GetUserTicketsTableGrouped`,
  GETTICKETSBYPROJECTID: (token: string) =>
    `/Ticket/GetTicketsByProjectId?token=${token}`,
  GETBYTOKEN: (token: string) => `/Ticket/GetByToken?token=${token}`,
  GETLISTSTATUS: () => `/Ticket/GetListStatus`,
  GETNESTEDLIST: () => `/Ticket/GetNestedList`,
  PREPARE: (token: string) => `/Ticket/Prepare?token=${token}`,
  SAVE: () => `/Ticket/Save`,
  FINISHEDOPENED: () => `/Ticket/FinishedOpened`,
  EXPORTLIST: (startDate: string, endDate: string) =>
    `/Ticket/ExportList?ExportList?startDate=${startDate}&endDate=${endDate}&options=`,
};
