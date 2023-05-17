import React from "react";
import { ListRowItensType } from "~/types/global/ListType";
import ListRowItem from "../ListRowItem";

import styles from "./listRow.module.scss";

interface ListRowProps {
  itens?: ListRowItensType;
}

const ListRow: React.FC<ListRowProps> = ({ children, itens }) => {
  return (
    <tr className={styles.row}>
      {children}
      {itens?.map((item, index) => (
        <ListRowItem key={`listRowItem-${index}`} {...item} />
      ))}
    </tr>
  );
};

export default ListRow;
