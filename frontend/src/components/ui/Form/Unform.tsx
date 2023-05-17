import React, { ReactNode, useRef } from 'react';
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { formValidation } from '~/utils/FormValidation/FormValidation';
import { useFormContext } from './Form';

interface FormInterface {
  children: ReactNode,
  initialData?: Record<string, any>
  onSubmit: (data: any) => void,
}

const Unform: React.FC<FormInterface> = ({ children, onSubmit, ...rest }) => {
  // const { formRef } = useFormContext();
  const formRef = useRef<FormHandles>();

  async function handleSubmit(data) {
    let validate = await formValidation(data);

    if (validate.sucess) onSubmit(validate.data);
    else formRef.current.setErrors(validate.errors);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%" }} {...rest} noValidate>
      {children}
    </Form>
  );
}

export default Unform;