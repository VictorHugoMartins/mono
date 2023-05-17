import React from 'react';
import FormPageStructure from '~/components/structure/FormPageStructure';
import { API_PROSPECT } from '~/config/apiRoutes/prospect';

// import { Container } from './styles';

interface ModalChangeUserSeller {
    handleClose?: () => {};
    prospectId: string | number;
    getList?: () => void;
}

const ModalChangeUserSeller: React.FC<ModalChangeUserSeller> = ({ prospectId, getList, handleClose }) => {
    return (
        <>
            <FormPageStructure
                buildPath={API_PROSPECT.CHANGE_SELLER_BUILD(prospectId)}
                buttonSubmitText='Salvar'
                buttonCancelText='Cancelar'
                onSuccess={getList}
                isMessageApi={true}
                submitPath={API_PROSPECT.CHANGE_SELLER_SAVE()}
                onCancel={handleClose}
                preparePath={API_PROSPECT.PREPARE_CHANGE_SELLER(prospectId)}
            />
        </>
    );
}

export default ModalChangeUserSeller;