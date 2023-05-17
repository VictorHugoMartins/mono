
import React, { useState } from 'react';
import Icon from '~/components/ui/Icon/Icon';
import Flexbox from '~/components/ui/Layout/Flexbox/Flexbox';
import MaterialModal from '~/components/ui/Modal/MaterialModal/MaterialModal';
import useTheme from '~/hooks/useTheme';
import ChildrenWithProps from '~/utils/ChildrenWithProps/ChildrenWithProps';

// import { Container } from './styles';
import styles from "./modal.module.scss";

interface ModalDetailTypes {
    token: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean;
    disabledBackClick?: boolean;
    openButton?: React.ReactNode;
    openExternal?: boolean;
    title?: string;
    maxWidth?: "md" | "xs" | "sm" | "lg" | "xl";
    noOverflow?: boolean;
}


const ModalDetailStructureCalendar: React.FC<ModalDetailTypes> = ({
    token,
    setOpen,
    open,
    children,
    disabledBackClick,
    maxWidth,
    noOverflow,
    openButton,
    openExternal,
    title,
}) => {
    const { theme } = useTheme();

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <MaterialModal
            openModal={open}
            onClose={(_, reason) => {
                if (reason !== "backdropClick") {
                    handleClose();
                }
            }}
        >
            <div
                className={`${styles.modal}
          ${styles[`theme${theme}`]}
          ${maxWidth && styles[`boxMaxWidth${maxWidth}`]
                    } ${noOverflow && styles[`noOverflow`]}`}
            >
                <div style={{ width: "100%" }}>
                    <div className={styles.header}>
                        <Flexbox
                            justify={title ? "space-between" : "flex-end"}
                            align={"center"}
                            width={"100%"}
                        >
                            {title && <h3>{title}</h3>}
                            <button onClick={() => handleClose()}>
                                <Icon type={"FaWindowClose"} size={22} style={{color: theme === 'dark' ? '#fff' : '#000'}} />
                            </button>
                        </Flexbox>
                    </div>
                    <hr />
                </div>

                {children && (
                    <div className={styles.body}>
                        {
                            children
                        }
                    </div>
                )}
            </div>

        </MaterialModal>
    );
}

export default ModalDetailStructureCalendar;