import React from "react";
import { NavbarOptionsRenderProps } from '../navBar.interface';
import NavbarDropdown from '../NavbarDropdown';
import NavbarDropdownOptionsRender from '../NavbarDropdownOptionsRender';
import NavbarLink from '../NavbarLink';

const NavbarOptionsRender: React.FC<NavbarOptionsRenderProps> = ({ options }) => {
  return (
    <>
      {options.map((item) =>
        <>
          {
            item.itens?.length > 0 ?
              <NavbarDropdown buttonContent={"Teste"}>
                <NavbarDropdownOptionsRender options={item.itens} />
              </NavbarDropdown>
              :
              <NavbarLink label="Home" href="/" />
          }
        </>
      )}
    </>
  )
}

export default NavbarOptionsRender;