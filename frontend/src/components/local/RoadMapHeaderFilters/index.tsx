import React, { useLayoutEffect, useState } from "react";
import { GanttDataType } from "~/types/global/GanttTypes";

import Form from "~/components/ui/Form/Form";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import SelectDropdownForm from "~/components/ui/FormInputs/SelectDropdownForm";
import TextInputForm from "~/components/ui/FormInputs/TextInputForm";
import { Grid } from "~/components/ui/Layout/Grid";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import { API_GANTT } from "~/config/apiRoutes/gantt";
import ganttService from "~/services/gantt.service";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectObjectType } from "~/types/global/SelectObjectType";

interface RoadMapDateHeaderFiltersProps {
  reloadList?: () => Promise<void>;
  setList?: (data: APIResponseType<GanttDataType>) => Promise<void>;
  startdate?: string;
  enddate?: string;
  externalParams?: string;
  getList: ((path: string, data?: any) => Promise<APIResponseType<any>>) | ((path: string, data?: any) => Promise<GanttDataType | APIResponseType<GanttDataType>>);
  forKanban?: boolean;
  path?: string;
}

type OptionsUserForm = {
  projects: SelectObjectType[];
  users: SelectObjectType[];
  managementId: SelectObjectType[];
  countItems: string;
};

const RoadMapDateHeaderFilters: React.FC<RoadMapDateHeaderFiltersProps> = ({
  setList,
  getList,
  enddate,
  startdate,
  path,
  forKanban
}) => {
  const [state, setState] = useState({
    projects: [],
    users: [],
    managementId: [],
    countItems: "50",
  });

  const [_options, setOptions] = useState<OptionsUserForm>({
    projects: [],
    users: [],
    managementId: [],
    countItems: "50",
  });

  async function _refreshList(data: any) {
    let response = await getList(path || API_GANTT.GETGANTTPROJECTANDTASKS(), data) as APIResponseType<GanttDataType>;
    setList(response);
    setState({
      projects: data.projects,
      users: data.users,
      managementId: data.managementId,
      countItems: data.countItems,
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
      setOptions({ ..._options, managementId: response.object, countItems: _options.countItems });
    } else {
      setOptions({ ..._options, managementId: [], users: [], projects: [], countItems: _options.countItems });
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
          {/* <Grid md={4}>
            <DateInputForm name="startDate" type="date" label="Data Inicial" />
          </Grid>
          <Grid md={4}>
            <DateInputForm
              name="endDate"
              type="date"
              label="Data Final"
              max={enddate}
            />
          </Grid> */}
          {!forKanban &&
            <Grid md={2}>
              {forKanban ?
                <></>
                // <SelectForm
                //   name="managementId"
                //   label="Gerências"
                //   options={_options.managementId}
                // />
                :
                <SelectDropdownForm
                  name="managementId"
                  label="Gerências"
                  options={_options.managementId}
                />
              }
            </Grid>
          }
          <Grid md={2}>
            <SelectDropdownForm
              name="projects"
              label="Projetos"
              listenId="managementId"
              listenGetWithBody="/Project/GetToSelectObject"
            />
          </Grid>
          <Grid md={2}>
            <SelectDropdownForm
              name="users"
              label="Usuários"
              listenId={"projects"}
              listenGetWithBody="/User/GetAllBySelect"
            />
          </Grid>
          {forKanban &&
            <Grid md={2}>
              <TextInputForm
                label={"Qtd. de items por status"}
                name={"countItems"}
                type="number"
              />
            </Grid>
          }
          <Grid md={2}>
            <SubmitButton color="primary" text="Filtrar" />
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default RoadMapDateHeaderFilters;