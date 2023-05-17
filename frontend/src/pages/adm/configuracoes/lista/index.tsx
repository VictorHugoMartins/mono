import React from "react";

import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_CONFIGURATION } from "~/config/apiRoutes/configuration";
import privateroute from "~/routes/private.route";

const ConfigurationList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Configurações">
      <ListPageStructure
        param="id"
        details
        createPath="/adm/configuracoes/adicionar"
        editPath="/adm/configuracoes/editar"
        exportPath={API_CONFIGURATION.EXPORTLIST()}
        removeAPIPath={API_CONFIGURATION.DELETE()}
        getListPath={API_CONFIGURATION.GETALL()}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(ConfigurationList);
