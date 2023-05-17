import { ChartObjectType } from "./ChartTypes";
import { DataTableRenderType } from "./DataTableRenderType";
import { SelectObjectType } from "./SelectObjectType";

export type ReportType = {
  genericTable: DataTableRenderType;
  charts: ChartObjectType[];
  inputs: ReportFiltersType;
  dropDowns: ReportSelectsType;
  title: string;
};

export type ReportFilterType = {
  label: string;
  dataType: "date" | "int" | "int[]" | "string" | "string[]";
};

export type ReportFiltersType = ReportFilterType[];

export type ReportSelectType = {
  label: string;
  content: SelectObjectType[];
};

export type ReportSelectsType = ReportSelectType[];
