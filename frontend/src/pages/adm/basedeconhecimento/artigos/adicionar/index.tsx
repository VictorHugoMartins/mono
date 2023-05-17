import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_ARTICLE } from "~/config/apiRoutes/article";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

const KnowledgebaseAdd: React.FC = () => {
  return (
    <PrivatePageStructure
      title="Adicionar Artigo"
      returnPath="/adm/basedeconhecimento/artigos/lista"
    >
      <FormPageStructure
        buildPath={API_ARTICLE.BUILD()}
        submitPath={API_ARTICLE.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/basedeconhecimento/artigos/lista"
        onSuccess={FormSuccess}
        gridStructure={[12, 12, 12, 6, 6, 6, 6]}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(KnowledgebaseAdd);
