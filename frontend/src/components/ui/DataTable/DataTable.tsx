import React from "react";
import PrimeDataTable from "./PrimeDataTable/PrimeDataTable";
import { PrimeDataTableProps } from "./PrimeDataTable/primeDataTable.interface";
import { DataTableRowClassNameOptions } from "primereact/datatable";

interface DataTableProps extends PrimeDataTableProps {
  rowClassName?(data: any, options: DataTableRowClassNameOptions): string | object;
}

const DataTable: React.FC<DataTableProps> = ({ ...rest }) => {
  return <PrimeDataTable  {...rest} />;
};

export default DataTable;
