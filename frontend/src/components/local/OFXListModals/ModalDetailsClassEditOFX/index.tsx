import React, { useEffect, useState } from "react";

import Button from "~/components/ui/Button/Button";
import Form from "~/components/ui/Form/Form";
import SubmitButton from "~/components/ui/Form/SubmitButton/SubmitButton";
import HiddenInputForm from "~/components/ui/FormInputs/HiddenInputForm";
import SearchSelectForm from "~/components/ui/FormInputs/SearchSelectForm";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import { Grid } from "~/components/ui/Layout/Grid";
import Typography from "~/components/ui/Typography/Typography";

import { API_OFX } from "~/config/apiRoutes/ofx";

import { SelectOptionsType } from "~/types/global/SelectObjectType";

import style from "./ModalDetailsClassEditOFX.module.scss";

interface Props {
  handleClose?: () => void;
  transactionId?: string | number;
  classificationId?: string | number;
  classificationDropDownList: SelectOptionsType;
  getList: () => Promise<void>;
}

export const ModalDetailsClassEditOfx: React.FC<Props> = ({
  handleClose,
  classificationId,
  classificationDropDownList,
  transactionId,
  getList,
}) => {
  const [option, setOption] = useState<SelectOptionsType>(
    classificationDropDownList
  );

  useEffect(() => {
    setOption(classificationDropDownList);
  }, [classificationDropDownList]);

  return (
    <>
      <Typography component="h5">Editar Classificação</Typography>
      <Form
        postUrl={API_OFX.UPDATEOFXTRANSACTIONCLASSIFY()}
        initialData={{
          transactionId: transactionId,
          classificationId: classificationId,
        }}
        onSuccess={(e) => {
          getList();
          handleClose();
          e.handleSubmiting(false);
        }}
      >
        <Grid container padding="pp">
          <HiddenInputForm name="transactionId" />
          <Grid md={12} >
            <SearchSelectForm name="classificationId" options={option}  />
          </Grid>
        </Grid>
        <Flexbox
          flexDirection="row"
          margin={{ top: "p", right: "g", left: "g", bottom: "pp" }}
        >
          <div className={style.buttonsArea}>
            <SubmitButton color="primary" text="Salvar" />
            <Button
              type="button"
              color="danger"
              text={"Fechar"}
              onClick={handleClose}
            />
          </div>
        </Flexbox>
      </Form>
    </>
  );
};
