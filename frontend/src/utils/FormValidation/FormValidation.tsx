import * as yup from "yup";

type FormValidationResponse = {
  sucess: boolean;
  data: {};
  errors: {};
};

export async function formValidation(data: any) {
  let response: FormValidationResponse = {
    sucess: false,
    data: {},
    errors: {},
  };

  try {
    let schema: yup.ObjectSchema<any> = createObjValidation(data);
    let formData = createObjFormData(data);

    await schema.validate(formData, {
      abortEarly: false,
    });

    response.sucess = true;
    response.data = formData;
    return response;
  } catch (error) {
    const validationErrors = {};
    if (error instanceof yup.ValidationError) {
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });

      response.errors = validationErrors;
    }
    return response;
  }
}

function createObjFormData(data: any) {
  let response = {};

  for (var name in data) {
    response[name] = data[name].value;
  }

  return response;
}

function createObjValidation(data: any) {
  let response = {};

  for (var name in data) {
    if (data[name].required) {
      response[name] = yupSelectValidationType(name, data[name].type);
    }
  }

  return yup.object().shape(response);
}

export type YupObjValidationProps = {
  name: string;
  required: boolean;
  type: string;
  label?: string;
  min?: number;
  max?: number;
  confirm?: string;
};

export function createYupObjValidation(data: YupObjValidationProps[]) {
  let response = {};

  data.map((item) => {
    if (item.required) {
      response[item.name] = yupSelectValidationType(
        item.name,
        item.type,
        item.label,
        item.min,
        item.max,
        item.confirm
      );
    }
  });

  return yup.object().shape(response);
}

function yupSelectValidationType(
  name: string,
  type: string,
  label?: string,
  min?: number,
  max?: number,
  confirm?: string
) {
  if (!confirm) {
    switch (type) {
      case "text":
      case "date":
      case "time":
      case "password":
      case "rg":
      case "card":
      case "cep":
      case "cpf":
      case "cnpj":
      case "cpf-cnpj":
      case "phone":
        if (max)
          return yup
            .string()
            .min(
              min,
              `O campo ${label || name} deve ter no minimo ${min} caracteres`
            )
            .max(
              max,
              `O campo ${label || name} deve ter no maximo ${max} caracteres`
            )
            .required(`O campo ${label || name} é obrigatorio.`);
        else
          return yup
            .string()
            .min(
              min,
              `O campo ${label || name} deve ter no minimo ${min} caracteres`
            )
            .required(`O campo ${label || name} é obrigatorio.`);
      case "number":
        if (max)
          return yup
            .number()
            .typeError(`O campo ${label || name} deve ser um número valido.`)
            .min(
              min,
              `O campo ${label || name} deve ter no minimo ${min} caracteres`
            )
            .max(
              max,
              `O campo ${label || name} deve ter no maximo ${max} caracteres`
            )
            .required(`O campo ${label || name} é obrigatorio.`);
        else
          return yup
            .number()
            .typeError(`O campo ${label || name} deve ser um número valido.`)
            .min(
              min,
              `O campo ${label || name} deve ter no minimo ${min} caracteres`
            )
            .required(`O campo ${label || name} é obrigatorio.`);
      case "email":
        return yup
          .string()
          .email(`O campo ${label || name} deve ser um email valido.`)
          .required(`O campo ${label || name} é obrigatorio.`);
      case "radio":
        return yup.string().required(`O campo ${label || name} é obrigatorio.`);
      case "checkbox":
        return yup
          .array()
          .required(`O campo ${label || name} é obrigatorio.`)
          .of(yup.string().required())
          .min(1, `O campo ${label || name} é obrigatorio.`);
      case "select":
        return yup.string().required(`O campo ${label || name} é obrigatorio.`);
    }
  } else {
    return yup
      .string()
      .required(`O campo ${label || name} é obrigatorio.`)
      .oneOf([yup.ref(confirm), null], "Os campos devem ser iguais.");
  }
}
