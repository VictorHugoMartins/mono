import React from 'react';
import Typography from '../Typography/Typography';
import { useFormContext } from './Form';

interface ErrorFormProps {
  errorSubmit?: string,
}

const ErrorForm: React.FC<ErrorFormProps> = () => {
  const { errorSubmit } = useFormContext();

  return (
    <Typography component='p' color='danger'>{errorSubmit}</Typography>
  );
}

export default ErrorForm;