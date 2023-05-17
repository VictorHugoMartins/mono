import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_PROJECT_ITEM } from "~/config/apiRoutes/projectItems";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

const ProjectItemAdd: React.FC = () => {
  return (
    <PrivatePageStructure
      title="Adicionar Item de Projeto"
      returnPath="/adm/itensdeprojetos/lista"
    >
      <FormPageStructure
        buildPath={API_PROJECT_ITEM.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/itensdeprojetos/lista"
        submitPath={API_PROJECT_ITEM.SAVE()}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(ProjectItemAdd);
