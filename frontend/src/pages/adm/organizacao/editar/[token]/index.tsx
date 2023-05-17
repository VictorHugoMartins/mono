import React from "react";
import { GetServerSideProps } from "next";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_ORGANIZATION } from "~/config/apiRoutes/organization";
import { FormSuccess } from "~/utils/FormSuccess";
import privateroute from "~/routes/private.route";

interface OrganizationEditProps {
  token: string;
}

const OrganizationEdit: React.FC<OrganizationEditProps> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Editar Organização"
      returnPath="/adm/organizacao/lista"
    >
      <FormPageStructure
        buildPath={API_ORGANIZATION.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/organizacao/lista"
        submitPath={API_ORGANIZATION.SAVE()}
        preparePath={API_ORGANIZATION.PREPARE(token)}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(OrganizationEdit);
