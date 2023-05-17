import React from 'react';
import ListPageStructure from '~/components/structure/ListPageStructure';
import PrivatePageStructure from '~/components/structure/PrivatePageStructure/PrivatePageStructure';
import { API_NOTIFICATION_TEMPLATE } from '~/config/apiRoutes/notificationTemplate';
import privateroute from '~/routes/private.route';

// import { Container } from './styles';

const NotificationsTemplateList: React.FC = () => {
    return (
        <>
            <PrivatePageStructure title="Lista de Templates de Notificações" noPadding>
                <ListPageStructure
                    param="id"
                    details
                    createPath="/adm/templatesdenotificacoes/adicionar"
                    editPath="/adm/templatesdenotificacoes/editar"
                    exportPath={API_NOTIFICATION_TEMPLATE.EXPORTLIST()}
                    removeAPIPath={API_NOTIFICATION_TEMPLATE.DELETE()}
                    getListPath={API_NOTIFICATION_TEMPLATE.GETALL()}
                />
            </PrivatePageStructure>
        </>
    );
}

export default privateroute(NotificationsTemplateList);