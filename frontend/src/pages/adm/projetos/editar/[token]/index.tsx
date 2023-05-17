import React from "react";
import { GetServerSideProps } from "next";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_PROJECT } from "~/config/apiRoutes/project";

import { FormSuccess } from "~/utils/FormSuccess";
import privateroute from "~/routes/private.route";

interface MenuEditProps {
  token: string;
}

const ProjectsEdit: React.FC<MenuEditProps> = ({ token }) => {
  const _returnUrl = "/adm/projetos/lista";
  return (
    <PrivatePageStructure title="Editar Projeto" returnPath={_returnUrl}>
      <FormPageStructure
        buildPath={API_PROJECT.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath={_returnUrl}
        submitPath={API_PROJECT.SAVE()}
        preparePath={API_PROJECT.PREPARE(token)}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(ProjectsEdit);
