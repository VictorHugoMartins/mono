import { useEffect } from "react";
import Button from "~/components/ui/Button/Button";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import Form from "~/components/ui/Form/Form";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import HiddenInputForm from "~/components/ui/FormInputs/HiddenInputForm";
import SelectForm from "~/components/ui/FormInputs/SelectForm";
import { Grid } from "~/components/ui/Layout/Grid";
import { Modal } from "~/components/ui/Modal/Modal";
import { useUserContext } from "~/context/global/UserContext";
import ticketService from "~/services/ticket.service";
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import Toast from "~/utils/Toast/Toast";

interface Props {
  ticketId: number;
  responsibleId?: number;
  responsibleList?: SelectOptionsType;
  getList?: () => void;
}

interface ContentProps {
  handleClose?: () => void;
}

export const ModalTicketAssociateTicket: React.FC<Props> = ({
  ticketId,
  responsibleId,
  responsibleList,
  getList,
}) => {
  const { user } = useUserContext();

  function Content({ handleClose }: ContentProps) {
    async function _submitForm(data: any) {
      //// console.log('datas',ticketId, responsibleId,data);
      let obj = { 
        ticketId:ticketId, 
        responsibleId:data.responsibleId
      };
      let response = await ticketService.associateUserToTicket(obj);
      if (response.success) Toast.success(response.message);
      else Toast.error(response.message);
      return null;
    }
    return (
      <Form
        externalSubmit={_submitForm}
        initialData={{ ticketId, responsibleId }}
        onSuccess={() => {
          if (getList) getList();
          handleClose();
        }}
      >
        <Grid container spacing={"m"}>
          <HiddenInputForm name="ticketId" />
          {responsibleList && (
            <Grid xs={12}>
              <SelectForm
                name="responsibleId"
                label="Responsavel"
                options={responsibleList}
              />
            </Grid>
          )}
          <Grid container spacing={"m"} xs={12}>
            <Grid xs={12} md={6}>
              <Button
                color="danger"
                type="button"
                text={responsibleList ? "Cancelar" : "Não"}
                onClick={handleClose}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <SubmitButton
                color="primary"
                text={responsibleList ? "Salvar" : "Sim"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    );
  }

  return (
    <Modal
      title={
        responsibleList
          ? "Associar ticket a Usuario"
          : "Deseja associar este ticket ao seu usuario?"
      }
      openButton={<DataTableButton icon="FaUserAlt" title="Associar" />}
      maxWidth="xs"
    >
      <Content />
    </Modal>
  );
};
