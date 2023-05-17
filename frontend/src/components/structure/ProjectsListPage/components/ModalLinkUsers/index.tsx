import React, { useState } from "react";

import FormPageStructure from "~/components/structure/FormPageStructure";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import { Modal } from "~/components/ui/Modal/Modal";

import { API_PROJECT_USER_ASSOCIATION } from "~/config/apiRoutes/projectUserAssociation";
import Toast from "~/utils/Toast/Toast";

interface ModalTicketDetailProps {
  projectId: string;
}

interface ModalButtonsProps {
  handleClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalLinkUsers: React.FC<ModalTicketDetailProps> = ({ projectId }) => {
  function ModalContent({ handleClose }: ModalButtonsProps) {
    return (
      <FormPageStructure
        buildPath={API_PROJECT_USER_ASSOCIATION.BUILD()}
        preparePath={API_PROJECT_USER_ASSOCIATION.PREPARE(projectId)}
        submitPath={API_PROJECT_USER_ASSOCIATION.SAVE()}
        hiddenInputs={{ projectId }}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        onSuccess={(e) => {
          Toast.success("Vinculado com sucesso!");
          handleClose(null);
        }}
        onCancel={(e) => handleClose(e)}
      />
    );
  }

  return (
    <Modal
      title={"Vincular Usuários"}
      openButton={<DataTableButton icon="FaLink" title="Vincular Usuários" />}
      noOverflow
    >
      <ModalContent />
    </Modal>
  );
};

export default ModalLinkUsers;
