import React from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import styles from "./materialModal.module.scss";

type MaterialModalProps = {
  openModal: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

const MaterialModal: React.FC<MaterialModalProps> = ({
  children,
  openModal,
  onClose,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.defaultModal}
      open={openModal}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={openModal}>
        <>{children}</>
      </Fade>
    </Modal>
  );
};

export default MaterialModal;
