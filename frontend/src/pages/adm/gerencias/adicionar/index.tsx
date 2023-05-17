import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_MANAGEMENT } from "~/config/apiRoutes/management";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

const GenericTypeAdd: React.FC = () => {
  return (
    <PrivatePageStructure
      title="Adicionar Gerencia"
      returnPath="/adm/gerencias/lista"
    >
      <FormPageStructure
        buildPath={API_MANAGEMENT.BUILD()}
        submitPath={API_MANAGEMENT.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/gerencias/lista"
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(GenericTypeAdd);
