import React from "react";
import { GetServerSideProps } from "next";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { FormSuccess } from "~/utils/FormSuccess";
import { API_GENERICTYPE } from "~/config/apiRoutes/genericType";
import privateroute from "~/routes/private.route";

interface GenericTypeEditProps {
  token: string;
}

const GenericTypeEdit: React.FC<GenericTypeEditProps> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Editar Tipo Generico"
      returnPath="/adm/tipogenerico/lista"
    >
      <FormPageStructure
        buildPath={API_GENERICTYPE.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/tipogenerico/lista"
        submitPath={API_GENERICTYPE.SAVE()}
        preparePath={API_GENERICTYPE.PREPARE(token)}
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
