import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_PROSPECT } from "~/config/apiRoutes/prospect";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

// import { Container } from './styles';

const ProspectionAdd: React.FC = () => {
  const _returnUrl = "/adm/prospeccao/lista/";
  return (
    <>
      <PrivatePageStructure
        title="Adicionar Prospecção de Clientes"
        returnPath={_returnUrl}
      >
        <FormPageStructure
          buildPath={API_PROSPECT.BUILD()}
          submitPath={API_PROSPECT.SAVE()}
          buttonSubmitText="Salvar"
          buttonCancelText="Cancelar"
          returnPath={_returnUrl}
          onSuccess={FormSuccess}
        />
      </PrivatePageStructure>
    </>
  );
};

export default privateroute(ProspectionAdd);
