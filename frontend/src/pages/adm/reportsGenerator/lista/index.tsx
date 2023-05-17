import React from "react";

import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { SprintListRedirectButton } from "~/components/structure/SprintListPage";

import { API_REPORTGENERATOR } from "~/config/apiRoutes/reportGenerator";

import privateroute from "~/routes/private.route";

const ReportsList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Relatorios Gerados" noPadding>
      <ListPageStructure
        param="id"
        editPath="/adm/reportsGenerator/editar"
        exportPath={API_REPORTGENERATOR.EXPORTLIST()}
        removeAPIPath={API_REPORTGENERATOR.DELETE()}
        getListPath={API_REPORTGENERATOR.GETALLGROUPED()}
        buttons={
          <SprintListRedirectButton
            field="id"
            href="/adm/reportsGenerator/detalhes/"
            title="Ver Relatorio"
          />
        }
        showTabs
        details
      />
    </PrivatePageStructure>
  );
};
export default privateroute(ReportsList);
