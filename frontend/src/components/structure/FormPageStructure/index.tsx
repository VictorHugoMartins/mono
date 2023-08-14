import React from "react";

import style from "./formPageStructure.module.scss";

import FormRender from "../../../components/ui/Form/FormRender/FormRender";
import Button from "../../../components/ui/Button/Button";
import RedirectTo from "../../../utils/Redirect/Redirect";
import SubmitButton from "../../../components/ui/Form/SubmitButton/SubmitButton";
import { Grid } from "../../../components/ui/Layout/Grid";
import PageHead from "../../../components/ui/PageHead";
import HeadTags from "../../../components/ui/Navigation/HeadTags/HeadTags";
import { FormEventType } from "../../../types/global/FormEventType";
import { GenericObjectType } from "../../../types/global/GenericObjectType";
import { OnFailureFormEventType } from "../../../components/ui/Form/form.interface";
import { GridSize } from "../../../components/ui/Layout/Grid/grid.interface";
import { ObjectResponse } from "../../../types/global/ObjectResponse";
import { InputRenderType } from "~/types/global/InputRenderType";

export interface FormPageStructureProps {
  buildPath: string;
  buildObject?: InputRenderType[];
  buttonSubmitText: string;
  buttonCancelText?: string;
  preparePath?: string;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onSuccess?: (event?: FormEventType, handleClose?: () => void, returnUrl?: string) => void;
  onFailure?: OnFailureFormEventType;
  returnPath?: string;
  submitPath: string;
  title?: string;
  hiddenInputs?: GenericObjectType;
  subtitleComponent?: React.ReactNode;
  gridStructure?: GridSize[];
  handleClose?: () => void;
  externalInitalData?: {}
  setObjectReturn?: React.Dispatch<React.SetStateAction<ObjectResponse>>,
  isMessageApi?: boolean;
}

const FormPageStructure: React.FC<FormPageStructureProps> = ({
  buildPath,
  buildObject,
  buttonSubmitText,
  buttonCancelText,
  preparePath,
  onCancel,
  onSuccess,
  onFailure,
  returnPath,
  submitPath,
  title,
  hiddenInputs,
  subtitleComponent,
  gridStructure,
  handleClose,
  externalInitalData,
  setObjectReturn,
  isMessageApi,
}) => {
  return (
    <div className={style.formPageStructure}>
      {title && <HeadTags title={title} />}
      {returnPath && title && <PageHead returnUrl={returnPath} title={title} />}

      {subtitleComponent || <></>}

      <FormRender
        setObjectReturn={setObjectReturn}
        preparePath={preparePath}
        submitPath={submitPath}
        buildPath={buildPath}
        buildObject={buildObject}
        initialData={!preparePath ? hiddenInputs : ""}
        onSuccess={(e) => onSuccess(e, handleClose, returnPath)}
        onFailure={onFailure}
        externalInitalData={externalInitalData}
        isMessageApi={isMessageApi}
      // gridStructure={gridStructure}
      >
        {buttonCancelText && (returnPath || onCancel) && (
          <Grid xs={12} md={6}>
            <Button
              color="danger"
              text={buttonCancelText}
              type="button"
              onClick={(e) => {
                if (onCancel) {
                  onCancel(e);
                } else {
                  RedirectTo(returnPath);
                }
              }}
            />
          </Grid>
        )}
        <Grid xs={12} md={!(buttonCancelText && (returnPath || onCancel)) ? 12 : 6}>
          <SubmitButton color="primary" text={buttonSubmitText} type="submit" />
        </Grid>
      </FormRender>
    </div>
  );
};

export default FormPageStructure;
