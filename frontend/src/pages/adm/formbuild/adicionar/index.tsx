import React from "react";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_FORMBUILD } from "~/config/apiRoutes/formBuild";

import { FormSuccess } from "~/utils/FormSuccess";

import privateroute from "~/routes/private.route";

interface Props {
  token: string;
}

const FormbuildAdd: React.FC<Props> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Adicionar Formulario"
      returnPath="/adm/formbuild/lista"
    >
      <FormPageStructure
        buildPath={API_FORMBUILD.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/formbuild/lista"
        submitPath={API_FORMBUILD.SAVE()}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(FormbuildAdd);
