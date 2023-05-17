import React from 'react';
import ListPageStructure from '~/components/structure/ListPageStructure';
import PrivatePageStructure from '~/components/structure/PrivatePageStructure/PrivatePageStructure';
import { API_ROLES } from '~/config/apiRoutes/roles';
import privateroute from '~/routes/private.route';

// import { Container } from './styles';

const RolesList: React.FC = () => {
  return(
    <PrivatePageStructure title="Lista de Roles" noPadding>
      <ListPageStructure
        param="id"
        createPath="/adm/roles/adicionar"
        editPath="/adm/roles/editar"
        exportPath={API_ROLES.EXPORTLIST()}
        removeAPIPath={API_ROLES.DELETE()}
        getListPath={API_ROLES.GETALL()}
      />
    </PrivatePageStructure>
  );
}

export default privateroute(RolesList);