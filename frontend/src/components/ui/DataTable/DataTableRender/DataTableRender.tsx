import React, { useEffect, useState } from "react";

//Import components
import Card from "../../Card";
import DataTable from "../DataTable";
import DataTableModalDetail from "../DataTableModal/DataTableModalDetail";
import DataTableModalRemove from "../DataTableModal/DataTableModalRemove";
import DataTableButton from "../DataTableButton/DataTableButton";
import DataTableHeader from "../DataTableHeader";
import { Grid } from "../../Layout/Grid";
import PopupLoading from "../../Loading/PopupLoading/PopupLoading";

//Import config
import { CONSTANTS_MESSAGES_APIERROR } from "~/config/messages";

//Import utils
import ChildrenWithProps from "~/utils/ChildrenWithProps/ChildrenWithProps";
import RedirectTo from "~/utils/Redirect/Redirect";
import Toast from "~/utils/Toast/Toast";

//Import types
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { DataTableRenderProps } from "./dataTableRender.interface";

//Import services
import listService from "~/services/list.service";

import style from "./dataTableRender.module.scss";
import { Modal } from "../../Modal/Modal";

const DataTableRender: React.FC<DataTableRenderProps> = ({
  buttons,
  createPath,
  createButtonText,
  details,
  allowEdit,
  extraColumns,
  headerButtons,
  headerRender,
  removeAPIPath,
  editPath,
  editComponent,
  editPathQuery,
  editDisable,
  exportPath,
  exportButtonText,
  externalData,
  hideSearch,
  hideButtons,
  level,
  modalPostEditLabel,
  externalGetList,
  padding = "g",
  param,
  getListPath,
  getListisPost,
  responsive,
  removeCard,
  hideCard,
  expander,
  modalPostLabel,
  children,
  rowClassName,
  customizedBodyColumns,
  noOptions,
  tableTitle,
  footerComponent,
  externalFiltersValue
}) => {
  const [_data, setData] = useState<DataTableRenderType>(externalData || null);
  //console.log("DataTableRender",rowClassName);
  useEffect(() => {
    if (!externalData) {
      _getList();
    }
  }, []);

  useEffect(() => {
    if (getListPath) {
      _getList();
    }
  }, [getListPath]);

  useEffect(() => {
    if (externalData) {
      setData(externalData);
    }
  }, [externalData]);

  async function _getList() {
    if (externalGetList) {
      externalGetList();
    } else {
      let response = getListisPost
        ? await listService.getListPost(getListPath)
        : await listService.getList(getListPath);

      if (response.success && response.object) _setList(response.object);
      else {
        _setList(null);
        Toast.error(response.message || CONSTANTS_MESSAGES_APIERROR);
      }
    }
  }

  async function _setList(list: DataTableRenderType) {
    if (list) setData(list);
    else {
      setData(null);
      Toast.error(CONSTANTS_MESSAGES_APIERROR);
    }
  }

  function _tableButtonValidation(
    rowData: any,
    validationProp: string | boolean
  ): boolean {
    if (typeof validationProp === "string") return !rowData[validationProp];
    else return !validationProp;
  }

  function _dataTableButtons(rowData: any) {
    return (
      <div className={style.dataTableRenderButtonsColumn}>
        {ChildrenWithProps(buttons, { rowData, getList: _getList })}
        {_tableButtonValidation(rowData, editDisable) && editComponent ? (
          <div>
            <Modal
              title={modalPostEditLabel ?? "Editar"}
              fixed
              openButton={
                <DataTableButton
                  icon="FaPen"
                  title={modalPostEditLabel ?? "Editar"}
                />
              }
              onClose={_getList}
            >
              {ChildrenWithProps(editComponent, { rowData })}
            </Modal>
          </div>
        ) : (
          _tableButtonValidation(rowData, editDisable) &&
          editPath && (
            <DataTableButton
              icon="FaPen"
              onClick={() =>
                RedirectTo(
                  `${editPath}/${rowData[param]}${editPathQuery ? `?${editPathQuery}` : ""
                  }`
                )
              }
              title="Editar"
            />
          )
        )}
        {details && (
          <DataTableModalDetail data={rowData} columns={_data.columns} />
        )}
        {removeAPIPath && (
          <DataTableModalRemove
            path={removeAPIPath}
            param={"token"}
            value={rowData[param]}
            getList={_getList}
          />
        )}
      </div>
    );
  }

  function _dataTableCustomizedColumns(rowData: any, item: any) {
    return (
      <div className={style.dataTableRenderButtonsColumn}>
        {ChildrenWithProps(customizedBodyColumns, {
          rowData,
          columnKey: item.field,
        })}
      </div>
    );
  }

  // let helpFinderElement = <div id="helpFinderRender"></div>;
  // const [level, setLevel] = useState(0);
  const [_headerBackgroundColor, setHeaderBackgroundColor] = useState("#637C94");
  // useEffect(() => {
  //   // console.log("o level no datatable render", identifyLevel(document.getElementById('helpFinderRender'), 'p-datatable-row-expansion'));
  //   setLevel(identifyLevel(document.getElementById('helpFinderRender'), 'p-datatable-row-expansion'));
  // }, [])

  const headerColors = ["#637C94", "#6EA9C9", "#92C1D9", "#BAD9E8", "#AEBDCC"];

  const aninhedTableStyle = {
    width: "100%",
    borderLeft: "3px solid",
    paddingLeft: 16,
    marginLeft: 32,
    left: 0,
    borderColor: headerColors[0]
  }

  if (!_data) return <PopupLoading show={!_data} />
  return (
    <>
      {/* {helpFinderElement} */}
      <div className={style.dataTable} style={level ? aninhedTableStyle : {}}>
        {_data && (
          <Grid container spacing={"g"} padding={padding}>
            {!hideCard && (createPath ||
              exportPath ||
              headerRender ||
              headerButtons ||
              editComponent) && (
                <Grid md={12}>
                  <DataTableHeader
                    createButtonText={createButtonText}
                    createPath={createPath}
                    exportButtonText={exportButtonText}
                    exportPath={exportPath}
                    headerButtons={headerButtons}
                    headerRender={headerRender}
                    reloadList={_getList}
                    setList={_setList}
                    noOptions={noOptions}
                    createComponent={editComponent}
                  />
                </Grid>
              )}

            <Grid md={12}>
              <Card
                padding={removeCard ? "zero" : "g"}
                removeBoxShadow={removeCard}
                hideCard={hideCard}
              >
                <DataTable
                  columns={_data?.columns}
                  rows={_data?.rows}
                  allowEdit={allowEdit}
                  buttons={_dataTableButtons}
                  extraColumns={extraColumns}
                  responsive={responsive}
                  paginator
                  postLabel={modalPostLabel}
                  editComponent={editComponent}
                  expander={expander}
                  children={children}
                  resume={_data}
                  customizedBodyColumns={_dataTableCustomizedColumns}
                  refreshList={_getList}
                  hideSearch={hideSearch}
                  hideButtons={hideButtons}
                  externalFiltersValue={externalFiltersValue}
                  level={level}
                  tableTitle={tableTitle}
                  rowClassName={rowClassName}
                />
              </Card>
            </Grid>
            {ChildrenWithProps(footerComponent,{_getList})}
          </Grid>
        )}
      </div>
    </>
  );
};

export default DataTableRender;
