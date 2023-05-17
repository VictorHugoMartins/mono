import React from "react";

import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_FORMBUILD } from "~/config/apiRoutes/formBuild";

import privateroute from "~/routes/private.route";

const FormbuildList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Formularios" noPadding>
      <ListPageStructure
        createPath="/adm/formbuild/adicionar"
        editPath="/adm/formbuild/editar"
        exportPath={API_FORMBUILD.EXPORTLIST()}
        removeAPIPath={API_FORMBUILD.DELETE()}
        param="id"
        getListPath={API_FORMBUILD.GETALL()}
        details
      />
    </PrivatePageStructure>
  );
};

export default privateroute(FormbuildList);
