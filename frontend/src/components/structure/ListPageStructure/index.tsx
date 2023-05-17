import { DataTableRowClassNameOptions, DataTableRowExpansionTemplate } from "primereact/datatable";
import React, { ReactNode } from "react";

//Import components
import DataTableRender from "~/components/ui/DataTable/DataTableRender/DataTableRender";
import { DataTableRenderProps } from "~/components/ui/DataTable/DataTableRender/dataTableRender.interface";
import DataTableTabsRender from "~/components/ui/DataTable/DataTableTabsRender/DataTableTabsRender";
import { GenericComponentType } from "~/types/global/GenericComponentType";

export interface ListPageStructureProps extends DataTableRenderProps {
  initialTab?: number;
  initialTabIsValue?: boolean;
  onTabChange?: (index: number, value?: string) => void;
  title?: string;
  allowEdit?: boolean;
  returnPath?: string;
  exportPath?: string;
  showTabs?: boolean;
  modalPostLabel?: string;
  modalPostEditLabel?: string;
  tabStyle?: "1" | "2";
  children?(
    data: any,
    options: DataTableRowExpansionTemplate,
    allowEdit?: boolean
  ): React.ReactNode;
  postApiPath?: string;
  footerComponent?: ReactNode;
  rowClassName?(data: any, options: DataTableRowClassNameOptions): string | object;
  afterHeaderRender?: GenericComponentType;
}

const ListPageStructure: React.FC<ListPageStructureProps> = ({
  initialTab,
  initialTabIsValue,
  onTabChange,
  title,
  showTabs,
  allowEdit,
  returnPath,
  modalPostLabel,
  modalPostEditLabel,
  tabStyle,
  rowClassName,
  padding = "xg",
  footerComponent,
  ...rest
}) => {
  return (
    <div>
      {!showTabs ? (
        <DataTableRender
          modalPostEditLabel={modalPostEditLabel}
          modalPostLabel={modalPostLabel}
          padding={padding}
          allowEdit={allowEdit}
          footerComponent={footerComponent}
          rowClassName={rowClassName}
          {...rest}
        />
      ) : (
        <DataTableTabsRender
          initialTab={initialTab}
          initialTabIsValue={initialTabIsValue}
          onTabChange={onTabChange}
          modalPostLabel={modalPostLabel}
          modalPostEditLabel={modalPostEditLabel}
          createPath={rest.createPath}
          editPath={rest.editPath}
          exportPath={rest.exportPath}
          param={rest.param}
          removeAPIPath={rest.removeAPIPath}
          details={rest.details}
          editPathQuery={rest.editPathQuery}
          editDisable={rest.editDisable}
          buttons={rest.buttons}
          footerComponent={footerComponent}
          createButtonText={rest.createButtonText}
          extraColumns={rest.extraColumns}
          getListPath={rest.getListPath}
          getListisPost={rest.getListisPost}
          headerButtons={rest.headerButtons}
          headerRender={rest.headerRender}
          responsive={rest.responsive}
          removeCard={rest.removeCard}
          hideCard={rest.hideCard}
          footerTableComponent={footerComponent}
          rowClassName={rowClassName}
          tabStyle={tabStyle}
          customizedBodyColumns={rest.customizedBodyColumns}
          expander={rest.expander}
          editComponent={rest.editComponent}
          children={rest.children}
          noOptions={rest.noOptions}
          hideSearch={rest.hideSearch}
          hideButtons={rest.hideButtons}
          externalFiltersValue={rest.externalFiltersValue}
          tableTitle={rest.tableTitle}
          padding={padding}
          level={rest.level}
          allowEdit={allowEdit}
          afterHeaderRender={rest.afterHeaderRender}
        />
      )}
    </div>
  );
};

export default ListPageStructure;
