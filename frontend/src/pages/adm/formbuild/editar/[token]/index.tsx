import React from "react";
import { GetServerSideProps } from "next";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_FORMBUILD } from "~/config/apiRoutes/formBuild";

import { FormSuccess } from "~/utils/FormSuccess";

import privateroute from "~/routes/private.route";

interface Props {
  token: string;
}

const FormbuildEdit: React.FC<Props> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Editar Formulario"
      returnPath="/adm/formbuild/lista"
    >
      <FormPageStructure
        buildPath={API_FORMBUILD.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/formbuild/lista"
        submitPath={API_FORMBUILD.SAVE()}
        preparePath={API_FORMBUILD.PREPARE(token)}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(FormbuildEdit);
