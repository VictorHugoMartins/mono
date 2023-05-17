import React from "react";
import { DropdownLinkOption } from "~/components/ui/Dropdown";
import { NavbarDropdownItemProps } from "../navBar.interface";

const NavbarDropdownItem: React.FC<NavbarDropdownItemProps> = ({
  href,
  label,
}) => {
  return <DropdownLinkOption href={href} text={label} />;
};

export default NavbarDropdownItem;
