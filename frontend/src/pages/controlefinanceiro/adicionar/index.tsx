import { Typography } from "@material-ui/core";
import React, { useState } from "react";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import Button from "~/components/ui/Button/Button";
import { Grid } from "~/components/ui/Layout/Grid";
import { Modal } from "~/components/ui/Modal/Modal";

import { API_OFX } from "~/config/apiRoutes/ofx";
import privateroute from "~/routes/private.route";
import formService from "~/services/form.service";
import { APIResponseType } from "~/types/global/RequestTypes";

import { FormSuccess } from "~/utils/FormSuccess";
import RedirectTo from "~/utils/Redirect/Redirect";
import Toast from "~/utils/Toast/Toast";

const OFXAdd: React.FC = () => {
  const [_data, setData] = useState(null);

  function ConfirmReplacementModal() {
    return (
      <Modal title="Detalhes" openExternal={!!_data} hideOpenButton>
        <Typography component="p">
          Já existe uma OFX cadastrada para esse mês. Deseja sobrescrever?
        </Typography>

        <Grid container spacing={"xg"}>
          <Grid md={4}>
            <Button
              color="danger"
              text={"Cancelar"}
              type="button"
              onClick={(e) => {
                setData(null);
              }}
            />
          </Grid>
          <Grid md={4}>
            <Button color="primary" text="Sobrescrever" onClick={_reSubmit} />
          </Grid>
        </Grid>
      </Modal>
    );
  }

  async function _reSubmit() {
    let response = await formService.submit(API_OFX.SAVE(), {
      ..._data,
      isReplacement: true,
    });
    if (response.success) {
      RedirectTo("/controlefinanceiro/lista");
      Toast.success("Salvo com sucesso!");
    } else {
      Toast.error(response.message);
      setData(null);
    }
  }

  function _handleMonthRepeat(response: APIResponseType<any>, data: any) {
    if (response.message === "Esse mês já contém um OFX cadastrado!") {
      setData(data);
    } else {
      Toast.error(response.message);
    }
  }

  return (
    <PrivatePageStructure
      title="Adicionar OFX"
      returnPath="/controlefinanceiro/lista"
    >
      <FormPageStructure
        buildPath={API_OFX.BUILD()}
        submitPath={API_OFX.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/controlefinanceiro/lista"
        onSuccess={FormSuccess}
        onFailure={_handleMonthRepeat}
      />

      <ConfirmReplacementModal />
    </PrivatePageStructure>
  );
};

export default privateroute(OFXAdd);
