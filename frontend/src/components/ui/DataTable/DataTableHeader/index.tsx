import React from "react";

import DataTableHeaderButton from "~/components/ui/DataTable/DataTableHeader/DataTableHeaderButton";
import DataTableHeaderExportButton from "~/components/ui/DataTable/DataTableHeader/DataTableHeaderExportButton";
import { DropdownButton, DropdownLinkOption } from "~/components/ui/Dropdown";
import { Grid } from "../../Layout/Grid";

import {
  DataTableHeaderProps,
  DataTableHeaderTabProps,
} from "./dataTableHeader.interface";

import style from "./dataTableHeader.module.scss";

import ChildrenWithProps from "~/utils/ChildrenWithProps/ChildrenWithProps";
import { Modal } from "../../Modal/Modal";

const DataTableHeader: React.FC<
  DataTableHeaderProps | DataTableHeaderTabProps
> = ({
  createButtonText,
  createPath,
  createComponent,
  exportButtonText,
  exportPath,
  headerButtons,
  headerRender,
  reloadList,
  setList,
  noOptions
}) => {
    return (
      <Grid container align="flex-end" spacingResponsive={{ sm: "g", md: "g", lg: "xg", xl: "xg" }}>
        {!createPath&& !headerButtons && !createComponent && exportPath &&headerRender?
          <>
            <Grid md={9}>
              <>
                {headerRender}
              </>
            </Grid>
            <Grid md={3}>
              <DataTableHeaderExportButton
                text={exportButtonText || "Exportar"}
                icon={"FaFileExport"}
                exportPath={exportPath}
                noOptions={noOptions}
              />
            </Grid>
          </> :
          <>
            {headerRender ? (
              <Grid md={6}>
                {ChildrenWithProps(headerRender, {
                  reloadList: reloadList,
                  setList: setList,
                })}
              </Grid>
            ) : (
              <Grid md={3}>
                <></>
              </Grid>
            )}
            {headerButtons && (
              headerButtons?.map((item, index) => (
                <Grid md={3}>
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
            {createComponent && exportPath ?
              <Grid md={3}>
                <Modal
                  title={createButtonText || "Adicionar"}
                  fixed
                  openButton={
                    <DataTableHeaderButton
                      text={createButtonText || "Adicionar"}
                      icon={"FaPlus"}
                    />
                  }
                  onClose={reloadList}
                >
                  {ChildrenWithProps(createComponent, {})}
                </Modal>
              </Grid>
              : createPath && (
                <Grid md={3}>
                  {Array.isArray(createPath) ? (
                    <DropdownButton
                      className={style.dropDown}
                      clickableComponent={
                        <DataTableHeaderButton
                          text={createButtonText || "Adicionar"}
                          icon={"FaPlus"}
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
            <Grid md={3}>
              {exportPath && (
                <>
                <DataTableHeaderExportButton
                  text={exportButtonText || "Exportar"}
                  icon={"FaFileExport"}
                  exportPath={exportPath}
                  noOptions={noOptions}
                />
                </>
              )}
            </Grid>
          </>
        }
      </Grid>
    );
  };

export default DataTableHeader;
