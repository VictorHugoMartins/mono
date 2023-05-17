import React from "react";
import { GetServerSideProps } from "next";

import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_SPRINTCOLLECTION } from "~/config/apiRoutes/sprintsCollection";

import privateroute from "~/routes/private.route";

interface SprintsCollectionListProps {
  sprintId?: string;
}

const SprintsCollectionList: React.FC<SprintsCollectionListProps> = ({
  sprintId,
}) => {
  return (
    <PrivatePageStructure title="Lista de itens">
      <ListPageStructure
        param="id"
         headerButtons={[
          {
            text: "Adicionar Novo Item",
            icon: "FaPlus",
            href: `/adm/sprints/itens/adicionar?SprintId=${sprintId}`,
          },
          {
            text: "Vincular Item",
            icon: "FaPlus",
            href: `/adm/sprints/itens/vincular?SprintId=${sprintId}`,
          },
        ]}
        editPath="/adm/sprints/itens/editar"
        editPathQuery={sprintId ? `SprintId=${sprintId}` : ""}
        exportPath={API_SPRINTCOLLECTION.EXPORTLIST(sprintId)}
        removeAPIPath={API_SPRINTCOLLECTION.DELETE()}
        getListPath={API_SPRINTCOLLECTION.GETALL(sprintId)}
        details
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

export default privateroute(SprintsCollectionList);
