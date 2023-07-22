import { FormErrorsType } from "~/types/global/FormErrorsType";
import { FormEventType } from "~/types/global/FormEventType";
import { ObjectResponse } from "~/types/global/ObjectResponse";
import { APIResponseType } from "~/types/global/RequestTypes";
import { YupObjValidationProps } from "~/utils/FormValidation/FormValidation";
export interface FormInterface {
  children: React.ReactNode;
  postUrl?: string;
  getUrl?: string;
  onSuccess?: OnSuccessFormEventType;
  onFailure?: OnFailureFormEventType;
  externalSubmit?: (data: any) => Promise<FormExternalResponseType>;
  initialData?: {};
  validation?: YupObjValidationProps[];
  externalInitalData?: {};
  isMessageApi?: boolean;
  setObjectReturn?: React.Dispatch<React.SetStateAction<ObjectResponse>>;
  addInputs?: Function;
}

export type FormExternalResponseType = {
  message: string;
  errors?: FormErrorsType;
};

export type OnSuccessFormEventType = (event?: FormEventType) => void;

export type OnFailureFormEventType = (response: APIResponseType<any>, data?: any) => void;

export type FormContextType = {
  errorSubmit: string;
  submiting: boolean;
};
