import { GetServerSideProps } from "next";
import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_VIDEO } from "~/config/apiRoutes/video";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

interface KnowledgebaseEditProps {
  token: string;
}

const KnowledgebaseEdit: React.FC<KnowledgebaseEditProps> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Editar Video"
      returnPath="/adm/basedeconhecimento/videos/lista"
    >
      <FormPageStructure
        buildPath={API_VIDEO.BUILD()}
        submitPath={API_VIDEO.SAVE()}
        preparePath={API_VIDEO.PREPARE(token)}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/basedeconhecimento/videos/lista"
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(KnowledgebaseEdit);
