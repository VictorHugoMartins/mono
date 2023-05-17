import { DataTableRenderType } from "./DataTableRenderType";

export type DataTableTab = {
  tabName: string;
  tabValue: string;
  data: DataTableRenderType;
  resumPriority?: any;
  resumStatusTicket?: any,
  resumStatusSprint?: any;
};

export type DataTableTabsRenderType = DataTableTab[];
