import { DataTableRenderType } from "./DataTableRenderType";
import { DataTableTabsRenderType } from "./DataTableTabsRenderType";

export type DataTableGroupedType =
| {
    isGrouped: true;
    dataTable: DataTableTabsRenderType;
  }
| {
    isGrouped: false;
    dataTable: DataTableRenderType;
  };