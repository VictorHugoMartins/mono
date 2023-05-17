import React from "react";

import Button from "../Button/Button";
import { ButtonProps } from "../Button/button.interface";

import styles from "./floatingButton.module.scss";

interface FloatingButtonProps extends ButtonProps {}

const FloatingButton: React.FC<FloatingButtonProps> = ({ ...rest }) => {
  return (
    <div className={styles.floatingButton}>
      <Button {...rest} />
    </div>
  );
};

export default FloatingButton;
