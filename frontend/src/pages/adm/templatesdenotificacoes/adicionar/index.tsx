import React from 'react';
import FormPageStructure from '~/components/structure/FormPageStructure';
import PrivatePageStructure from '~/components/structure/PrivatePageStructure/PrivatePageStructure';
import { API_NOTIFICATION_TEMPLATE } from '~/config/apiRoutes/notificationTemplate';
import privateroute from '~/routes/private.route';
import { FormSuccess } from '~/utils/FormSuccess';

// import { Container } from './styles';

const NotificationTemplatesAdd: React.FC = () => {
    return (
        <PrivatePageStructure
            title="Adicionar Template de Notificação"
            returnPath="/adm/templatesdenotificacoes/lista"
        >
            <FormPageStructure
                buildPath={API_NOTIFICATION_TEMPLATE.BUILD()}
                buttonSubmitText="Salvar"
                buttonCancelText="Cancelar"
                returnPath="/adm/templatesdenotificacoes/lista"
                submitPath={API_NOTIFICATION_TEMPLATE.SAVE()}
                onSuccess={FormSuccess}
            />
        </PrivatePageStructure>
    );
}

export default (NotificationTemplatesAdd);