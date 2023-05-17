import React from "react";
import { DateTimeState } from "~/components/structure/RoadMapPageStructure";
import { GanttDataType } from "~/types/global/GanttTypes";
import { IconTypes } from "~/components/ui/Icon/icon.interface";
import { GenericComponentType } from "~/types/global/GenericComponentType";
import { APIResponseType } from "~/types/global/RequestTypes";

export interface RoadMapHeaderProps {
  createPath?: string | CreatePathExternalButtonType[];
  createButtonText?: string;
  headerButtons?: DataTableRenderHeaderButtonsProps[];
  headerRender?: GenericComponentType;
  exportPath?: string;
  exportButtonText?: string;
  reloadList: () => Promise<void>;
  setList: (data: APIResponseType<GanttDataType>) => void;
  activTab?: number;
  startDate?: string;
  endDate?: string;
  setDate?: React.Dispatch<React.SetStateAction<DateTimeState>>
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
