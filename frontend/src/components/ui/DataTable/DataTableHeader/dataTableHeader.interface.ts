import React from "react";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { DataTableTabsRenderType } from "~/types/global/DataTableTabsRenderType";
import { GenericComponentType } from "~/types/global/GenericComponentType";
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import { IconTypes } from "../../Icon/icon.interface";

export interface DataTableHeaderProps {
  createPath?: string | CreatePathExternalButtonType[];
  createComponent?: GenericComponentType;
  createButtonText?: string;
  headerButtons?: DataTableRenderHeaderButtonsProps[];
  headerRender?: GenericComponentType;
  exportPath?: string;
  exportButtonText?: string;
  reloadList: () => Promise<void>;
  setList: (list: DataTableRenderType) => Promise<void>;
  noOptions?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface DataTableHeaderTabProps {
  createPath?: string | CreatePathExternalButtonType[];
  createComponent?: GenericComponentType;
  createButtonText?: string;
  headerButtons?: DataTableRenderHeaderButtonsProps[];
  headerRender?: GenericComponentType;
  exportPath?: string;
  exportButtonText?: string;
  reloadList: () => Promise<void>;
  setList: (list: DataTableTabsRenderType) => Promise<void>;
  noOptions?: boolean;
  startDate?: string;
  endDate?: string;
}

export type DataTableRenderHeaderButtonsProps = {
  icon?: IconTypes;
  href?: string;
  text: string;
};

export type CreatePathExternalButtonType = {
  label: string;
  value?: string;
  component?: React.ReactNode;
};
