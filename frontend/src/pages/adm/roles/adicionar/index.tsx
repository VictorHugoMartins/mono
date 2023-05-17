import React from 'react';
import FormPageStructure from '~/components/structure/FormPageStructure';
import PrivatePageStructure from '~/components/structure/PrivatePageStructure/PrivatePageStructure';
import { API_ROLES } from '~/config/apiRoutes/roles';
import { FormSuccess } from '~/utils/FormSuccess';

// import { Container } from './styles';

const RolesAdd: React.FC = () => {
    const _returnUrl = "/adm/roles/lista";
    return (
      <PrivatePageStructure title="Adicionar Roles" returnPath={_returnUrl}>
        <FormPageStructure
          buildPath={API_ROLES.BUILD()}
          buttonSubmitText="Salvar"
          buttonCancelText="Cancelar"
          returnPath={_returnUrl}
          submitPath={API_ROLES.SAVE()}
          onSuccess={FormSuccess}
        />
      </PrivatePageStructure>
    );
  };

export default RolesAdd;