import React, { useEffect, useState } from "react";
import Button from "~/components/ui/Button/Button";
import Form from "~/components/ui/Form/Form";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import DateInputForm from "~/components/ui/FormInputs/DateInputForm";
import SelectForm from "~/components/ui/FormInputs/SelectForm";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import GridGroup from "~/components/ui/Layout/GridGroup";
import { useUserContext } from "~/context/global/UserContext";
import managementService from "~/services/management.service";
import prospectService from "~/services/prospect.service";
import { SelectObjectType, SelectOptionsType } from "~/types/global/SelectObjectType";

interface Props {
  initialData: {
    startDate: string;
    endDate: string;
  };
  onReset: () => void;
  onSubmit: (data: any) => void;
}

type OptionsType = {
  organizations: SelectOptionsType;
  sellers: SelectOptionsType;
};

const FilterHeader: React.FC<Props> = ({ initialData, onReset, onSubmit }) => {
  const { user } = useUserContext();
  const [managements, setManagements] = useState<SelectObjectType[]>([]);
  const [managementId,setManagementId] = useState<number|null>(null); 
  const [_options, setOptions] = useState<OptionsType>({
    organizations: [],
    sellers: [],
  });

  useEffect(() => {
    _getManagements()
  }, []);

  useEffect(()=>{
    if(managementId){
      _getOptions(managementId); 
      onSubmit({...initialData,managementId:managementId});
    }
  },[managementId]);

  async function _getOptions(managementId: string|number) {
    let response = await prospectService.prepareSalesFunnel(`${managementId}`);
    if (response) {
      setOptions(response);
    }
  }

  async function _getManagements(){
    let response = await prospectService.getAllGroupedOptions();
    if(response.success){
      setManagements(response.object);
      if(response.object.length>0){
        setManagementId(Number(response.object[0].value));
      }
    }
  }

  async function _refreshList(data: any) {
    let { startDate, endDate, managementId, organizationId, userSellerId } =
      data;
    onSubmit({
      startDate,
      endDate,
      managementId,
      organizationId,
      userSellerId,
    });
    return null;
  }

  return (
    <Form externalSubmit={_refreshList} initialData={{...initialData,managementId:managementId}}>
      <GridGroup width="180px" spacing="xg">
        <div>
          <DateInputForm name="startDate" type="date" label="Data Inicial" />
        </div>
        <div>
          <DateInputForm name="endDate" type="date" label="Data Final" />
        </div>
        <Flexbox flexDirection="column">
          <SelectForm
            name="managementId"
            label="Gerência"
            options={managements}
            onValueChange={(v) => {
              _getOptions(v);
            }}
          />
        </Flexbox>
        <Flexbox flexDirection="column">
          <SelectForm
            name="organizationId"
            label="Organização"
            options={_options.organizations}
          />
        </Flexbox>
        <Flexbox flexDirection="column">
          <SelectForm
            name="userSellerId"
            label="Negociador"
            options={_options.sellers}
          />
        </Flexbox>
        <Flexbox align="flex-end">
          <SubmitButton color="primary" text="Filtrar" />
        </Flexbox>
        <Flexbox align="flex-end">
          <Button color="primary" text="Limpar Filtros" onClick={onReset} />
        </Flexbox>
      </GridGroup>
    </Form>
  );
};

export default FilterHeader;
