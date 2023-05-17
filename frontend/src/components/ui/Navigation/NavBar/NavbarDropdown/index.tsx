import React from "react";
import { DropdownButton } from "~/components/ui/Dropdown";
import { NavbarDropdownProps } from "../navBar.interface";
import NavbarDropdownItem from "../NavbarDropdownItem";

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({
  children,
  buttonContent,
  links,
}) => {
  return (
    <DropdownButton align="right" clickableComponent={buttonContent}>
      {links?.map((item) => (
        <NavbarDropdownItem href={item.href} label={item.label} />
      ))}
      {children}
    </DropdownButton>
  );
};

export default NavbarDropdown;
