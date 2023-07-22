import { SelectObjectType } from "./SelectObjectType";

export type InputRenderType = {
  label?: string,
  name: string,
  type: string,
  required: boolean,
  disabled: boolean,
  options?: SelectObjectType[],
  listen?: InputRenderListenType,
  min?: number,
  max?: number,
  shapeFields?: InputRenderType[],
  description?: string;
}

export type InputRenderListenType = {
  id: string,
  getUrl: string
}