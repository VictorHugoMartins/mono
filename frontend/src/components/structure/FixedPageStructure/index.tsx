import React, { useEffect, useState } from "react";
import style from "./fixedPageStructure.module.scss";

//Import components
import { DataTableTabsRenderProps } from "~/components/ui/DataTable/DataTableTabsRender/dataTableTabsRender.interface";
import { Modal } from "~/components/ui/Modal/Modal";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import DataTableModalDetail from "~/components/ui/DataTable/DataTableModal/DataTableModalDetail";
import DataTableModalRemove from "~/components/ui/DataTable/DataTableModal/DataTableModalRemove";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import { Grid } from "~/components/ui/Layout/Grid";
import DataTable from "~/components/ui/DataTable/DataTable";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

//Import config
import { CONSTANTS_MESSAGES_APIERROR } from "~/config/messages";

//Import services
import listService from "~/services/list.service";

//Import utils
import ChildrenWithProps from "~/utils/ChildrenWithProps/ChildrenWithProps";
import RedirectTo from "~/utils/Redirect/Redirect";
import Toast from "~/utils/Toast/Toast";

// Import types
import { DataTableTabsRenderType } from "~/types/global/DataTableTabsRenderType";
import {
  FixedHeaderRender,
  PreContentRender,
} from "~/components/structure/FixedPageStructure/FixedHeader";

interface FixedPageStructureProps extends DataTableTabsRenderProps {
  allowEdit?: boolean;
  cardTop?: boolean;
  collapseAllButton?: boolean;
  startDate?: string;
  endDate?: string;
}

const FixedPageStructure: React.FC<FixedPageStructureProps> = ({
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
  externalData,
  externalGetList,
  initialTab,
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
  externalTabRender,
  cardTop,
  title,
  collapseAllButton,
  allowEdit,
  startDate,
  endDate
}) => {
  const [_tabsData, setTabsData] = useState<DataTableTabsRenderType>(null);
  const [_tabActive, SetTabActive] = useState(initialTab ?? 0);
  const [_searching, setSearching] = useState(true);

  useEffect(() => {
    if (initialTab >= 0) SetTabActive(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!initialTab && _tabsData && onTabChange) {
      onTabChange(Number(_tabsData[0]?.tabValue));
    }
  }, [initialTab, _tabsData]);

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

  function _onTabChange(i: number) {
    SetTabActive(i);
    if (_tabsData && onTabChange) onTabChange(Number(_tabsData[i]?.tabValue));
  }

  async function _setList(list: DataTableTabsRenderType) {
    if (list) {
      if (!_tabsData && !!initialTab) {
        let _initialTab = initialTab
          ? list.findIndex((tab) => tab.tabValue === initialTab.toString())
          : 0;

        if (list.length > _initialTab) {
          _onTabChange(_initialTab);
        } else {
          _onTabChange(0);
        }
      } else {
        _onTabChange(0);
      }
      setTabsData(list);
    } else {
      setTabsData(null);
      Toast.error(CONSTANTS_MESSAGES_APIERROR);
    }
  }

  function _editValidation(rowData: any) {
    if (allowEdit) return true;
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
                    `${editPath}/${rowData[param]}${
                      editPathQuery ? `?${editPathQuery}` : ""
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

  const [filters1, setFilters1] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);

  let preContentRender = (
    <PreContentRender
      filters1={filters1}
      setFilters1={setFilters1}
      externalSetExpandedRows={setExpandedRows}
    />
  );

  let localHeaderRender = (
    <FixedHeaderRender
      createButtonText={createButtonText}
      headerButtons={headerButtons}
      headerRender={headerRender}
      padding={padding}
      exportPath={exportPath}
      exportButtonText={exportButtonText}
      createPath={createPath}
      tabStyle={tabStyle}
      editComponent={editComponent}
      noOptions={noOptions}
      externalTabRender={externalTabRender}
      tabsData={_tabsData}
      tabActive={_tabActive}
      onTabChange={_onTabChange}
      SetTabActive={SetTabActive}
      externalGetList={_getList}
      externalSetList={_setList}
      startDate={startDate}
      endDate={endDate}
    />
  );

  if (resettable && _searching) return <PopupLoading show={true} />;
  return (
    <>
      <PrivatePageStructure
        title={title}
        headerRender={localHeaderRender}
        preContentRender={preContentRender}
        noPadding
        fixedHeader
        cardTop={cardTop}
      >
        {!_tabsData ? (
          <PopupLoading show={true} />
        ) : (
          <Grid container spacing={padding || "g"} padding={padding || "zero"}>
            <Grid md={12}>
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
                hideButtons={hideButtons}
                externalFiltersValue={filters1}
                tableTitle={tableTitle}
                level={level}
                children={children}
                colapseAllButton={collapseAllButton}
                allowEdit={allowEdit}
                externalExpandedRows={expandedRows}
              />
            </Grid>
          </Grid>
        )}
      </PrivatePageStructure>
    </>
  );
};

export default FixedPageStructure;
