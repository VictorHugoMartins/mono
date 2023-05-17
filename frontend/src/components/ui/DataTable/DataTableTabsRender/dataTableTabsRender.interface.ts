import { ReactNode } from 'react';
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { DataTableTabsRenderType } from "~/types/global/DataTableTabsRenderType";
import { GenericComponentType } from "~/types/global/GenericComponentType";
import { DataTableRenderProps } from "../DataTableRender/dataTableRender.interface";

export interface DataTableTabsRenderProps
  extends Omit<DataTableRenderProps, "externalData"> {
  externalData?: DataTableTabsRenderType;
  tabStyle?: "1" | "2";
  resettable?: boolean;
  initialTab?: number;
  initialTabIsValue?: boolean;
  onTabChange?: (index: number, value?: string) => void;
  modalPostLabel?: string;
  modalPostEditLabel?: string;
  title?: string;
  externalTabRender?: GenericComponentType;
  footerTableComponent?: React.ReactNode;
  afterHeaderRender?: GenericComponentType;
}

export interface DataTableTabsRenderInterface {
  tabName: string;
  project?: string;
  data: DataTableRenderType;
}
