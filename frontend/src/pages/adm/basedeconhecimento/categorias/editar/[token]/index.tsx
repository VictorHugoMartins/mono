import { GetServerSideProps } from "next";
import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_CATEGORYKNOWLEDGEBASE } from "~/config/apiRoutes/categoryKnowLedgeBase";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

interface KnowledgebaseCategoryEditProps {
  token: string;
}

const KnowledgebaseCategoryEdit: React.FC<KnowledgebaseCategoryEditProps> = ({
  token,
}) => {
  return (
    <PrivatePageStructure
      title="Editar Categoria de Conteudo"
      returnPath="/adm/basedeconhecimento/categorias/lista"
    >
      <FormPageStructure
        buildPath={API_CATEGORYKNOWLEDGEBASE.BUILD()}
        submitPath={API_CATEGORYKNOWLEDGEBASE.SAVE()}
        preparePath={API_CATEGORYKNOWLEDGEBASE.PREPARE(token)}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/basedeconhecimento/categorias/lista"
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(KnowledgebaseCategoryEdit);
