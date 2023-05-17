import React, { useEffect, useState } from "react";

import DataTableHeaderButton from "~/components/ui/DataTable/DataTableHeader/DataTableHeaderButton";
import DataTableHeaderExportButton from "~/components/ui/DataTable/DataTableHeader/DataTableHeaderExportButton";
import { DropdownButton, DropdownLinkOption } from "~/components/ui/Dropdown";

import { RoadMapHeaderProps } from "./roadMapHeader.interface";

import style from "./roadMapHeader.module.scss";

import ChildrenWithProps from "~/utils/ChildrenWithProps/ChildrenWithProps";
import { Grid } from "~/components/ui/Layout/Grid";

const RoadMapHeader: React.FC<
  RoadMapHeaderProps
> = ({
  createButtonText,
  createPath,
  exportButtonText,
  exportPath,
  headerButtons,
  headerRender,
  reloadList,
  setList,
  activTab,
  startDate,
  endDate,
  setDate
}) => {
    // console.log(endDate.split('T')[0], startDate.split('T')[0])
    const [state, setState] = useState({
      startDate: startDate,
      endDate: endDate,
    });
    const _refreshList = async (data: any) => {
      setDate({
        enddate: new Date(data.endDate),
        startdate: new Date(data.startDate)
      })
      return null;
    }
    return (
      <>
        <Grid container align="flex-end" spacingResponsive={{ sm: "g", md: "g", lg: "xg", xl: "xg" }}>
          {
            activTab === 1 ? (
              <>
                {/* <Form externalSubmit={_refreshList} initialData={state}>
                  <div  className={style.dataTableHeaderCalendar}>
                    <div className={style.containerInputHeaderCalendar}>
                      <DateInputForm name="startDate" type="date" label="Data Inicial" />
                    </div>
                    <div className={style.containerInputHeaderCalendar}>
                      <DateInputForm
                        name="endDate"
                        type="date"
                        label="Data Final"
                        max={state.endDate}
                      />
                    </div>
                    <div className={style.containerInputHeaderCalendar}>
                      <SubmitButton color="primary" text="Filtrar" />
                    </div>
                  </div>
                </Form> */}
              </>
            ) : (
              <>
                {
                  headerRender ? (
                    <Grid md={12} >
                      {
                        ChildrenWithProps(headerRender, {
                          reloadList: reloadList,
                          setList: setList,
                        })
                      }
                    </Grid>
                  ) : (
                    <Grid md={3}>
                      <></>
                    </Grid>
                  )}
                {headerButtons && (
                  headerButtons?.map((item, index) => (
                    <Grid md={3} key={"grid" + index}>
                      <DataTableHeaderButton
                        key={`table-header-${index}`}
                        text={item.text}
                        icon={item.icon}
                        href={item.href}
                      />
                    </Grid>
                  ))
                )}
                {!headerButtons && !headerRender && (
                  <Grid md={3}>
                    <></>
                  </Grid>
                )}

                {createPath && (
                  <Grid md={3}>
                    {Array.isArray(createPath) ? (
                      <DropdownButton
                        className={style.dropDown}
                        clickableComponent={
                          <DataTableHeaderButton
                            text={createButtonText || "Adicionar"}
                            icon={"FaBars"}
                          />
                        }
                        align="left"
                      >
                        {createPath.map((item, index) => (
                          <>
                            {item.value && (
                              <DropdownLinkOption
                                key={`linkOption-${index}`}
                                href={item.value}
                                text={item.label}
                              />
                            )}
                            {item.component}
                          </>
                        ))}
                      </DropdownButton>
                    ) : (
                      <DataTableHeaderButton
                        text={createButtonText || "Adicionar"}
                        icon={"FaPlus"}
                        href={createPath}
                      />
                    )}
                  </Grid>
                )}
                {!createPath && !headerButtons && !headerRender && (
                  <Grid md={3}>
                    <></>
                  </Grid>
                )}
                <Grid md={2}>
                  {exportPath && (
                    <DataTableHeaderExportButton
                      text={exportButtonText || "Exportar"}
                      icon={"FaFileExport"}
                      exportPath={exportPath}
                    />
                  )}
                </Grid>
              </>
            )
          }
        </Grid >
      </>
    );
  };

export default RoadMapHeader;
