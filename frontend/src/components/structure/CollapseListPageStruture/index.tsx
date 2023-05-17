import React, { useEffect, useState } from "react";

//Import components
import { DataTableTabsRenderProps } from "~/components/ui/DataTable/DataTableTabsRender/dataTableTabsRender.interface";

//Import services
import formService from "~/services/form.service";

//Import types
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { GenericComponentType } from "~/types/global/GenericComponentType";
import { SelectOptionsType } from "~/types/global/SelectObjectType";

//Import utils
import ChildrenWithProps from "~/utils/ChildrenWithProps/ChildrenWithProps";
import TabsExternal from "./components/TabsExternal";
import FixedPageStructure from "../FixedPageStructure";
import DataTable from "~/components/ui/DataTable/DataTable";
import PrivatePageStructure from "../PrivatePageStructure/PrivatePageStructure";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";

export interface CollapseListPageStrutureProps
  extends Omit<DataTableTabsRenderProps, "onExternalTabChange"> {
  externalHeaderRender?: GenericComponentType;
  initialHeaderTab?: number;
  initialBodyTab?: number;
  optionsPath: string;
  onExternalTabChange?: (headerValue: number, bodyValue: number) => void;
  collapseAllButton?: boolean;
  allowEdit?: boolean;
}

export interface HeaderRenderProps {
  reloadList?: () => Promise<void>;
  setList?: (list: DataTableRenderType) => Promise<void>;
}
const CollapseListPageStruture = React.forwardRef<
  HTMLDivElement,
  CollapseListPageStrutureProps
>(
  (
    {
      getListPath,
      externalHeaderRender,
      initialHeaderTab,
      initialBodyTab,
      optionsPath,
      onExternalTabChange,
      modalPostLabel,
      children,
      allowEdit,
      ...rest
    },
    ref
  ) => {
    const [_externalTabActive, setExternalTabActive] =
      useState(initialHeaderTab);
    const [_tableTabActive, setTableTabActive] = useState(initialBodyTab);
    const [_tabsList, setTabsList] = useState<SelectOptionsType>(null);
    const [path, setPath] = useState<string>("");
    const [pathId, setPathId] = useState<string>("");
    const [emptyTable, setEmptyTable] = useState<boolean>();

    useEffect(() => {
      if (optionsPath) getExternalTabs();
    }, [optionsPath, initialHeaderTab]);

    useEffect(() => {
      if (initialHeaderTab >= 0) setExternalTabActive(initialHeaderTab);
    }, [initialHeaderTab]);

    async function getExternalTabs() {
      let response = await formService.getSelectOptions(optionsPath);
      if (response) {
        if (response && Array.isArray(response) && response.length > 0) {
          setTabsList(response);
          let paramIndex = initialHeaderTab
            ? response.findIndex(
                (tab) => Number(tab.value) === initialHeaderTab
              )
            : 0;
          setExternalTabActive(Number(response[paramIndex].value));
          setPath(`${getListPath}${response[paramIndex].value}`);
        } else {
          setPath("");
          setEmptyTable(true);
        }
      } else {
        setPath("");
        setEmptyTable(true);
      }
    }

    function _onChangePath(param: number) {
      setPath(`${getListPath}${param}`);
      setPathId(`${param}`);
    }

    useEffect(() => {
      _onExternalTabChange(_externalTabActive, _tableTabActive);
    }, [_externalTabActive, _tableTabActive]);

    function _onExternalTabChange(headerValue: number, bodyValue: number) {
      if (onExternalTabChange) onExternalTabChange(headerValue, bodyValue);
    }

    function HeaderRender({ reloadList, setList }: HeaderRenderProps) {
      return (
        <>
          {ChildrenWithProps(externalHeaderRender, {
            externalParams: pathId,
            reloadList: reloadList,
            setList: setList,
          })}
        </>
      );
    }

    return (
      <>
        {path !== "" ? (
          <FixedPageStructure
            initialTab={initialBodyTab}
            getListPath={path}
            modalPostLabel={modalPostLabel}
            headerRender={<HeaderRender />}
            resettable={true}
            onTabChange={(v) => {
              setTableTabActive(v);
            }}
            externalTabRender={
              <TabsExternal
                initialHeaderTab={_externalTabActive}
                tabsList={_tabsList}
                onTabChange={(p, n) => {
                  setExternalTabActive(p);
                }}
                onChangePathValue={(v) => {
                  _onChangePath(v);
                }}
              />
            }
            cardTop
            allowEdit={allowEdit}
            {...rest}
          >
            {children}
          </FixedPageStructure>
        ) : (
          <PopupLoading show={path === "" && !emptyTable} />
        )}
        {path === "" && emptyTable && emptyTable === true && (
          <PrivatePageStructure title={rest.title}>
            <DataTable
              buttons={rest.buttons ?? <></>}
              customizedBodyColumns={rest.customizedBodyColumns}
              editComponent={rest.editComponent}
              postLabel={rest.modalPostEditLabel}
              tableTitle={rest.tableTitle}
              columns={[]}
              rows={[]}
            />
          </PrivatePageStructure>
        )}
      </>
    );
  }
);

export default CollapseListPageStruture;
