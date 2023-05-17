import React from "react";
import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_GENERICTYPE } from "~/config/apiRoutes/genericType";
import privateroute from "~/routes/private.route";

const GenericTypeList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Tipo Generico" noPadding>
      <ListPageStructure
        param="id"
        details
        createPath="/adm/tipogenerico/adicionar"
        editPath="/adm/tipogenerico/editar"
        exportPath={API_GENERICTYPE.EXPORTLIST()}
        removeAPIPath={API_GENERICTYPE.DELETE()}
        getListPath={API_GENERICTYPE.GROUPED()}
        showTabs
      />
    </PrivatePageStructure>
  );
};

export default privateroute(GenericTypeList);
