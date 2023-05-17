import React from "react";
import { GetServerSideProps } from "next";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_PROJECT_ITEM } from "~/config/apiRoutes/projectItems";

import privateroute from "~/routes/private.route";

import { FormSuccess } from "~/utils/FormSuccess";

interface SprintProjectItemAddProps {
  sprintId: string;
}

const SprintProjectItemAdd: React.FC<SprintProjectItemAddProps> = ({
  sprintId,
}) => {
  const _returnUrl = `/adm/sprints/itens${
    sprintId ? `?SprintId=${sprintId}` : ""
  }`;

  return (
    <PrivatePageStructure
      title="Adicionar Item de Projeto"
      returnPath={_returnUrl}
    >
      <FormPageStructure
        buildPath={API_PROJECT_ITEM.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath={_returnUrl}
        submitPath={API_PROJECT_ITEM.SAVE()}
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

export default privateroute(SprintProjectItemAdd);
