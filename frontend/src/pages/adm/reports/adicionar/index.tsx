import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_REPORT } from "~/config/apiRoutes/report";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

const ReportsAdd: React.FC = () => {
  return (
    <PrivatePageStructure
      title="Adicionar Estrutura de Relatorio"
      returnPath="/adm/reports/lista"
    >
      <FormPageStructure
        buildPath={API_REPORT.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/reports/lista"
        submitPath={API_REPORT.SAVE()}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(ReportsAdd);
