import React from "react";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import DataTableRender from "../../DataTable/DataTableRender/DataTableRender";

interface ReportTableProps {
  data: DataTableRenderType;
}

const ReportTable: React.FC<ReportTableProps> = ({ data, ...rest }) => {
  return (
    <DataTableRender externalData={data} padding={"zero"} responsive="scroll" />
  );
};

export default ReportTable;
