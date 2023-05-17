import React from "react";

import Icon from "~/components/ui/Icon/Icon";
import { SideMenuOptionsRenderProps } from "../sideMenu.interface";
import SideMenuDropdownOption from "../SideMenuDropdownOption";
import SideMenuOption from "../SideMenuOption";

const SideMenuOptionsRender: React.FC<SideMenuOptionsRenderProps> = ({
  openAside,
  setOpenAside,
  options,
}) => {
  return (
    <>
      {options.map((item, index) => (
        <>
          {item.itens?.length > 0 ? (
            <SideMenuDropdownOption openAside={openAside} setOpenAside={setOpenAside} text={item.name} icon={item.menuIconName}>
              <SideMenuOptionsRender openAside={openAside} setOpenAside={setOpenAside} options={item.itens} />
            </SideMenuDropdownOption>
          ) : (
            <SideMenuOption
              text={item.name}
              icon={item.menuIconName}
              href={item.url}
              isSubOption={!item.menuIconName}
            />
          )}
        </>
      ))}
    </>
  );
};

export default SideMenuOptionsRender;
