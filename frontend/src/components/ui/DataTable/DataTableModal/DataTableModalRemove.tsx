import React, { useState } from "react";

import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";
import { Modal } from "../../Modal/Modal";
import Typography from "../../Typography/Typography";

import style from "./dataTableModal.module.scss";

import listService from "~/services/list.service";
import Toast from "~/utils/Toast/Toast";
import DataTableButton from "../DataTableButton/DataTableButton";

interface DataTableModalRemoveProps {
  getList?: () => void;
  param: string;
  path: string;
  value: number | string;
}

interface ModalButtonsProps {
  error: string;
  submit: (handleClose: React.MouseEventHandler<HTMLButtonElement>) => void;
  handleClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const DataTableModalRemove: React.FC<DataTableModalRemoveProps> = ({
  getList,
  param,
  path,
  value,
}) => {
  const [error, setError] = useState<string>("");

  async function _submit(handleClose) {
    setError("");
    let response = await listService.itemDelete(path, param, value);
    if (response.success) {
      if (getList) getList();
      Toast.success("Removido com sucesso.");
      handleClose();
    } else {
      Toast.error(response.message);
      setError(response.message);
    }
  }

  return (
    <Modal
      title="Você deseja remover esse item?"
      openButton={<DataTableButton icon="FaRegTrashAlt" title="Remover" />}
    >
      <ModalRemoveButtons submit={_submit} error={error} />
    </Modal>
  );
};

export function ModalRemoveButtons({
  handleClose,
  submit,
  error,
}: ModalButtonsProps) {
  return (
    <div className={style.dataTableModal}>
      <div className={style.buttonsArea}>
        <Button color="danger" text="Não" onClick={handleClose} />
        <Button
          color="primary"
          text="Sim"
          onClick={() => submit(handleClose)}
        />
      </div>
      {error && (
        <div className={style.errorArea}>
          <Typography component="p" color="danger">
            {error}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default DataTableModalRemove;
