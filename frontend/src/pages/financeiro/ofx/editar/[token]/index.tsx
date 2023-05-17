import { GetServerSideProps } from "next";
import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_OFX } from "~/config/apiRoutes/ofx";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

interface OFXProps {
  token: string;
}

const OFXEdit: React.FC<OFXProps> = ({ token }) => {
  return (
    <PrivatePageStructure title="Editar OFX" returnPath="/financeiro/ofx/lista">
      <FormPageStructure
        preparePath={API_OFX.PREPARE(token)}
        buildPath={API_OFX.BUILD()}
        submitPath={API_OFX.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/financeiro/ofx/lista"
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(OFXEdit);
