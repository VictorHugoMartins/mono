import React from "react";
import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_PROJECT_ITEM } from "~/config/apiRoutes/projectItems";
import privateroute from "~/routes/private.route";

const ProjectItemList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Itens de Projeto" noPadding>
      <ListPageStructure
        createPath="/adm/itensdeprojetos/adicionar"
        editPath="/adm/itensdeprojetos/editar"
        exportPath={API_PROJECT_ITEM.EXPORTLIST()}
        removeAPIPath={API_PROJECT_ITEM.DELETE()}
        param="id"
        getListPath={API_PROJECT_ITEM.GETALLGROUPEDBYPROJECT()}
        showTabs
        details
      />
    </PrivatePageStructure>
  );
};

export default privateroute(ProjectItemList);
