import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_MENU } from "~/config/apiRoutes/menu";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

const MenuAdd: React.FC = () => {
  return (
    <PrivatePageStructure title="Adicionar Menu" returnPath="/adm/menu/lista">
      <FormPageStructure
        buildPath={API_MENU.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/menu/lista"
        submitPath={API_MENU.SAVE()}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(MenuAdd);
