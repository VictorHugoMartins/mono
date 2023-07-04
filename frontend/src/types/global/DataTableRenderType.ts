import { DataTableColumnType } from "./DataTableColumnType"
import { DataTableRowType } from "./DataTableRowType"

export type DataTableRenderType = {
  columns: DataTableColumnType[],
  rows: DataTableRowType[],
  extra_info?: any;
  resumStatusTicket?: any,
  resumStatusSprint?: any;
}