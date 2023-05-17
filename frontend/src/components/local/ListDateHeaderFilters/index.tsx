import React, { useState } from "react";

import Form from "~/components/ui/Form/Form";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import DateInputForm from "~/components/ui/FormInputs/DateInputForm";
import { Grid } from "~/components/ui/Layout/Grid";

import listService from "~/services/list.service";

import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { APIResponseType } from "~/types/global/RequestTypes";

interface ListDateHeaderFiltersProps {
  enddate: string;
  externalParams?: string;
  filterPath?: (startDate?: string, endDate?: string) => string;
  noBody?: boolean;
  onSubmit?: (startdate: string, enddate: string) => void;
  reloadList?: () => Promise<void>;
  setDates?: Function;
  setList?: (list: DataTableRenderType) => Promise<void>;
  startdate: string;
}

const ListDateHeaderFilters: React.FC<ListDateHeaderFiltersProps> = ({
  enddate,
  externalParams,
  filterPath,
  noBody,
  onSubmit,
  setDates,
  setList,
  startdate,
}) => {
  const [state, setState] = useState({
    startDate: startdate,
    endDate: enddate,
  });

  async function _refreshList(data: any) {
    if (onSubmit) {
      onSubmit(data.startDate, data.endDate);
    } else {
      let response = {} as APIResponseType<DataTableRenderType>;
      if (noBody) {
        response = await listService.getList(
          `${filterPath(data.startDate, data.endDate)}${
            externalParams ? externalParams : ""
          }`
        );
      } else {
        response = await listService.getListPost(
          `${filterPath(data.startDate, data.endDate)}${
            externalParams ? externalParams : ""
          }`
        );
      }
      if (!response.success) return { message: response.message };
      setList(response.object);
      setState({ startDate: data.startDate, endDate: data.endDate });
      if (setDates) {
        setDates({ startdate: data.startDate, enddate: data.endDate });
      }
    }
    return null;
  }

  return (
    <Form externalSubmit={_refreshList} initialData={state}>
      <Grid container spacing="xg" align="flex-end">
        <Grid md={4}>
          <DateInputForm name="startDate" type="date" label="Data Inicial" />
        </Grid>
        <Grid md={4}>
          <DateInputForm
            name="endDate"
            type="date"
            label="Data Final"
            max={enddate}
          />
        </Grid>
        <Grid md={4}>
          <SubmitButton color="primary" text="Filtrar" />
        </Grid>
      </Grid>
    </Form>
  );
};

export default ListDateHeaderFilters;
