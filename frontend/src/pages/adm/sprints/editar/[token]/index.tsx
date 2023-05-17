import React from "react";
import { GetServerSideProps } from "next";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_SPRINT } from "~/config/apiRoutes/sprints";

import { FormSuccess } from "~/utils/FormSuccess";
import privateroute from "~/routes/private.route";

interface MenuEditProps {
  projectId?: string;
  token: string;
}

const SprintsEdit: React.FC<MenuEditProps> = ({ projectId, token }) => {
  const _returnUrl = `/adm/sprints/lista${
    projectId ? `?ProjectId=${projectId}` : ""
  }`;
  return (
    <PrivatePageStructure title="Editar Sprints" returnPath={_returnUrl}>
      <FormPageStructure
        buildPath={API_SPRINT.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath={_returnUrl}
        submitPath={API_SPRINT.SAVE()}
        preparePath={API_SPRINT.PREPARE(token)}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, ProjectId } = ctx.query;

  return { props: { token, projectId: ProjectId || null } };
};

export default privateroute(SprintsEdit);
