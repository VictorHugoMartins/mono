import React from "react";
import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_MENU } from "~/config/apiRoutes/menu";
import privateroute from "~/routes/private.route";

const MenuList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Menu" noPadding>
      <ListPageStructure
        param="id"
        createPath="/adm/menu/adicionar"
        editPath="/adm/menu/editar"
        exportPath={API_MENU.EXPORTLIST()}
        removeAPIPath={API_MENU.DELETE()}
        getListPath={API_MENU.GETALLGROUPEDBYGROUP()}
        showTabs
      />
    </PrivatePageStructure>
  );
};

export default privateroute(MenuList);
