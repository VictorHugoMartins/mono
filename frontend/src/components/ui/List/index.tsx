import React from "react";
import { ListRowType, ListType } from "~/types/global/ListType";

import styles from "./list.module.scss";

import ListRow from "./ListRow";

interface ListProps {
  rows?: ListRowType;
  title?: string;
  backgroundColor?: string;
}

const List: React.FC<ListProps> = ({
  backgroundColor,
  children,
  rows,
  title,
}) => {
  return (
    <div className={styles.container}>
      {title && <h6 className={styles.title}>{title}</h6>}
      <div className={styles.listArea}>
        <table className={styles.list}>
          <tbody
            style={{ backgroundColor: backgroundColor, overflowY: "auto" }}
          >
            {children}
            {rows?.map((row, index) => (
              <ListRow key={`listRow-${index}`} itens={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
