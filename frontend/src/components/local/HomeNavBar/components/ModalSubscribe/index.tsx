import React from "react";

import FormPageStructure from "~/components/structure/FormPageStructure";
import Button from "~/components/ui/Button/Button";
import { Modal } from "~/components/ui/Modal/Modal";
import { API_CONTACT_DATA } from "~/config/apiRoutes/contactData";
import Toast from "~/utils/Toast/Toast";

interface ModalTicketDetailProps { }

interface ModalButtonsProps {
  handleClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalSubscribe: React.FC<ModalTicketDetailProps> = () => {
  function ModalContent({ handleClose }: ModalButtonsProps) {
    return (
      <FormPageStructure
        buildPath={API_CONTACT_DATA.BUILD()}
        submitPath={API_CONTACT_DATA.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/"
        hiddenInputs={{ projectId: 3 }}
        onSuccess={(e) => {
          Toast.success(
            "Inscrição realizada com sucesso, em breve entraremos em contato."
          );
          handleClose(null);
        }}
        onCancel={(e) => handleClose(e)}
      />
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Modal
        title={"Inscreva-se já!"}
        openButton={
          <Button color="secondary" type="submit" text="Quero me inscrever" />
        }
      >
        <ModalContent />
      </Modal>
    </div>
  );
};

export default ModalSubscribe;
