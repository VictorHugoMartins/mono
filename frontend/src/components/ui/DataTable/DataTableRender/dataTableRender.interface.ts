import { DataTableRowClassNameOptions, DataTableRowExpansionTemplate } from "primereact/datatable";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { GenericComponentType } from "~/types/global/GenericComponentType";
import { SpacingPatternType } from "~/types/global/SpacingType";
import { IconTypes } from "../../Icon/icon.interface";
import { CreatePathExternalButtonType } from "../DataTableHeader/dataTableHeader.interface";
import { ExtraColumnsType } from "../PrimeDataTable/primeDataTable.interface";
import React from "react";

export interface DataTableRenderProps {
  allowEdit?:boolean;
  createPath?: string | CreatePathExternalButtonType[];
  createButtonText?: string;
  headerButtons?: DataTableRenderHeaderButtonsProps[];
  headerRender?: GenericComponentType;
  removeAPIPath?: string;
  editPath?: string;
  editPathQuery?: string;
  editDisable?: boolean | string;
  exportPath?: string;
  exportButtonText?: string;
  externalData?: DataTableRenderType;
  externalGetList?: () => void;
  details?: boolean;
  buttons?: GenericComponentType;
  extraColumns?: ExtraColumnsType[];
  getListPath?: string;
  modalPostLabel?: string;
  modalPostEditLabel?: string;
  getListisPost?: boolean;
  param?: string;
  padding?: SpacingPatternType;
  responsive?: "scroll" | "stack";
  rowClassName?(data: any, options: DataTableRowClassNameOptions): string | object;
  removeCard?: boolean;
  hideCard?: boolean;
  customizedBodyColumns?: GenericComponentType;
  expander?: boolean;
  editComponent?: GenericComponentType;
  children?(data: any, options: DataTableRowExpansionTemplate, allowEdit?: boolean): React.ReactNode;
  noOptions?: boolean;
  hideSearch?: boolean;
  hideButtons?: boolean;
  tableTitle?: string;
  level?: number;
  externalFiltersValue?: string;
  externalExpandedRows?: any;
  footerComponent?:React.ReactNode;
}

type DataTableRenderHeaderButtonsProps = {
  icon?: IconTypes;
  href?: string;
  text: string;
};
