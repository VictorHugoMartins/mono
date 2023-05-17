import React from "react";
import { GetServerSideProps } from "next";

import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_SPRINT } from "~/config/apiRoutes/sprints";
import privateroute from "~/routes/private.route";
import { SprintListRedirectButton } from "~/components/structure/SprintListPage";

interface SprintsListProps {
  projectId?: string;
}

const SprintsList: React.FC<SprintsListProps> = ({ projectId }) => {
  return (
    <PrivatePageStructure title="Lista de Sprints" noPadding={!projectId}>
      <ListPageStructure
        param="id"
        createPath={
          projectId ? `/adm/sprints/adicionar?ProjectId=${projectId}` : ""
        }
        editPath="/adm/sprints/editar"
        editPathQuery={projectId ? `ProjectId=${projectId}` : ""}
        removeAPIPath={API_SPRINT.DELETE()}
        getListPath={
          projectId ? API_SPRINT.GETALL(projectId) : API_SPRINT.GETALLGROUPED()
        }
        exportPath={API_SPRINT.EXPORTLIST()}
        buttons={
          <SprintListRedirectButton
            href={"/adm/sprints/itens?SprintId="}
            field={"id"}
            title="Itens"
          />
        }
        details
        showTabs={!projectId}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ProjectId } = ctx.query;

  return { props: { projectId: ProjectId || null } };
};

export default privateroute(SprintsList);
