import Button from "~/components/ui/Button/Button";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import DataTableHeaderButton from "~/components/ui/DataTable/DataTableHeader/DataTableHeaderButton";
import FormRender from "~/components/ui/Form/FormRender/FormRender";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import { Grid } from "~/components/ui/Layout/Grid";
import { Modal } from "~/components/ui/Modal/Modal";

import { API_MANUALTRANSACTION } from "~/config/apiRoutes/manualTransaction";

import Toast from "~/utils/Toast/Toast";

interface Props {
  getList: () => Promise<void>;
  ofxId: string;
  transactionId?: string;
}
interface ModalButtonsProps {
  handleClose?: () => void;
}

export const ModalManualTransactionForm: React.FC<Props> = ({
  getList,
  ofxId,
  transactionId,
}) => {
  function ModalContent({ handleClose }: ModalButtonsProps) {
    return (
      <div>
        <FormRender
          preparePath={
            transactionId ? API_MANUALTRANSACTION.PREPARE(transactionId) : null
          }
          submitPath={API_MANUALTRANSACTION.SAVE()}
          buildPath={API_MANUALTRANSACTION.BUILD()}
          initialData={!transactionId ? { ofxId } : null}
          onSuccess={() => {
            Toast.success("Adicionado com sucesso!");
            getList();
            handleClose();
          }}
        >
          <Grid xs={8} md={4}>
            <Button
              color="danger"
              text="Cancelar"
              type="button"
              onClick={(e) => {
                handleClose();
              }}
            />
          </Grid>
          <Grid xs={8} md={4}>
            <SubmitButton color="primary" text="Salvar" type="submit" />
          </Grid>
        </FormRender>
      </div>
    );
  }

  return (
    <Modal
      title="Adicionar Transação Manual"
      openButton={
        transactionId ? (
          <DataTableButton icon="FaPen" title="Editar Transação" />
        ) : (
          <DataTableHeaderButton text={"Adicionar"} icon={"FaPlus"} />
        )
      }
    >
      <ModalContent />
    </Modal>
  );
};
