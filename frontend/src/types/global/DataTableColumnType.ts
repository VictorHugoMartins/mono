import { InputRenderType } from "./InputRenderType";

export type BodyType = null | "customBody";

export type DataTableColumnType = {
  label: string;
  value: string;
  isVisible: boolean;
  bodyType?: BodyType,
  type?: InputRenderType, // esse é o tipo atual dos input forms,
  editable?: boolean,
  frozen?: boolean;
};
