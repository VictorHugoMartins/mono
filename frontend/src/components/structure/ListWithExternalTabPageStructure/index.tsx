import React, { ReactNode, useEffect, useState } from "react";

import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import { SelectObjectType } from "~/types/global/SelectObjectType";
import TabsExternal from "../CollapseListPageStruture/components/TabsExternal";
import ListPageStructure from "../ListPageStructure";
import formService from "~/services/form.service";
import { DataTableRowClassNameOptions } from "primereact/datatable";

interface ListWithExternalTabPageStructureProps {
  buttons?: React.ReactNode;
  createPath?: string;
  details: boolean;
  editPath?: string;
  exportPath?: string;
  externalTabParam?: string;
  headerRender: React.ReactNode;
  internalTabParam?: string;
  getListPath: string;
  param: string;
  onTabChange?: (external: string, internal: string) => void;
  optionsPath: string;
  removeAPIPath?: string;
  footerComponent?: ReactNode;
  rowClassName?(data: any, options: DataTableRowClassNameOptions): string | object;
  updateFunction?:{
    updateFunction: () => void;
  }
  setUpdateTabsFunction?: React.Dispatch<
    React.SetStateAction<{
      updateFunction: () => void;
    }>
  >;
}

const ListWithExternalTabPageStructure: React.FC<
  ListWithExternalTabPageStructureProps
> = ({
  buttons,
  createPath,
  details,
  editPath,
  exportPath,
  externalTabParam,
  headerRender,
  internalTabParam,
  footerComponent,
  getListPath,
  param,
  removeAPIPath,
  onTabChange,
  setUpdateTabsFunction,
  optionsPath,
  rowClassName,
  updateFunction
}) => {
  const [externalTab, setExternalTab] = useState<string>(externalTabParam);
  const [internalTab, setInternalTab] = useState<string>(internalTabParam);
  const [options, setOptions] = useState<SelectObjectType[]>([]);
  const [loading, setLoading] = useState(true);

  const _getOptions = async () => {
    const response = await formService.getSelectOptions(optionsPath);

    if (response) {
      setOptions(response);
      if (response.length > 0 && !externalTabParam)
        _tabsChange("", response[0].value, true);
    }
    setLoading(false);
  };

  useEffect(() => {
    _getOptions();
    if (setUpdateTabsFunction) {
      setUpdateTabsFunction({
        updateFunction: _getOptions,
      });
    }
  }, []);

  const _tabsChange = (
    internalTabValue,
    externalTabValue,
    isExternal = false
  ) => {
    if (isExternal) {
      if (externalTabValue) {
        setExternalTab(externalTabValue);
        if (onTabChange) onTabChange(externalTabValue, internalTab);
      }
    } else {
      if (internalTabValue) {
        setInternalTab(internalTabValue);
        if (onTabChange) onTabChange(externalTab, internalTabValue);
      }
    }
  };

  return (
    <>
      <PopupLoading maxWidth="lg" show={loading} />
      <TabsExternal
        tabsList={options}
        initialHeaderTab={Number(externalTab)}
        onTabChange={(param, value) => {
          _tabsChange("", param?.toString(), true);
        }}
        onChangePathValue={(value) => {}}
      />

      <ListPageStructure
        key={options.length}
        buttons={buttons}
        createPath={createPath}
        details={details}
        editPath={editPath}
        exportPath={exportPath}
        headerRender={headerRender}
        initialTab={internalTabParam ? Number(internalTabParam) : null}
        initialTabIsValue
        onTabChange={(index, value) => {
          console.log("TT: ", value);
          _tabsChange(value, "");
        }}
        getListPath={getListPath}
        getListisPost
        param={param}
        rowClassName={rowClassName}
        removeAPIPath={removeAPIPath}
        showTabs
        tabStyle="1"
        footerComponent={footerComponent}
      />
    </>
  );
};

export default ListWithExternalTabPageStructure;
