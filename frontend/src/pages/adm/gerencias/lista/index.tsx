import React from "react";
import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_MANAGEMENT } from "~/config/apiRoutes/management";
import privateroute from "~/routes/private.route";

const ManagementList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Gerencias">
      <ListPageStructure
        createPath="/adm/gerencias/adicionar"
        editPath="/adm/gerencias/editar"
        exportPath={API_MANAGEMENT.EXPORTLIST()}
        removeAPIPath={API_MANAGEMENT.DELETE()}
        param="id"
        getListPath={API_MANAGEMENT.GETALL()}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(ManagementList);
