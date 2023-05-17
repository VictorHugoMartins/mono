import React, { useLayoutEffect, useState } from "react";
import { GanttDataType } from "~/types/global/GanttTypes";

import Form from "~/components/ui/Form/Form";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import SelectDropdownForm from "~/components/ui/FormInputs/SelectDropdownForm";
import { Grid } from "~/components/ui/Layout/Grid";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import { API_GANTT } from "~/config/apiRoutes/gantt";
import ganttService from "~/services/gantt.service";
import { convertStringArrayToIntArray } from "~/services/kanban.service";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectObjectType } from "~/types/global/SelectObjectType";

interface DashboardHeaderFiltersProps {
  reloadList?: () => Promise<void>;
  setList?: (data: APIResponseType<GanttDataType>) => Promise<void>;
  startdate?: string;
  enddate?: string;
  externalParams?: string;
  getList: ((path: string, data?: any) => Promise<APIResponseType<any>>) | ((path: string, data?: any) => Promise<GanttDataType | APIResponseType<GanttDataType>>);
  path?: string;
  setFiltersData?: any;
}

type OptionsUserForm = {
  projects: SelectObjectType[];
  users: SelectObjectType[];
  managementId: SelectObjectType[];
};

const DashboardHeaderFilters: React.FC<DashboardHeaderFiltersProps> = ({
  setList,
  getList,
  enddate,
  startdate,
  path,
  setFiltersData
}) => {
  const [state, setState] = useState({
    projects: [],
    users: [],
    managementId: [],
  });

  const [_options, setOptions] = useState<OptionsUserForm>({
    projects: [],
    users: [],
    managementId: [],
  });

  async function _refreshList(data: any) {
    let _data = {
      ...data,
      managementId: convertStringArrayToIntArray(data.managementId),
      projects: convertStringArrayToIntArray(data.projects)
    };
    setFiltersData(_data);
    let response = await getList(path || API_GANTT.GETGANTTPROJECTANDTASKSTODASHBOARDASYNC(), _data.projects) as APIResponseType<GanttDataType>;
    setList(response);
    setState({
      projects: data.projects,
      users: data.users,
      managementId: data.managementId,
    });
    return null;
  }

  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    _prepareManagements();
  }, []);

  async function _prepareManagements() {
    let response = await ganttService.prepareManagements();

    if (response.success) {
      setOptions({ ..._options, managementId: response.object });
    } else {
      setOptions({ ..._options, managementId: [], users: [], projects: [] });
    }
    setLoading(false);
  }

  return (
    <>
      <PopupLoading show={loading} />

      <Form
        externalSubmit={_refreshList}
        initialData={state}
      >
        <Grid container spacing="xg" align="flex-end">
          <Grid md={2}>
            <SelectDropdownForm
              name="projects"
              label="Projetos"
              listenId="managementId"
              listenGetWithBody="/Project/GetToSelectObject"
            />
          </Grid>
          <Grid md={2}>
            <SubmitButton color="primary" text="Filtrar" />
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default DashboardHeaderFilters;