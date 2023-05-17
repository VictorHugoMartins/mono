export const API_KANBAN = {
  GETTICKETCHARTBYUSER: () => `/Kanban/GetTicketChartByUser`,
  GETALLTICKETSCHARTBYMANAGEMENT: (token?: string) =>
    `/Kanban/GetAllTicketsChartByManagement`,
  GETMANAGEMENTSDROPDOWN: () => `/Kanban/GetManagementsDropDown`,
  GETLISTKANBAN: () => `/Kanban/GetListKanban`,
  GETLISTTICKETSKANBAN: () => `/Kanban/GetListTicketsKanban`,
};
