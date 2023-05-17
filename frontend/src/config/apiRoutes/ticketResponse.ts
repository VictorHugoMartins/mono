export const API_TICKETRESPONSE = {
  BUILD: () => `/TicketResponse/Build`,
  DELETE: () => `/TicketResponse/Delete`,
  PREPARE: (token: string) => `/TicketResponse/Prepare?token=${token}`,
  SAVE: () => `/TicketResponse/Save`,
  EXPORTLIST: () => `/TicketResponse/ExportList?options=`,
  GETALLBYTICKET: (token: string) =>
    `/TicketResponse/GetAllByTicket?token=${token}`,
  GETALLGROUPED: () => `/TicketResponse/GetAllGrouped`,
  GETINFOPOSTSBYTICKET: (token: string) =>
    `/TicketResponse/GetInfoPostsByTicket?token=${token}`,
};
