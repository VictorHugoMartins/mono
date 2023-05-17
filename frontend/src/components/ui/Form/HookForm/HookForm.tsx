import React, { createContext, useContext, useEffect } from "react";
import {
  Control,
  Controller,
  FieldValues,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createYupObjValidation,
  YupObjValidationProps,
} from "~/utils/FormValidation/FormValidation";

interface HookFormInterface {
  initialData?: Record<string, any>;
  onSubmit: (data: any) => void;
  validation?: YupObjValidationProps[];
}

interface HookFormContextType {
  register: UseFormRegister<FieldValues>;
  errors: { [x: string]: any };
  resetForm: () => void;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  control: Control<FieldValues, any>;
  listen: { [x: string]: any };
}

const HookFormContext = createContext({} as HookFormContextType);

export const useHookFormContext = () => useContext(HookFormContext);

const HookForm: React.FC<HookFormInterface> = ({
  children,
  onSubmit,
  initialData,
  validation = [],
}) => {
  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createYupObjValidation(validation)),
  });

  const listen = watch();

  useEffect(() => {
    resetForm();
  }, [initialData]);

  function resetForm() {
    reset(initialData);
  }

  async function _submit(data) {
    onSubmit(data);

    // let validate = await formValidation(data);

    // if (validate.sucess) onSubmit(validate.data);
    // else formRef.current.setErrors(validate.errors);
  }

  return (
    <HookFormContext.Provider
      value={{ register, errors, watch, control, resetForm, setValue, listen }}
    >
      <form
        onSubmit={handleSubmit(_submit)}
        style={{ width: "100%" }}
        noValidate
      >
        {children}
      </form>
    </HookFormContext.Provider>
  );
};

export { Controller };
export default HookForm;
