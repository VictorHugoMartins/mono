import React from "react";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_PROJECT } from "~/config/apiRoutes/project";
import privateroute from "~/routes/private.route";

import { FormSuccess } from "~/utils/FormSuccess";

const ProjectsAdd: React.FC = () => {
  const _returnUrl = "/adm/projetos/lista";
  return (
    <PrivatePageStructure title="Adicionar Projeto" returnPath={_returnUrl}>
      <FormPageStructure
        buildPath={API_PROJECT.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath={_returnUrl}
        submitPath={API_PROJECT.SAVE()}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(ProjectsAdd);
