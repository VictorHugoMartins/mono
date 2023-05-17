import React from "react";

import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_ENDPOINTMAP } from "~/config/apiRoutes/endPointMap";

import privateroute from "~/routes/private.route";

const EndpointList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Endpoint">
      <ListPageStructure
        createPath="/adm/endpoint/adicionar"
        editPath="/adm/endpoint/editar"
        exportPath={API_ENDPOINTMAP.EXPORTLIST()}
        removeAPIPath={API_ENDPOINTMAP.DELETE()}
        param="id"
        getListPath={API_ENDPOINTMAP.GETALL()}
        details
      />
    </PrivatePageStructure>
  );
};

export default privateroute(EndpointList);
