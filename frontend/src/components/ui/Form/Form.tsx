import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import formService from "~/services/form.service";
import { FormErrorsType } from "~/types/global/FormErrorsType";
import { BuildFormErrorMessage } from "~/utils/BuildFormErrorMessage";
import Toast from "~/utils/Toast/Toast";
import { FormContextType, FormInterface } from "./form.interface";
import HookForm from "./HookForm/HookForm";

const FormContext = createContext({} as FormContextType);

export const useFormContext = () => useContext(FormContext);

const Form: React.FC<FormInterface> = ({
  children,
  postUrl,
  getUrl,
  onSuccess,
  onFailure,
  externalSubmit,
  initialData,
  validation,
  externalInitalData,
  isMessageApi,
  setObjectReturn,
  addInputs
}) => {
  const [errorSubmit, setErrorSubmit] = useState<string>("");
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [_initialData, setInitialData] = useState(null);

  useLayoutEffect(() => {
    if (externalInitalData) {
      setInitialData(externalInitalData);
    } else {
      if (initialData) {
        setInitialData(initialData);
      } else {
        if (getUrl) _prepareForm();
      }
    }
  }, []);
  useEffect(() => {
    // console.log('o initial mudou', _initialData)
  }, [_initialData]);
  useEffect(() => {
    if (externalInitalData) {
      setInitialData(externalInitalData);
    } else {
      if (initialData) setInitialData(initialData);
    }
  }, [initialData]);
  async function _prepareForm() {
    let response = await formService.prepare(getUrl);

    setInitialData(response);
  }

  const handleErrorSubmit = (value: string) => {
    setErrorSubmit(value);
  };

  const handleSubmiting = (value: boolean) => {
    setSubmiting(value);
  };

  const onSubmit = (data) => {
    handleSubmiting(true);
    handleErrorSubmit("");
    if (postUrl) _internalSubmit(data);
    else if (externalSubmit) _externalSubmit(data);
    else {
      Toast.error(
        "Ocorreu um erro inesperado, por favor tente novamente em instantes."
      );
      handleSubmiting(false);
    }
    handleSubmiting(false);
  };

  async function _submitError(message: string, errors?: FormErrorsType) {
    handleSubmiting(false);
    if (errors) {
      handleErrorSubmit("Alguns erros encontrados, revise os dados inseridos.");
      Toast.error(BuildFormErrorMessage(errors));
    } else {
      handleErrorSubmit(message);
      Toast.error(message);
    }
  }

  async function _externalSubmit(data: any) {
    let response = await externalSubmit(data);
    if (response) {
      _submitError(response.message, response.errors);
    } else {
      if (onSuccess) onSuccess({ handleSubmiting });
      else handleSubmiting(false);
    }
  }

  async function _internalSubmit(data: any) {
    let response = await formService.submit(postUrl, data);
    if (!response.success) {
      if (isMessageApi) {
        Toast.error(response.message);
      }
      if (onFailure) {
        onFailure(response, data);
        handleSubmiting(false);
      } else _submitError(response.message, response.errors);
    } else {
      if (isMessageApi) {
        Toast.success(response.message);
      }
      if (setObjectReturn) {
        setObjectReturn({
          response: response.object,
        });
      }
      if (onSuccess) onSuccess({ handleSubmiting });
      else handleSubmiting(false);
    }
  }

  return (
    <FormContext.Provider value={{ errorSubmit, submiting }}>
      <HookForm
        onSubmit={onSubmit}
        initialData={_initialData}
        validation={validation}
        addInputs={addInputs}
      >
        {children}
      </HookForm>
    </FormContext.Provider>
  );
};

export default Form;
