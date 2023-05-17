export const API_GANTT = {
  PREPARE: (token?: string) => token ? `/Management/GetToSelectObject?token=${token}` : `/Management/GetToSelectObject`,
  GETALLBYSELECT: `/User/GetAllBySelect`,
  GETTOSELECTOBJECT: `/Project/GetToSelectObject`,
  GETGANTTPROJECTANDTASKS: () => `/Kanban/GetGanttProjectsAndTasks`,
  GETGANTTPROJECTANDTASKSTODASHBOARDASYNC: () => '/Kanban/GetGanttUsersToDashBoard',
};