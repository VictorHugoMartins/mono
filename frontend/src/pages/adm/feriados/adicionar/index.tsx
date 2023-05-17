import React from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_HOLLIDAY } from "~/config/apiRoutes/holliday";
import { FormSuccess } from "~/utils/FormSuccess";

const HollidayAdd: React.FC = () => {
  return (
    <PrivatePageStructure
      title="Adicionar Feriado"
      returnPath="/adm/feriados/lista"
    >
      <FormPageStructure
        buildPath={API_HOLLIDAY.BUILD()}
        submitPath={API_HOLLIDAY.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/feriados/lista"
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};
export default HollidayAdd;
