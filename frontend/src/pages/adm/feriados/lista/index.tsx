import React from 'react';
import ListPageStructure from '~/components/structure/ListPageStructure';
import PrivatePageStructure from '~/components/structure/PrivatePageStructure/PrivatePageStructure';
import { API_HOLLIDAY } from '~/config/apiRoutes/holliday';

const HollidayList: React.FC = () => {
  return (
    <>
      <PrivatePageStructure title="Lista de Feriados">
        <ListPageStructure
          createPath="/adm/feriados/adicionar"
          editPath="/adm/feriados/editar"
          exportPath={API_HOLLIDAY.EXPORTLIST()}
          param="id"
          removeAPIPath={API_HOLLIDAY.DELETE()}
          getListPath={API_HOLLIDAY.GETALL()}
        />
      </PrivatePageStructure>
    </>
  )
}
export default HollidayList;