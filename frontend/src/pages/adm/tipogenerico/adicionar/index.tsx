import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_GENERICTYPE } from "~/config/apiRoutes/genericType";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

const GenericTypeAdd: React.FC = () => {
  return (
    <PrivatePageStructure
      title="Adicionar Tipo Generico"
      returnPath="/adm/tipogenerico/lista"
    >
      <FormPageStructure
        buildPath={API_GENERICTYPE.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/tipogenerico/lista"
        submitPath={API_GENERICTYPE.SAVE()}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(GenericTypeAdd);
