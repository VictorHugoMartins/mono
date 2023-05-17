import { FileObjectType } from "../global/FileObjectType";
import { SelectOptionsType } from "../global/SelectObjectType";

export type UserInfoType = {
  id: string;
  managementSelectedId: number;
  managementsList: SelectOptionsType;
  email: string;
  name: string;
  lastName: string;
  organizationName: string;
  profileImage: FileObjectType;
};
