import React from "react";
import HiddenInputForm from "../FormInputs/HiddenInputForm";
import { useHookFormContext } from "./HookForm/HookForm";

interface HideInputProps {
  children?: React.ReactNode;
  defaultValue?: DefaultValueHide;
  inputName: string;
  inputValue?: string | number;
  validation?: "empty" | "noEmpty" | "include" | "exclude";
  externalValidation?: string | number;
}

type DefaultValueHide = {
  name: string;
  value: any;
};

const HideInput: React.FC<HideInputProps> = ({
  children,
  defaultValue,
  externalValidation,
  validation,
  inputName,
  inputValue,
}) => {
  const { listen } = useHookFormContext();

  function _switchValidation(): boolean {
    if (externalValidation) {
      return listen[inputName]?.toString() === externalValidation?.toString();
    }
    if (validation === "empty" || validation === "noEmpty") {
      let valid = !!listen[inputName];

      if (validation === "noEmpty") return valid;
      else return !valid;
    }

    if (validation === "include" || validation === "exclude") {
      let valid = listen[inputName]?.includes(inputValue);

      if (validation === "include") return valid;
      else return !valid;
    }
    return true;
  }

  return (
    <>
      {_switchValidation() ? (
        <>{children}</>
      ) : (
        <>
          {defaultValue && (
            <HiddenInputForm
              name={defaultValue.name}
              value={defaultValue.value}
            />
          )}
        </>
      )}
    </>
  );
};

export default HideInput;
