import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_CATEGORYKNOWLEDGEBASE } from "~/config/apiRoutes/categoryKnowLedgeBase";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

const KnowledgebaseCategoryAdd: React.FC = () => {
  return (
    <PrivatePageStructure
      title="Adicionar Categoria de Conteudo"
      returnPath="/adm/basedeconhecimento/categorias/lista"
    >
      <FormPageStructure
        buildPath={API_CATEGORYKNOWLEDGEBASE.BUILD()}
        submitPath={API_CATEGORYKNOWLEDGEBASE.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/basedeconhecimento/categorias/lista"
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(KnowledgebaseCategoryAdd);
