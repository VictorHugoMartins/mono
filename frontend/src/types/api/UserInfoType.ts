import { FileObjectType } from "../global/FileObjectType";
import { SelectOptionsType } from "../global/SelectObjectType";

export type UserInfoType = {
  user_id: string | number;
  name: string;
  email: string;
  login: string;
  
  managementSelectedId: number;
  managementsList: SelectOptionsType;
  lastName: string;
  organizationName: string;
  profileImage: FileObjectType;
};
