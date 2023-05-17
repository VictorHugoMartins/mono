import { YupObjValidationProps } from "~/utils/FormValidation/FormValidation";

export const UserValidation: YupObjValidationProps[] = [
  {
    name: "name",
    required: true,
    type: "text",
    label: "Nome",
    min: 2,
    max: 252,
  },
  {
    name: "lastName",
    required: true,
    type: "text",
    label: "Sobrenome",
    min: 2,
    max: 252,
  },
  {
    name:"workLoad",
    required:false,
    type: "number",
    label:"Carga Horária",
    min: 1,
    max:2
  },
  {
    name: "email",
    required: true,
    type: "email",
    label: "E-mail",
    min: 2,
    max: 252,
  },
  {
    name: "area",
    required: false,
    type: "text",
    label: "Area",
    min: 2,
    max: 252,
  },
  {
    name: "alias",
    required: false,
    type: "text",
    label: "Apelido",
    min: 2,
    max: 252,
  },
  {
    name: "phoneNumber",
    required: false,
    type: "phone",
    label: "Telefone",
    min: 2,
    max: 252,
  },
  {
    name: "roles",
    required: true,
    type: "checkbox",
    label: "Perfil",
    min: null,
    max: null,
  },
  {
    name: "managementsId",
    required: false,
    type: "checkbox",
    label: "Gerência",
    min: null,
    max: null,
  },
];

export const CreateUserValidation: YupObjValidationProps[] = [
  ...UserValidation,
  {
    name: "passwordHash",
    required: true,
    type: "password",
    label: "Senha",
    min: 2,
    max: 252,
  },
];
