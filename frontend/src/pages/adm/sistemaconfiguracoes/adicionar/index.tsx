import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_SWITCHCONFIGURATIONS } from "~/config/apiRoutes/switchConfigurations";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

const SwitchConfigAdd:React.FC=()=>{
    const _returnUrl = "/adm/sistemaconfiguracoes/lista/";
    return (
        <PrivatePageStructure title="Adicionar Configuração Booleana" returnPath={_returnUrl}>
          <FormPageStructure
            buildPath={API_SWITCHCONFIGURATIONS.BUILD()}
            buttonSubmitText="Salvar"
            buttonCancelText="Cancelar"
            returnPath={_returnUrl}
            submitPath={API_SWITCHCONFIGURATIONS.SAVE()}
            onSuccess={FormSuccess}
          />
        </PrivatePageStructure>
      );
}
export default privateroute(SwitchConfigAdd)