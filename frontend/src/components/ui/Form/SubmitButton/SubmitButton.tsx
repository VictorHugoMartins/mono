import React from 'react';
import Button from '../../Button/Button';
import { ButtonProps } from '../../Button/button.interface';
import { useFormContext } from '../Form';

interface SubmitButtonProps extends ButtonProps {

}

const SubmitButton: React.FC<SubmitButtonProps> = ({type='submit', ...rest }) => {
  const { submiting } = useFormContext();

  return (
    <Button type={type} loading={submiting} {...rest} />
  );
}

export default SubmitButton;