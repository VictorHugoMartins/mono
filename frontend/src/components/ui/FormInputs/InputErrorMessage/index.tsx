import React from 'react';
import Typography from '../../Typography/Typography';

interface InputErrorMessageProps {
  message?: string,
}

const InputErrorMessage: React.FC<InputErrorMessageProps> = ({ message }) => {
  return (
    <>
      {message && <Typography component='p' color='danger'>{message}</Typography>}
    </>
  );
}

export default InputErrorMessage;