import React from "react";
import style from "./fixedHeader.module.scss";

//Import components
import { DataTableTabsRenderProps } from "~/components/ui/DataTable/DataTableTabsRender/dataTableTabsRender.interface";
import Tabs from "~/components/ui/Tabs";
import { Grid } from "~/components/ui/Layout/Grid";
import DataTableHeader from "~/components/ui/DataTable/DataTableHeader";
import TableSearchInput from "~/components/ui/DataTable/PrimeDataTable/SearchInput";

// Import types
import { DataTableTabsRenderType } from "~/types/global/DataTableTabsRenderType";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";

interface FixedComponentsStructureProps extends DataTableTabsRenderProps {
  filters1?: any;
  setFilters1?: React.Dispatch<any>;
  externalSetExpandedRows?: React.Dispatch<any>;
  startDate?: string;
  endDate?: string;
}

//Nome do arquivo está errado "DataTableTabsAux" ??
//Arquivo dentro da pasta de componentes privados so TicketsPageStructure porem é importado no ListExternalTabPageStructure ??
export const PreContentRender: React.FC<FixedComponentsStructureProps> = ({
  filters1,
  setFilters1,
  externalSetExpandedRows
}) => {
  return (
    <TableSearchInput
      filters1={filters1}
      setExpandedRows={externalSetExpandedRows}
      setFilters1={setFilters1}
    />
  );
};

interface FixedHeaderRenderProps extends FixedComponentsStructureProps,
  Omit<DataTableTabsRenderProps, "externalGetList"> {
  tabsData?: DataTableTabsRenderType;
  tabActive?: number;
  SetTabActive?: React.Dispatch<React.SetStateAction<number>>;
  externalSetList?: any;
  externalGetList?: (() => Promise<void>) | (() => Promise<void>);
  startDate?: string;
  endDate?: string;
}

export const FixedHeaderRender: React.FC<FixedHeaderRenderProps> = ({
  createButtonText,
  headerButtons,
  headerRender,
  padding = "g",
  exportPath,
  exportButtonText,
  createPath,
  tabStyle = "2",
  editComponent,
  noOptions,
  externalTabRender,
  tabsData,
  tabActive,
  onTabChange,
  SetTabActive,
  externalGetList,
  externalSetList,
  startDate,
  endDate
}) => {
  return (
    <>
      {!tabsData ? <PopupLoading show={true} /> : (
        <>
          {externalTabRender}

          {tabStyle === "2" && (
            <Tabs
              active={tabActive}
              setActive={(i) => {
                onTabChange(i);
              }}
              tabsData={tabsData.map((item, index) => {
                return { label: item.tabName, value: index }; ///Gambiarra ??
              })}
              horizontalScroll
              styleType="2"
              headerType
            />)
          }

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
                      reloadList={externalGetList}
                      setList={externalSetList}
                      noOptions={noOptions}
                      createComponent={editComponent}
                      startDate={startDate}
                      endDate={endDate}
                    />
                  </Grid>
                )}
            </Grid>
          }

          {/* Uso de style para estilização simples, fugindo do padrão do projeto ?? */}
          <div className={style.internalTabs}>
            {tabsData && tabStyle === "1" && (
              <Tabs
                active={tabActive}
                setActive={(i, value) => {
                  SetTabActive(i);
                  if (onTabChange) onTabChange(i);
                }}
                tabsData={tabsData.map((item, index) => {
                  return { label: item.tabName, value: index };
                })}
                horizontalScroll
                styleType="1"
              />
            )}
          </div>
        </>
      )}
    </>
  );
};