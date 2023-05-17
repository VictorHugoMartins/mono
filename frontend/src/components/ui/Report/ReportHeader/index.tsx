import React, { useEffect, useState } from "react";

import Form from "../../Form/Form";
import { FormExternalResponseType } from "../../Form/form.interface";
import SubmitButton from "../../Form/SubmitButton/SubmitButton";
import DateInputForm from "../../FormInputs/DateInputForm";
import SelectDropdownForm from "../../FormInputs/SelectDropdownForm";
import SelectForm from "../../FormInputs/SelectForm";
import TextInputForm from "../../FormInputs/TextInputForm";
import { Grid } from "../../Layout/Grid";
import FormButton from "../../Form/FormButton";

import {
  ReportFiltersType,
  ReportFilterType,
  ReportSelectsType,
  ReportSelectType,
} from "~/types/global/ReportType";

interface ReportHeaderProps {
  setDropDownFilters?: React.Dispatch<React.SetStateAction<PropsExport>>;
  inputs: ReportFiltersType;
  dropdownsValues?: ReportSelectsType;
  submit: (data: any) => Promise<FormExternalResponseType>;
  clearFilter?: () => void;
}

export interface PropsExport {
  dropdownsvalues: {
    name: string;
    values: string[];
  };
}
const ReportHeader: React.FC<ReportHeaderProps> = ({
  inputs,
  dropdownsValues,
  submit,
  setDropDownFilters,
  clearFilter,
}) => {
  const [_filterInputs, setFilterInputs] = useState<ReportFiltersType>(inputs);
  const [_filterDropdownValues, setFilterDropdownValues] =
    useState<ReportSelectsType>(dropdownsValues);

  const [_filteredInputs, setFilteredInputs] = useState<PropsExport>({
    dropdownsvalues: {
      name: "",
      values: [],
    },
  });

  useEffect(() => {
    setFilterInputs(inputs);
  }, [inputs]);

  useEffect(() => {
    setDropDownFilters(_filteredInputs);
  }, [_filteredInputs]);

  useEffect(() => {
    setFilterDropdownValues(dropdownsValues);
  }, [dropdownsValues]);

  return (
    <>
      <Form externalSubmit={submit}>
        <Grid container align="flex-end" spacing={"xg"}>
          {_filterInputs?.map((item, index) => (
            <Grid md={3} key={`filter-${index}`}>
              <ReportHeaderInput input={item} />
            </Grid>
          ))}

          {_filterDropdownValues?.map((item) => (
            <Grid md={3} key={`filter-${item.label}`}>
              <ReportHeaderDropdown
                dropdown={item}
                setFilteredInputs={setFilteredInputs}
              />
            </Grid>
          ))}

          {(_filterInputs?.length > 0 || _filterDropdownValues?.length > 0) && (
            <Grid md={3}>
              <SubmitButton color="primary" text={"Filtrar"} type="submit" />
            </Grid>
          )}
          {_filterInputs?.length > 0 && (
            <Grid md={3}>
              <FormButton
                color="primary"
                text={"Limpar"}
                onClick={(resetForm) => {
                  resetForm();
                  if (clearFilter) clearFilter();
                }}
              />
            </Grid>
          )}
        </Grid>
      </Form>
    </>
  );
};

interface ReportHeaderInputProps {
  input: ReportFilterType;
}

const ReportHeaderInput: React.FC<ReportHeaderInputProps> = ({ input }) => {
  const SwitchInput = () => {
    switch (input.dataType) {
      case "date":
        return (
          <DateInputForm label={input.label} name={input.label} type={"date"} />
        );
      case "int":
        return (
          <TextInputForm label={input.label} name={input.label} type="number" />
        );
      case "string":
        return (
          <TextInputForm label={input.label} name={input.label} type="text" />
        );
      case "int[]":
      case "string[]":
        return (
          <SelectForm label={input.label} name={input.label} options={[]} />
        );
    }
  };

  return <SwitchInput />;
};

interface ReportHeaderDropdownProps {
  dropdown: ReportSelectType;
  setFilteredInputs: React.Dispatch<React.SetStateAction<PropsExport>>;
}

export const ReportHeaderDropdown: React.FC<ReportHeaderDropdownProps> = ({
  dropdown,
  setFilteredInputs,
}) => {
  const [_value, setValue] = useState(["-1"]);
  return (
    <SelectDropdownForm
      label={dropdown.label}
      name={`${dropdown.label}dropdown`}
      options={dropdown.content}
      value={_value}
      onValueChange={(filter) => {
        filter.includes("-1")
          ? _value.includes("-1")
            ? filter.splice(filter.indexOf("-1"), 1)
            : ["-1"]
          : filter;
        setFilteredInputs({
          dropdownsvalues: {
            name: `${dropdown.label}dropdown`,
            values: filter,
          },
        });
        setValue(filter.includes("-1") ? ["-1"] : filter);
      }}
    />
  );
};

export default ReportHeader;
