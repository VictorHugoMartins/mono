import React from "react";

//Import components
import Card from "~/components/ui/Card";
import { Modal } from "~/components/ui/Modal/Modal";
import FeedPageStructure from "../FeedPageStructure";
import FormPageStructure from "../FormPageStructure";

//Import interface
import {
  ContentModalProps,
  FeedModalStructureProps,
} from "./feedModalStructure.interface";

//Import utils
import { FormSuccess } from "~/utils/FormSuccess";

const FeedModalStructure: React.FC<FeedModalStructureProps> = ({
  getFeedPath,
  openButton,
  openExternal,
  refreshList,
  title,
  form,
}) => {
  return (
    <Modal
      disabledBackClick={false}
      fixed
      title={title}
      onClose={refreshList}
      openButton={openButton}
      openExternal={openExternal}
    >
      <ContentModal getPath={getFeedPath} {...form} />
    </Modal>
  );
};

const ContentModal: React.FC<ContentModalProps> = ({
  handleClose,
  closeModal,
  getPath,
  buildPath,
  submitPath,
  hiddenInputs,
  title,
}) => {
  return (
    <>
      <FeedPageStructure getPath={getPath} firstSelected />

      <Card title={title}>
        <FormPageStructure
          buildPath={buildPath}
          submitPath={submitPath}
          hiddenInputs={hiddenInputs}
          buttonSubmitText="Salvar"
          buttonCancelText="Cancelar"
          onSuccess={FormSuccess}
          handleClose={handleClose}
          onCancel={() => {
            closeModal();
          }}
        />
      </Card>
    </>
  );
};

export default FeedModalStructure;
