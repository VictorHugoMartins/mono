import Button from "~/components/ui/Button/Button";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import Form from "~/components/ui/Form/Form";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import HiddenInputForm from "~/components/ui/FormInputs/HiddenInputForm";
import SelectForm from "~/components/ui/FormInputs/SelectForm";
import { Grid } from "~/components/ui/Layout/Grid";
import { Modal } from "~/components/ui/Modal/Modal";
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import Toast from "~/utils/Toast/Toast";

interface Props {
  ticketId: number;
  statusId: number;
  statusList: SelectOptionsType;
  getList?: () => void;
}

interface ContentProps {
  handleClose?: () => void;
}

export const ModalTicketChangeStatus: React.FC<Props> = ({
  ticketId,
  statusId,
  statusList,
  getList,
}) => {
  function Content({ handleClose }: ContentProps) {
    return (
      <Form
        postUrl="/Ticket/ChangeStatus"
        initialData={{ ticketId, statusId }}
        onSuccess={() => {
          if (getList) getList();
          Toast.success("Status alterado com sucesso!");
          handleClose();
        }}
      >
        <Grid container spacing={"m"}>
          <HiddenInputForm name="ticketId" />
          <Grid xs={8}>
            <SelectForm name="statusId" label="Status" options={statusList} />
          </Grid>
          <Grid container spacing={"m"} xs={8}>
            <Grid xs={8} md={4}>
              <SubmitButton color="primary" text="Salvar" />
            </Grid>
            <Grid xs={8} md={4}>
              <Button
                color="danger"
                type="button"
                text="Cancelar"
                onClick={handleClose}
              />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    );
  }

  return (
    <Modal
      title="Mudar Status"
      openButton={<DataTableButton icon="FaExchangeAlt" title="Mudar Status" />}
    >
      <Content />
    </Modal>
  );
};
