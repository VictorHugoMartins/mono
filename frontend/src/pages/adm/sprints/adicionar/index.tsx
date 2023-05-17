import { GetServerSideProps } from "next";
import React from "react";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_SPRINT } from "~/config/apiRoutes/sprints";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

interface SprintsAddProps {
  projectId: string;
}

const SprintsAdd: React.FC<SprintsAddProps> = ({ projectId }) => {
  const _returnUrl = `/adm/sprints/lista?ProjectId=${projectId}`;
  return (
    <PrivatePageStructure title="Adicionar Sprints" returnPath={_returnUrl}>
      <FormPageStructure
        buildPath={API_SPRINT.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath={_returnUrl}
        hiddenInputs={{ projectId }}
        submitPath={API_SPRINT.SAVE()}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ProjectId } = ctx.query;

  if (!ProjectId) {
    return {
      notFound: true,
    };
  }

  return { props: { projectId: ProjectId } };
};

export default privateroute(SprintsAdd);
