import React from 'react';

import styles from './popup.module.scss';

export interface PopupProps {
  show?: boolean,
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl",
}

const Popup: React.FC<PopupProps> = ({ children, show, maxWidth = "md" }) => {
  if (!show) return <></>;
  return (
    <div className={`${styles.popup} ${styles[`theme${'light'}`]}`}>
      <div className={`${styles.popupinner} ${styles[`maxWidth${maxWidth}`]}`}>
        {children}
      </div>
    </div>
  );
}

export default Popup;