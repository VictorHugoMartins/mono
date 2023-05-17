import React, { useState } from 'react';
import DataTableButton from '~/components/ui/DataTable/DataTableButton/DataTableButton';
import { Modal } from '~/components/ui/Modal/Modal';
import BuildModalProps from '~/types/BuildModalProps';
import FormPageStructure, { FormPageStructureProps } from '../FormPageStructure';
import Card from '~/components/ui/Card';
import Flexbox from '~/components/ui/Layout/Flexbox/Flexbox';
import { C } from '@fullcalendar/core/internal-common';

// import { Container } from './styles';

interface ModalFormStructureProps {
    /**
     * Componente Usado para abrir o modal
     */
    clickableComponent?: React.ReactNode;

    /**
     * Titulo do botao caso o clickable não seja passado
     */
    title: string;
    /**
     * Valor inicial de abertura do modal
     */

    initialOpen?: boolean;
    /**
     * Atualizar valores da tabela
     */
    getList?: () => void;

    /**
     * Propriedades do Fomulário 
     */
    formProps: FormPageStructureProps;

    /**
     * Função para atualizar as tabs ao dar sucesso no form
     */
    updateTabsFunction?: {
        updateFunction: () => void;
    }

    /**
     * Componente que ficará por cima do formulário
     */
    topComponent?:React.ReactNode;
}

interface ContentProps {
    handleClose?: () => void;
}

const ModalFormStructure: React.FC<ModalFormStructureProps> = ({ updateTabsFunction,topComponent, clickableComponent, title, initialOpen = false, getList, formProps }) => {
    const [open, setOpen] = useState(initialOpen);

    const Form = ({ handleClose }: ContentProps) => {
        return (
            <>
                {
                    topComponent&&
                    <div style={{width:'100%',flexDirection:'column',marginBottom:16}}>
                        {topComponent}
                    </div>
                }
                <Card>
                    <FormPageStructure
                        {...formProps}
                        onSuccess={() => {
                            if (updateTabsFunction) {
                                updateTabsFunction.updateFunction();
                            }
                            if (getList) {
                                getList();
                            }
                            handleClose();
                        }}
                        onCancel={() => { handleClose() }}
                    />
                </Card>
            </>
        )
    }

    return (
        <Modal
            title={formProps.title}
            openButton={
                clickableComponent ?? <DataTableButton icon="FaExternalLinkAlt" title={title} />
            }
            setOpenModal={setOpen}
            fixed
            openExternal={open}
            disabledBackClick={false}
            onClose={() => { }}
        >
            <Form />
        </Modal>
    );
}


export default ModalFormStructure;