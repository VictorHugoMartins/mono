import React, { useEffect, useState } from "react";

import MaterialModal from "./MaterialModal/MaterialModal";

import styles from "./modal.module.scss";

import ChildrenWithProps from "~/utils/ChildrenWithProps/ChildrenWithProps";
import useTheme from "~/hooks/useTheme";
import Flexbox from "../Layout/Flexbox/Flexbox";
import Icon from "../Icon/Icon";

interface ModalProps {
  disabledBackClick?: boolean;
  footer?: React.ReactNode;
  openButton?: React.ReactNode;
  onClose?: ()=>void;
  hideOpenButton?: boolean;
  openExternal?: boolean;
  title?: string;
  maxWidth?: "md" | "xs" | "sm" | "lg" | "xl";
  noOverflow?: boolean;
  fixed?: boolean;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  footer,
  disabledBackClick = true,
  openButton,
  hideOpenButton,
  openExternal,
  maxWidth = "md",
  noOverflow,
  fixed,
  onClose,
  setOpenModal,
}) => {
  const { theme } = useTheme();

  const [open, setOpen] = useState(openExternal || false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleWithClose = () => {
    if (onClose) {
      onClose();
    }
    handleClose();
  };

  const handleClose = () => {
    if (setOpenModal) {
      setOpen(false);
      setOpenModal(false);
    }
    setOpen(false);
  };

  useEffect(() => {
    handleExtenal(openExternal);
  }, [openExternal]);

  const handleExtenal = (value: boolean) => {
    setOpen(value);
    if(value===true){
      handleOpen();
    }else{
      handleClose();
    }
  };

  useEffect(()=>{

  },[open])

  return (
    <>
      {!hideOpenButton && (
        <div onClick={handleOpen}>{openButton || "Abrir"}</div>
      )}

      <MaterialModal
        openModal={openExternal&& setOpenModal ? openExternal:open}
        onClose={(_, reason) => {
          if (!disabledBackClick || reason !== "backdropClick") {
            handleClose();
          }
        }}
      >
        <div
          className={`${styles.modal}
          ${styles[`theme${theme}`]}
          ${maxWidth && styles[`boxMaxWidth${maxWidth}`]} ${
            noOverflow && styles[`noOverflow`]
          }
            ${fixed && styles[`fixed`]}`}
        >
          <div style={{ width: "100%" }}>
            <div className={styles.header}>
              <Flexbox
                justify={title ? "space-between" : "flex-end"}
                align={"center"}
                width={"100%"}
              >
                {title && <h3>{title}</h3>}
                <button
                  className={styles.closeButton}
                  onClick={() => handleClose()}
                >
                  <Icon type={"FaWindowClose"} size={22} />
                </button>
              </Flexbox>
            </div>
            <hr />
          </div>

          {children && (
            <div className={styles.body}>
              {ChildrenWithProps(children, {
                open,
                closeModal: handleClose,
                handleClose: handleWithClose,
              })}
            </div>
          )}
          {footer && (
            <>
              <hr />
              <div className={styles.footer}>{footer}</div>
            </>
          )}
        </div>
      </MaterialModal>
    </>
  );
};

export { Modal };
