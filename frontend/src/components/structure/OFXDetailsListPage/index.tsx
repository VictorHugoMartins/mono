import { ModalClassEditOFX } from "~/components/local/OFXListModals/ModalClassEditOFX";
import { ModalManualTransactionForm } from "~/components/local/OFXListModals/ModalManualTransactionForm";
import { SelectOptionsType } from "~/types/global/SelectObjectType";

interface Props {
  classificationsEntry?: SelectOptionsType;
  classificationsExit?: SelectOptionsType;
  getList: () => Promise<void>;
  ofxId: string;
  rowData?: any;
}

export function OFXDetailsListButtons({
  classificationsEntry,
  classificationsExit,
  getList,
  rowData,
  ofxId,
}: Props) {
  return (
    <>
      {rowData["isManual"] && (
        <ModalManualTransactionForm
          getList={getList}
          ofxId={ofxId}
          transactionId={rowData["id"]}
        />
      )}
      <ModalClassEditOFX
        classificationsEntry={classificationsEntry}
        classificationsExit={classificationsExit}
        getList={getList}
        rowData={rowData}
      />
    </>
  );
}
