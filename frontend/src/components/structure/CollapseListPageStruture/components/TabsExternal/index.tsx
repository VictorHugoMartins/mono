import { options } from "@fullcalendar/core/preact";
import React, { useEffect, useState } from "react";
import Tabs from "~/components/ui/Tabs";
import { SelectOptionsType } from "~/types/global/SelectObjectType";

interface TabsExternalProps {
  initialHeaderTab?: number;
  onChangePathValue: (value: number) => void;
  onTabChange: (param: number, index: number) => void;
  tabsList: SelectOptionsType;
}

const TabsExternal: React.FC<TabsExternalProps> = ({
  initialHeaderTab,
  onChangePathValue,
  onTabChange,
  tabsList,
}) => {
  const [_tabActive, setTabActive] = useState(initialHeaderTab??options[0].value);

  function _changePath(list: SelectOptionsType, index?: number) {
    let paramIndex =
      index ||
      (initialHeaderTab
        ? list.findIndex((tab) => Number(tab.value) === initialHeaderTab)
        : 0);

    setTabActive(paramIndex);
    onChangePathValue(Number(list[paramIndex || 0]?.value));
  }

  useEffect(() => {
    if (initialHeaderTab >= 0 && tabsList?.length > 0)
      _changeTabActive(initialHeaderTab);
  }, [initialHeaderTab, tabsList]);

  function _changeTabActive(param: number) {
    let paramIndex = tabsList.findIndex((tab) => Number(tab.value) === param);

    _changePath(tabsList, paramIndex);
    onTabChange(param, paramIndex);
  }

  return (
    <Tabs
      active={_tabActive}
      setActive={(i, value) => _changeTabActive(Number(value.value))}
      tabsData={tabsList}
      headerType
      horizontalScroll
      styleType="2"
    />
  );
};

export default TabsExternal;
