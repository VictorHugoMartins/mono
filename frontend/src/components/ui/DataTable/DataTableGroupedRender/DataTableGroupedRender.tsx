import React, { useEffect, useState } from "react";

import { CONSTANTS_MESSAGES_APIERROR } from "~/config/messages";

import DataTableTabsRender from "../DataTableTabsRender/DataTableTabsRender";
import PopupLoading from "../../Loading/PopupLoading/PopupLoading";

import { DataTableRenderProps } from "../DataTableRender/dataTableRender.interface";

import listService from "~/services/list.service";

import Toast from "~/utils/Toast/Toast";

import { DataTableGroupedType } from "~/types/global/DataTableGroupedType";
import DataTableRender from "../DataTableRender/DataTableRender";

const DataTableGroupedRender: React.FC<DataTableRenderProps> = ({
  getListPath,
  ...rest
}) => {
  const [_list, setList] = useState<DataTableGroupedType>(null);

  useEffect(() => {
    _getList();
  }, []);

  async function _getList() {
    let response = await listService.getGenericList(getListPath);

    if (response.success) {
      setList(response.object);
    } else {
      setList(null);
      Toast.error(response.message || CONSTANTS_MESSAGES_APIERROR);
    }
  }

  if (!_list) return <PopupLoading show={true} />;
  if (_list.isGrouped === true && !!_list.dataTable)
    return (
      <DataTableTabsRender
        externalData={_list.dataTable}
        createPath={rest.createPath}
        editPath={rest.editPath}
        exportPath={rest.exportPath}
        param={rest.param}
        removeAPIPath={rest.removeAPIPath}
        details={rest.details}
        editPathQuery={rest.editPathQuery}
        buttons={rest.buttons}
        externalGetList={_getList}
      />
    );
  if (_list.isGrouped === false && !!_list.dataTable)
    return (
      <DataTableRender
        externalData={_list.dataTable}
        externalGetList={_getList}
        {...rest}
      />
    );
};

export default DataTableGroupedRender;
