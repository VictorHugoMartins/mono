import React, { useState } from "react";

import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { SwitchInput } from "~/components/ui/Inputs";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import Typography from "~/components/ui/Typography/Typography";

import { API_SWITCHCONFIGURATIONS } from "~/config/apiRoutes/switchConfigurations";
import privateroute from "~/routes/private.route";

import switchconfigurationsService from "~/services/switchconfigurations.service";

import Toast from "~/utils/Toast/Toast";

interface SwitchButtonProps {
  rowData?: any;
}

const SwitchSettingsList: React.FC = () => {
  function SwitchButton({ rowData }: SwitchButtonProps) {
    const [value, setValue] = useState(rowData.value || false);

    const _changeSwitch = async () => {
      let response = await switchconfigurationsService.changeSwitchSettings([
        rowData.token,
      ]);
      if (response.success) {
        Toast.success(`${value ? "Desativado" : "Ativado"} com sucesso.`);
        setValue(!value);
      } else Toast.error(response.message);
    };

    return (
      <Flexbox width={"100%"} flexDirection="column" align="center">
        <Typography component="p">
          {value ? "Ativado" : "Desativado"}
        </Typography>
        <SwitchInput checked={value} onChange={_changeSwitch} />
      </Flexbox>
    );
  }

  return (
    <PrivatePageStructure title="Sistema de Configurações">
      <ListPageStructure
        param="id"
        getListPath={API_SWITCHCONFIGURATIONS.SWITCHSETTINGSLIST()}
        exportPath={API_SWITCHCONFIGURATIONS.EXPORTFILE()}
        buttons={<SwitchButton />}
        createPath="/adm/sistemaconfiguracoes/adicionar"
        editPath="/adm/sistemaconfiguracoes/editar"
        details
        removeAPIPath={API_SWITCHCONFIGURATIONS.DELETE()}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(SwitchSettingsList);
