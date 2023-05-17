import React from 'react';
import FormPageStructure from '~/components/structure/FormPageStructure';
import PrivatePageStructure from '~/components/structure/PrivatePageStructure/PrivatePageStructure';
import { API_MANAGEMENT } from '~/config/apiRoutes/management';
import { API_POST_MANAGEMENT } from '~/config/apiRoutes/posts';
import privateroute from '~/routes/private.route';
import { FormSuccess } from '~/utils/FormSuccess';

// import { Container } from './styles';

const PostManagementAdd: React.FC = () => {
    const _returnUrl = "/adm/gerenciamentodeposts/lista/"
    return (
        <>
            <PrivatePageStructure title="Adicionar Posts" returnPath={_returnUrl}>
                <FormPageStructure
                    buildPath={API_POST_MANAGEMENT.BUILD()}
                    submitPath={API_POST_MANAGEMENT.SAVE()}
                    buttonSubmitText="Salvar"
                    buttonCancelText="Cancelar"
                    returnPath={_returnUrl}
                    onSuccess={FormSuccess}
                />
            </PrivatePageStructure>
        </>
    );
}

export default privateroute(PostManagementAdd);