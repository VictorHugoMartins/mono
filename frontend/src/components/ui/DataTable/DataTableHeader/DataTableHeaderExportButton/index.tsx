import React, { useState } from "react";

import Button from "~/components/ui/Button/Button";
import { DropdownButton } from "~/components/ui/Dropdown";
import Icon from "~/components/ui/Icon/Icon";
import { IconTypes } from "~/components/ui/Icon/icon.interface";
import {
  PropsExportPdfExcell,
  ReportFilterTypeRefatored,
} from "~/components/ui/Report/ReportGeneratorRender";
import { PropsExport } from "~/components/ui/Report/ReportHeader";

import exportService from "~/services/export.service";

import { handlePrintPage } from "~/utils/GeneratePageScreenShot";

import style from "./dataTableHeaderExportButton.module.scss";

interface DataTableButtonProps {
  icon?: IconTypes;
  exportPath?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  elementRef?: React.MutableRefObject<undefined>;
  title?: string;
  value?: number;
  dataFilters?: ReportFilterTypeRefatored;
  filteredData?: PropsExport;
  noOptions?: boolean;
}

const DataTableHeaderExportButton: React.FC<DataTableButtonProps> = ({
  icon,
  exportPath,
  elementRef,
  value,
  text,
  title,
  dataFilters,
  filteredData,
  noOptions,
}) => {
  async function _exportPage(option: number) {
    setRequesting(true);
    let form = null;
    let dataFilteredInputs: null | PropsExportPdfExcell = null;
    if (filteredData) {
      dataFilteredInputs = {
        dropdownsvalues: [
          {
            name: filteredData.dropdownsvalues.name,
            values: filteredData.dropdownsvalues.values,
          },
        ],
        inputs: dataFilters,
      };
    }
    if (elementRef) {
      const base64 = await handlePrintPage(elementRef);
      // console.log(base64);
      form = {
        token: value,
        options: option,
        fileGraphics: {
          file: base64,
          name: "burndown",
        },
      };
    }

    if (!form && !dataFilteredInputs)
      await exportService.exportListPDFExcel(`${exportPath}${noOptions ? '' : `${option}`}`);
    if (form) await exportService.exportListPDFExcel(exportPath, form);
    if (dataFilteredInputs)
      await exportService.exportListPDFExcel(
        `${exportPath}${option}`,
        dataFilteredInputs
      );

    setRequesting(false);
  }

  const [requesting, setRequesting] = useState(false);

  if (noOptions) return (
    <Button color="primary" title={title} loading={requesting}
      onClick={() => { _exportPage(1); }}>
      {icon && <Icon type={icon} mr={8} />} {text}
    </Button>
  )
  return (
    <>
      <DropdownButton
        className={style.dropDown}
        clickableComponent={
          <Button color="primary" title={title} loading={requesting}>
            {icon && <Icon type={icon} mr={8} />} {text}
          </Button>
        }
        align={"left"}
      >
        <div className={style.exportOptions}>
          <button
            onClick={() => {
              _exportPage(1);
            }}
            disabled={requesting}
          >
            PDF
          </button>
          <button
            onClick={() => {
              _exportPage(2);
            }}
            disabled={requesting}
          >
            EXCEL
          </button>
        </div>
      </DropdownButton>
    </>
  );
};

export default DataTableHeaderExportButton;
