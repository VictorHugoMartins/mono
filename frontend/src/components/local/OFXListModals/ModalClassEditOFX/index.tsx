import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import { Modal } from "~/components/ui/Modal/Modal";
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import { ModalDetailsClassEditOfx } from "../ModalDetailsClassEditOFX";

interface Props {
  rowData?: any;
  classificationsEntry?: SelectOptionsType;
  classificationsExit?: SelectOptionsType;
  getList: () => Promise<void>;
}

export const ModalClassEditOFX: React.FC<Props> = ({
  classificationsEntry,
  classificationsExit,
  rowData,
  getList,
}) => {
  if (!classificationsEntry || !classificationsExit) return <></>;
  return (
    <Modal
      title="Classificação OFX"
      openButton={
        <DataTableButton icon="FaFileDownload" title="Classificação OFX" />
      }
    >
      <ModalDetailsClassEditOfx
        classificationId={rowData?.classificationId}
        classificationDropDownList={
          rowData["isDebit"] ? classificationsExit : classificationsEntry
        }
        transactionId={rowData?.id}
        getList={getList}
      />
    </Modal>
  );
};
