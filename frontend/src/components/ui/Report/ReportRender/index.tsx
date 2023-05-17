import React, { useEffect, useState } from "react";
import reportService from "~/services/report.service";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { ReportFiltersType } from "~/types/global/ReportType";
import Toast from "~/utils/Toast/Toast";
import PageHead from "../../PageHead";
import ReportHeader from "../ReportHeader";
import ReportTable from "../ReportTable";

interface ReportRenderProps {
  token: string;
  returnUrl?: string;
}

const ReportRender: React.FC<ReportRenderProps> = ({ returnUrl, token }) => {
  const [_table, setTable] = useState<DataTableRenderType>();
  const [_inputs, setInputs] = useState<ReportFiltersType>([]);
  const [_title, setTitle] = useState<string>("");

  useEffect(() => {
    _buildReport();
  }, []);

  async function _buildReport() {
    let response = await reportService.buildReport(token);

    if (response.success) {
      setTitle(response.object.title);
      setTable(response.object.genericTable);
      setInputs(response.object.inputs);
    } else {
      Toast.error(response.message);
    }
  }

  async function _filterReport(data: any) {
    let response = await reportService.buildReport(token, data);

    if (response.success) {
      setTable(response.object.genericTable);
      return null;
    }
    return { message: response.message, errors: response.errors };
  }

  return (
    <div>
      <PageHead title={`Relatorio ${_title}`} returnUrl={returnUrl} />
      <ReportHeader inputs={_inputs} submit={_filterReport} />
      {_table && <ReportTable data={_table} />}
    </div>
  );
};

export default ReportRender;
