import React from "react";
import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_ORGANIZATION } from "~/config/apiRoutes/organization";
import privateroute from "~/routes/private.route";

const OrganizationList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Organizações" noPadding>
      <ListPageStructure
        param="id"
        createPath="/adm/organizacao/adicionar"
        exportPath={API_ORGANIZATION.EXPORTLIST()}
        editPath="/adm/organizacao/editar"
        removeAPIPath={API_ORGANIZATION.DELETE()}
        getListPath={API_ORGANIZATION.GETALL()}
      />
    </PrivatePageStructure>
  );
};
export default privateroute(OrganizationList);
