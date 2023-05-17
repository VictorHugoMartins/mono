import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_VIDEO } from "~/config/apiRoutes/video";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

const KnowledgebaseAdd: React.FC = () => {
  return (
    <PrivatePageStructure
      title="Adicionar Video"
      returnPath="/adm/basedeconhecimento/videos/lista"
    >
      <FormPageStructure
        buildPath={API_VIDEO.BUILD()}
        submitPath={API_VIDEO.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/basedeconhecimento/videos/lista"
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(KnowledgebaseAdd);
