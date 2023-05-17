import React from 'react';
import FormPageStructure from '~/components/structure/FormPageStructure';
import Button from '~/components/ui/Button/Button';
import Form from '~/components/ui/Form/Form';
import SubmitButton from '~/components/ui/Form/SubmitButton/SubmitButton';
import HiddenInputForm from '~/components/ui/FormInputs/HiddenInputForm';
import SelectDropdownForm from '~/components/ui/FormInputs/SelectDropdownForm';
import SelectForm from '~/components/ui/FormInputs/SelectForm';
import { Grid } from '~/components/ui/Layout/Grid';
import { API_PROSPECT } from '~/config/apiRoutes/prospect';

// import { Container } from './styles';

interface ModalChangeStatus {
    handleClose?: () => {};
    prospectId: string | number;
    getList?: () => void;
}

const ModalChangeProspectionStatus: React.FC<ModalChangeStatus> = ({ handleClose, prospectId, getList }) => {
    return (
        <>
            <FormPageStructure
                buildPath={API_PROSPECT.CHANGE_STATUS_BUILD()}
                buttonSubmitText='Salvar'
                buttonCancelText='Cancelar'
                onSuccess={getList}
                isMessageApi={true}
                submitPath={API_PROSPECT.CHANGE_STATUS_SAVE()}
                onCancel={handleClose}
                preparePath={API_PROSPECT.PREPARE_CHANGE_STATUS(prospectId)}
            />
        </>
    );
}

export default ModalChangeProspectionStatus;