import React, { useEffect, useState } from "react";
import style from "../DataTableRender/dataTableRender.module.scss";

//Import components
import Card from "../../Card";
import DataTable from "../DataTable";
import DataTableHeader from "../DataTableHeader";
import { Grid } from "../../Layout/Grid";
import DataTableModalRemove from "../DataTableModal/DataTableModalRemove";
import DataTableModalDetail from "../DataTableModal/DataTableModalDetail";
import DataTableButton from "../DataTableButton/DataTableButton";
import PopupLoading from "../../Loading/PopupLoading/PopupLoading";
import Tabs from "../../Tabs";

//Import config
import { CONSTANTS_MESSAGES_APIERROR } from "~/config/messages";

//Import services
import listService from "~/services/list.service";

//Import utils
import ChildrenWithProps from "~/utils/ChildrenWithProps/ChildrenWithProps";
import RedirectTo from "~/utils/Redirect/Redirect";
import Toast from "~/utils/Toast/Toast";

//Import types
import { DataTableTabsRenderType } from "~/types/global/DataTableTabsRenderType";

import { DataTableTabsRenderProps } from "./dataTableTabsRender.interface";
import { Modal } from "../../Modal/Modal";

const DataTableTabsRender: React.FC<DataTableTabsRenderProps> = ({
  buttons,
  createButtonText,
  extraColumns,
  headerButtons,
  headerRender,
  padding = "g",
  param,
  details,
  modalPostEditLabel,
  modalPostLabel,
  editPath,
  editPathQuery,
  exportPath,
  editDisable,
  exportButtonText,
  createPath,
  getListPath,
  getListisPost,
  removeAPIPath,
  removeCard,
  hideCard,
  externalData,
  externalGetList,
  initialTab,
  initialTabIsValue,
  tabStyle = "2",
  resettable,
  onTabChange,
  customizedBodyColumns,
  expander,
  children,
  editComponent,
  noOptions,
  hideSearch,
  hideButtons,
  tableTitle,
  level,
  rowClassName,
  externalFiltersValue,
  footerTableComponent,
  afterHeaderRender,
}) => {
  const [_tabsData, setTabsData] = useState<DataTableTabsRenderType>(null);
  const [_tabActive, SetTabActive] = useState(initialTab ?? 0);
  const [_searching, setSearching] = useState(true);

  useEffect(() => {
    if (initialTab >= 0 && !initialTabIsValue) SetTabActive(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!externalData && getListPath) _getList();
    else if (externalData) setTabsData(externalData);
  }, [getListPath]);

  useEffect(() => {
    if (externalData) {
      setTabsData(externalData);
    }
  }, [externalData]);

  async function _getList() {
    setSearching(true);
    try {
      if (externalGetList) {
        externalGetList();
      } else {
        let response = getListisPost
          ? await listService.getGroupedListPost(getListPath)
          : await listService.getGroupedList(getListPath);

        if (response.success) _setList(response.object);
        else {
          _setList(null);
          Toast.error(response.message || CONSTANTS_MESSAGES_APIERROR);
        }
      }
    } finally {
      setSearching(false);
    }
  }

  function _onTabChange(index: number, value?: string | number) {
    SetTabActive(index);
    if (onTabChange) onTabChange(index, value?.toString());
  }

  function _handleListTabChange(list: DataTableTabsRenderType) {
    if (!list && !!initialTab) {
      if (initialTabIsValue) {
        let paramIndex = list.findIndex(
          (tab) => Number(tab.tabValue) === initialTab
        );
        if (paramIndex >= 0) _onTabChange(paramIndex);
        else _onTabChange(0);
      } else {
        if (list.length > initialTab) {
          _onTabChange(initialTab, list[initialTab].tabValue);
        } else _onTabChange(0, list[0].tabValue);
      }
    } else {
      _onTabChange(0);
    }
  }

  async function _setList(list: DataTableTabsRenderType) {
    if (list) {
      _handleListTabChange(list);
      setTabsData(list);
    } else {
      setTabsData(null);
      Toast.error(CONSTANTS_MESSAGES_APIERROR);
    }
  }

  function _editValidation(rowData: any) {
    if (typeof editDisable === "string")
      return !!editPath && !rowData[editDisable];
    else if (typeof editDisable === "boolean")
      return !!editPath && !editDisable;
    else return !!editPath;
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

  function _dataTableButtons(rowData: any) {
    return (
      <div className={style.dataTableRenderButtonsColumn}>
        {ChildrenWithProps(buttons, { rowData, getList: _getList })}
        {_editValidation(rowData) && editComponent ? (
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
          _editValidation(rowData) && (
            <div>
              <DataTableButton
                icon="FaPen"
                onClick={() =>
                  RedirectTo(
                    `${editPath}/${rowData[param]}${editPathQuery ? `?${editPathQuery}` : ""
                    }`
                  )
                }
                title={modalPostEditLabel ?? "Editar"}
              />
            </div>
          )
        )}
        {details && (
          <DataTableModalDetail
            data={rowData}
            columns={_tabsData[_tabActive]?.data.columns}
          />
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
  if (resettable && _searching) return <PopupLoading show={true} />;
  return (
    <>
      <PopupLoading show={!_tabsData || _searching} />
      {!hideCard && _tabsData && (
        <>
          {tabStyle !== "1" && (
            <Tabs
              active={_tabActive}
              setActive={(i, v) => {
                _onTabChange(i, v.value);
              }}
              tabsData={_tabsData.map((item) => {
                return { label: item.tabName, value: item.tabValue };
              })}
              horizontalScroll
              styleType="2"
              headerType
            />
          )}

          {
            <Grid container spacing={"g"} padding={padding}>
              {(createPath ||
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
            </Grid>
          }
        </>
      )}

      {afterHeaderRender}

      {_tabsData && (
        <Grid container spacing={padding || "g"} padding={padding || "zero"}>
          <Grid md={12}>
            <div>
              <Card
                padding={removeCard ? "zero" : "g"}
                removeBoxShadow={removeCard}
                hideCard={hideCard}
              >
                {tabStyle === "1" && (
                  <Tabs
                    active={_tabActive}
                    setActive={(i, v) => {
                      _onTabChange(i, v.value);
                    }}
                    tabsData={_tabsData.map((item) => {
                      return { label: item.tabName, value: item.tabValue };
                    })}
                    horizontalScroll
                    styleType={tabStyle}
                  />
                )}
                <DataTable
                  columns={_tabsData[_tabActive]?.data.columns}
                  rows={_tabsData[_tabActive]?.data.rows}
                  buttons={_dataTableButtons}
                  extraColumns={extraColumns}
                  paginator
                  postLabel={modalPostLabel}
                  customizedBodyColumns={_dataTableCustomizedColumns}
                  expander={expander}
                  editComponent={editComponent}
                  resume={_tabsData[_tabActive]}
                  refreshList={_getList}
                  hideSearch={hideSearch}
                  rowClassName={rowClassName}
                  hideButtons={hideButtons}
                  externalFiltersValue={externalFiltersValue}
                  tableTitle={tableTitle}
                  level={level}
                  children={children}
                />
                {ChildrenWithProps(footerTableComponent, { _getList })}
              </Card>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default DataTableTabsRender;
