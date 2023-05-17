import React, { useState } from 'react';
import { DataTable, DataTableFilterMeta, DataTableFilterMetaData, DataTableRowClickEventParams } from 'primereact/datatable';
import { Column, ColumnBodyType } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import styles from "./localDataTable.module.scss";
import { InputRenderType } from '~/types/global/InputRenderType';

export type LocalDataTableType = {
  buttons?: ColumnBodyType,
  cancelButton?: any,
  columns: LocalDataTableColumnType[],
  onRowClick?: (e: DataTableRowClickEventParams) => void,
  rows: any[],
}

export type LocalDataTableColumnType = {
  label: string,
  value: string,
  bodyType?: null | 'customBody',
  type?: InputRenderType, // esse é o tipo atual dos input forms,
  editable?: boolean,
  children?: LocalDataTableType, // é o tipo atual da tabela, recursivo
}

const LocalDataTable: React.FC<LocalDataTableType> = ({ buttons, columns, onRowClick, rows }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [tableRows] = useState(rows);
  const [tableColumns] = useState<LocalDataTableColumnType[]>(columns);
  const [searchFilter, setSearchFilter] = useState<DataTableFilterMeta>({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  function _getGlobalFilters(): string[] {
    let _list = columns.map((columm) => columm.value)
    return _list;
  }

  const _onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    let _filters1 = { ...searchFilter };
    _filters1['global'] = { value: value, matchMode: FilterMatchMode.CONTAINS } as DataTableFilterMetaData;

    setSearchFilter(_filters1);
    setGlobalFilterValue(value);
  }

  return (
    <div className={styles.localDataTable}>
      <div className={styles.localDataTableHeader}>
        <input
          value={globalFilterValue}
          onChange={_onGlobalFilterChange}
          placeholder="Pesquisar"
        />
      </div>
      <DataTable value={tableRows} paginator filters={searchFilter} rows={10} onRowClick={onRowClick}
        globalFilterFields={_getGlobalFilters()} className={"localDataTablePrime"} rowHover={onRowClick ? true : false}>
        {tableColumns.map((item, index) => <Column key={index} field={item.value} header={item.label} />)}
        {buttons && <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={buttons} />}
      </DataTable>
    </div>
  );
}

export default LocalDataTable;