// import Image from 'next/image'

import ChildrenWithProps from "~/utils/ChildrenWithProps/ChildrenWithProps"
import styles from './table.module.scss';
import { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { PrimeDataTableProps } from "~/types/global/primeDataTable.interface";

interface TableProps extends PrimeDataTableProps {
  hiddenColumns?: string[];
}

const Table: React.FC<TableProps> = ({
  columns,
  rows,
  buttons,
  hiddenColumns,
}) => {
  const itemsPerPage = 20;
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (rows)
      setNumberOfPages(Math.ceil(rows.length / itemsPerPage));
  }, [rows]);

  return (
    <>
      <div style={{ maxWidth: "calc(100vw - 64px)", overflow: "scroll" }}>
        <div className={styles.table}>

          <div className={`${styles.row} ${styles.header} ${styles.blue}`}>
            {columns?.map((item) => (!hiddenColumns?.includes(item.value) ? <div className={styles.cell}>{item.label}</div> : <></>))}

            {buttons && <div className={styles.cell}></div>}

          </div>

          {rows?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map(function (row, index) {
              return (
                <div className={styles.row}>
                  {columns?.map((item) => (
                    !hiddenColumns?.includes(item.value) ?
                      <div className={styles.cell} data-title={item.value}>
                        {row[item.value]}
                      </div>
                      : <></>
                  ))
                  }

                  {buttons && <td>
                    <div className={styles.buttons}>
                      {ChildrenWithProps(buttons, { rowData: row })}
                    </div>
                  </td>}
                </div>
              )
            })}
        </div>
      </div>
      {
        numberOfPages > 1 &&
        <Grid className='pagination-center' item md={12} xs={12}>
          <div style={{ alignItems: 'center' }}>
            <Box component='span'>
              <Pagination
                count={numberOfPages}
                page={page}
                onChange={handleChange}
                defaultPage={1}
                size='large'
                showFirstButton
                color='primary'
                showLastButton
              />
            </Box>
          </div>
        </Grid>
      }

    </>
  )
}

export default Table;