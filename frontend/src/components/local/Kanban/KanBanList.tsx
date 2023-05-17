import React from "react";

import styles from "./kanban.module.scss";
import useTheme from "~/hooks/useTheme";
import { KanBanListProps } from "./kanban.interface";

const KanBanList: React.FC<KanBanListProps> = ({
  backgroundColor,
  children,
  title,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.list} ${styles[`theme${theme}`]}`}>
      <div className={styles.title} style={{ backgroundColor: backgroundColor }}>
        {title}
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  )
}

export default KanBanList;
