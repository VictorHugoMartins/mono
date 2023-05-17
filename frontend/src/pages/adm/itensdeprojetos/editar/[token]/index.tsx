import { GetServerSideProps } from "next";
import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_PROJECT_ITEM } from "~/config/apiRoutes/projectItems";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

interface ProjectItemProps {
  token: string;
}

const ProjectItemEdit: React.FC<ProjectItemProps> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Editar Item de Projeto"
      returnPath="/adm/itensdeprojetos/lista"
    >
      <FormPageStructure
        preparePath={API_PROJECT_ITEM.PREPARE(token)}
        buildPath={API_PROJECT_ITEM.BUILD()}
        submitPath={API_PROJECT_ITEM.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/itensdeprojetos/lista"
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(ProjectItemEdit);
