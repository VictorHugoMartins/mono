
import React from 'react'
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import styles from "./pagination.module.scss";
import useTheme from '~/hooks/useTheme';

type ResponsivePaginationProps = {
  page: number,
  noOfPages: number,
  handleChange: any,
}

const ResponsivePagination: React.FC<ResponsivePaginationProps> = ({ page, noOfPages, handleChange }) => {
  const { theme } = useTheme();
  
  return (
    noOfPages > 1 &&
    <div className={`${styles.pagination} ${styles[`theme${theme}`]}`}>
      <div className={styles.paginationBox}>
        <div className={styles.categoryPagination}>
          <Box component="span">
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              size="small"
              boundaryCount={1}
              siblingCount={0}
            />
          </Box>
        </div>
      </div>
      <div className={styles.paginationResponsiveBox}>
        <div className={styles.categoryPagination}>
          <Box component="span">
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              size="medium"
              showFirstButton={false}
              showLastButton={false}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}
export default ResponsivePagination;