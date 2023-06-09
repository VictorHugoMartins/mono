import { DataTableRenderType } from "./DataTableRenderType";

export type DataTableTab = {
  tabName: string;
  tabValue: string;
  data: DataTableRenderType;
  extra_info?: any;
  resumStatusTicket?: any,
  resumStatusSprint?: any;
};

export type DataTableTabsRenderType = DataTableTab[];
