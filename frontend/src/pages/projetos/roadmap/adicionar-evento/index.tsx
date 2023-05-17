import React from 'react';
import FormPageStructure from '~/components/structure/FormPageStructure';
import PrivatePageStructure from '~/components/structure/PrivatePageStructure/PrivatePageStructure';
import { CALENDAR_EVENTS } from '~/config/apiRoutes/events';
import privateroute from '~/routes/private.route';
import { FormSuccess } from '~/utils/FormSuccess';

// import { Container } from './styles';

const AdiconarEvento: React.FC = () => {
    return (
        <PrivatePageStructure
            title="Adicionar Evento"
            returnPath="/projetos/roadmap"
        >
            <FormPageStructure
                buildPath={CALENDAR_EVENTS.BUILD()}
                buttonSubmitText="Salvar"
                buttonCancelText="Cancelar"
                returnPath="/projetos/roadmap/"
                submitPath={CALENDAR_EVENTS.SAVE()}
                onSuccess={FormSuccess}
            />
        </PrivatePageStructure>
    );
}

export default privateroute(AdiconarEvento);