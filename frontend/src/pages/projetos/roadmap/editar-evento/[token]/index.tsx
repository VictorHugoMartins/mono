import React from 'react';
import FormPageStructure from '~/components/structure/FormPageStructure';
import PrivatePageStructure from '~/components/structure/PrivatePageStructure/PrivatePageStructure';
import { CALENDAR_EVENTS } from '~/config/apiRoutes/events';
import privateroute from '~/routes/private.route';
import { FormSuccess } from '~/utils/FormSuccess';
import { GetServerSideProps } from "next";

// import { Container } from './styles';

interface EditPageInterface {
  token: number
}
const EditPageEvent: React.FC<EditPageInterface> = ({
  token
}) => {
  return (
    <PrivatePageStructure
      title='Editar Evento'
      returnPath='/projetos/roadmap/'
    >
      <FormPageStructure
        buildPath={CALENDAR_EVENTS.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/projetos/roadmap/"
        submitPath={CALENDAR_EVENTS.SAVE()}
        onSuccess={FormSuccess}
        preparePath={`${CALENDAR_EVENTS.PREPARE()}${token}`}
      />
    </PrivatePageStructure>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(EditPageEvent);