import React from "react";
import { Dialog } from "primereact/dialog";

type DialogPrimeReactProps = {
  openModal: boolean;
  onClose: () => void;
  title?: string;
};

const DialogPrimeReact: React.FC<DialogPrimeReactProps> = ({
  children,
  openModal,
  onClose,
  title,
}) => {
  return (
    <Dialog
      header={title}
      visible={openModal}
      // style={{ width: "50vw" }}
      // footer={renderFooter("displayBasic")}
      onHide={onClose}
    >
      {children}
    </Dialog>
  );
};

export default DialogPrimeReact;
