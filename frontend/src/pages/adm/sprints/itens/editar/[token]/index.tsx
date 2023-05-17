import React from "react";
import { GetServerSideProps } from "next";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_SPRINTCOLLECTION } from "~/config/apiRoutes/sprintsCollection";

import { FormSuccess } from "~/utils/FormSuccess";
import privateroute from "~/routes/private.route";

interface SprintsCollectionEditProps {
  sprintId: string;
  token: string;
}

const SprintsCollectionEdit: React.FC<SprintsCollectionEditProps> = ({
  sprintId,
  token,
}) => {
  const _returnUrl = `/adm/sprints/itens${
    sprintId ? `?SprintId=${sprintId}` : ""
  }`;

  return (
    <PrivatePageStructure title="Editar Item da Sprint" returnPath={_returnUrl}>
      <FormPageStructure
        buildPath={API_SPRINTCOLLECTION.BUILD(sprintId)}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath={_returnUrl}
        submitPath={API_SPRINTCOLLECTION.SAVE()}
        preparePath={API_SPRINTCOLLECTION.PREPARE(token)}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, SprintId } = ctx.query;

  if (!SprintId) {
    return {
      notFound: true,
    };
  }

  return { props: { token, sprintId: SprintId } };
};

export default privateroute(SprintsCollectionEdit);
