import React from "react";
import { GetServerSideProps } from "next";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_MANAGEMENT } from "~/config/apiRoutes/management";
import { FormSuccess } from "~/utils/FormSuccess";
import privateroute from "~/routes/private.route";

interface GenericTypeEditProps {
  token: string;
}

const GenericTypeEdit: React.FC<GenericTypeEditProps> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Editar Gerencia"
      returnPath="/adm/gerencias/lista"
    >
      <FormPageStructure
        preparePath={API_MANAGEMENT.PREPARE(token)}
        buildPath={API_MANAGEMENT.BUILD()}
        submitPath={API_MANAGEMENT.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/gerencias/lista"
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(GenericTypeEdit);
