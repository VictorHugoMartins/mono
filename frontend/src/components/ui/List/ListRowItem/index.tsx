import React from "react";
import Link from "../../Link/Link";

import styles from "./listRowItem.module.scss";

interface ListRowItemProps {
  href?: string;
  label?: string;
  text: string;
}

const ListRowItem: React.FC<ListRowItemProps> = ({ text, href, label }) => {
  return (
    <td className={styles.rowItem}>
      <div className={styles.rowItemContent}>
        {label && <b>{label}: </b>}
        {href ? <Link to={href}>{text}</Link> : <>{text}</>}
      </div>
    </td>
  );
};

export default ListRowItem;
