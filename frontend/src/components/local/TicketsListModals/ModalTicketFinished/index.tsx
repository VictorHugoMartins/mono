import { useState } from "react";
import Button from "~/components/ui/Button/Button";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import { Grid } from "~/components/ui/Layout/Grid";
import { Modal } from "~/components/ui/Modal/Modal";

import ticketService from "~/services/ticket.service";

import Toast from "~/utils/Toast/Toast";

interface Props {
  ticketId: string;
  finished: boolean;
  getList?: () => void;
  backgroundColor?: string;
}

interface ContentProps {
  handleClose?: () => void;
}

export const ModalTicketFinished: React.FC<Props> = ({
  getList,
  finished,
  ticketId,
  backgroundColor,
}) => {
  const [requesting, setRequesting] = useState(false);

  function Content({ handleClose }: ContentProps) {
    async function _submit() {
      setRequesting(true);
      let response = await ticketService.finishTicket(ticketId);
      if (response.success) {
        Toast.success(
          finished
            ? "Ticket reaberto com sucesso!"
            : "Ticket finalizado com sucesso!"
        );
        getList();
        handleClose();
      } else {
        Toast.error(response.message);
      }
      setRequesting(false);
    }
    return (
      <Grid container spacing={"m"}>
        <Grid xs={12} md={6}>
          <Button
            color="danger"
            type="button"
            text="Não"
            onClick={handleClose}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Button color="primary" text="Sim" onClick={_submit} loading={requesting} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Modal
      title={finished ? "Reabrir Ticket" : "Finalizar Ticket"}
      openButton={
        <DataTableButton
          icon={finished ? "FaLockOpen" : "FaLock"}
          title={finished ? "Reabrir" : "Finalizar"}
          backgroundColor={backgroundColor}
        />
      }
    >
      <Content />
    </Modal>
  );
};
