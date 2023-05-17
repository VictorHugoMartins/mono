import React, { useState } from "react";

import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import Button from "~/components/ui/Button/Button";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import { Grid } from "~/components/ui/Layout/Grid";
import { Modal } from "~/components/ui/Modal/Modal";

import { API_USER } from "~/config/apiRoutes/user";

import privateroute from "~/routes/private.route";

import accountService from "~/services/account.service";

import Toast from "~/utils/Toast/Toast";

interface ResendEmailButtonProps {
  rowData?: any;
}

interface ModalResendEmailProps {
  handleClose?: () => void;
}

const UserList: React.FC = () => {
  function ResendEmailButton({ rowData }: ResendEmailButtonProps) {
    function ModalResendEmail({ handleClose }: ModalResendEmailProps) {
      const [loading, setLoading] = useState(false)
      const _sendEmail = async () => {
        setLoading(true);
        let response = await accountService.resendEmailConfirmation({
          email: rowData.email,
        });
        if (response.success) {
          Toast.success(response.message);
          handleClose();
        } else Toast.error(response.message);
        setLoading(false);
      };

      return (
        <Grid container spacing={"xg"}>
          <Grid xs={6} md={6}>
            <Button loading={loading} color="primary" text="Sim" onClick={_sendEmail} />
          </Grid>
          <Grid xs={6} md={6}>
            <Button color="danger" text="Não" onClick={handleClose} />
          </Grid>
        </Grid>
      );
    }

    return (
      <Modal
        title="Reenviar email de confirmação?"
        openButton={
          <DataTableButton icon="FaTelegramPlane" title="Reenviar Email" />
        }
      >
        <ModalResendEmail />
      </Modal>
    );
  }

  return (
    <PrivatePageStructure title="Lista de Usuarios" noPadding>
      <ListPageStructure
        param="id"
        createPath="/adm/usuarios/adicionar"
        editPath="/adm/usuarios/editar"
        exportPath={API_USER.EXPORTLIST()}
        removeAPIPath="/User/Delete"
        getListPath={API_USER.GETALLGROUPEDBYROLE()}
        buttons={<ResendEmailButton />}
        showTabs
        details
      />
    </PrivatePageStructure>
  );
};

export default privateroute(UserList);
