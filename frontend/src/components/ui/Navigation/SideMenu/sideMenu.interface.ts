import { RenderMenuType } from "~/types/global/RenderMenuType";
import { IconTypes } from "../../Icon/icon.interface";

export interface SideMenuOptionProps {
  icon?: IconTypes;
  text: string;
  href?: string;
  onClickFunction?: Function;
  isSubOption?: boolean;
}

export interface SideMenuDropdownOptionProps extends SideMenuOptionProps {
  children: React.ReactNode;
  openAside:boolean;
  setOpenAside:any;
}

export interface SideMenuButtonOptionProps extends SideMenuOptionProps {}

export interface SideMenuProps {
  children: React.ReactNode;
  openAside: any;
  setOpenAside: any;
}

export interface SideMenuIconProps {
  icon?: IconTypes;
}

export interface SideMenuOptionsRenderProps {
  options: RenderMenuType[];
  openAside: boolean;
  setOpenAside: any;
}
