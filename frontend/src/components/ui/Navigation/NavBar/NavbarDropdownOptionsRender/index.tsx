import React from "react";
import { NavbarOptionsRenderProps } from "../navBar.interface"
import NavbarDropdown from "../NavbarDropdown"
import NavbarDropdownItem from "../NavbarDropdownItem"


const NavbarDropdownOptionsRender: React.FC<NavbarOptionsRenderProps> = ({ options }) => {
  return (
    <>
      {options.map((item) =>
        <>
          {
            item.itens?.length > 0 ?
              <NavbarDropdown buttonContent={item.name}>
                <NavbarDropdownOptionsRender options={item.itens} />
              </NavbarDropdown>
              :
              <NavbarDropdownItem label={item.name} href={item.url} />
          }
        </>
      )}
    </>
  )
}

export default NavbarDropdownOptionsRender;