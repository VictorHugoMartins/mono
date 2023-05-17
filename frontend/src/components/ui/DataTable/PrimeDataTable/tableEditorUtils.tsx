import React, { useEffect, useState } from "react";
import {
  DataTableFilterMeta,
} from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";

import { DataTableColumnType } from "~/types/global/DataTableColumnType";
import { TextInput } from "../../Inputs";
import { PrimeDataTableProps } from "./primeDataTable.interface";
import { InputRenderType } from "~/types/global/InputRenderType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { PostRequest } from "~/utils/Requests/Requests";
import Toast from "~/utils/Toast/Toast";
import { BuildFormErrorMessage } from "~/utils/BuildFormErrorMessage";
import Select from "../../Inputs/Select";
import FileInput from "../../Inputs/FileInput/FileInput";

const PrimeDataTable: React.FC<PrimeDataTableProps> = ({
  buttons,
  columns,
  extraColumns,
  paginator,
  onRowClick,
  responsive,
  rows,
  rowsPerPage,
  customizedBodyColumns,
  expander,
  children,
  postLabel,
  editComponent,
  resume,
  refreshList,
}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [tableRows, setTableRows] = useState(rows);
  const [expandedRows, setExpandedRows] = useState(rows);
  const [tableColumns] = useState<DataTableColumnType[]>(columns);
  const [searchFilter, setSearchFilter] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    _handleRows();
  }, [rows]);

  function GetSimplifliedDataForSubmit(data) {
    let _data = {};
    tableColumns.map((item) => {
      if (_itemEditable(item)) _data[item.value] = data[item.value];
    });
    // console.log("o obj simplificado", _data);

    return _data;
  }

  function emptyRow() {
    let _obj = {};
    if (tableColumns)
      tableColumns.map((item) => {
        if (_itemEditable(item)) _obj[item.value] = 0;
      });
    _obj["id"] = -1;

    _obj["projectId"] = 3;
    _obj["description"] = '<p>aa</p>';
    _obj["mainFile"] = {
      file: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
      name: "string",
      disable: true
    };
    _obj["galleryFiles"] = [];
    _obj["priorityId"] = 474;

    return _obj;
  }

  function _handleRows() {
    setTableRows(rows);
  }

  const [addingNewElement, setAddingNewElement] = useState(false);

  function _addEmptyRow() {
    setAddingNewElement(true);
    let _rows = [...rows];
    _rows.push(emptyRow());
    setTableRows(_rows);
  }

  const onRowEditComplete1 = (e) => {
    let _local = [...tableRows];
    let { newData, index } = e;

    // console.log(newData, index);

    _local[index] = newData;
    // console.log("a nova data: ", _local[index]);
    // if (postApiPath) _submitForm(_local[index]);

    // setTableRows(_local);
  }

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    rowData[field] = newValue;
  }

  function _itemEditable(item) {
    if (item.type === null) return false;
    else if (item.editable === false) return false;
    else if (!(item.isVisible && item.type && item.editable)) return false;

    return true;
  }

  function _validateRowEdit(item, options) {
    if (!_itemEditable(item)) return false;
    else if (addingNewElement) return true;
    else if (typeof (options.rowData[item.value]) === "object") {
      if ((item.type === "image") || (item.type === "file")) return true;
      return false;
    }

    return true;
  }

  const cellEditor = (item: any, type: InputRenderType, options: any) => {
    if (type.type === "image" || (type.type === "file"))
      return <FileInput
        value={options.rowData.mainFile}
        name={type.name}
        type={"file"}
        onChange={(e) => options.editorCallback(e)}
      />
    else if (type.type === "select")
      return <Select
        value={options.label}
        defaultValue={options.label}
        onChange={(e) => options.editorCallback(e)}
        options={type.options}
      />

    return <TextInput
      defaultValue={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
      name={type.name}
      type="text"
      required={type.required}
      disabled={type.disabled}
    />
  }

  async function _submitForm(data: any) {
    let _data = GetSimplifliedDataForSubmit(data);
    _data = { ..._data, statusId: parseInt(data.statusStr) }

    let response: APIResponseType<any> = {
      object: {},
      success: false,
      message: "",
      errors: null,
    };

    // const responseApi = await PostRequest<any>(postApiPath, _data);
    // if (responseApi.success) {
    //   response = responseApi;
    //   // window.location.assign(document.URL);
    // }
    // else if (responseApi.errors) {
    //   Toast.error(BuildFormErrorMessage(responseApi.errors));
    // }

    return null;
  }

  return (
    <></>
  );
};

export default PrimeDataTable;


  // async function _getList(event) {
  //   let ind = tableRows.map(item => item.id).indexOf(event.data.id);

  //   if (ind === -1) return;
  //   else if (tableRows[ind].children) return;

  //   let response = false
  //     ? await listService.getListPost(API_TICKETRESPONSE.GETALLBYTICKET('42'))
  //     : await listService.getList(API_TICKETRESPONSE.GETALLBYTICKET('42'));

  //   let _tableRowsWithChildren = [...tableRows];
  //   if (response.success && response.object) {
  //     _tableRowsWithChildren[ind].children = response.object;
  //     setTableRows(_tableRowsWithChildren);
  //   } else {
  //     _tableRowsWithChildren[ind].children = null;
  //     Toast.error(response.message || CONSTANTS_MESSAGES_APIERROR);
  //   }
  // }