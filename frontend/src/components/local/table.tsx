// import Image from 'next/image'

import ChildrenWithProps from "~/utils/ChildrenWithProps/ChildrenWithProps"
import styles from './table.module.scss';

interface TableProps {
  columns: any[],
  rows: any[],
  buttons?: any
}

const Table: React.FC<TableProps> = ({
  columns,
  rows,
  buttons
}) => {
  return (
    <table className={styles.table}>
      <thead>
        {columns?.map((item) => (<th>{item.label}</th>))}

        {buttons && <th></th>}
      </thead>
      <tbody>
        {rows?.map((row) => (
          <tr>
            {columns?.map((item) => (
              <td>
                {row[item.value]}
              </td>
            ))
            }

            {buttons && <td className={styles.buttons}>{ChildrenWithProps(buttons, { rowData: row })}</td>}
          </tr>
        ))}
      </tbody>
    </table >
  )
}

export default Table;