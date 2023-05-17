import React from "react";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_CONFIGURATION } from "~/config/apiRoutes/configuration";
import privateroute from "~/routes/private.route";

import { FormSuccess } from "~/utils/FormSuccess";

const ConfigurationAdd: React.FC = () => {
  return (
    <PrivatePageStructure
      title="Adicionar Configuração"
      returnPath="/adm/configuracoes/lista"
    >
      <FormPageStructure
        buildPath={API_CONFIGURATION.BUILD()}
        submitPath={API_CONFIGURATION.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/configuracoes/lista"
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(ConfigurationAdd);
