import { GenericObjectType } from "~/types/global/GenericObjectType";
import { InputRenderType } from "~/types/global/InputRenderType";
import { GapPatternObjectType, GridSize } from "../../Layout/Grid/grid.interface";
import {
  OnFailureFormEventType,
  OnSuccessFormEventType,
} from "../form.interface";
import { ObjectResponse } from "~/types/global/ObjectResponse";

export interface FormRenderProps {
  buildPath?: string;
  buildObject?: InputRenderType[];
  isMessageApi?:boolean;
  inputs?: InputRenderType[];
  initialData?: {};
  preparePath?: string;
  onSuccess?: OnSuccessFormEventType;
  onFailure?: OnFailureFormEventType;
  submitPath: string;
  hiddenInputs?: GenericObjectType;
  gridStructure?: GapPatternObjectType;
  externalInitalData?: {}
  setObjectReturn?: React.Dispatch<React.SetStateAction<ObjectResponse>>
}

export interface FormRenderInputProps {
  input: InputRenderType;
  gridSize: GridSize;
}
