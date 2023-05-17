import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import reportGeneratorService from "~/services/reportGenerator.service";
import { ChartObjectType } from "~/types/global/ChartTypes";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import {
  ReportFiltersType,
  ReportSelectsType,
} from "~/types/global/ReportType";
import Toast from "~/utils/Toast/Toast";
import DataTableHeaderExportButton from "~/components/ui/DataTable/DataTableHeader/DataTableHeaderExportButton";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import PageHead from "~/components/ui/PageHead";
import ReportCharts from "../ReportCharts";
import ReportHeader, { PropsExport } from "../ReportHeader";
import ReportTable from "../ReportTable";
import { Grid } from "../../Layout/Grid";

interface ReportGeneratorRenderProps {
  token: string;
  exportPath: string;
  returnUrl?: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export type ReportFilterTypeRefatored = [
  {
    label: string | string[];
    value: string | string[];
  }
];

export interface PropsExportPdfExcell {
  inputs: ReportFilterTypeRefatored;
  dropdownsvalues: [
    {
      name: string;
      values: string[];
    }
  ];
}

const ReportGeneratorRender: React.FC<ReportGeneratorRenderProps> = ({
  returnUrl,
  exportPath,
  token,
  setTitle,
}) => {
  const [_table, setTable] = useState<DataTableRenderType>();
  const [_charts, setCharts] = useState<ChartObjectType[]>();
  const [_inputs, setInputs] = useState<ReportFiltersType>([]);
  const [_dropdownsValues, setDropdownsValues] = useState<ReportSelectsType>(
    []
  );

  const [inputsExport, setinputsExport] = useState<any>([
    {
      label: "test",
      value: "teste",
    },
  ]);

  const [dropDownFilters, setDropDownFilters] = useState<PropsExport>({
    dropdownsvalues: {
      name: "",
      values: [],
    },
  });

  const [_loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    _buildReport();
  }, []);

  async function _buildReport() {
    let response = await reportGeneratorService.buildReport(token);

    if (response.success) {
      setTitle(response.object.title);
      setTable(response.object.genericTable);
      setCharts(response.object.charts);
      setInputs(response.object.inputs);
      setDropdownsValues(response.object.dropDowns);
    } else {
      Toast.error(response.message);
    }
  }

  const clearValues = async () => {
    setLoading(true);
    await _buildReport();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  async function _filterReport(data: any) {
    Object.keys(data).forEach((key) => {
      if (key.includes("dropdown") && data[key] && data[key].includes("-1")) {
        data[key] = null;
      } else if (key.includes("dropdown") && !data[key]) {
        data[key] = null;
      }
    });
    let response = await reportGeneratorService.buildReport(token, data);

    if (response.success) {
      setTable(response.object.genericTable);
      setCharts(response.object.charts);

      return null;
    }
    return { message: response.message, errors: response.errors };
  }

  return (
    <>
      <PopupLoading show={!_table && !_charts && !_loading} />
      <Grid container spacing={"xg"}>
        {_inputs?.length > 0 && (
          <Grid md={12}>
            <ReportHeader
              inputs={_inputs}
              dropdownsValues={_dropdownsValues}
              submit={_filterReport}
              setDropDownFilters={setDropDownFilters}
              clearFilter={clearValues}
            />
          </Grid>
        )}
        <Grid md={12}>
          <Flexbox align="flex-end" justify="flex-end" width={"100%"}>
            <div>
              <DataTableHeaderExportButton
                text={"Exportar"}
                icon={"FaFileExport"}
                exportPath={exportPath}
                dataFilters={inputsExport}
                filteredData={dropDownFilters}
              />
            </div>
          </Flexbox>
        </Grid>
        <Grid md={12}>
          {_charts?.length > 0 && <ReportCharts data={_charts} />}
        </Grid>
        <Grid md={12}>{_table && <ReportTable data={_table} />}</Grid>
      </Grid>
    </>
  );
};

export default ReportGeneratorRender;
