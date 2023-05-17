import { GetServerSideProps } from "next";
import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_ARTICLE } from "~/config/apiRoutes/article";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

interface KnowledgebaseEditProps {
  token: string;
}

const KnowledgebaseEdit: React.FC<KnowledgebaseEditProps> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Editar Artigo"
      returnPath="/adm/basedeconhecimento/artigos/lista"
    >
      <FormPageStructure
        buildPath={API_ARTICLE.BUILD()}
        submitPath={API_ARTICLE.SAVE()}
        preparePath={API_ARTICLE.PREPARE(token)}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/basedeconhecimento/artigos/lista"
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
