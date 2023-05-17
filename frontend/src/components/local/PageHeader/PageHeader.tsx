import React, { useState } from "react";

import styles from "./pageHeader.module.scss";

interface PageHeaderProps {
  userName: string;
}

interface PageTitleProps {
  text: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <div className={styles.pageHeader}>
      <h2>Olá{props.userName && <>, {props.userName}</>}!</h2>
      <p>Bem-vindo ao sistema de controle da Second Mind!</p>
    </div>
  );
};

const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return (
    <div className={styles.pageTitle}>
      <h2>{text}</h2>
    </div>
  );
};

export { PageHeader, PageTitle };
