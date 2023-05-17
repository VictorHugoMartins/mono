export type FormUserType = {
  id: string;
  name: string;
  lastName: string;
  roles: string[];
  organizationId: number;
  managementsId: number[];
  area: string;
  alias: string;
  phoneNumber: string;
  passwordHash: string;
};

export type CreateUserType = FormUserType & {
  email: string;
};
