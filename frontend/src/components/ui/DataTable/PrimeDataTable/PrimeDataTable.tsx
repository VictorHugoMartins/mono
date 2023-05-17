import React, { useEffect, useState } from "react";

// Import external components
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { DataTable } from "primereact/datatable";
import { Column, ColumnSortParams } from "primereact/column";

// Import internal components
import { Modal } from "../../Modal/Modal";
import Typography from "../../Typography/Typography";
import SubmitButton from "../../Form/SubmitButton/SubmitButton";
import { Grid } from "../../Layout/Grid";
import TableSearchInput from "./SearchInput";
import { PriorityResume, StatusResume } from "../AdmTable/CustomColumnsForCrudTable";
import { PrimeDataTablePaginationTemplate } from "./PrimeDataTablePaginationTemplate";

// Import types
import { DataTableColumnType } from "~/types/global/DataTableColumnType";
import { PrimeDataTableProps } from "./primeDataTable.interface";

// Import hooks and utils
import useTheme from "~/hooks/useTheme";
import isInDateFormat from "~/utils/IsInDateFormat";

import styles from "./primeDataTable.module.scss";

const PrimeDataTable: React.FC<PrimeDataTableProps> = ({
  buttons,
  columns,
  extraColumns,
  rowClassName,
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

  hideSearch,
  hideButtons,
  tableTitle,
  level,
  externalFiltersValue,
  externalExpandedRows,
  colapseAllButton,
  allowEdit,
}) => {
  const [filters1, setFilters1] = useState(null);
  const [tableRows, setTableRows] = useState(rows);
  const [expandedRows, setExpandedRows] = useState(
    externalExpandedRows ?? null
  );
  const [tableColumns] = useState<DataTableColumnType[]>(columns);

  useEffect(() => {
    _handleRows();
  }, [rows]);

  function _handleRows() {
    setTableRows(rows);
  }

  function _getGlobalFilters(): string[] {
    let _list = columns?.map((column) =>
      column.value === "users" ? "users.name" : column.value
    );
    return _list;
  }

  function _orderTable(event: ColumnSortParams) {
    let data = [...tableRows];

    data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (event.field === "status") {
        value1 = data1[event.field]["status"];
        value2 = data2[event.field]["status"];
      } else if (event.field === "timeLine") {
        // order by start date
        value1 = data1[event.field] ? data1[event.field]["startDate"] : null;
        value2 = data2[event.field] ? data2[event.field]["startDate"] : null;
      } else if (event.field === "users") {
        // order by users length
        value1 = data1[event.field].length || 0;
        value2 = data2[event.field].length || 0;
      } else if (
        typeof data1[event.field] !== "string" ||
        typeof data1[event.field] !== "string"
      ) {
        return event.order * result;
      }

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (isInDateFormat(value1) && isInDateFormat(value2)) {
        let v1 = value1.split("/").reverse().join();
        let v2 = value2.split("/").reverse().join();
        result = v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
      } else if (isNaN(value1) && isNaN(value2)) {
        result = value1.localeCompare(value2, undefined, { numeric: true });
      } else {
        let v1 = parseFloat(value1);
        let v2 = parseFloat(value2);
        result = v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
      }
      return event.order * result;
    });

    return data;
  }

  const { theme } = useTheme();

  function HandleFooterColumnContent({ item, index }) {
    if (!item.isVisible) return <></>;
    else if (item.label === "Prioridade")
      return resume?.resumPriority ? (
        <PriorityResume resume={resume.resumPriority} />
      ) : (
        <></>
      );
    else if (item.label === "Progresso")
      return resume?.resumStatusSprint ? (
        <StatusResume resume={resume.resumStatusSprint} />
      ) : (
        <></>
      );
    return <></>;
  }

  let _renderEditComponent = level > 0 && editComponent;
  let _renderFooterGroup =
    _renderEditComponent ||
    resume?.resumPriority ||
    resume?.resumStatusSprint ||
    resume?.resumStatusTicket;
  let footerGroup = (
    <ColumnGroup>
      {_renderFooterGroup && (
        <Row>
          {tableColumns &&
            tableColumns?.length > 0 &&
            tableColumns.map((item, index) => {
              if (index === 0)
                return (
                  <Column
                    footer={
                      _renderEditComponent && editComponent ? (
                        <Modal
                          title={postLabel ?? "Adicionar novo elemento"}
                          openButton={
                            <SubmitButton
                              color="primary"
                              text={postLabel ?? "Adicionar novo elemento"}
                            />
                          }
                          fixed
                          onClose={refreshList}
                        >
                          {editComponent}
                        </Modal>
                      ) : (
                        <></>
                      )
                    }
                    colSpan={1}
                    style={{ width: "120px" }}
                  />
                );
              if (!(tableTitle === "Histórias" && item.label === "Nome"))
                return (
                  item.isVisible &&
                  index > 1 && (
                    <Column
                      footer={
                        <HandleFooterColumnContent item={item} index={index} />
                      }
                      colSpan={1}
                      style={{ width: "120px" }}
                    />
                  )
                );
            })}
        </Row>
      )}
    </ColumnGroup>
  );

  const allowExpansion = (rowData: any) => {
    return rowData.quantityResponses > 0;
  };

  const onRowExpand = (event) => {
    // _getList(event);
    // console.log(event.data);
  };

  const onRowCollapse = (event) => {
    // console.log({ severity: 'success', summary: 'row Collapsed', detail: event.data.name, life: 3000 });
  };

  let helpFinderElement = <div id="helpFinder"></div>;
  // const [level, setLevel] = useState(0);
  const [_headerBackgroundColor, setHeaderBackgroundColor] =
    useState("#637C94");
  // useEffect(() => {
  //   // console.log("O level no primedatatble",
  //     identifyLevel(document.getElementById('helpFinder'), 'p-datatable-row-expansion'))
  //   setLevel(identifyLevel(document.getElementById('helpFinder'), 'p-datatable-row-expansion'));
  // }, [])

  useEffect(() => {
    setHeaderBackgroundColor(getHeaderBackgroundColor());
  }, [level]);

  function getHeaderBackgroundColor() {
    let headerColors = ["#637C94", "#6EA9C9", "#92C1D9", "#BAD9E8", "#AEBDCC"];
    return headerColors[level ?? 0];
  }

  const expandAll = () => {
    let _expandedRows = {};

    tableRows.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  function LocalCrudTable({ value }) {
    return (
      <div>
        {colapseAllButton && (
          <Grid container>
            <Grid md={3}>
              <div className={styles.containerSubmitButton}>
                <SubmitButton
                  type="button"
                  color="primary"
                  text="Fechar tudo"
                  onClick={() => collapseAll()}
                  icon="FaLevelDownAlt"
                />
              </div>
            </Grid>
          </Grid>
        )}
        {tableTitle ? (
          <Typography component={"h4"}>{tableTitle}</Typography>
        ) : null}
        {/* <div className="flex flex-wrap justify-content-end gap-2">
          <Button color="primary" icon="FaPlus" text="Expandir tudo" onClick={expandAll} />
          <Button color="primary" icon="FaMinus" text="Esconder tudo" onClick={collapseAll} />
        </div> */}
        <DataTable
          footerColumnGroup={_renderFooterGroup ? footerGroup : undefined}
          value={value}
          paginator={false}
          paginatorTemplate={PrimeDataTablePaginationTemplate}
          filters={externalFiltersValue ?? filters1}
          rows={rowsPerPage || 15}
          onRowClick={onRowClick}
          globalFilterFields={_getGlobalFilters()}
          className={"primeDataTable default"}
          responsiveLayout={responsive || "stack"}
          rowHover={onRowClick ? true : false}
          rowsPerPageOptions={[5, 10, 25, 50]}
          pageLinkSize={4}
          dataKey="id"
          emptyMessage={"Não há dados para exibir"}
          rowClassName={rowClassName}
          rowExpansionTemplate={(rowData) =>
            children(rowData, null, allowEdit) ?? undefined
          }
          expandedRows={expandedRows}
          onRowToggle={(e) => {
            setExpandedRows(e.data);
          }}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          scrollable={true}
          scrollDirection={"both"}
        >
          <Column
            expander={expander}
            headerStyle={{
              backgroundColor: _headerBackgroundColor,
              textAlign: "center",
            }}
            style={{ width: "32px" }}
            frozen
          />

          {tableColumns?.map((item, index) => {
            if (item.isVisible)
              return (
                <Column
                  key={index}
                  field={item.value}
                  header={item.label}
                  headerStyle={{
                    width: "120px",
                    backgroundColor: _headerBackgroundColor,
                    textAlign: "center",
                  }}
                  frozen={item.frozen}
                  sortable
                  style={{ width: "120px" }}
                  sortFunction={(event) => _orderTable(event)}
                  body={
                    customizedBodyColumns && item.bodyType === "customBody"
                      ? customizedBodyColumns
                      : (rowData) =>
                          typeof rowData[item.value] !== "object"
                            ? rowData[item.value]
                            : customizedBodyColumns
                  }
                  bodyClassName={
                    customizedBodyColumns && item.bodyType
                      ? "tabUnstyleds"
                      : undefined
                  }
                  filterField={item.value}
                />
              );
          })}

          {!hideButtons && buttons && (
            <Column
              headerStyle={{
                width: "15%",
                backgroundColor: _headerBackgroundColor,
                textAlign: "center",
              }}
              bodyStyle={{
                width: "15%",
                textAlign: "center",
                overflow: "visible",
              }}
              body={buttons}
            />
          )}

          {extraColumns?.map((item, index) => (
            <Column
              key={`extraColumn-${index}`}
              header={item.header}
              headerStyle={{
                textAlign: "center",
                backgroundColor: _headerBackgroundColor,
                width: `${120 / (tableColumns ? tableColumns.length : 0)}%`,
              }}
              bodyStyle={{
                textAlign: "center",
                overflow: "visible",
                width: "100%",
              }}
              body={item.column}
              style={{
                width: `${120 / (tableColumns ? tableColumns.length : 0)}%`,
              }}
            />
          ))}
        </DataTable>
      </div>
    );
  }

  function LocalDataTable({ value }) {
    return (
      <div>
        {tableTitle ? (
          <Typography component={"h4"}>{tableTitle}</Typography>
        ) : null}
        <DataTable
          value={value}
          paginator={paginator}
          paginatorTemplate={PrimeDataTablePaginationTemplate}
          filters={filters1}
          rows={rowsPerPage || 15}
          onRowClick={onRowClick}
          globalFilterFields={_getGlobalFilters()}
          className={"primeDataTable"}
          responsiveLayout={responsive || "stack"}
          rowHover={onRowClick ? true : false}
          rowsPerPageOptions={[5, 10, 25, 50]}
          pageLinkSize={4}
          dataKey="id"
          rowClassName={rowClassName}
        >
          {tableColumns?.map((item, index) => {
            if (item.isVisible)
              return (
                <Column
                  key={index}
                  field={item.value}
                  header={item.label}
                  headerStyle={{
                    width: `${85 / (tableColumns ? tableColumns.length : 0)}%`,
                    backgroundColor: _headerBackgroundColor,
                    textAlign: "center",
                  }}
                  sortable
                  style={{
                    width: `${85 / (tableColumns ? tableColumns.length : 0)}%`,
                  }}
                  sortFunction={(event) => _orderTable(event)}
                  body={
                    customizedBodyColumns && item.bodyType === "customBody"
                      ? customizedBodyColumns
                      : (rowData) =>
                          typeof rowData[item.value] !== "object"
                            ? rowData[item.value]
                            : customizedBodyColumns
                  }
                  bodyClassName={
                    customizedBodyColumns && item.bodyType
                      ? "tabUnstyleds"
                      : undefined
                  }
                />
              );
          })}

          {extraColumns?.map((item, index) => (
            <Column
              key={`extraColumn-${index}`}
              header={item.header}
              headerStyle={{
                textAlign: "center",
                backgroundColor: _headerBackgroundColor,
              }}
              bodyStyle={{
                textAlign: "center",
                overflow: "visible",
                width: "100%",
              }}
              body={item.column}
            />
          ))}

          {!hideButtons && buttons && (
            <Column
              headerStyle={{
                width: "15%",
                backgroundColor: _headerBackgroundColor,
                textAlign: "center",
              }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              body={buttons}
            />
          )}
        </DataTable>
      </div>
    );
  }

  return (
    <div className={`${styles.dataTable} ${styles[`theme${theme}`]}`}>
      {!hideSearch && !externalFiltersValue && (
        <TableSearchInput
          filters1={filters1}
          setExpandedRows={setExpandedRows}
          setFilters1={setFilters1}
          marginBottom={"xg"}
        />
      )}
      {expander || _renderFooterGroup || level > 0 ? (
        <LocalCrudTable value={tableRows} />
      ) : (
        <LocalDataTable value={tableRows} />
      )}

      {helpFinderElement}
    </div>
  );
};

export default PrimeDataTable;
