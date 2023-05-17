import React from "react";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_ENDPOINTMAP } from "~/config/apiRoutes/endPointMap";

import { FormSuccess } from "~/utils/FormSuccess";

import privateroute from "~/routes/private.route";

interface Props {
  token: string;
}

const EndpointAdd: React.FC<Props> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Adicionar Endpoint"
      returnPath="/adm/endpoint/lista"
    >
      <FormPageStructure
        buildPath={API_ENDPOINTMAP.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/endpoint/lista"
        submitPath={API_ENDPOINTMAP.SAVE()}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(EndpointAdd);
