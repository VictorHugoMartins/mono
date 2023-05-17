import React from "react";
import { GetServerSideProps } from "next";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_FORMBUILD } from "~/config/apiRoutes/formBuild";

import { FormSuccess } from "~/utils/FormSuccess";

import privateroute from "~/routes/private.route";
import { API_ENDPOINTMAP } from "~/config/apiRoutes/endPointMap";

interface Props {
  token: string;
}

const EndpointEdit: React.FC<Props> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Editar Endpoint"
      returnPath="/adm/endpoint/lista"
    >
      <FormPageStructure
        buildPath={API_ENDPOINTMAP.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/endpoint/lista"
        submitPath={API_ENDPOINTMAP.SAVE()}
        preparePath={API_ENDPOINTMAP.PREPARE(token)}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(EndpointEdit);
