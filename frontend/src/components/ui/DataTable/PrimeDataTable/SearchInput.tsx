import { FilterMatchMode } from "primereact/api";
import React, { useEffect, useState } from "react";
import { TextInput } from "~/components/ui/Inputs";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import { SpacingPatternType } from "~/types/global/SpacingType";

import styles from "./primeDataTable.module.scss";

interface TableSearchInputProps {
  filters1: any;
  setFilters1: React.Dispatch<any>;
  setExpandedRows?: React.Dispatch<any>;
  marginBottom?: SpacingPatternType;
}

const TableSearchInput: React.FC<TableSearchInputProps> = ({
  filters1 = null,
  setFilters1,
  setExpandedRows,
  marginBottom
}) => {
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");

  const onGlobalFilterChange1 = (e) => {
    if (setExpandedRows) setExpandedRows(null);
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      users: { value: null, matchMode: FilterMatchMode.IN },
    });
    setGlobalFilterValue1("");
  };

  useEffect(() => {
    initFilters1();
  }, []);

  return (<Flexbox
    className={styles.dataTableHeader}
    justify="flex-end"
    margin={{ bottom: marginBottom ?? undefined }}
  >
    <div className={styles.searchInput}>
      <TextInput
        value={globalFilterValue1}
        onChange={onGlobalFilterChange1}
        placeholder="Pesquisar"
        type="search"
      />
    </div>
  </Flexbox>
  )
};

export default TableSearchInput;
