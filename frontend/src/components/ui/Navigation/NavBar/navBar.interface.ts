import { RenderMenuType } from "~/types/global/RenderMenuType";

export interface NavbarProps {
  brand?: React.ReactNode;
  brandImg?: string;
  brandHref?: string;
  children?: React.ReactNode;
  inHome?: boolean;
  noFixed?: boolean;
  renderButtons?: RenderMenuType[];
  publicPage?: boolean;
}

export interface NavbarBrandProps {
  alt?: string;
  children: React.ReactNode;
  imageUrl?: string;
  href?: string;
}

export interface NavbarDropdownProps {
  buttonContent: React.ReactNode;
  children: React.ReactNode;
  links?: any[];
}

export interface NavbarDropdownItemProps {
  href: string;
  label: string;
}

export interface NavbarLinkProps {
  href: string;
  label: string;
}

export interface NavbarOptionsRenderProps {
  options: RenderMenuType[];
}
