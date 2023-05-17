import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_ORGANIZATION } from "~/config/apiRoutes/organization";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

const OrganizationAdd: React.FC = () => {
  return (
    <PrivatePageStructure
      title="Adicionar Organização"
      returnPath="/adm/organizacao/lista"
    >
      <FormPageStructure
        buildPath={API_ORGANIZATION.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/organizacao/lista"
        submitPath={API_ORGANIZATION.SAVE()}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(OrganizationAdd);
