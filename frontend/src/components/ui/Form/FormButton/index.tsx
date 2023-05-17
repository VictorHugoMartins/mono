import React from "react";
import Button from "../../Button/Button";
import { ButtonProps } from "../../Button/button.interface";
import { useFormContext } from "../Form";
import { useHookFormContext } from "../HookForm/HookForm";

interface SubmitButtonProps extends Omit<ButtonProps, "onClick"> {
  onClick?: (resetForm: () => void) => void;
}

const FormButton: React.FC<SubmitButtonProps> = ({
  onClick,
  type,
  ...rest
}) => {
  // const { submiting } = useFormContext();
  const { resetForm } = useHookFormContext();

  return (
    <Button
      type={type}
      // loading={submiting}
      onClick={() => {
        if (onClick) onClick(resetForm);
      }}
      {...rest}
    />
  );
};

export default FormButton;
