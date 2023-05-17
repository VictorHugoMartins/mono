import React from "react";
import { GetServerSideProps } from "next";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_CONFIGURATION } from "~/config/apiRoutes/configuration";

import { FormSuccess } from "~/utils/FormSuccess";
import privateroute from "~/routes/private.route";

interface ConfigurationEditProps {
  token: string;
}

const ConfigurationEdit: React.FC<ConfigurationEditProps> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Editar Configuração"
      returnPath="/adm/configuracoes/lista"
    >
      <FormPageStructure
        preparePath={API_CONFIGURATION.PREPARE(token)}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(ConfigurationEdit);
