import React, { useEffect } from "react";

import { SideMenu } from "~/components/ui/Navigation/SideMenu/SideMenu";

import IsLogged from "~/utils/IsLogged/IsLogged";
import SideMenuOptionsRender from "~/components/ui/Navigation/SideMenu/SideMenuOptionsRender";
import { useMenuContext } from "~/context/global/MenuContext";

interface LocalSideMenuProps {
  openAside: boolean;
  setOpenAside: any;
}

const LocalSideMenu: React.FC<LocalSideMenuProps> = ({
  openAside,
  setOpenAside,
}) => {
  const { getMenuOptions, menus } = useMenuContext();

  return (
    <SideMenu openAside={openAside} setOpenAside={setOpenAside}>
      <SideMenuOptionsRender
        openAside={openAside}
        setOpenAside={setOpenAside}
        options={menus}
      />
    </SideMenu>
  );
};

export default LocalSideMenu;
