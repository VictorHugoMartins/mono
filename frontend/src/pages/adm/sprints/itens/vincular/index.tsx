import React from "react";
import { GetServerSideProps } from "next";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_SPRINTCOLLECTION } from "~/config/apiRoutes/sprintsCollection";

import { FormSuccess } from "~/utils/FormSuccess";
import privateroute from "~/routes/private.route";

interface SprintsCollectionEditProps {
  sprintId: string;
}

const SprintsCollectionEdit: React.FC<SprintsCollectionEditProps> = ({
  sprintId,
}) => {
  const _returnUrl = `/adm/sprints/itens${
    sprintId ? `?SprintId=${sprintId}` : ""
  }`;

  return (
    <PrivatePageStructure title="Víncular de itens" returnPath={_returnUrl}>
      <FormPageStructure
        buildPath={API_SPRINTCOLLECTION.BUILD(sprintId)}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        hiddenInputs={{ sprintId }}
        submitPath={API_SPRINTCOLLECTION.SAVE()}
        returnPath={_returnUrl}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { SprintId } = ctx.query;

  if (!SprintId) {
    return {
      notFound: true,
    };
  }

  return { props: { sprintId: SprintId } };
};

export default privateroute(SprintsCollectionEdit);
