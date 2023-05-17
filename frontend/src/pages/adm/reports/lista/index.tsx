import React from "react";

import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { SprintListRedirectButton } from "~/components/structure/SprintListPage";

import { API_REPORT } from "~/config/apiRoutes/report";

import privateroute from "~/routes/private.route";

const ReportsList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Estrutura de Relatorios" noPadding>
      <ListPageStructure
        param="id"
        createPath="/adm/reports/adicionar"
        editPath="/adm/reports/editar"
        exportPath={API_REPORT.EXPORTLIST()}
        removeAPIPath={API_REPORT.DELETE()}
        getListPath={API_REPORT.GETALLGROUPED()}
        buttons={
          <SprintListRedirectButton
            field="id"
            href="/adm/reportsGenerator/adicionar/"
            params="?returnUrl=reports"
            title="Gerar Relatorio"
          />
        }
        showTabs
        details
      />
    </PrivatePageStructure>
  );
};
export default privateroute(ReportsList);
